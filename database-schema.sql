-- Create applications table
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  personal_info JSONB NOT NULL,
  education JSONB NOT NULL,
  experience JSONB NOT NULL,
  availability JSONB NOT NULL,
  additional JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tutors table
CREATE TABLE tutors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subjects TEXT[] NOT NULL,
  classes TEXT[] NOT NULL,
  experience TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0.0,
  hourly_rate DECIMAL(8,2) NOT NULL,
  timezone TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tutor_id UUID REFERENCES tutors(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration DECIMAL(3,1) NOT NULL,
  total_price DECIMAL(8,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subjects table
CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create classes table
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default subjects
INSERT INTO subjects (name, category) VALUES
  ('Mathematics', 'Science'),
  ('Physics', 'Science'),
  ('Chemistry', 'Science'),
  ('Biology', 'Science'),
  ('English', 'Language'),
  ('History', 'Social Studies'),
  ('Geography', 'Social Studies'),
  ('Computer Science', 'Technology'),
  ('Economics', 'Social Studies'),
  ('Literature', 'Language'),
  ('Art', 'Arts'),
  ('Music', 'Arts'),
  ('Physical Education', 'Sports');

-- Insert default classes
INSERT INTO classes (name, level) VALUES
  ('Class 1-5', 'Primary'),
  ('Class 6-8', 'Middle'),
  ('Class 9-10', 'Secondary'),
  ('Class 11-12', 'Higher Secondary'),
  ('Undergraduate', 'University'),
  ('Graduate', 'University'),
  ('Professional', 'Professional');

-- Insert sample tutors
INSERT INTO tutors (name, subjects, classes, experience, rating, hourly_rate, timezone, bio) VALUES
  ('Dr. Sarah Johnson', ARRAY['Mathematics', 'Physics'], ARRAY['Class 9-10', 'Class 11-12'], '5-10 years', 4.8, 45.00, 'EST', 'Experienced mathematics and physics tutor with a PhD from MIT. Specializes in advanced calculus and mechanics.'),
  ('Prof. Michael Chen', ARRAY['Computer Science', 'Mathematics'], ARRAY['Class 11-12', 'Undergraduate'], '3-5 years', 4.9, 50.00, 'PST', 'Computer science expert with industry experience. Teaches programming, algorithms, and discrete mathematics.'),
  ('Ms. Emily Davis', ARRAY['English', 'Literature'], ARRAY['Class 6-8', 'Class 9-10'], '1-3 years', 4.7, 35.00, 'EST', 'Passionate English tutor helping students improve their writing and reading comprehension skills.');

-- Create indexes for better performance
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_applied_at ON applications(applied_at);
CREATE INDEX idx_applications_personal_info_email ON applications USING GIN ((personal_info->>'email'));

CREATE INDEX idx_tutors_subjects ON tutors USING GIN (subjects);
CREATE INDEX idx_tutors_classes ON tutors USING GIN (classes);
CREATE INDEX idx_tutors_rating ON tutors(rating);

CREATE INDEX idx_bookings_tutor_id ON bookings(tutor_id);
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_student_email ON bookings(student_email);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tutors_updated_at BEFORE UPDATE ON tutors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();