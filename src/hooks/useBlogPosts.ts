import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types/blog';
import toast from 'react-hot-toast';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;

      const formattedPosts: BlogPost[] = data.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.cover_image,
        author: post.author,
        publishedAt: post.published_at,
        readTime: post.read_time,
        tags: post.tags,
        slug: post.slug,
        published: post.published
      }));

      setPosts(formattedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: Omit<BlogPost, 'id'>) => {
    try {
      const slug = postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          cover_image: postData.coverImage,
          author: postData.author,
          published_at: postData.publishedAt,
          read_time: postData.readTime,
          tags: postData.tags,
          slug,
          published: true
        })
        .select()
        .single();

      if (error) throw error;

      const newPost: BlogPost = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.cover_image,
        author: data.author,
        publishedAt: data.published_at,
        readTime: data.read_time,
        tags: data.tags,
        slug: data.slug,
        published: data.published
      };

      setPosts(prev => [newPost, ...prev]);
      toast.success('Article published successfully!');
      return newPost;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create post';
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  const updatePost = async (id: string, postData: Omit<BlogPost, 'id'>) => {
    try {
      const slug = postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          cover_image: postData.coverImage,
          author: postData.author,
          published_at: postData.publishedAt,
          read_time: postData.readTime,
          tags: postData.tags,
          slug,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updatedPost: BlogPost = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.cover_image,
        author: data.author,
        publishedAt: data.published_at,
        readTime: data.read_time,
        tags: data.tags,
        slug: data.slug,
        published: data.published
      };

      setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
      toast.success('Article updated successfully!');
      return updatedPost;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update post';
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(prev => prev.filter(post => post.id !== id));
      toast.success('Article deleted successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete post';
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts
  };
};