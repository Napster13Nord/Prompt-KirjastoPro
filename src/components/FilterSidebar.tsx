'use client';

import React, { useState } from 'react';
import { Code, Users, Briefcase, Palette, Heart, GraduationCap, Gamepad2, Wrench, X, Star, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Prompt, VibePrompt } from '@/types';
import PromptModal from './PromptModal';

const categories = [
  { id: '', label: 'Kaikki kategoriat', icon: Users, count: 0 },
  { id: 'Development', label: 'Kehitys', icon: Code, count: 0 },
  { id: 'Business', label: 'Liiketoiminta', icon: Briefcase, count: 0 },
  { id: 'Writing', label: 'Kirjoittaminen', icon: Palette, count: 0 },
  { id: 'Education', label: 'Koulutus', icon: GraduationCap, count: 0 },
  { id: 'Creative', label: 'Luova', icon: Palette, count: 0 },
  { id: 'Health', label: 'Terveys', icon: Heart, count: 0 },
  { id: 'Entertainment', label: 'Viihde', icon: Gamepad2, count: 0 },
  { id: 'Tools', label: 'Työkalut', icon: Wrench, count: 0 },
  { id: 'Games', label: 'Pelit', icon: Gamepad2, count: 0 },
];

const platforms = [
  { id: '', label: 'Kaikki alustat' },
  { id: 'ChatGPT', label: 'ChatGPT' },
  { id: 'Claude', label: 'Claude' },
  { id: 'Gemini', label: 'Gemini' },
  { id: 'GPT-4', label: 'GPT-4' },
  { id: 'Universal', label: 'Universaali' },
];

const sortOptions = [
  { id: 'relevance', label: 'Relevanssi' },
  { id: 'name', label: 'Nimi' },
  { id: 'newest', label: 'Uusin' },
  { id: 'oldest', label: 'Vanhin' },
];

export default function FilterSidebar() {
  const { 
    darkMode, 
    searchFilters, 
    setSearchFilters,
    prompts,
    vibePrompts,
    favorites,
    sidebarOpen,
    setSidebarOpen
  } = useAppStore();

  const [selectedPrompt, setSelectedPrompt] = useState<((Prompt | VibePrompt) & { type: 'prompt' | 'vibe' }) | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Calculate category counts
  const allPrompts = [
    ...prompts.map(p => ({ ...p, type: 'prompt' as const })),
    ...vibePrompts.map(p => ({ ...p, type: 'vibe' as const }))
  ];

  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.id === '' 
      ? allPrompts.length 
      : allPrompts.filter(p => p.category === cat.id).length
  }));

  const handleCategoryChange = (categoryId: string) => {
    setSearchFilters({ category: categoryId });
  };

  const handleForDevsChange = (value: boolean | null) => {
    setSearchFilters({ forDevs: value });
  };

  const handlePlatformChange = (platformId: string) => {
    setSearchFilters({ platform: platformId });
  };

  const handleSortChange = (sortBy: string) => {
    setSearchFilters({ sortBy: sortBy as 'relevance' | 'name' | 'newest' | 'oldest' });
  };

  const clearFilters = () => {
    setSearchFilters({
      query: '',
      category: '',
      forDevs: null,
      platform: '',
      sortBy: 'relevance',
    });
  };

  const handleFavoriteClick = (prompt: (Prompt | VibePrompt) & { type: 'prompt' | 'vibe' }) => {
    setSelectedPrompt(prompt);
    setShowModal(true);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-out ${
          sidebarOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: sidebarOpen ? 'blur(4px)' : 'blur(0px)',
        }}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative lg:translate-x-0 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        w-80 h-screen lg:h-full overflow-hidden border-r z-50 
        transition-all duration-300 ease-out flex flex-col
        ${darkMode 
          ? 'bg-gray-900/95 border-gray-700 backdrop-blur-xl' 
          : 'bg-white/95 border-gray-200 backdrop-blur-xl'
        }
        shadow-2xl lg:shadow-none
      `}>
        {/* Header */}
        <div className={`flex-shrink-0 p-4 lg:p-6 border-b ${
          darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-8 rounded-full ${
                darkMode ? 'bg-gradient-to-b from-blue-400 to-purple-500' : 'bg-gradient-to-b from-blue-500 to-purple-600'
              }`} />
              <h2 className={`text-lg lg:text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Suodattimet
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearFilters}
                className={`text-xs lg:text-sm px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/80 border border-gray-700/50' 
                    : 'text-gray-600 hover:text-gray-900 bg-gray-100/50 hover:bg-gray-200/80 border border-gray-200/50'
                }`}
              >
                Tyhjennä
              </button>
              {/* Mobile Close Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className={`lg:hidden p-2 rounded-xl transition-all duration-200 ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800/80 hover:scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 hover:scale-105'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div 
          className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 min-h-0 sidebar-scroll"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: darkMode ? '#374151 transparent' : '#d1d5db transparent'
          }}
        >

          {/* Categories */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 flex items-center space-x-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <Users className="h-4 w-4" />
              <span>Kategoriat</span>
            </h3>
            <div className="space-y-2">
              {categoriesWithCounts.map((category) => {
                const Icon = category.icon;
                const isSelected = searchFilters.category === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      handleCategoryChange(category.id);
                      // Close sidebar on mobile after selection
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                      isSelected
                        ? darkMode 
                          ? 'bg-gradient-to-r from-blue-900/80 to-purple-900/60 text-blue-200 border border-blue-700/50 shadow-lg' 
                          : 'bg-gradient-to-r from-blue-100/80 to-purple-100/60 text-blue-800 border border-blue-200/50 shadow-lg'
                        : darkMode 
                          ? 'hover:bg-gray-800/60 text-gray-300 hover:text-white border border-transparent hover:border-gray-700/50 hover:shadow-md' 
                          : 'hover:bg-gray-50/80 text-gray-700 hover:text-gray-900 border border-transparent hover:border-gray-200/50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                        isSelected
                          ? darkMode 
                            ? 'bg-blue-800/50 text-blue-300' 
                            : 'bg-blue-200/50 text-blue-700'
                          : darkMode 
                            ? 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50 group-hover:text-gray-300' 
                            : 'bg-gray-100/50 text-gray-500 group-hover:bg-gray-200/50 group-hover:text-gray-600'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{category.label}</span>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all duration-200 ${
                      isSelected
                        ? darkMode 
                          ? 'bg-blue-800/50 text-blue-200' 
                          : 'bg-blue-200/50 text-blue-700'
                        : darkMode 
                          ? 'bg-gray-700/50 text-gray-300 group-hover:bg-gray-600/50' 
                          : 'bg-gray-100/50 text-gray-600 group-hover:bg-gray-200/50'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Favorites */}
          {favorites.length > 0 && (
            <div>
              <h3 className={`text-sm font-semibold mb-3 flex items-center space-x-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>Suosikit</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {favorites.length}
                </span>
              </h3>
              <div className="space-y-2">
                {favorites.slice(0, 5).map((favoriteId) => {
                  // Find the prompt by ID
                  const allPrompts = [
                    ...prompts.map(p => ({ ...p, type: 'prompt' as const })),
                    ...vibePrompts.map(p => ({ ...p, type: 'vibe' as const }))
                  ];
                  const prompt = allPrompts.find(p => p.id === favoriteId);
                  
                  if (!prompt) return null;
                  
                  return (
                    <button
                      key={favoriteId}
                      onClick={() => handleFavoriteClick(prompt)}
                      className={`w-full p-3 rounded-xl text-left transition-all duration-200 group border ${
                        darkMode 
                          ? 'bg-gray-800/40 text-gray-300 hover:bg-gray-700/60 border-gray-700/30 hover:border-yellow-500/30 hover:shadow-md' 
                          : 'bg-gray-50/60 text-gray-700 hover:bg-gray-100/80 border-gray-200/30 hover:border-yellow-400/30 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-1.5 rounded-lg flex-shrink-0 transition-all duration-200 ${
                          darkMode 
                            ? 'bg-yellow-900/30 text-yellow-400 group-hover:bg-yellow-800/40' 
                            : 'bg-yellow-100/60 text-yellow-600 group-hover:bg-yellow-200/60'
                        }`}>
                          <Star className="h-3 w-3 fill-current" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm truncate mb-1">
                            {'act' in prompt ? prompt.act : prompt.app}
                          </div>
                          <div className={`text-xs truncate leading-relaxed ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {prompt.prompt.slice(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
                {favorites.length > 5 && (
                  <div className={`text-xs text-center py-3 px-3 rounded-lg border-2 border-dashed transition-colors ${
                    darkMode 
                      ? 'text-gray-400 border-gray-700/50 hover:border-gray-600/50' 
                      : 'text-gray-500 border-gray-300/50 hover:border-gray-400/50'
                  }`}>
                    <span className="font-medium">+{favorites.length - 5} lisää suosikkia</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Developer Focus */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 flex items-center space-x-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <Code className="h-4 w-4" />
              <span>Kehittäjäfokus</span>
            </h3>
            <div className="space-y-2">
              {[
                { value: null, label: 'Kaikki promptit', icon: Users },
                { value: true, label: 'Vain kehittäjille', icon: Code },
                { value: false, label: 'Yleiskäyttö', icon: Heart }
              ].map(({ value, label, icon: OptionIcon }) => {
                const isSelected = searchFilters.forDevs === value;
                return (
                  <label 
                    key={String(value)}
                    className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 border group ${
                      isSelected
                        ? darkMode 
                          ? 'bg-gradient-to-r from-green-900/60 to-blue-900/40 text-green-200 border-green-700/50 shadow-lg' 
                          : 'bg-gradient-to-r from-green-100/60 to-blue-100/40 text-green-800 border-green-200/50 shadow-lg'
                        : darkMode 
                          ? 'hover:bg-gray-800/60 text-gray-300 hover:text-white border-transparent hover:border-gray-700/50 hover:shadow-md' 
                          : 'hover:bg-gray-50/80 text-gray-700 hover:text-gray-900 border-transparent hover:border-gray-200/50 hover:shadow-md'
                    }`}
                  >
                    <input
                      type="radio"
                      name="forDevs"
                      checked={isSelected}
                      onChange={() => {
                        handleForDevsChange(value);
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                      }}
                      className="sr-only"
                    />
                    <div className={`p-1.5 rounded-lg mr-3 transition-all duration-200 ${
                      isSelected
                        ? darkMode 
                          ? 'bg-green-800/50 text-green-300' 
                          : 'bg-green-200/50 text-green-700'
                        : darkMode 
                          ? 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50 group-hover:text-gray-300' 
                          : 'bg-gray-100/50 text-gray-500 group-hover:bg-gray-200/50 group-hover:text-gray-600'
                    }`}>
                      <OptionIcon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                    {isSelected && (
                      <div className={`ml-auto w-2 h-2 rounded-full ${
                        darkMode ? 'bg-green-400' : 'bg-green-600'
                      }`} />
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* AI Platforms */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 flex items-center space-x-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <Sparkles className="h-4 w-4" />
              <span>Tekoälyalustat</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((platform) => {
                const isSelected = searchFilters.platform === platform.id;
                return (
                  <button
                    key={platform.id}
                    onClick={() => {
                      handlePlatformChange(platform.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`p-3 rounded-xl text-left transition-all duration-200 border ${
                      isSelected
                        ? darkMode 
                          ? 'bg-gradient-to-r from-purple-900/60 to-pink-900/40 text-purple-200 border-purple-700/50 shadow-lg' 
                          : 'bg-gradient-to-r from-purple-100/60 to-pink-100/40 text-purple-800 border-purple-200/50 shadow-lg'
                        : darkMode 
                          ? 'hover:bg-gray-800/60 text-gray-300 hover:text-white border-transparent hover:border-gray-700/50 hover:shadow-md' 
                          : 'hover:bg-gray-50/80 text-gray-700 hover:text-gray-900 border-transparent hover:border-gray-200/50 hover:shadow-md'
                    }`}
                  >
                    <div className="text-xs font-semibold text-center">
                      {platform.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 flex items-center space-x-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <Wrench className="h-4 w-4" />
              <span>Järjestä</span>
            </h3>
            <div className="space-y-2">
              {sortOptions.map((option) => {
                const isSelected = searchFilters.sortBy === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      handleSortChange(option.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-left border ${
                      isSelected
                        ? darkMode 
                          ? 'bg-gradient-to-r from-orange-900/60 to-red-900/40 text-orange-200 border-orange-700/50 shadow-lg' 
                          : 'bg-gradient-to-r from-orange-100/60 to-red-100/40 text-orange-800 border-orange-200/50 shadow-lg'
                        : darkMode 
                          ? 'hover:bg-gray-800/60 text-gray-300 hover:text-white border-transparent hover:border-gray-700/50 hover:shadow-md' 
                          : 'hover:bg-gray-50/80 text-gray-700 hover:text-gray-900 border-transparent hover:border-gray-200/50 hover:shadow-md'
                    }`}
                  >
                    <span className="text-sm font-medium">{option.label}</span>
                    {isSelected && (
                      <div className={`w-2 h-2 rounded-full ${
                        darkMode ? 'bg-orange-400' : 'bg-orange-600'
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      {/* Prompt Modal */}
      {selectedPrompt && (
        <PromptModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedPrompt(null);
          }}
          prompt={selectedPrompt}
          darkMode={darkMode}
        />
      )}
    </>
  );
} 