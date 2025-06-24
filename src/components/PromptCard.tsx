'use client';

import React, { useState } from 'react';
import { Star, Copy, Code, Users, Sparkles, Check, Eye } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Prompt, VibePrompt } from '@/types';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import PromptModal from './PromptModal';

interface PromptCardProps {
  prompt: (Prompt | VibePrompt) & { type: 'prompt' | 'vibe' };
  index: number;
}

export default function PromptCard({ prompt, index }: PromptCardProps) {
  const { darkMode, favorites, addToFavorites, removeFromFavorites } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const isFavorite = favorites.includes(prompt.id);
  const isVibePrompt = prompt.type === 'vibe';
  const title = isVibePrompt ? (prompt as VibePrompt).app : (prompt as Prompt).act;

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(prompt.id);
      toast.success('Poistettu suosikeista');
    } else {
      addToFavorites(prompt.id);
      toast.success('Lisätty suosikkeihin');
    }
  };

  const handleCopyPrompt = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      toast.success('Prompt kopioitu leikepöydälle!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Promptin kopiointi epäonnistui');
    }
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleViewPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const getCategoryStyle = (category: string | undefined) => {
    const baseStyle = darkMode 
      ? 'bg-slate-700 text-slate-200 border border-slate-600' 
      : 'bg-slate-100 text-slate-700 border border-slate-200';
    
    switch (category) {
      case 'Kehitys': 
        return darkMode ? 'bg-blue-900 text-blue-200 border border-blue-800' : 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Kirjoittaminen': 
        return darkMode ? 'bg-purple-900 text-purple-200 border border-purple-800' : 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Liiketoiminta': 
        return darkMode ? 'bg-green-900 text-green-200 border border-green-800' : 'bg-green-100 text-green-800 border border-green-200';
      case 'Koulutus': 
        return darkMode ? 'bg-amber-900 text-amber-200 border border-amber-800' : 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Luova': 
        return darkMode ? 'bg-pink-900 text-pink-200 border border-pink-800' : 'bg-pink-100 text-pink-800 border border-pink-200';
      case 'Terveys': 
        return darkMode ? 'bg-red-900 text-red-200 border border-red-800' : 'bg-red-100 text-red-800 border border-red-200';
      case 'Viihde': 
        return darkMode ? 'bg-indigo-900 text-indigo-200 border border-indigo-800' : 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      case 'Työkalut': 
        return darkMode ? 'bg-gray-700 text-gray-200 border border-gray-600' : 'bg-gray-100 text-gray-700 border border-gray-200';
      case 'Pelit': 
        return darkMode ? 'bg-orange-900 text-orange-200 border border-orange-800' : 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Analytiikka':
        return darkMode ? 'bg-cyan-900 text-cyan-200 border border-cyan-800' : 'bg-cyan-100 text-cyan-800 border border-cyan-200';
      case 'Web-sovellukset':
        return darkMode ? 'bg-emerald-900 text-emerald-200 border border-emerald-800' : 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'Kommunikointia':
        return darkMode ? 'bg-violet-900 text-violet-200 border border-violet-800' : 'bg-violet-100 text-violet-800 border border-violet-200';
      case 'Verkkokauppa':
        return darkMode ? 'bg-teal-900 text-teal-200 border border-teal-800' : 'bg-teal-100 text-teal-800 border border-teal-200';
      case 'Yleinen':
        return darkMode ? 'bg-slate-700 text-slate-200 border border-slate-600' : 'bg-slate-100 text-slate-700 border border-slate-200';
      default: 
        return baseStyle;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={`group relative p-4 lg:p-6 rounded-xl border transition-all duration-200 hover:shadow-lg cursor-pointer ${
          isFavorite
            ? darkMode 
              ? 'bg-gray-800 border-yellow-500 hover:border-yellow-400 ring-1 ring-yellow-500/20' 
              : 'bg-white border-yellow-500 hover:border-yellow-400 ring-1 ring-yellow-500/20'
            : darkMode 
              ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
              : 'bg-white border-gray-200 hover:border-gray-300'
        }`}
        onClick={handleCardClick}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3 lg:mb-4">
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

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {/* Category Tag */}
              {prompt.category && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryStyle(prompt.category)}`}>
                  {prompt.category}
                </span>
              )}

              {/* Developer Tag */}
              {'for_devs' in prompt && prompt.for_devs && (
                <span className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${
                  darkMode 
                    ? 'bg-blue-900 text-blue-200 border-blue-800' 
                    : 'bg-blue-100 text-blue-800 border-blue-200'
                }`}>
                  <Code className="h-3 w-3" />
                  <span>Dev</span>
                </span>
              )}

              {/* Tech Stack for Vibe Prompts */}
              {isVibePrompt && (prompt as VibePrompt).techstack && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                  darkMode 
                    ? 'bg-emerald-900 text-emerald-200 border-emerald-800' 
                    : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                }`}>
                  {(prompt as VibePrompt).techstack.split(',')[0].trim()}
                  {(prompt as VibePrompt).techstack.split(',').length > 1 && ' +'}
                </span>
              )}

              {/* Additional Tags */}
              {prompt.tags?.slice(0, 2).map((tag, idx) => (
                <span 
                  key={idx}
                  className={`px-2 py-1 text-xs rounded-full border ${
                    darkMode 
                      ? 'bg-slate-700 text-slate-200 border-slate-600' 
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1 lg:space-x-2 ml-2 lg:ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleViewPrompt}
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
              onClick={handleCopyPrompt}
              className={`p-1.5 lg:p-2 rounded-lg transition-colors ${
                copied
                  ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                  : darkMode 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              title="Kopioi prompt"
            >
              {copied ? <Check className="h-3.5 w-3.5 lg:h-4 lg:w-4" /> : <Copy className="h-3.5 w-3.5 lg:h-4 lg:w-4" />}
            </button>

            <button
              onClick={handleFavoriteToggle}
              className={`p-1.5 lg:p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-yellow-500 hover:text-yellow-600' 
                  : darkMode 
                    ? 'text-gray-400 hover:text-yellow-400' 
                    : 'text-gray-400 hover:text-yellow-500'
              }`}
              title={isFavorite ? 'Poista suosikeista' : 'Lisää suosikkeihin'}
            >
              <Star 
                className={`h-3.5 w-3.5 lg:h-4 lg:w-4 ${isFavorite ? 'fill-current' : ''}`} 
              />
            </button>
          </div>
        </div>

        {/* Prompt Content */}
        <div className={`${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <p className="text-sm lg:text-base leading-relaxed line-clamp-3 lg:line-clamp-4">
            {prompt.prompt}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Contributor/Type Info */}
          <div className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {isVibePrompt ? (
              <span>tekijä {(prompt as VibePrompt).contributor}</span>
            ) : (
              <span>Perinteinen prompt</span>
            )}
          </div>

          {/* Platform Support - Hide on small mobile */}
          <div className="hidden sm:flex items-center space-x-1">
            {prompt.platforms?.slice(0, 3).map((platform, idx) => (
              <span 
                key={idx}
                className={`px-2 py-1 text-xs rounded border ${
                  darkMode 
                    ? 'bg-slate-700 text-slate-200 border-slate-600' 
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {platform}
              </span>
            ))}
          </div>
        </div>


      </motion.div>

      {/* Modal */}
      <PromptModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        prompt={prompt}
        darkMode={darkMode}
      />
    </>
  );
} 