import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, FileText } from 'lucide-react';
import { useContact } from '../hooks/useContact';

interface ContactFormProps {
  onClose: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { submitContact, loading } = useContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    const success = await submitContact(formData);
    if (success) {
      setFormData({ name: '', email: '', subject: '', message: '' });
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold text-stone-900">Get In Touch</h2>
            <button 
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                  <User size={16} />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                  <Mail size={16} />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                <FileText size={16} />
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                <MessageSquare size={16} />
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
                placeholder="Tell me about your project, question, or just say hello..."
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-stone-600 hover:text-stone-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-teal-700 text-white px-8 py-3 rounded-sm hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};