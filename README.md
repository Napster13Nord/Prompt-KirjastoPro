# 🚀 Prompt-Kirjasto Pro

**A modern, professional Finnish AI prompt directory and management platform**

Prompt-Kirjasto Pro is an advanced platform for discovering, managing, and utilizing AI prompts efficiently. Built with modern technologies and featuring an elegant interface optimized for Finnish users.

## ✨ Features

* 🔍 **Smart Search** - Advanced semantic search with real-time filtering
* 🏷️ **Auto Categorization** - Intelligent organization by categories
* ⭐ **Favorites System** - Save and organize your preferred prompts
* 🎨 **Inline Editing** - Customize prompts directly in the interface
* 🌙 **Dark/Light Mode** - Dark and light themes with persistence
* 📱 **Responsive Design** - Works perfectly on all devices
* 🎯 **Advanced Filters** - Filter by category, platform, user type
* 🚀 **Optimized Performance** - Fast loading and smooth animations
* 🔐 **User Authentication** - Secure login with Supabase
* 🇫🇮 **Finnish Language** - Fully localized for Finnish users

## 🛠️ Tech Stack

* **Frontend**: Next.js 14 (App Router), React 18, TypeScript
* **Styling**: Tailwind CSS 4 with custom components
* **State Management**: Zustand with persistence
* **Authentication**: Supabase Auth
* **Database**: Supabase PostgreSQL
* **UI Components**: Lucide React Icons
* **Notifications**: React Hot Toast
* **Animations**: Custom CSS transitions
* **Deploy**: Vercel Ready

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn
* Supabase account (for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Napster13Nord/Prompt-KirjastoPro.git
cd Prompt-KirjastoPro
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the project:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
prompt-kirjasto-pro/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main page
│   ├── components/         # React Components
│   │   ├── Header.tsx      # Application header
│   │   ├── FilterSidebar.tsx # Filter sidebar
│   │   ├── PromptCard.tsx  # Individual prompt cards
│   │   ├── PromptModal.tsx # Prompt detail modal
│   │   ├── FavoritesModal.tsx # Favorites modal
│   │   └── AuthModal.tsx   # Authentication modal
│   ├── store/              # State Management
│   │   └── useAppStore.ts  # Main Zustand store
│   ├── lib/                # Utilities
│   │   ├── supabase.ts     # Supabase client
│   │   ├── auth.ts         # Authentication helpers
│   │   └── csvParser.ts    # CSV data parser
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts      # Authentication hook
│   │   └── useHydration.ts # Hydration hook
│   ├── types/              # TypeScript definitions
│   │   └── index.ts        # Main types
│   └── data/               # Static data (development)
├── public/
│   └── data/               # Public CSV files
└── ...
```

## 🎯 Key Features Overview

### 🔍 Search and Filters
* Real-time search with fuzzy matching
* Filter by category, AI platform, developer focus
* Sort by relevance, name, date
* Advanced filtering sidebar

### 📝 Prompt Management
* View traditional and "vibe prompts"
* Inline editing with real-time preview
* Quick clipboard copy functionality
* Tag system and categorization

### ⭐ Favorites System
* One-click favorite addition
* Beautiful favorites modal
* Persistent local storage
* Visual counters and indicators

### 🎨 Modern Interface
* Glassmorphism design elements
* Smooth animations and transitions
* Dark/light theme with persistence
* Fully responsive layout
* Custom scrollbars
* Gradient accents

### 🔐 Authentication
* Secure Supabase authentication
* User registration with name field
* Finnish error messages
* Access code validation
* Email confirmation system

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables in dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Automatic deployment on every push

### Other Providers

The project is compatible with any provider supporting Next.js:
* Netlify
* Railway
* AWS Amplify
* DigitalOcean App Platform

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

* Use TypeScript for all new code
* Follow the existing code style
* Add proper error handling
* Test on both desktop and mobile
* Ensure Finnish translations are accurate

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

* Inspired by the excellent work of prompts.chat
* Prompt data based on awesome-chatgpt-prompts repository
* Finnish AI community for feedback and suggestions
* Modern web development community for best practices

## 📞 Support

If you encounter any issues or have suggestions:

* 🐛 [Report bugs](https://github.com/Napster13Nord/Prompt-KirjastoPro/issues)
* 💡 [Suggest features](https://github.com/Napster13Nord/Prompt-KirjastoPro/issues)
* 📧 Contact: [Your Email]

## 🔄 Recent Updates

* ✨ Modern glassmorphism UI design
* 📱 Improved mobile experience
* ⭐ Enhanced favorites system with modal
* 🔐 Supabase authentication integration
* 🎨 Custom scrollbars and animations
* 🇫🇮 Complete Finnish localization

---

**Made with ❤️ for the Finnish AI community**

## 📸 Screenshots

*Add screenshots of your application here*

## 🚀 Live Demo

[View Live Demo](https://your-demo-url.vercel.app) (Coming Soon)
