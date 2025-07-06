import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const useContact = () => {
  const [loading, setLoading] = useState(false);

  const submitContact = async (formData: ContactFormData) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        });

      if (error) throw error;

      toast.success('Message sent successfully! I\'ll get back to you soon.');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send message';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitContact,
    loading
  };
};