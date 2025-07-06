/*
  # Create blog_posts table

  1. New Tables
    - blog_posts
      - id (uuid, primary key)
      - title (text, required)
      - excerpt (text, required)
      - content (text, required)
      - cover_image (text, required)
      - author (text, required)
      - published_at (timestamptz, required)
      - read_time (integer, required)
      - tags (text array, required)
      - slug (text, required, unique)
      - published (boolean, default true)
      - created_at (timestamptz, default now())
      - updated_at (timestamptz, default now())

  2. Security
    - Enable RLS on blog_posts table
    - Add policy for public read access to published posts
    - Add policy for authenticated users to manage posts
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  cover_image text NOT NULL,
  author text NOT NULL,
  published_at timestamptz NOT NULL,
  read_time integer NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  slug text NOT NULL UNIQUE,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);