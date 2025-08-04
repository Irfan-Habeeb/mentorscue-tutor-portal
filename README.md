# Mentorscue Tutor Portal

A professional tutor selection and management web application for Mentorscue. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### For Tutors (Application Form)
- **Multi-step Application Process**: 5-step comprehensive application form
- **Personal Information**: Name, email, phone, date of birth
- **Education Details**: Degree, institution, graduation year, GPA
- **Teaching Experience**: Years of experience, subjects, classes taught
- **Availability**: Preferred hours, available days, timezone
- **Additional Information**: Motivation, specializations, references

### For Students (Scheduling)
- **Tutor Discovery**: Browse tutors by subject and class level
- **Interactive Calendar**: Select dates and view available time slots
- **Real-time Availability**: See which time slots are available/booked
- **Booking System**: Complete booking form with session details
- **Session Management**: Duration selection, pricing calculation
- **Responsive Design**: Works on desktop and mobile devices

### For Admins (Dashboard)
- **Application Overview**: Total, pending, approved, rejected applications
- **Advanced Filtering**: Search by name/email, filter by status and subject
- **Application Management**: View details, approve, reject applications
- **Booking Management**: View and manage all scheduled sessions
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Headless UI, Heroicons
- **Database**: Supabase (planned)
- **Deployment**: Vercel (planned)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mentorscue-tutor-portal
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── apply/
│   │   └── page.tsx        # Tutor application form
│   └── admin/
│       └── page.tsx        # Admin dashboard
└── components/             # Reusable components (planned)
```

## 🎨 Design System

- **Colors**: Blue primary (#3B82F6), gray scale
- **Typography**: Inter font family
- **Components**: Consistent button styles, form inputs, cards
- **Responsive**: Mobile-first design approach

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality
- Prettier for code formatting

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Environment Variables

Create a `.env.local` file for local development:

```env
# Add your environment variables here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Pages

### Home Page (`/`)
- Landing page with hero section
- Navigation to application form and admin dashboard
- Feature highlights

### Application Form (`/apply`)
- 5-step application process
- Form validation
- Progress indicator
- Success confirmation

### Scheduling System (`/schedule`)
- Tutor discovery and filtering
- Interactive calendar
- Time slot selection
- Booking form with pricing
- Session management

### Admin Dashboard (`/admin`)
- Application statistics
- Search and filtering
- Application management
- Detailed view modal

## 🔮 Future Enhancements

### Phase 2
- [x] Supabase integration for data persistence
- [x] Comprehensive scheduling system
- [ ] Email notifications
- [ ] File upload for resumes
- [ ] Interview scheduling

### Phase 3
- [ ] Tutor manager dashboard
- [ ] Analytics and reporting
- [ ] Email automation
- [ ] Advanced filtering

### Phase 4
- [ ] Real-time notifications
- [ ] Mobile app
- [ ] Payment integration
- [ ] Video interviews

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@mentorscue.com or create an issue in this repository.

---

Built with ❤️ for Mentorscue
