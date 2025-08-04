# Mentorscue Tutor Portal

A comprehensive web application for managing tutor applications and scheduling for Mentorscue tuition business. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

### For Tutors (Application System)
- **Multi-step Application Form**: Professional application process with 5 comprehensive steps
- **Personal Information**: Name, contact details, address
- **Educational Background**: Degree, institution, graduation year, GPA
- **Teaching Experience**: Years of experience, previous institutions, certifications
- **Availability & Preferences**: Preferred subjects, classes, available hours, timezone
- **Additional Information**: Teaching philosophy, references, why they want to join
- **Status Tracking**: Real-time application status updates

### For Head Managers (Tutor Management)
- **Tutor Dashboard**: Complete overview of all tutors with filtering capabilities
- **Schedule Management**: Assign sessions to tutors with conflict detection
- **Tutor Profiles**: View detailed tutor information, ratings, and availability
- **Calendar Interface**: Visual calendar for date selection and time slot management
- **Session Scheduling**: Create, edit, and manage tutor sessions
- **Status Management**: Track tutor status (active, inactive, on leave)
- **Add New Tutors**: Comprehensive form to add new tutors to the system

### For Administrators (Admin Dashboard)
- **Application Management**: Review and manage all tutor applications
- **Advanced Filtering**: Filter by status, subject, class level, search terms
- **Status Updates**: Approve, reject, or mark applications for review
- **Detailed View**: Complete application details in modal view
- **Statistics**: Overview of application counts and status distribution

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (Free Tier)
- **Authentication**: Supabase Auth (Ready for implementation)

## 📁 Project Structure

```
mentorscue-tutor-portal/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── applications/          # Tutor application endpoints
│   │   │   ├── tutors/               # Tutor management endpoints
│   │   │   └── schedules/            # Schedule management endpoints
│   │   ├── apply/                    # Tutor application form
│   │   ├── admin/                    # Admin dashboard
│   │   ├── schedule/                 # Tutor management & scheduling
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Landing page
│   ├── lib/
│   │   └── supabase.ts              # Supabase client & types
│   └── components/                   # Reusable components
├── database-schema.sql              # Database schema
├── .env.local                      # Environment variables
└── README.md                       # This file
```

## 🗄️ Database Schema

### Tables
- **applications**: Tutor application submissions
- **tutors**: Tutor profiles and information
- **schedules**: Tutor session assignments
- **subjects**: Available subjects
- **classes**: Class levels

### Key Features
- **JSONB Storage**: Flexible data structure for application details
- **Array Fields**: Support for multiple subjects and classes
- **Indexes**: Optimized for fast queries and filtering
- **Triggers**: Automatic timestamp updates
- **Constraints**: Data integrity with check constraints

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Irfan-Habeeb/mentorscue-tutor-portal.git
cd mentorscue-tutor-portal
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```
Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up Supabase Database**
- Create a new Supabase project
- Run the SQL from `database-schema.sql` in the SQL Editor
- Copy your project URL and anon key to `.env.local`

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Pages

### Landing Page (`/`)
- Hero section with navigation
- Feature highlights
- Links to application and management systems

### Tutor Application (`/apply`)
- 5-step application form
- Progress indicator
- Form validation
- Success confirmation

### Admin Dashboard (`/admin`)
- Application overview with statistics
- Advanced filtering and search
- Status management
- Detailed application view

### Tutor Management (`/schedule`)
- Tutor listing with filters
- Calendar-based scheduling
- Session management
- Add new tutors
- Conflict detection

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Background**: Gray (#F9FAFB)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, various sizes
- **Body**: Regular, readable

### Components
- **Cards**: White background with shadow
- **Buttons**: Rounded corners, hover effects
- **Forms**: Clean inputs with focus states
- **Modals**: Overlay with backdrop

## 🔧 API Endpoints

### Applications
- `POST /api/applications` - Submit new application
- `GET /api/applications` - Fetch applications with filters
- `PATCH /api/applications/[id]` - Update application status

### Tutors
- `POST /api/tutors` - Add new tutor
- `GET /api/tutors` - Fetch tutors with filters

### Schedules
- `POST /api/schedules` - Create new schedule
- `GET /api/schedules` - Fetch schedules with filters

## 🚀 Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## 🔒 Security Features

- **Input Validation**: Server-side validation for all forms
- **SQL Injection Protection**: Supabase parameterized queries
- **CORS Protection**: Configured for production domains
- **Environment Variables**: Secure credential management

## 📊 Performance

- **Static Generation**: Optimized for fast loading
- **Image Optimization**: Next.js built-in optimization
- **Database Indexes**: Optimized queries
- **CDN**: Vercel's global CDN

## 🔄 Future Enhancements

- [x] **Supabase Integration**: Complete database integration
- [x] **Comprehensive Scheduling System**: Tutor management and scheduling
- [ ] **Authentication System**: User login and role management
- [ ] **Email Notifications**: Application status updates
- [ ] **File Upload**: Resume and document uploads
- [ ] **Real-time Updates**: Live status changes
- [ ] **Mobile App**: React Native companion app
- [ ] **Analytics Dashboard**: Performance metrics
- [ ] **Payment Integration**: Session payment tracking
- [ ] **Video Integration**: Online session capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please contact the development team.

---

**Built with ❤️ for Mentorscue**
