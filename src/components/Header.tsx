'use client';

import React, { useState } from 'react';
import { Search, Menu, Sun, Moon, LogOut, Star, User } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/lib/auth';
import toast from 'react-hot-toast';
import FavoritesModal from './FavoritesModal';
import PromptModal from './PromptModal';
import { Prompt, VibePrompt } from '@/types';

export default function Header() {
  const { 
    darkMode, 
    toggleDarkMode, 
    sidebarOpen, 
    setSidebarOpen,
    searchFilters,
    setSearchFilters,
    favorites,
  } = useAppStore();

  const { user } = useAuth();
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<((Prompt | VibePrompt) & { type: 'prompt' | 'vibe' }) | null>(null);

  // Obter o nome do usuário do metadata
  const getUserName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuário';
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilters({ query: e.target.value });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Uloskirjautuminen onnistui!');
    } catch {
      toast.error('Virhe uloskirjautumisessa');
    }
  };

  const handleFavoritesClick = () => {
    setShowFavoritesModal(true);
  };

  const handlePromptSelect = (prompt: (Prompt | VibePrompt) & { type: 'prompt' | 'vibe' }) => {
    setSelectedPrompt(prompt);
    setShowPromptModal(true);
  };

  return (
    <header className={`sticky top-0 z-30 lg:z-50 border-b transition-colors ${
      darkMode 
        ? 'bg-gray-900/95 border-gray-800 backdrop-blur-md' 
        : 'bg-white/95 border-gray-200 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-0 lg:pr-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo + Mobile Menu */}
          <div className="flex items-center space-x-4 lg:space-x-0">
            {/* Mobile Menu Button - Only visible on mobile */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              title="Valikko"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <div className="flex items-center lg:pl-6">
              <h1 className={`text-xl lg:text-2xl font-bold font-sans ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="hidden lg:inline">Prompt-Kirjasto Pro</span>
                <span className="lg:hidden">PK Pro</span>
              </h1>
            </div>
          </div>

          {/* Center - Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                value={searchFilters.query}
                onChange={handleSearch}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Hae prompteja..."
              />
            </div>
          </div>

          {/* Right Side - User Info + Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* User Name (Desktop only) */}
            {user && (
              <div className={`hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg ${
                darkMode 
                  ? 'bg-gray-800 text-gray-300' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{getUserName()}</span>
              </div>
            )}

            {/* Favorites Count (Desktop) */}
            <button
              onClick={handleFavoritesClick}
              className={`hidden sm:flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
              title="Näytä suosikit"
            >
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{favorites.length}</span>
            </button>

            {/* Favorites Button (Mobile) */}
            <button
              onClick={handleFavoritesClick}
              className={`sm:hidden p-2 rounded-lg transition-colors relative ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              title="Näytä suosikit"
            >
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              {favorites.length > 0 && (
                <span className={`absolute -top-1 -right-1 h-5 w-5 text-xs font-bold rounded-full flex items-center justify-center ${
                  darkMode 
                    ? 'bg-yellow-500 text-gray-900' 
                    : 'bg-yellow-500 text-white'
                }`}>
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              title="Vaihda tumma tila"
            >
              {darkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-red-900/20 text-gray-300 hover:text-red-400' 
                  : 'hover:bg-red-50 text-gray-600 hover:text-red-600'
              }`}
              title="Kirjaudu ulos"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              value={searchFilters.query}
              onChange={handleSearch}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Hae prompteja..."
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <FavoritesModal
        isOpen={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
        darkMode={darkMode}
        onPromptSelect={handlePromptSelect}
      />

      <PromptModal
        isOpen={showPromptModal}
        onClose={() => {
          setShowPromptModal(false);
          setSelectedPrompt(null);
        }}
        prompt={selectedPrompt}
        darkMode={darkMode}
      />
    </header>
  );
} 