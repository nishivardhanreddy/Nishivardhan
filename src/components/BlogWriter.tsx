import React, { useState } from 'react';
import { ArrowLeft, Save, Eye, Image, Tag, Calendar, Loader2 } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { LoadingSpinner } from './LoadingSpinner';

interface BlogWriterProps {
  onBack: () => void;
  onSave: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  editingPost?: BlogPost | null;
  loading?: boolean;
}

export const BlogWriter: React.FC<BlogWriterProps> = ({ 
  onBack, 
  onSave, 
  editingPost,
  loading = false 
}) => {
  const [title, setTitle] = useState(editingPost?.title || '');
  const [excerpt, setExcerpt] = useState(editingPost?.excerpt || '');
  const [content, setContent] = useState(editingPost?.content || '');
  const [coverImage, setCoverImage] = useState(editingPost?.coverImage || '');
  const [tags, setTags] = useState(editingPost?.tags.join(', ') || '');
  const [isPreview, setIsPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in at least the title and content');
      return;
    }

    setSaving(true);
    try {
      const readTime = Math.ceil(content.split(' ').length / 200);

      const post: Omit<BlogPost, 'id'> = {
        title: title.trim(),
        excerpt: excerpt.trim() || content.substring(0, 150) + '...',
        content: content.trim(),
        coverImage: coverImage.trim() || 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800',
        author: 'Nishivardhan Reddy',
        publishedAt: new Date().toISOString().split('T')[0],
        readTime,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        published: true
      };

      await onSave(post);
    } catch (error) {
      console.error('Failed to save post:', error);
    } finally {
      setSaving(false);
    }
  };

  const formatPreviewContent = (content: string) => {
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
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="text-stone-700 leading-relaxed mb-4">{line}</p>;
      });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium hidden sm:inline">Back to Blog</span>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-sm transition-colors ${
                isPreview 
                  ? 'bg-stone-200 text-stone-900' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Eye size={16} />
              <span className="hidden sm:inline">{isPreview ? 'Edit' : 'Preview'}</span>
            </button>
            
            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="flex items-center gap-2 bg-teal-700 text-white px-4 sm:px-6 py-2 rounded-sm hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              <span className="hidden sm:inline">
                {saving ? 'Saving...' : editingPost ? 'Update' : 'Publish'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isPreview ? (
          /* Preview Mode */
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[16/9] bg-stone-200 mb-8 rounded-sm overflow-hidden">
              <img 
                src={coverImage || 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-stone-900">
              {title || 'Your Article Title'}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-stone-600 mb-8 text-sm sm:text-base">
              <span>Nishivardhan Reddy</span>
              <span>{new Date().toLocaleDateString()}</span>
              <span>{Math.ceil(content.split(' ').length / 200)} min read</span>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {formatPreviewContent(content)}
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Article Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your article title..."
                  className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Excerpt (Optional)
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of your article..."
                  rows={3}
                  className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article content here... You can use markdown formatting:

# Main Heading
## Sub Heading
### Section Heading

Regular paragraph text...

- Bullet point
- Another bullet point

*Italic text for emphasis*"
                  rows={20}
                  className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none font-mono text-sm"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-sm border border-stone-200">
                <h3 className="font-serif text-lg font-bold mb-4 text-stone-900">Article Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                      <Image size={16} />
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-stone-300 rounded-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                      <Tag size={16} />
                      Tags
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Data Analytics, Business Intelligence, Python"
                      className="w-full px-3 py-2 border border-stone-300 rounded-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                    <p className="text-xs text-stone-500 mt-1">Separate tags with commas</p>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                      <Calendar size={16} />
                      Publish Date
                    </label>
                    <input
                      type="date"
                      value={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-stone-300 rounded-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 p-6 rounded-sm border border-teal-200">
                <h4 className="font-medium text-teal-900 mb-2">Markdown Guide</h4>
                <div className="text-sm text-teal-800 space-y-1">
                  <p><code># Title</code> - Main heading</p>
                  <p><code>## Subtitle</code> - Sub heading</p>
                  <p><code>### Section</code> - Section heading</p>
                  <p><code>- Item</code> - Bullet point</p>
                  <p><code>*text*</code> - Italic text</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};