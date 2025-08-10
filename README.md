# MentorScue Tutor Portal

A simple tutor application system built with Next.js and Supabase.

## Features

### 🎯 **Core Functionality**
- **Tutor Application Form** (`/apply`) - Where tutors can submit their applications
- **Admin Dashboard** (`/admin`) - Where you can manage and review applications

### 📝 **Application Form Includes**
- Personal Information (name, email, phone, date of birth)
- Education Details (degree, institution, graduation year, GPA)
- Teaching Experience (years, subjects, classes, previous institutions)
- Availability (preferred hours, available days, timezone)
- Additional Information (motivation, specializations, references)

### 🛠️ **Admin Dashboard Features**
- View all applications in a table format
- Filter by application status (pending, reviewed, approved, rejected)
- Search applications by name or email
- Update application status directly from the dashboard
- See application details including education, experience, and availability

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database)
- **Deployment**: Vercel (or any hosting platform)

## Quick Start

### 1. Clone and Install
```bash
git clone <your-repo>
cd mentorscue-tutor-portal
npm install
```

### 2. Set Up Supabase
1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key from Settings > API
4. Update `.env.local` with your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### 3. Set Up Database
1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `database-schema.sql`
3. Click "Run" to create the database tables

### 4. Run the Application
```bash
npm run dev
```

Visit:
- `http://localhost:3000` - Landing page
- `http://localhost:3000/apply` - Tutor application form
- `http://localhost:3000/admin` - Admin dashboard

## Database Schema

The application uses a simple database structure:

- **applications** - Stores all tutor applications with JSONB fields for structured data
- **subjects** - Available subjects for teaching (Mathematics, Physics, etc.)
- **classes** - Available class levels (Class 1-5, Undergraduate, etc.)

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
Add the environment variables to your hosting platform's dashboard and deploy.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## File Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── apply/
│   │   └── page.tsx          # Tutor application form
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   └── api/
│       ├── applications/
│       │   ├── route.ts      # Handle applications (GET/POST)
│       │   └── [id]/
│       │       └── route.ts  # Handle individual applications (PATCH)
│       ├── subjects/
│       │   └── route.ts      # Get available subjects
│       └── classes/
│           └── route.ts      # Get available classes
├── lib/
│   └── supabase.ts           # Supabase client and types
└── database-schema.sql       # Database setup script
```

## Customization

### Adding New Subjects/Classes
1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. Add new records to the `subjects` or `classes` tables

### Modifying Application Form
Edit `src/app/apply/page.tsx` to add/remove fields or change the form structure.

### Styling
The application uses Tailwind CSS. Modify the classes in the components to change the appearance.

## Support

This is a simple, focused application for managing tutor applications. The code is well-structured and easy to extend for additional features if needed.
