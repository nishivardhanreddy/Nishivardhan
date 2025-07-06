import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AdminAuthProps {
  onAuthSuccess: () => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      let result;
      
      if (isSignUp) {
        result = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (result.error) throw result.error;
        
        if (result.data.user && !result.data.user.email_confirmed_at) {
          toast.success('Account created! You can now sign in.');
          setIsSignUp(false);
        } else {
          toast.success('Account created and signed in successfully!');
          onAuthSuccess();
        }
      } else {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (result.error) throw result.error;
        
        toast.success('Signed in successfully!');
        onAuthSuccess();
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="bg-teal-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <LogIn size={24} className="text-teal-700" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
            {isSignUp ? 'Create Admin Account' : 'Admin Login'}
          </h2>
          <p className="text-stone-600">
            {isSignUp 
              ? 'Create your admin account to manage the portfolio' 
              : 'Sign in to access admin features'
            }
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 pr-12 border border-stone-300 rounded-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {isSignUp && (
              <p className="text-xs text-stone-500 mt-1">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-teal-700 text-white py-3 rounded-sm hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <LogIn size={20} />
            )}
            {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-teal-700 hover:text-teal-800 transition-colors text-sm"
          >
            {isSignUp 
              ? 'Already have an account? Sign in' 
              : 'Need an admin account? Create one'
            }
          </button>
        </div>

        <div className="mt-6 p-4 bg-stone-50 rounded-sm">
          <h4 className="font-medium text-stone-900 mb-2">Admin Features:</h4>
          <ul className="text-sm text-stone-600 space-y-1">
            <li>• Create, edit, and delete blog posts</li>
            <li>• View and manage contact messages</li>
            <li>• Full portfolio content management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};