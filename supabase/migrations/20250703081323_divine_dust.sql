/*
  # Blog Platform Database Schema

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `excerpt` (text, required)
      - `content` (text, required)
      - `cover_image` (text, required)
      - `author` (text, required)
      - `published_at` (timestamptz, required)
      - `read_time` (integer, default 5)
      - `tags` (text array, default empty)
      - `slug` (text, unique, required)
      - `published` (boolean, default true)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `subject` (text, required)
      - `message` (text, required)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on both tables
    - Public read access for published blog posts
    - Authenticated user management for blog posts
    - Public insert access for contact messages
    - Authenticated read access for contact messages

  3. Performance
    - Indexes on published_at, slug, and created_at columns
    - Sample blog post data for testing
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  cover_image text NOT NULL,
  author text NOT NULL,
  published_at timestamptz NOT NULL,
  read_time integer NOT NULL DEFAULT 5,
  tags text[] NOT NULL DEFAULT '{}',
  slug text UNIQUE NOT NULL,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$
BEGIN
  -- Drop and recreate blog_posts policies
  DROP POLICY IF EXISTS "Anyone can read published blog posts" ON blog_posts;
  DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON blog_posts;
  
  -- Drop and recreate contact_messages policies
  DROP POLICY IF EXISTS "Anyone can create contact messages" ON contact_messages;
  DROP POLICY IF EXISTS "Authenticated users can read contact messages" ON contact_messages;
END $$;

-- Create policies for blog_posts
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

-- Create policies for contact_messages
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Insert sample blog post data (only if table is empty)
INSERT INTO blog_posts (title, excerpt, content, cover_image, author, published_at, read_time, tags, slug)
SELECT * FROM (VALUES
  (
    'Welcome to Our Blog',
    'This is our first blog post introducing you to our platform and what we have to offer.',
    '# Welcome to Our Blog

We''re excited to launch our new blog platform! This is where we''ll be sharing insights, tutorials, and updates about our journey.

## What to Expect

- **Technical tutorials** - Deep dives into development topics
- **Industry insights** - Our thoughts on the latest trends
- **Behind the scenes** - Stories from our team
- **Product updates** - New features and improvements

## Getting Started

Feel free to explore our content and don''t hesitate to reach out if you have any questions or suggestions for future topics.

Thank you for being part of our community!',
    'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
    'Blog Team',
    now(),
    3,
    ARRAY['welcome', 'introduction', 'blog'],
    'welcome-to-our-blog'
  ),
  (
    'Building Modern Web Applications',
    'Learn about the latest trends and best practices in modern web development.',
    '# Building Modern Web Applications

Modern web development has evolved significantly over the past few years. In this post, we''ll explore the key trends and technologies shaping the future of web applications.

## Key Technologies

### Frontend Frameworks
- **React** - Component-based UI library
- **Vue.js** - Progressive framework
- **Svelte** - Compile-time optimized

### Backend Solutions
- **Node.js** - JavaScript runtime
- **Deno** - Secure TypeScript runtime
- **Serverless** - Function-as-a-Service

## Best Practices

1. **Performance First** - Optimize for speed and efficiency
2. **Accessibility** - Build inclusive experiences
3. **Security** - Implement robust security measures
4. **Testing** - Comprehensive test coverage

## Conclusion

The web development landscape continues to evolve rapidly. Staying current with these trends will help you build better applications for your users.',
    'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg',
    'Tech Team',
    now() - interval '2 days',
    7,
    ARRAY['web development', 'javascript', 'react', 'tutorial'],
    'building-modern-web-applications'
  ),
  (
    'The Future of AI in Development',
    'Exploring how artificial intelligence is transforming the software development landscape.',
    '# The Future of AI in Development

Artificial Intelligence is revolutionizing how we approach software development. From code generation to automated testing, AI tools are becoming indispensable for modern developers.

## Current AI Tools

### Code Generation
- **GitHub Copilot** - AI pair programmer
- **ChatGPT** - Conversational AI assistant
- **Tabnine** - AI code completion

### Testing & QA
- **Automated test generation**
- **Bug detection and fixing**
- **Performance optimization**

## Impact on Developers

AI is not replacing developers but augmenting their capabilities:

- **Faster prototyping** - Quick iteration on ideas
- **Reduced boilerplate** - Focus on business logic
- **Better documentation** - AI-generated docs
- **Learning acceleration** - Instant explanations

## Looking Ahead

The integration of AI in development workflows will continue to deepen, making development more accessible and efficient while raising the bar for what''s possible.

What are your thoughts on AI in development? Share your experiences in the comments!',
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    'AI Research Team',
    now() - interval '5 days',
    6,
    ARRAY['ai', 'artificial intelligence', 'development', 'future'],
    'future-of-ai-in-development'
  )
) AS new_posts(title, excerpt, content, cover_image, author, published_at, read_time, tags, slug)
WHERE NOT EXISTS (SELECT 1 FROM blog_posts LIMIT 1);