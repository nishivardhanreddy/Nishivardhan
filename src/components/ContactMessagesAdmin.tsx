import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Calendar, User, MessageSquare, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LoadingSpinner } from './LoadingSpinner';
import toast from 'react-hot-toast';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface ContactMessagesAdminProps {
  onBack: () => void;
}

export const ContactMessagesAdmin: React.FC<ContactMessagesAdminProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessages(prev => prev.filter(msg => msg.id !== id));
      setSelectedMessage(null);
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const toggleExpanded = (messageId: string) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Portfolio</span>
              </button>
              <div className="h-6 w-px bg-stone-300"></div>
              <h1 className="font-serif text-2xl font-bold text-stone-900">Contact Messages</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Mail size={16} />
              <span>{messages.length} total messages</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {messages.length === 0 ? (
          <div className="text-center py-20">
            <Mail size={48} className="text-stone-400 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">No Messages Yet</h2>
            <p className="text-stone-600">Contact messages will appear here when visitors submit the contact form.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => {
              const isExpanded = expandedMessages.has(message.id);
              const truncatedMessage = message.message.length > 150 
                ? message.message.substring(0, 150) + '...' 
                : message.message;

              return (
                <div key={message.id} className="bg-white rounded-sm border border-stone-200 overflow-hidden">
                  <div className="p-6">
                    {/* Message Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-stone-500" />
                            <span className="font-medium text-stone-900">{message.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-stone-500">
                            <Mail size={14} />
                            <a 
                              href={`mailto:${message.email}`}
                              className="text-teal-700 hover:text-teal-800 transition-colors"
                            >
                              {message.email}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-500 mb-3">
                          <Calendar size={14} />
                          <span>{formatDate(message.created_at)}</span>
                        </div>
                        {message.subject && (
                          <h3 className="font-serif text-lg font-bold text-stone-900 mb-3">
                            {message.subject}
                          </h3>
                        )}
                      </div>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                        title="Delete message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Message Content */}
                    <div className="bg-stone-50 p-4 rounded-sm">
                      <div className="flex items-start gap-2 mb-2">
                        <MessageSquare size={16} className="text-stone-500 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                            {isExpanded ? message.message : truncatedMessage}
                          </p>
                          {message.message.length > 150 && (
                            <button
                              onClick={() => toggleExpanded(message.id)}
                              className="flex items-center gap-1 mt-2 text-teal-700 hover:text-teal-800 transition-colors text-sm"
                            >
                              {isExpanded ? (
                                <>
                                  <EyeOff size={14} />
                                  Show less
                                </>
                              ) : (
                                <>
                                  <Eye size={14} />
                                  Show more
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-stone-200">
                      <a
                        href={`mailto:${message.email}?subject=Re: ${message.subject || 'Your message'}&body=Hi ${message.name},%0D%0A%0D%0AThank you for your message.%0D%0A%0D%0ABest regards,%0D%0AAlex Chen`}
                        className="flex items-center gap-2 text-teal-700 hover:text-teal-800 transition-colors text-sm font-medium"
                      >
                        <Mail size={14} />
                        Reply via Email
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};