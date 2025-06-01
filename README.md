# SchoolSync V2 🏫

A comprehensive school management system built with React Native and Expo, specifically designed for Indonesian boarding schools (Pesantren). This B2B SaaS solution empowers school management with modern tools to efficiently manage students, teachers, and administrative tasks.

## 🌟 Features

### 🔐 Authentication & User Management
- Secure authentication with Supabase
- Role-based access control (Management, Teachers, Students, Parents)
- User onboarding flow with school setup
- Teacher invitation system

### 📊 Management Dashboard
- Real-time school statistics and metrics
- Student enrollment tracking
- Teacher management interface
- Subscription and billing overview

### 🎓 Academic Management
- Student information system
- Class and grade management
- Academic calendar integration
- Performance tracking

### 💰 Subscription Management
- Tiered pricing plans (Starter, Growing, Enterprise)
- Student count-based billing
- Trial period management
- Payment processing integration

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and toolchain
- **Expo Router** - File-based navigation
- **TypeScript** - Type-safe development
- **Gluestack UI v2** - Modern component library
- **Tailwind CSS** - Utility-first styling
- **NativeWind** - Tailwind CSS for React Native

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Relational database
- **Row Level Security (RLS)** - Data security
- **Real-time subscriptions** - Live data updates

### State Management
- **Zustand** - Lightweight state management
- **React Hooks** - Component state management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Metro Bundler** - JavaScript bundler

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ramdhanhdy/SchoolSyncV2.git
   cd SchoolSyncV2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   - Create a new Supabase project
   - Run the SQL schema from `database/schema.sql`
   - Configure Row Level Security policies

5. **Start the development server**
   ```bash
   npm start
   ```

### Running on Different Platforms

- **Android**: `npm run android`
- **iOS**: `npm run ios`
- **Web**: `npm run web`

## 📱 App Structure

```
app/
├── (drawer)/           # Main app with drawer navigation
│   ├── (tabs)/         # Tab-based navigation
│   └── index.tsx       # Dashboard home
├── auth/               # Authentication screens
│   ├── index.tsx       # Auth router
│   └── onboarding/     # School setup flow
├── _layout.tsx         # Root layout
└── index.tsx           # App entry point

components/
├── auth/               # Authentication components
├── onboarding/         # Onboarding flow components
└── ui/                 # Reusable UI components

store/
├── authStore.ts        # Authentication state
└── store.ts            # Global state management

utils/
└── supabase.ts         # Supabase client configuration
```

## 🗄️ Database Schema

The application uses a comprehensive PostgreSQL schema with the following main entities:

- **Schools** - School information and settings
- **Users** - User accounts with role-based access
- **Subscriptions** - Billing and plan management
- **Students** - Student information and enrollment
- **Teachers** - Teacher profiles and assignments
- **Classes** - Class management and scheduling
- **Grades** - Academic performance tracking

## 🔧 Development

### Code Style

This project uses ESLint and Prettier for code formatting:

```bash
# Lint code
npm run lint

# Format code
npm run format
```

### Project Structure Guidelines

- Use TypeScript for all new files
- Follow the established folder structure
- Use Gluestack UI components for consistency
- Apply Tailwind CSS classes for styling
- Implement proper error handling
- Write meaningful commit messages

## 📋 Development Roadmap

### Phase 1: Authentication & Onboarding ✅
- [x] User authentication system
- [x] School onboarding flow
- [x] Teacher invitation system
- [x] Role-based access control

### Phase 2: Core Management Features (In Progress)
- [ ] Student management system
- [ ] Teacher dashboard
- [ ] Class scheduling
- [ ] Academic calendar

### Phase 3: Advanced Features (Planned)
- [ ] Attendance tracking
- [ ] Grade management
- [ ] Parent communication
- [ ] Reporting and analytics

### Phase 4: Mobile Optimization (Planned)
- [ ] Offline functionality
- [ ] Push notifications
- [ ] Mobile-specific UI improvements
- [ ] Performance optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Gluestack UI](https://ui.gluestack.io/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework

## 📞 Support

For support, email support@schoolsync.id or join our Slack channel.

---

**Built with ❤️ for Indonesian educational institutions**