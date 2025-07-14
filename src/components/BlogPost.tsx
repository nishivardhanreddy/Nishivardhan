import React from 'react';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types/blog';

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="font-serif text-4xl font-bold mb-6 text-stone-900">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="font-serif text-3xl font-bold mb-4 mt-8 text-stone-900">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="font-serif text-2xl font-bold mb-3 mt-6 text-stone-900">{line.slice(4)}</h3>;
        }
        if (line.startsWith('```')) {
          return null; // Skip code block markers for now
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={index} className="text-stone-700 leading-relaxed mb-2">{line.slice(2)}</li>;
        }
        if (/^\d+\./.test(line)) {
          return <li key={index} className="text-stone-700 leading-relaxed mb-2">{line.replace(/^\d+\.\s*/, '')}</li>;
        }
        if (line.startsWith('*') && line.endsWith('*')) {
          return <p key={index} className="text-stone-600 italic text-center my-6">{line.slice(1, -1)}</p>;
        }
        
        return <p key={index} className="text-stone-700 leading-relaxed mb-4 text-lg">{line}</p>;
      });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Blog</span>
          </button>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Cover Image */}
        <div className="aspect-[16/9] bg-stone-200 mb-8 rounded-sm overflow-hidden">
          <img 
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="font-serif text-5xl font-bold mb-6 text-stone-900 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-stone-600 mb-6">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="flex items-center gap-1 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {formatContent(post.content)}
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-stone-200">
          <div className="bg-stone-100 p-8 rounded-sm">
            <h3 className="font-serif text-2xl font-bold mb-4 text-stone-900">About the Author</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-200">
                <img 
                  src="/images/Profilepic.jpg?auto=compress&cs=tinysrgb&w=200\" 
                  alt="Nishivardhan Reddy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-2">Nishivardhan Reddy</h4>
                <p className="text-stone-700 leading-relaxed">
                  Data Analyst and Business Intelligence Specialist passionate about transforming 
                  data into actionable insights that drive business growth. Currently pursuing B.Tech 
                  in Computer Science Engineering at LPU.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};