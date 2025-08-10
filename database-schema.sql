-- Create applications table (main table for tutor applications)
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

-- Create subjects table (for dropdown in application form)
CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create classes table (for dropdown in application form)
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

-- Create indexes for better performance
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_applied_at ON applications(applied_at);
CREATE INDEX idx_applications_personal_info_email ON applications USING GIN ((personal_info->>'email'));

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();