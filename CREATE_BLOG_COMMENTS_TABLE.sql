-- ============================================
-- RUN THIS SQL IN SUPABASE DASHBOARD
-- ============================================
-- Go to: Supabase Dashboard → SQL Editor → New Query
-- Copy and paste this entire file, then click RUN
-- ============================================

-- Create blog_comments table
CREATE TABLE IF NOT EXISTS public.blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  comment TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_comments_blog_id ON public.blog_comments(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON public.blog_comments(status);
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON public.blog_comments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can submit comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Only approved comments are visible" ON public.blog_comments;
DROP POLICY IF EXISTS "Admins can see all comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Admins can update comments" ON public.blog_comments;
DROP POLICY IF EXISTS "Admins can delete comments" ON public.blog_comments;

-- Policy 1: Anyone can insert comments (public submission)
CREATE POLICY "Anyone can submit comments"
  ON public.blog_comments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy 2: Only approved comments are visible to public
CREATE POLICY "Only approved comments are visible"
  ON public.blog_comments
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Policy 3: Service role can do everything (for admin operations)
CREATE POLICY "Service role full access"
  ON public.blog_comments
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_blog_comments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists
DROP TRIGGER IF EXISTS update_blog_comments_updated_at_trigger ON public.blog_comments;

-- Create trigger for updated_at
CREATE TRIGGER update_blog_comments_updated_at_trigger
  BEFORE UPDATE ON public.blog_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_blog_comments_updated_at();

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'blog_comments table created successfully!';
  RAISE NOTICE 'You can now submit comments from the blog detail page.';
END $$;
