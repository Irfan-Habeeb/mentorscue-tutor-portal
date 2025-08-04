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
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schedules table (for tutor management)
CREATE TABLE schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tutor_id UUID REFERENCES tutors(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  subject TEXT NOT NULL,
  class_level TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_contact TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
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
INSERT INTO tutors (name, subjects, classes, experience, rating, hourly_rate, timezone, status, bio) VALUES
  ('Dr. Sarah Johnson', ARRAY['Mathematics', 'Physics'], ARRAY['Class 9-10', 'Class 11-12'], '5-10 years', 4.8, 45.00, 'EST', 'active', 'Experienced mathematics and physics tutor with a PhD from MIT. Specializes in advanced calculus and mechanics.'),
  ('Prof. Michael Chen', ARRAY['Computer Science', 'Mathematics'], ARRAY['Class 11-12', 'Undergraduate'], '3-5 years', 4.9, 50.00, 'PST', 'active', 'Computer science expert with industry experience. Teaches programming, algorithms, and discrete mathematics.'),
  ('Ms. Emily Davis', ARRAY['English', 'Literature'], ARRAY['Class 6-8', 'Class 9-10'], '1-3 years', 4.7, 35.00, 'EST', 'active', 'Passionate English tutor helping students improve their writing and reading comprehension skills.'),
  ('Mr. David Wilson', ARRAY['Chemistry', 'Biology'], ARRAY['Class 9-10', 'Class 11-12'], '2-4 years', 4.6, 40.00, 'EST', 'active', 'Experienced science tutor specializing in chemistry and biology with a strong background in laboratory techniques.');

-- Insert sample schedules
INSERT INTO schedules (tutor_id, date, start_time, end_time, subject, class_level, student_name, student_contact, status, notes) VALUES
  ((SELECT id FROM tutors WHERE name = 'Dr. Sarah Johnson' LIMIT 1), CURRENT_DATE, '10:00', '11:00', 'Mathematics', 'Class 11-12', 'Alex Thompson', 'alex.thompson@email.com', 'scheduled', 'Advanced calculus session'),
  ((SELECT id FROM tutors WHERE name = 'Prof. Michael Chen' LIMIT 1), CURRENT_DATE, '14:00', '15:30', 'Computer Science', 'Class 11-12', 'Sarah Miller', 'sarah.miller@email.com', 'scheduled', 'Python programming basics'),
  ((SELECT id FROM tutors WHERE name = 'Ms. Emily Davis' LIMIT 1), CURRENT_DATE + INTERVAL '1 day', '09:00', '10:00', 'English', 'Class 9-10', 'John Davis', 'john.davis@email.com', 'scheduled', 'Essay writing workshop');

-- Create indexes for better performance
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_applied_at ON applications(applied_at);
CREATE INDEX idx_applications_personal_info_email ON applications USING GIN ((personal_info->>'email'));

CREATE INDEX idx_tutors_subjects ON tutors USING GIN (subjects);
CREATE INDEX idx_tutors_classes ON tutors USING GIN (classes);
CREATE INDEX idx_tutors_rating ON tutors(rating);
CREATE INDEX idx_tutors_status ON tutors(status);

CREATE INDEX idx_schedules_tutor_id ON schedules(tutor_id);
CREATE INDEX idx_schedules_date ON schedules(date);
CREATE INDEX idx_schedules_status ON schedules(status);
CREATE INDEX idx_schedules_student_contact ON schedules(student_contact);
CREATE INDEX idx_schedules_date_time ON schedules(date, start_time);

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
CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();