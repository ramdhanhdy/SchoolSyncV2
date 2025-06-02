-- =============================================
-- PESANTREN DIGITAL DATABASE SCHEMA
-- Version: 1.0
-- Database: PostgreSQL (Supabase)
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- ENUM TYPES
-- =============================================

-- User roles
CREATE TYPE user_role AS ENUM (
    'super_admin',
    'school_owner',
    'management',
    'teacher',
    'parent',
    'student'
);

-- Subscription plans
CREATE TYPE subscription_plan AS ENUM (
    'trial',
    'starter',
    'growing',
    'enterprise'
);

-- Subscription status
CREATE TYPE subscription_status AS ENUM (
    'trial',
    'active',
    'past_due',
    'canceled',
    'expired'
);

-- Incident types
CREATE TYPE incident_type AS ENUM (
    'bullying',
    'health',
    'academic',
    'facility',
    'security',
    'other'
);

-- Incident priority
CREATE TYPE incident_priority AS ENUM (
    'low',
    'medium',
    'high',
    'critical'
);

-- Incident status
CREATE TYPE incident_status AS ENUM (
    'new',
    'assigned',
    'investigating',
    'resolved',
    'closed'
);

-- Payment status
CREATE TYPE payment_status AS ENUM (
    'pending',
    'paid',
    'partial',
    'overdue',
    'canceled'
);

-- Attendance status
CREATE TYPE attendance_status AS ENUM (
    'present',
    'absent',
    'sick',
    'permission',
    'late'
);

-- CCTV request status
CREATE TYPE cctv_request_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'expired'
);

-- Leave request status
CREATE TYPE leave_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'canceled'
);

-- =============================================
-- CORE TABLES
-- =============================================

-- Schools table (multi-tenant root)
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    logo_url TEXT,
    
    -- Subscription info
    subscription_plan subscription_plan DEFAULT 'trial',
    subscription_status subscription_status DEFAULT 'trial',
    subscription_started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    subscription_ends_at TIMESTAMP WITH TIME ZONE,
    trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days'),
    
    -- Limits based on plan
    student_limit INTEGER DEFAULT 50,
    storage_limit_gb INTEGER DEFAULT 10,
    sms_credits INTEGER DEFAULT 100,
    
    -- Settings
    settings JSONB DEFAULT '{}',
    features JSONB DEFAULT '{"cctv": true, "incident_reporting": true, "financial": true}',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Users table (from Supabase Auth, extended with profiles)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role user_role NOT NULL,
    avatar_url TEXT,
    
    -- Role-specific IDs
    teacher_id UUID,
    parent_id UUID,
    student_id UUID,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    invited_by UUID REFERENCES users(id),
    invited_at TIMESTAMP WITH TIME ZONE,
    activated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT valid_role_id CHECK (
        (role = 'teacher' AND teacher_id IS NOT NULL) OR
        (role = 'parent' AND parent_id IS NOT NULL) OR
        (role = 'student' AND student_id IS NOT NULL) OR
        (role IN ('super_admin', 'school_owner', 'management'))
    )
);

-- Create indexes for users
CREATE INDEX idx_users_school_id ON users(school_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);

-- =============================================
-- USER ROLE SPECIFIC TABLES
-- =============================================

-- Teachers table
CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    employee_id VARCHAR(50),
    
    -- Academic info
    subjects TEXT[],
    is_homeroom_teacher BOOLEAN DEFAULT false,
    homeroom_class_id UUID,
    is_dorm_supervisor BOOLEAN DEFAULT false,
    supervised_dorm_id UUID,
    
    -- Status
    join_date DATE,
    resign_date DATE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    
    -- Personal info
    full_name VARCHAR(255) NOT NULL,
    nickname VARCHAR(100),
    birth_date DATE NOT NULL,
    birth_place VARCHAR(100),
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
    blood_type VARCHAR(5),
    
    -- Academic info
    class_id UUID,
    enrollment_date DATE NOT NULL,
    graduation_date DATE,
    
    -- Boarding info
    dorm_id UUID,
    room_number VARCHAR(20),
    bed_number VARCHAR(10),
    
    -- Family info (linked to parents)
    father_id UUID REFERENCES parents(id),
    mother_id UUID REFERENCES parents(id),
    guardian_id UUID REFERENCES parents(id),
    
    -- Health info
    health_conditions TEXT,
    allergies TEXT,
    medications TEXT,
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated', 'dropped_out')),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parents table
CREATE TABLE parents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    
    -- Personal info
    full_name VARCHAR(255) NOT NULL,
    relationship VARCHAR(50) CHECK (relationship IN ('father', 'mother', 'guardian', 'other')),
    occupation VARCHAR(100),
    company VARCHAR(100),
    
    -- Contact info
    phone_primary VARCHAR(20) NOT NULL,
    phone_secondary VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    
    -- Emergency contact
    is_emergency_contact BOOLEAN DEFAULT false,
    emergency_priority INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student-Parent relationship (many-to-many)
CREATE TABLE student_parents (
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
    relationship VARCHAR(50),
    is_primary_contact BOOLEAN DEFAULT false,
    
    PRIMARY KEY (student_id, parent_id)
);

-- =============================================
-- ACADEMIC TABLES
-- =============================================

-- Academic years
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT one_active_year_per_school UNIQUE (school_id, is_active) WHERE is_active = true
);

-- Classes
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    grade_level INTEGER NOT NULL CHECK (grade_level BETWEEN 1 AND 12),
    homeroom_teacher_id UUID REFERENCES teachers(id),
    capacity INTEGER DEFAULT 30,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    credit_hours INTEGER DEFAULT 2,
    is_mandatory BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Class subjects (which subjects are taught in which class)
CREATE TABLE class_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES teachers(id),
    schedule JSONB, -- Store weekly schedule
    
    UNIQUE(class_id, subject_id)
);

-- Grades
CREATE TABLE grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id),
    
    -- Grade details
    semester INTEGER CHECK (semester IN (1, 2)),
    midterm_score DECIMAL(5,2),
    final_score DECIMAL(5,2),
    assignment_score DECIMAL(5,2),
    attendance_score DECIMAL(5,2),
    total_score DECIMAL(5,2),
    grade_letter VARCHAR(2),
    
    -- Teacher who input the grade
    graded_by UUID REFERENCES teachers(id),
    graded_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT valid_scores CHECK (
        midterm_score BETWEEN 0 AND 100 AND
        final_score BETWEEN 0 AND 100 AND
        assignment_score BETWEEN 0 AND 100 AND
        attendance_score BETWEEN 0 AND 100 AND
        total_score BETWEEN 0 AND 100
    )
);

-- Attendance
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status attendance_status NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    notes TEXT,
    
    -- Who marked the attendance
    marked_by UUID REFERENCES users(id),
    marked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(student_id, date)
);

-- =============================================
-- BOARDING/DORMITORY TABLES
-- =============================================

-- Dormitories
CREATE TABLE dormitories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('male', 'female')),
    capacity INTEGER NOT NULL,
    supervisor_id UUID REFERENCES teachers(id),
    
    -- Facilities
    facilities JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leave requests
CREATE TABLE leave_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    
    -- Request details
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    reason TEXT NOT NULL,
    destination VARCHAR(255),
    contact_during_leave VARCHAR(20),
    
    -- Approval workflow
    status leave_status DEFAULT 'pending',
    requested_by UUID REFERENCES users(id),
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    
    -- Parent confirmation
    parent_confirmed BOOLEAN DEFAULT false,
    parent_confirmed_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INCIDENT & SAFETY TABLES
-- =============================================

-- Incidents
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    incident_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Incident details
    type incident_type NOT NULL,
    priority incident_priority DEFAULT 'medium',
    status incident_status DEFAULT 'new',
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    incident_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- People involved
    reported_by UUID REFERENCES users(id),
    is_anonymous BOOLEAN DEFAULT false,
    students_involved UUID[],
    
    -- Assignment and resolution
    assigned_to UUID REFERENCES users(id),
    assigned_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES users(id),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolution_notes TEXT,
    
    -- Evidence
    evidence_urls TEXT[],
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Incident logs (audit trail)
CREATE TABLE incident_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID REFERENCES incidents(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    performed_by UUID REFERENCES users(id),
    performed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CCTV cameras
CREATE TABLE cctv_cameras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    stream_url TEXT,
    is_active BOOLEAN DEFAULT true,
    is_public_area BOOLEAN DEFAULT true,
    retention_days INTEGER DEFAULT 30,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CCTV access requests
CREATE TABLE cctv_access_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    request_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Request details
    requested_by UUID REFERENCES users(id) NOT NULL,
    student_id UUID REFERENCES students(id) NOT NULL,
    camera_id UUID REFERENCES cctv_cameras(id) NOT NULL,
    requested_date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 30 CHECK (duration_minutes <= 30),
    reason TEXT NOT NULL,
    
    -- Approval workflow
    status cctv_request_status DEFAULT 'pending',
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    
    -- Access details
    access_token VARCHAR(255) UNIQUE,
    access_expires_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CCTV access logs
CREATE TABLE cctv_access_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES cctv_access_requests(id),
    accessed_by UUID REFERENCES users(id) NOT NULL,
    camera_id UUID REFERENCES cctv_cameras(id) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- FINANCIAL TABLES
-- =============================================

-- Fee types
CREATE TABLE fee_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    frequency VARCHAR(20) CHECK (frequency IN ('monthly', 'quarterly', 'semester', 'yearly', 'one_time')),
    is_mandatory BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student fees (bills)
CREATE TABLE student_fees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    fee_type_id UUID NOT NULL REFERENCES fee_types(id),
    academic_year_id UUID NOT NULL REFERENCES academic_years(id),
    
    -- Billing details
    amount DECIMAL(12,2) NOT NULL,
    due_date DATE NOT NULL,
    status payment_status DEFAULT 'pending',
    
    -- Payment tracking
    paid_amount DECIMAL(12,2) DEFAULT 0,
    paid_date DATE,
    payment_method VARCHAR(50),
    transaction_reference VARCHAR(100),
    
    -- Late fees
    late_fee_amount DECIMAL(12,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment transactions
CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_fee_id UUID REFERENCES student_fees(id),
    
    -- Transaction details
    transaction_number VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    
    -- Payment gateway info
    gateway_name VARCHAR(50),
    gateway_transaction_id VARCHAR(100),
    gateway_response JSONB,
    
    -- Who processed
    processed_by UUID REFERENCES users(id),
    processed_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- COMMUNICATION TABLES
-- =============================================

-- Announcements
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    
    -- Announcement details
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    
    -- Target audience
    target_roles user_role[],
    target_classes UUID[],
    target_users UUID[],
    
    -- Scheduling
    publish_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expire_at TIMESTAMP WITH TIME ZONE,
    
    -- Who created
    created_by UUID REFERENCES users(id) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages (direct messages between users)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    
    -- Message details
    sender_id UUID REFERENCES users(id) NOT NULL,
    recipient_id UUID REFERENCES users(id) NOT NULL,
    subject VARCHAR(255),
    content TEXT NOT NULL,
    
    -- Status
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Parent message for threading
    parent_message_id UUID REFERENCES messages(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SYSTEM TABLES
-- =============================================

-- Audit logs (track all important actions)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    
    -- Who did what
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    
    -- Details
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) NOT NULL,
    
    -- Notification details
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    action_url TEXT,
    
    -- Status
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- File uploads
CREATE TABLE file_uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    
    -- File details
    filename VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    
    -- Context
    entity_type VARCHAR(50),
    entity_id UUID,
    
    -- Who uploaded
    uploaded_by UUID REFERENCES users(id) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- School-based indexes (for multi-tenancy)
CREATE INDEX idx_teachers_school_id ON teachers(school_id);
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_parents_school_id ON parents(school_id);
CREATE INDEX idx_classes_school_id ON classes(school_id);
CREATE INDEX idx_incidents_school_id ON incidents(school_id);
CREATE INDEX idx_attendance_school_date ON attendance(school_id, date);
CREATE INDEX idx_student_fees_school_status ON student_fees(school_id, status);

-- Lookup indexes
CREATE INDEX idx_students_class_id ON students(class_id);
CREATE INDEX idx_students_dorm_id ON students(dorm_id);
CREATE INDEX idx_attendance_student_date ON attendance(student_id, date);
CREATE INDEX idx_grades_student_subject ON grades(student_id, subject_id);
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_assigned_to ON incidents(assigned_to);
CREATE INDEX idx_leave_requests_student_status ON leave_requests(student_id, status);
CREATE INDEX idx_cctv_requests_status ON cctv_access_requests(status);
CREATE INDEX idx_messages_recipient ON messages(recipient_id, is_read);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Example RLS policies (basic examples, expand based on requirements)

-- Users can only see users from their school
CREATE POLICY "Users can see their school users" ON users
    FOR SELECT
    USING (school_id = (SELECT school_id FROM users WHERE id = auth.uid()));

-- Teachers can see their class students
CREATE POLICY "Teachers can see their students" ON students
    FOR SELECT
    USING (
        school_id = (SELECT school_id FROM users WHERE id = auth.uid()) AND
        (
            class_id IN (SELECT class_id FROM classes WHERE homeroom_teacher_id = (SELECT teacher_id FROM users WHERE id = auth.uid()))
            OR
            id IN (SELECT student_id FROM attendance WHERE marked_by = auth.uid())
        )
    );

-- Parents can only see their children
CREATE POLICY "Parents can see their children" ON students
    FOR SELECT
    USING (
        id IN (
            SELECT student_id FROM student_parents 
            WHERE parent_id = (SELECT parent_id FROM users WHERE id = auth.uid())
        )
    );

-- Students can only see their own data
CREATE POLICY "Students can see own data" ON students
    FOR SELECT
    USING (user_id = auth.uid());

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to all tables with updated_at column
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate incident number
CREATE OR REPLACE FUNCTION generate_incident_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.incident_number = 'INC-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD(NEXTVAL('incident_number_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create sequence for incident numbers
CREATE SEQUENCE incident_number_seq;

-- Trigger for incident number generation
CREATE TRIGGER generate_incident_number_trigger BEFORE INSERT ON incidents
    FOR EACH ROW EXECUTE FUNCTION generate_incident_number();

-- Function to check student limit based on subscription
CREATE OR REPLACE FUNCTION check_student_limit()
RETURNS TRIGGER AS $$
DECLARE
    current_count INTEGER;
    limit_count INTEGER;
BEGIN
    SELECT COUNT(*), MAX(s.student_limit)
    INTO current_count, limit_count
    FROM students st
    JOIN schools s ON st.school_id = s.id
    WHERE st.school_id = NEW.school_id
    GROUP BY st.school_id;
    
    IF current_count >= limit_count THEN
        RAISE EXCEPTION 'Student limit reached for this subscription plan';
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to check student limit
CREATE TRIGGER check_student_limit_trigger BEFORE INSERT ON students
    FOR EACH ROW EXECUTE FUNCTION check_student_limit();

-- =============================================
-- INITIAL DATA
-- =============================================

-- Insert default subjects
INSERT INTO subjects (school_id, code, name, description, credit_hours, is_mandatory) VALUES
(NULL, 'MTK', 'Matematika', 'Mathematics', 4, true),
(NULL, 'BIN', 'Bahasa Indonesia', 'Indonesian Language', 4, true),
(NULL, 'ENG', 'Bahasa Inggris', 'English Language', 4, true),
(NULL, 'IPA', 'Ilmu Pengetahuan Alam', 'Natural Sciences', 4, true),
(NULL, 'IPS', 'Ilmu Pengetahuan Sosial', 'Social Sciences', 3, true),
(NULL, 'AGM', 'Pendidikan Agama Islam', 'Islamic Studies', 4, true),
(NULL, 'QRN', 'Al-Quran dan Hadits', 'Quran and Hadith Studies', 3, true),
(NULL, 'ARB', 'Bahasa Arab', 'Arabic Language', 3, true);

-- =============================================
-- END OF SCHEMA
-- =============================================