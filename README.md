# Alex Chen - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a blog system, contact form, and admin panel for content management.

## 🚀 Features

- **Responsive Design** - Optimized for all devices
- **Blog System** - Create, edit, and manage blog posts
- **Contact Form** - Visitors can send messages
- **Admin Panel** - Secure authentication for content management
- **Modern Stack** - React 18, TypeScript, Tailwind CSS
- **Database** - Supabase for data storage
- **Deployment** - Automated GitHub Pages deployment

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Deployment**: GitHub Pages
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages.

### Setup GitHub Pages:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. Add your Supabase credentials to repository secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Manual Deployment:

```bash
npm run build
npm run deploy
```

## 🔐 Admin Access

To access admin features:
1. Press `Ctrl + Shift + A` to open admin login
2. Create an admin account or sign in
3. Manage blog posts and view contact messages

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- Email: alex@example.com
- LinkedIn: [Alex Chen](https://linkedin.com/in/alexchen)
- GitHub: [alexchen](https://github.com/alexchen)