'use client';

import React, { useState } from 'react';
import { Code, Users, Briefcase, Palette, Heart, GraduationCap, Gamepad2, Wrench, X, Star, BarChart3, Globe } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Prompt, VibePrompt } from '@/types';
import PromptModal from './PromptModal';

const categories = [
  { id: '', label: 'Kaikki kategoriat', icon: Users, count: 0 },
  { id: 'Kehitys', label: 'Kehitys', icon: Code, count: 0 },
  { id: 'Liiketoiminta', label: 'Liiketoiminta', icon: Briefcase, count: 0 },
  { id: 'Kirjoittaminen', label: 'Kirjoittaminen', icon: Palette, count: 0 },
  { id: 'Koulutus', label: 'Koulutus', icon: GraduationCap, count: 0 },
  { id: 'Luova', label: 'Luova', icon: Palette, count: 0 },
  { id: 'Terveys', label: 'Terveys', icon: Heart, count: 0 },
  { id: 'Viihde', label: 'Viihde', icon: Gamepad2, count: 0 },
  { id: 'Työkalut', label: 'Työkalut', icon: Wrench, count: 0 },
  { id: 'Pelit', label: 'Pelit', icon: Gamepad2, count: 0 },
  { id: 'Analytiikka', label: 'Analytiikka', icon: BarChart3, count: 0 },
  { id: 'Web-sovellukset', label: 'Web-sovellukset', icon: Globe, count: 0 },
  { id: 'Yleinen', label: 'Yleinen', icon: Users, count: 0 },
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
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative lg:translate-x-0 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        w-80 h-screen lg:h-full overflow-hidden border-r z-50 lg:z-40 
        transition-all duration-300 ease-out flex flex-col
        top-0 left-0
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