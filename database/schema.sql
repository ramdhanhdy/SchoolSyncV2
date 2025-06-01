-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE user_role AS ENUM ('management', 'teacher', 'student', 'parent');
CREATE TYPE subscription_plan AS ENUM ('starter', 'growing', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('trial', 'active', 'cancelled', 'expired');

-- Schools table
CREATE TABLE IF NOT EXISTS schools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  province VARCHAR(100),
  license_number VARCHAR(100),
  student_count_estimate INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role user_role NOT NULL DEFAULT 'management',
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  plan subscription_plan NOT NULL DEFAULT 'starter',
  status subscription_status NOT NULL DEFAULT 'trial',
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  student_limit INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teacher invitations table
CREATE TABLE IF NOT EXISTS teacher_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  invited_by UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, accepted, expired
  invitation_token UUID DEFAULT gen_random_uuid(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  student_id VARCHAR(50) NOT NULL, -- School's internal student ID
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(10),
  address TEXT,
  parent_phone VARCHAR(20),
  parent_email VARCHAR(255),
  class_name VARCHAR(100),
  enrollment_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, inactive, graduated
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(school_id, student_id)
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(100) NOT NULL,
  grade_level INTEGER,
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
  academic_year VARCHAR(20) NOT NULL,
  student_capacity INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(school_id, name, academic_year)
);

-- Student-Class relationships
CREATE TABLE IF NOT EXISTS student_classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
  academic_year VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, class_id, academic_year)
);

-- Attendance records
CREATE TABLE IF NOT EXISTS attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'present', -- present, absent, late, excused
  notes TEXT,
  recorded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, class_id, date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_school_id ON users(school_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_subscriptions_school_id ON subscriptions(school_id);
CREATE INDEX IF NOT EXISTS idx_teacher_invitations_school_id ON teacher_invitations(school_id);
CREATE INDEX IF NOT EXISTS idx_teacher_invitations_email ON teacher_invitations(email);
CREATE INDEX IF NOT EXISTS idx_teacher_invitations_token ON teacher_invitations(invitation_token);
CREATE INDEX IF NOT EXISTS idx_students_school_id ON students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(school_id, student_id);
CREATE INDEX IF NOT EXISTS idx_classes_school_id ON classes(school_id);
CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_student_classes_student_id ON student_classes(student_id);
CREATE INDEX IF NOT EXISTS idx_student_classes_class_id ON student_classes(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_class_id ON attendance(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);

-- Enable Row Level Security
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies

-- Schools policies
CREATE POLICY "Users can view their own school" ON schools
  FOR SELECT USING (
    id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Management can update their school" ON schools
  FOR UPDATE USING (
    id IN (
      SELECT school_id FROM users 
      WHERE id = auth.uid() AND role = 'management'
    )
  );

CREATE POLICY "Management can insert schools" ON schools
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'management'
    )
  );

-- Users policies
CREATE POLICY "Users can view users in their school" ON users
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    ) OR id = auth.uid()
  );

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Management can update users in their school" ON users
  FOR UPDATE USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE id = auth.uid() AND role = 'management'
    )
  );

CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK (id = auth.uid());

-- Subscriptions policies
CREATE POLICY "Users can view their school's subscription" ON subscriptions
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Management can manage their school's subscription" ON subscriptions
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE id = auth.uid() AND role = 'management'
    )
  );

-- Teacher invitations policies
CREATE POLICY "Management can manage teacher invitations" ON teacher_invitations
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE id = auth.uid() AND role = 'management'
    )
  );

CREATE POLICY "Invited teachers can view their invitation" ON teacher_invitations
  FOR SELECT USING (
    email = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    )
  );

-- Students policies
CREATE POLICY "School users can view students" ON students
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Management and teachers can manage students" ON students
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE id = auth.uid() AND role IN ('management', 'teacher')
    )
  );

-- Classes policies
CREATE POLICY "School users can view classes" ON classes
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Management can manage all classes" ON classes
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE id = auth.uid() AND role = 'management'
    )
  );

CREATE POLICY "Teachers can manage their own classes" ON classes
  FOR ALL USING (
    teacher_id = auth.uid() OR
    school_id IN (
      SELECT school_id FROM users 
      WHERE id = auth.uid() AND role = 'management'
    )
  );

-- Student-Classes policies
CREATE POLICY "School users can view student-class relationships" ON student_classes
  FOR SELECT USING (
    student_id IN (
      SELECT id FROM students 
      WHERE school_id IN (
        SELECT school_id FROM users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Management and teachers can manage student-class relationships" ON student_classes
  FOR ALL USING (
    student_id IN (
      SELECT id FROM students 
      WHERE school_id IN (
        SELECT school_id FROM users 
        WHERE id = auth.uid() AND role IN ('management', 'teacher')
      )
    )
  );

-- Attendance policies
CREATE POLICY "School users can view attendance" ON attendance
  FOR SELECT USING (
    student_id IN (
      SELECT id FROM students 
      WHERE school_id IN (
        SELECT school_id FROM users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Teachers can manage attendance for their classes" ON attendance
  FOR ALL USING (
    class_id IN (
      SELECT id FROM classes 
      WHERE teacher_id = auth.uid() OR
      school_id IN (
        SELECT school_id FROM users 
        WHERE id = auth.uid() AND role = 'management'
      )
    )
  );

-- Functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'management')::user_role
  );
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to create initial subscription for new school
CREATE OR REPLACE FUNCTION create_initial_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO subscriptions (school_id, plan, status, trial_ends_at, student_limit)
  VALUES (
    NEW.id,
    'starter',
    'trial',
    NOW() + INTERVAL '14 days',
    50
  );
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger for new school creation
CREATE TRIGGER on_school_created
  AFTER INSERT ON schools
  FOR EACH ROW EXECUTE FUNCTION create_initial_subscription();