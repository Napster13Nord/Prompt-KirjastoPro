'use client';

import React from 'react';
import { X, Star, Eye, Copy, Trash2, Users, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Prompt, VibePrompt } from '@/types';
import toast from 'react-hot-toast';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onPromptSelect: (prompt: (Prompt | VibePrompt) & { type: 'prompt' | 'vibe' }) => void;
}

export default function FavoritesModal({ isOpen, onClose, darkMode, onPromptSelect }: FavoritesModalProps) {
  const { favorites, removeFromFavorites, prompts, vibePrompts } = useAppStore();

  if (!isOpen) return null;

  // Obter todos os prompts favoritos
  const getFavoritePrompts = () => {
    const allPrompts = [
      ...prompts.map(p => ({ ...p, type: 'prompt' as const })),
      ...vibePrompts.map(p => ({ ...p, type: 'vibe' as const }))
    ];
    
    return favorites
      .map(favoriteId => allPrompts.find(p => p.id === favoriteId))
      .filter(Boolean) as ((Prompt | VibePrompt) & { type: 'prompt' | 'vibe' })[];
  };

  const favoritePrompts = getFavoritePrompts();

  const handleRemoveFavorite = (promptId: string, promptTitle: string) => {
    removeFromFavorites(promptId);
    toast.success(`${promptTitle} poistettu suosikeista`);
  };

  const handleCopyPrompt = async (prompt: any) => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      toast.success('Prompt kopioitu leikepöydälle!');
    } catch {
      toast.error('Promptin kopiointi epäonnistui');
    }
  };

  const handleViewPrompt = (prompt: (Prompt | VibePrompt) & { type: 'prompt' | 'vibe' }) => {
    onPromptSelect(prompt);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-screen"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className={`relative w-full max-w-4xl max-h-[85vh] my-auto rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
        darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        {/* Header */}
        <div className={`p-4 md:p-6 border-b ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
        }`}>
          {/* Mobile Layout */}
          <div className="block md:hidden space-y-3">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Suosikit
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {favoritePrompts.length} suosikki{favoritePrompts.length !== 1 ? 'a' : ''}
              </span>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
              <h2 className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Suosikit
              </h2>
              <span className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                ({favoritePrompts.length} suosikki{favoritePrompts.length !== 1 ? 'a' : ''})
              </span>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6" style={{ maxHeight: 'calc(85vh - 200px)' }}>
          {favoritePrompts.length === 0 ? (
            <div className="text-center py-20">
              <div className={`text-6xl mb-6 ${
                darkMode ? 'text-gray-600' : 'text-gray-300'
              }`}>
                ⭐
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Ei suosikkeja vielä
              </h3>
              <p className={`text-lg mb-8 max-w-md mx-auto ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Lisää prompteja suosikkeihin klikkaamalla tähti-ikonia korteissa
              </p>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              {favoritePrompts.map((prompt) => {
                const isVibePrompt = prompt.type === 'vibe';
                const title = isVibePrompt ? (prompt as VibePrompt).app : (prompt as Prompt).act;
                const contributor = isVibePrompt ? (prompt as VibePrompt).contributor : null;
                
                return (
                  <div
                    key={prompt.id}
                    className={`p-4 md:p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                      darkMode 
                        ? 'bg-gray-800 border-yellow-500 ring-1 ring-yellow-500/20 hover:border-yellow-400' 
                        : 'bg-white border-yellow-500 ring-1 ring-yellow-500/20 hover:border-yellow-400'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          {/* Type Icon */}
                          {isVibePrompt ? (
                            <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-purple-500 flex-shrink-0" />
                          ) : (
                            <Users className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500 flex-shrink-0" />
                          )}
                          
                          {/* Title */}
                          <h3 className={`text-base lg:text-lg font-semibold line-clamp-2 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {title}
                          </h3>
                        </div>

                        {/* Contributor Info */}
                        {contributor && (
                          <div className={`text-sm mb-2 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            <span className="font-medium">Tekijä:</span> {contributor}
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {/* Category Tag */}
                          {prompt.category && (
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              darkMode 
                                ? 'bg-blue-900 text-blue-200 border border-blue-800' 
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}>
                              {prompt.category}
                            </span>
                          )}
                          
                          {/* Type Badge */}
                          {isVibePrompt ? (
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              darkMode 
                                ? 'bg-purple-900 text-purple-200 border border-purple-800' 
                                : 'bg-purple-100 text-purple-800 border border-purple-200'
                            }`}>
                              Vibe Prompt
                            </span>
                          ) : (
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              darkMode 
                                ? 'bg-gray-700 text-gray-300 border border-gray-600' 
                                : 'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}>
                              Perinteinen prompt
                            </span>
                          )}

                          {/* Developer Tag */}
                          {'for_devs' in prompt && prompt.for_devs && (
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              darkMode 
                                ? 'bg-green-900 text-green-200 border border-green-800' 
                                : 'bg-green-100 text-green-800 border border-green-200'
                            }`}>
                              Dev
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-1 lg:space-x-2 ml-2 lg:ml-4 flex-shrink-0">
                        <button
                          onClick={() => handleViewPrompt(prompt)}
                          className={`p-1.5 lg:p-2 rounded-lg transition-colors ${
                            darkMode 
                              ? 'hover:bg-gray-700 text-gray-400 hover:text-blue-400' 
                              : 'hover:bg-blue-50 text-gray-500 hover:text-blue-600'
                          }`}
                          title="Näytä koko prompt"
                        >
                          <Eye className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleCopyPrompt(prompt)}
                          className={`p-1.5 lg:p-2 rounded-lg transition-colors ${
                            darkMode 
                              ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                          }`}
                          title="Kopioi prompt"
                        >
                          <Copy className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleRemoveFavorite(prompt.id, title)}
                          className={`p-1.5 lg:p-2 rounded-lg transition-colors ${
                            darkMode 
                              ? 'hover:bg-red-900/20 text-gray-400 hover:text-red-400' 
                              : 'hover:bg-red-50 text-gray-500 hover:text-red-600'
                          }`}
                          title="Poista suosikeista"
                        >
                          <Trash2 className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Prompt Content Preview */}
                    <div className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <p className="text-sm lg:text-base leading-relaxed line-clamp-3">
                        {prompt.prompt}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {favoritePrompts.length > 0 && (
          <div className={`p-4 md:p-6 border-t ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
          }`}>
            <div className={`text-sm text-center ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Klikkaa silmä-ikonia nähdäksesi täydellisen promptin tai kopioi suoraan
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 