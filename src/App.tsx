import React, { useState } from 'react';
import { Mail, Linkedin, Github, FileText, ExternalLink, ChevronRight, X, Calendar, Users, Star, GraduationCap, Plus, Edit3, Trash2, MessageCircle, LogOut, Settings } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { BlogCard } from './components/BlogCard';
import { BlogPost } from './components/BlogPost';
import { BlogWriter } from './components/BlogWriter';
import { ContactForm } from './components/ContactForm';
import { ContactMessagesAdmin } from './components/ContactMessagesAdmin';
import { AdminAuth } from './components/AdminAuth';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useBlogPosts } from './hooks/useBlogPosts';
import { useAuth } from './hooks/useAuth';
import { BlogPost as BlogPostType } from './types/blog';
import toast from 'react-hot-toast';

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  challenges: string;
  outcome: string;
  duration: string;
  team: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
  title: "TrackMyWarranty - Home Inventory & Warranty Management App",
  shortDescription: "A cross-platform app to manage home inventory, warranties, receipts, and maintenance schedules with smart reminders and notifications.",
  fullDescription: "TrackMyWarranty is a full-featured React Native app (built with Expo and TypeScript) designed to help users seamlessly track home inventory, manage product warranties, store purchase and service receipts, and receive timely maintenance reminders. The app supports secure multi-provider authentication, integrates push notifications, and offers a clean, intuitive dashboard experience. Built with a mobile-first approach and Supabase backend, it ensures real-time sync, secure storage, and user-friendly data organization across platforms.",
  image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800", // Replace with a relevant screenshot or promo image
  technologies: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "Expo Router", "Lucide", "Expo Notifications"],
  features: [
    "🔐 Multi-provider authentication (Email, Google, GitHub, Apple, Magic Link)",
    "🏠 Smart home dashboard with summary cards and quick actions",
    "📦 Inventory tracking with images, filters, and warranty status badges",
    "⏰ Warranty management with expiry calculation and reminders",
    "🔧 Service logs with receipt uploads, cost tracking, and scheduling",
    "🔔 Smart notifications for expiring warranties and upcoming services",
    "⚙️ Profile and notification preferences, secure data handling"
  ],
  challenges: "Ensuring secure, real-time syncing across devices using Supabase and managing reliable local push notifications across platforms, especially iOS vs Android behavior.",
  outcome: "Successfully built and deployed a production-ready PWA, with upcoming releases for iOS and Android. Early testers found it boosted their warranty management efficiency and reduced missed service dates.",
  duration: "Ongoing",
  team: "Solo project",
  githubUrl: "https://github.com/nishivardhan/trackmywarranty",
  liveUrl: "https://trackmywarranty.in" // Replace with actual link if different
  },
  {
    
  id: 2,
  title: "Health Diagnosis Assistant - Disease Prediction from Symptoms",
  shortDescription: "A web-based health assistant that predicts potential diseases using symptoms input by users, powered by machine learning and Streamlit.",
  fullDescription: "Health Diagnosis Assistant is a user-friendly web application designed to predict possible diseases based on a set of self-reported symptoms. Developed using Python and Streamlit, the app utilizes a Multinomial Naive Bayes classifier trained on curated healthcare datasets from Kaggle. The goal is to support early detection and promote preventive health by offering instant feedback and information on potential health concerns. With a clean interface, users can select up to five symptoms and receive a probable diagnosis along with educational insights about the condition.",
  image: "https://images.pexels.com/photos/3873172/pexels-photo-3873172.jpeg?auto=compress&cs=tinysrgb&w=800", // Replace with your own screenshot if available
  technologies: ["Python", "Streamlit", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
  features: [
    "🔍 Predicts diseases based on selected symptoms using Naive Bayes",
    "🖥️ Clean, interactive Streamlit interface",
    "🩺 Supports selection of up to 5 symptoms",
    "📊 Displays diagnosis and relevant health information",
    "📁 Uses Kaggle datasets for training and testing",
    "💡 Encourages early detection and health awareness"
  ],
  challenges: "Handling imbalanced data and ensuring meaningful predictions across diverse symptom combinations, while maintaining a simple, accessible interface for non-technical users.",
  outcome: "Created an educational health tool to support early diagnosis. Helped users understand disease patterns based on symptoms, while promoting proactive healthcare decisions.",
  duration: "1 month",
  team: "Solo project",
  githubUrl: "https://github.com/nishivardhan/Health-Diagnosis-Assistant",
  liveUrl: "healthdiagnosis.azurewebsites.net" // Replace with actual deployed link if hosted
  },
  {
  id: 3,
  title: "Player Performance Dashboard - IPL Cricket Analytics",
  shortDescription: "An interactive dashboard analyzing IPL player statistics using Python, delivering actionable insights through advanced visualizations.",
  fullDescription: "The Player Performance Dashboard is a data-driven web application focused on analyzing and visualizing IPL cricket player statistics. Built using Python and libraries like Pandas, Plotly, and Matplotlib, the project transforms raw performance data into interactive dashboards for coaches, analysts, and fans. It tracks metrics such as runs, strike rate, and batting average across multiple seasons. The dashboard emphasizes usability and visual appeal, enabling users to uncover trends, compare players, and make data-backed decisions. The project includes data cleaning, exploratory analysis, and insightful visual storytelling, making sports analytics more accessible and powerful.",
  image: "/images/Playerperformance.png", // Replace with your actual project screenshot if available
  technologies: ["Python", "Pandas", "Plotly", "Matplotlib", "Seaborn", "NumPy"],
  features: [
    "📊 Visualizes key IPL metrics: runs, averages, strike rate, etc.",
    "📆 Year-wise trend analysis and player comparison",
    "📈 Interactive charts using Plotly with tooltips and filters",
    "🧹 Data cleaning for missing values and outliers",
    "📊 Correlation heatmaps and scatter plots for performance drivers",
    "📋 Insightful dashboards for decision-makers and enthusiasts"
  ],
  challenges: "Managing inconsistent records and skewed data across different IPL seasons while ensuring the visualizations remained clear, interactive, and accurate.",
  outcome: "Developed an intuitive dashboard that simplifies IPL performance analysis, enhancing accessibility and understanding for various user groups including coaches, fans, and analysts.",
  duration: "2 months",
  team: "Solo project",
  githubUrl: "https://github.com/nishivardhan/Player-Performance-Dashboard",
  liveUrl: "player-performance-dashboard-cpb3b4htgwbmc2cr.southindia-01.azurewebsites.net" // Replace with your actual deployed link if available
},
{
  id: 4,
  title: "Emotion-Adaptive Voice Assistant",
  shortDescription: "A real-time voice assistant that adapts responses based on detected emotion, using Whisper, Groq API, and Gradio.",
  fullDescription: "This project is a voice assistant that transcribes speech, infers emotion, and generates adaptive responses in real time. It leverages Whisper for transcription, Groq API (LLaMA 3) for emotion-aware response generation, and Gradio for the interactive UI. The assistant dynamically adjusts its UI and voice output based on the user's detected mood, providing a more engaging and empathetic experience. Deployed on Hugging Face Spaces for easy access.",
  image: "/images/Emotive.png", // Replace with your actual project screenshot if available
  technologies: [
    "Python",
    "Whisper",
    "Groq API (LLaMA 3)",
    "Gradio",
    "gTTS",
    "Hugging Face Spaces"
  ],
  features: [
    "Real-time voice transcription",
    "Emotion-aware response generation",
    "Dynamic UI based on detected mood",
    "Voice output via text-to-speech",
    "Deployed on Hugging Face Spaces"
  ],
  challenges: "Synchronizing real-time audio transcription with emotion inference and ensuring low-latency UI/voice responses. Prompt tuning Groq’s LLaMA 3 to detect nuanced emotional cues.",
  outcome: "Built a novel assistant that demonstrates emotion-adaptive AI, showcased at hackathons and shared with the open-source community.",
  duration: "2 months",
  team: "Solo Developer (Nishivardhan Reddy)",
  githubUrl: "https://github.com/nishivardhanreddy/emotion-voice-assistant", // Replace if different
  liveUrl: "https://huggingface.co/spaces/your-username/emotion-assistant" // Replace with actual URL
},
{
  id: 5,
  title: "Crypto Price Prediction",
  shortDescription: "A Streamlit app that predicts next-day cryptocurrency prices using machine learning, visualizes live market data, and analyzes market trends.",
  fullDescription: "This project is a Streamlit-based dashboard that predicts the next day's cryptocurrency prices using a Random Forest model. It fetches live market data from the Binance API, visualizes price trends and technical indicators, and provides a dashboard of top gainers and losers. The app is designed for both casual traders and data enthusiasts, offering interactive charts and market risk analysis.",
  image: "/images/Crypto price.png",
  technologies: [
    "Python",
    "Streamlit",
    "Scikit-learn",
    "Binance API",
    "TA-Lib",
    "Pandas",
    "Plotly"
  ],
  features: [
    "Next-day price prediction using Random Forest",
    "Live crypto price charts and indicators",
    "Market risk analysis",
    "Top gainers/losers dashboard",
    "Streamlit interactive UI"
  ],
  challenges: "Integrating live market data with ML predictions in real time, handling API rate limits from Binance, and visualizing multiple indicators meaningfully on an interactive dashboard.",
  outcome: "Deployed a working prototype that helps users explore crypto trends and prediction models, with positive feedback from early testers.",
  duration: "3 weeks",
  team: "Solo Developer (Nishivardhan Reddy)",
  githubUrl: "https://github.com/nishivardhanreddy/crypto-price-prediction", // Replace if different
  liveUrl: "https://your-streamlit-link.com" // Replace with actual URL
}



];

type ViewMode = 'portfolio' | 'blog' | 'blog-post' | 'blog-writer' | 'contact-messages';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('portfolio');
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPostType | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPostType | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [adminKeySequence, setAdminKeySequence] = useState('');

  const { posts, loading, createPost, updatePost, deletePost } = useBlogPosts();
  const { user, loading: authLoading, isAuthenticated, signOut } = useAuth();

  // Listen for admin key sequence (Ctrl+Shift+A)
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setShowAdminAuth(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const handleBlogCardClick = (post: BlogPostType) => {
    setSelectedBlogPost(post);
    setViewMode('blog-post');
  };

  const handleBackToBlog = () => {
    setSelectedBlogPost(null);
    setEditingPost(null);
    setViewMode('blog');
  };

  const handleBackToPortfolio = () => {
    setViewMode('portfolio');
    setSelectedBlogPost(null);
    setEditingPost(null);
  };

  const handleWriteNewPost = () => {
    if (!isAuthenticated) {
      setShowAdminAuth(true);
      return;
    }
    setEditingPost(null);
    setViewMode('blog-writer');
  };

  const handleEditPost = (post: BlogPostType) => {
    if (!isAuthenticated) {
      setShowAdminAuth(true);
      return;
    }
    setEditingPost(post);
    setViewMode('blog-writer');
  };

  const handleDeletePost = async (post: BlogPostType) => {
    if (!isAuthenticated) {
      setShowAdminAuth(true);
      return;
    }
    if (window.confirm('Are you sure you want to delete this article?')) {
      await deletePost(post.id);
    }
  };

  const handleSavePost = async (postData: Omit<BlogPostType, 'id'>) => {
    try {
      if (editingPost) {
        await updatePost(editingPost.id, postData);
      } else {
        await createPost(postData);
      }
      setViewMode('blog');
      setEditingPost(null);
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const handleAdminAccess = (feature: string) => {
    if (!isAuthenticated) {
      setShowAdminAuth(true);
      return;
    }
    
    if (feature === 'blog') {
      setViewMode('blog');
    } else if (feature === 'messages') {
      setViewMode('contact-messages');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setViewMode('portfolio');
    toast.success('Signed out successfully');
  };

  const handleAuthSuccess = () => {
    setShowAdminAuth(false);
    toast.success('Welcome back, Nishivardhan!');
  };

  // Contact Messages Admin View
  if (viewMode === 'contact-messages') {
    return (
      <>
        <Toaster position="top-right" />
        <ContactMessagesAdmin onBack={handleBackToPortfolio} />
      </>
    );
  }

  // Blog View
  if (viewMode === 'blog') {
    return (
      <div className="min-h-screen bg-stone-50">
        <Toaster position="top-right" />
        
        {/* Blog Header */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <button 
                    onClick={handleBackToPortfolio}
                    className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    <ChevronRight size={16} className="rotate-180" />
                    <span className="font-medium">Back to Portfolio</span>
                  </button>
                  {isAuthenticated && (
                    <>
                      <div className="h-4 w-px bg-stone-300"></div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-stone-600 hover:text-red-600 transition-colors text-sm"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </>
                  )}
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-4">
                  Blog
                </h1>
                <p className="text-lg sm:text-xl text-stone-600 max-w-2xl">
                  Insights on data analytics, business intelligence, and turning data into actionable business strategies. 
                  Sharing knowledge from my journey as a data analyst.
                </p>
              </div>
              <button
                onClick={handleWriteNewPost}
                className="flex items-center gap-2 bg-teal-700 text-white px-4 sm:px-6 py-3 rounded-sm hover:bg-teal-800 transition-colors whitespace-nowrap"
              >
                <Plus size={20} />
                <span className="font-medium">Write Article</span>
              </button>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              /* Blog Posts Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                {posts.map((post) => (
                  <div key={post.id} className="relative group">
                    <BlogCard 
                      post={post} 
                      onClick={() => handleBlogCardClick(post)} 
                    />
                    {isAuthenticated && (
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditPost(post);
                          }}
                          className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-colors"
                        >
                          <Edit3 size={16} className="text-stone-600" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(post);
                          }}
                          className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-colors"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!loading && posts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-stone-600 text-lg mb-6">No articles published yet.</p>
                <button
                  onClick={handleWriteNewPost}
                  className="bg-teal-700 text-white px-6 py-3 rounded-sm hover:bg-teal-800 transition-colors"
                >
                  Write Your First Article
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Blog Post View
  if (viewMode === 'blog-post' && selectedBlogPost) {
    return (
      <>
        <Toaster position="top-right" />
        <BlogPost post={selectedBlogPost} onBack={handleBackToBlog} />
      </>
    );
  }

  // Blog Writer View
  if (viewMode === 'blog-writer') {
    return (
      <>
        <Toaster position="top-right" />
        <BlogWriter 
          onBack={handleBackToBlog} 
          onSave={handleSavePost}
          editingPost={editingPost}
          loading={loading}
        />
      </>
    );
  }

  // Portfolio View (default)
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Admin Status Indicator - Only show when authenticated */}
          {isAuthenticated && (
            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-teal-700 bg-teal-50 px-4 py-2 rounded-full">
                <Settings size={16} />
                <span>Admin Mode Active</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAdminAccess('blog')}
                  className="flex items-center gap-2 text-stone-600 hover:text-teal-700 transition-colors text-sm"
                >
                  <Edit3 size={16} />
                  Manage Blog
                </button>
                <button
                  onClick={() => handleAdminAccess('messages')}
                  className="flex items-center gap-2 text-stone-600 hover:text-teal-700 transition-colors text-sm"
                >
                  <MessageCircle size={16} />
                  View Messages
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-stone-600 hover:text-red-600 transition-colors text-sm"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
          
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 text-stone-900 leading-tight">
            Nishivardhan Reddy
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-stone-700 mb-4 font-medium">
            AI & ML Enthusiast | Data Analyst | Curious Builder
          </p>
          <p className="text-base sm:text-lg md:text-xl text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transforming ideas into smart products with code, data, and curiosity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
              href="NishivardhanReddy_Resume.pdf" // Replace with your actual file path or URL
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"> 
            <button className="w-full sm:w-auto bg-stone-900 text-stone-50 px-6 sm:px-8 py-4 rounded-sm hover:bg-stone-800 transition-colors duration-300 flex items-center justify-center gap-2 font-medium">
              <FileText size={20} />
              View Resume
            </button></a>
            <button 
              onClick={() => setShowContactForm(true)}
              className="w-full sm:w-auto border-2 border-stone-900 text-stone-900 px-6 sm:px-8 py-4 rounded-sm hover:bg-stone-900 hover:text-stone-50 transition-colors duration-300 flex items-center justify-center gap-2 font-medium"
            >
              <Mail size={20} />
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-stone-900">
            About Me
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Professional Headshot */}
            <div className="lg:col-span-1 flex justify-center lg:justify-start">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden bg-stone-200 shadow-lg">
                <img 
                  src="/images/Profilepic.jpg" 
                  alt="Nishivardhan Reddy - Professional Headshot"
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
            </div>
            
            {/* About Text */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <p className="text-stone-700 leading-relaxed mb-6 sm:mb-8 text-lg sm:text-xl font-light">
                  Hey, I’m Nishi Vardhan Reddy — a final-year B.Tech student in Computer Science (Machine Learning & Data Science) at LPU.
                   I’m a curious and driven technologist passionate about building intelligent, data-driven products that solve real-world problems.
                </p>
                <p className="text-stone-700 leading-relaxed mb-6 sm:mb-8 text-lg sm:text-xl font-light">
                  I specialize in machine learning, AI, and data analytics, and I love turning complex ideas into clean, functional applications. 
                  From analyzing player stats to managing home warranties, my projects are built with purpose and precision.
                </p>
                <p className="text-stone-700 leading-relaxed text-lg sm:text-xl font-light">
                  My latest project, TrackMyWarranty, is a cross-platform app that helps users manage product warranties, inventory, and maintenance with smart reminders and an intuitive design. 
                  Built using React Native and Supabase, the app was developed with the help of AI-powered tools for faster prototyping, debugging, and content generation — blending automation with human creativity.
                </p>
                <p className="text-stone-700 leading-relaxed mt-6 sm:mt-8 text-lg sm:text-xl font-light">I'm actively looking for opportunities where I can apply my skills in data science, AI, and software development to create meaningful impact.</p>           
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-stone-900">
            Education
          </h2>
          <div className="bg-stone-50 p-6 sm:p-8 lg:p-12 rounded-sm border border-stone-200">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="bg-teal-100 p-4 rounded-full flex-shrink-0">
                <GraduationCap size={32} className="text-teal-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-stone-900">
                  Bachelor of Technology in Computer Science Engineering
                </h3>
                <p className="text-lg sm:text-xl text-stone-700 mb-3 font-medium">
                  Lovely Professional University
                </p>
                <p className="text-base sm:text-lg text-stone-600 mb-6">
                  Expected Graduation: 2026
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-700">
                      <span className="font-medium">Relevant Coursework:</span> Data Structures & Algorithms, Statistics & Probability, Database Management Systems, Business Analytics
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-700">
                      <span className="font-medium">Key Projects:</span> TrackMyWarranty App,Health Diagnosis Assistant,Player Performance Dashboard
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-stone-700">
                      <span className="font-medium">Academic Focus:</span> Data Analytics, Data Science, Artificial Intelligence&Machine Learning
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-stone-900">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="group cursor-pointer relative overflow-hidden"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => openProjectModal(project)}
              >
                <div className="aspect-[4/3] bg-stone-200 mb-6 rounded-sm overflow-hidden relative">
                  <img 
                    src={project.image}
                    alt={`${project.title} thumbnail`}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-stone-900 bg-opacity-90 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="text-center text-white p-6">
                      <h4 className="font-serif text-xl font-bold mb-3">Quick Preview</h4>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-stone-300">
                          <Calendar size={14} className="inline mr-2" />
                          {project.duration}
                        </p>
                        <p className="text-sm text-stone-300">
                          <Users size={14} className="inline mr-2" />
                          {project.team}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-center mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span key={index} className="bg-teal-600 text-white px-2 py-1 rounded-full text-xs">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="bg-stone-600 text-white px-2 py-1 rounded-full text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-300 mb-4">Click to view full details</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-serif text-xl sm:text-2xl font-bold mb-3 text-stone-900 group-hover:text-teal-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-stone-600 mb-4 leading-relaxed text-sm sm:text-base">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-teal-700 group-hover:text-teal-800 transition-colors">
                  <span className="font-medium">View details</span>
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-stone-200 p-4 sm:p-6 flex justify-between items-center">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {selectedProject.title}
                </h3>
                <button 
                  onClick={closeProjectModal}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-stone-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6">
                {/* Project Image */}
                <div className="aspect-[16/9] bg-stone-200 mb-8 rounded-sm overflow-hidden">
                  <img 
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Project Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
                  <div className="md:col-span-2">
                    <h4 className="font-serif text-xl font-bold mb-4 text-stone-900">Project Overview</h4>
                    <p className="text-stone-700 leading-relaxed mb-6">
                      {selectedProject.fullDescription}
                    </p>

                    <h4 className="font-serif text-xl font-bold mb-4 text-stone-900">Key Features</h4>
                    <ul className="space-y-2 mb-6">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-stone-700">
                          <Star size={16} className="text-teal-600 mt-1 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-serif text-xl font-bold mb-4 text-stone-900">Challenges & Solutions</h4>
                    <p className="text-stone-700 leading-relaxed mb-6">
                      {selectedProject.challenges}
                    </p>

                    <h4 className="font-serif text-xl font-bold mb-4 text-stone-900">Outcome & Impact</h4>
                    <p className="text-stone-700 leading-relaxed">
                      {selectedProject.outcome}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif text-xl font-bold mb-4 text-stone-900">Project Details</h4>
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-sm font-medium text-stone-500 mb-1">Duration</p>
                        <p className="text-stone-700">{selectedProject.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-stone-500 mb-1">Team</p>
                        <p className="text-stone-700">{selectedProject.team}</p>
                      </div>
                    </div>

                    <h4 className="font-serif text-lg font-bold mb-4 text-stone-900">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Links */}
                    <div className="space-y-3">
                      {selectedProject.githubUrl && (
                        <a 
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-teal-700 hover:text-teal-800 transition-colors"
                        >
                          <Github size={16} />
                          <span className="font-medium">View Code</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a 
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-teal-700 hover:text-teal-800 transition-colors"
                        >
                          <ExternalLink size={16} />
                          <span className="font-medium">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-stone-900">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-6 text-stone-900">Data Analysis</h3>
              <div className="flex flex-wrap gap-3">
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Python</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">R</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">SQL</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Excel</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">SPSS</span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-6 text-stone-900">Data Visualization</h3>
              <div className="flex flex-wrap gap-3">
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Tableau</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Power BI</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Matplotlib</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Seaborn</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Plotly</span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-6 text-stone-900">Machine Learning</h3>
              <div className="flex flex-wrap gap-3">
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Scikit-learn</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Pandas</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">NumPy</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">TensorFlow</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Keras</span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-6 text-stone-900">Business Intelligence</h3>
              <div className="flex flex-wrap gap-3">
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Google Analytics</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">SQL Server</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">MongoDB</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Jupyter</span>
                <span className="bg-stone-200 text-stone-800 px-4 py-2 rounded-full font-medium">Git</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-stone-900">
            Experience & Certifications
          </h2>
          <div className="space-y-8 sm:space-y-12">
            <div className="border-l-2 border-teal-200 pl-6 sm:pl-8">
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2 text-stone-900">Complete Machine Learning & Data Science Program</h3>
              <p className="text-teal-700 font-medium mb-4">Professional Certificate • 2024</p>
              <p className="text-stone-600 leading-relaxed">
                Completed a 6-month live certification covering Python, data analytics, machine learning, deep learning, NLP, and image processing. Gained hands-on experience through 40+ projects and 20+ industry tools like Pandas, NumPy, Scikit-learn, TensorFlow, and more. Included live mentoring from industry experts.
              </p>
            </div>
            <div className="border-l-2 border-teal-200 pl-6 sm:pl-8">
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2 text-stone-900">Generative AI: Introduction and Applications</h3>
              <p className="text-teal-700 font-medium mb-4">2025</p>
              <p className="text-stone-600 leading-relaxed">
                Completed a certification course exploring the fundamentals, evolution, and real-world applications of generative AI across text, image, audio, video, code, and virtual domains. Gained hands-on experience with tools like ChatGPT, DALL·E, Stable Diffusion, and Synthesia through IBM Generative AI Classroom and lab sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-6">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
              Latest Articles
            </h2>
            <button
              onClick={() => setViewMode('blog')}
              className="flex items-center gap-2 text-teal-700 hover:text-teal-800 transition-colors"
            >
              <span className="font-medium">View All Articles</span>
              <ChevronRight size={16} />
            </button>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {posts.slice(0, 3).map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  onClick={() => handleBlogCardClick(post)} 
                />
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-600 mb-6">No articles published yet.</p>
              <button
                onClick={() => setViewMode('blog')}
                className="text-teal-700 hover:text-teal-800 transition-colors font-medium"
              >
                Start writing your first article →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-stone-900 text-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
            Let's Work Together
          </h2>
          <p className="text-lg sm:text-xl text-stone-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always interested in hearing about new data challenges and business opportunities. 
            Let's connect and turn your data into actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 mb-16">
            <a href="mailto:nishivardhanreddy99@gmail.com" className="flex items-center justify-center gap-3 text-stone-300 hover:text-teal-400 transition-colors group">
              <Mail size={24} />
              <span className="font-medium group-hover:underline">nishivardhanreddy99@gmail.com</span>
            </a>
            <a href="https://linkedin.com/in/nishivardhan/" className="flex items-center justify-center gap-3 text-stone-300 hover:text-teal-400 transition-colors group">
              <Linkedin size={24} />
              <span className="font-medium group-hover:underline">LinkedIn</span>
            </a>
            <a href="https://github.com/nishivardhanreddy" className="flex items-center justify-center gap-3 text-stone-300 hover:text-teal-400 transition-colors group">
              <Github size={24} />
              <span className="font-medium group-hover:underline">GitHub</span>
            </a>
          </div>
          <div className="border-t border-stone-800 pt-8">
            <p className="text-stone-400 font-light">
              © 2024 Nishivardhan Reddy. Designed with care and attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}

      {/* Admin Auth Modal */}
      {showAdminAuth && (
        <AdminAuth onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;