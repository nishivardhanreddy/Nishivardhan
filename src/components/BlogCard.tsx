import React from 'react';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  return (
    <article className="group cursor-pointer" onClick={onClick}>
      <div className="aspect-[4/3] bg-stone-200 mb-6 rounded-sm overflow-hidden">
        <img 
          src={post.coverImage}
          alt={`${post.title} cover`}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-stone-500">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <h3 className="font-serif text-2xl font-bold mb-3 text-stone-900 group-hover:text-teal-700 transition-colors leading-tight">
          {post.title}
        </h3>
        
        <p className="text-stone-600 mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center text-teal-700 group-hover:text-teal-800 transition-colors">
          <span className="font-medium">Read article</span>
          <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  );
};