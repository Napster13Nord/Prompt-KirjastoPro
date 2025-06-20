'use client';

import React, { useState, useEffect } from 'react';
import { X, Copy, MessageCircle, User, Edit3, Save } from 'lucide-react';
import { Prompt, VibePrompt } from '@/types';
import toast from 'react-hot-toast';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: ((Prompt | VibePrompt) & { type: 'prompt' | 'vibe' }) | null;
  darkMode: boolean;
}

export default function PromptModal({ isOpen, onClose, prompt, darkMode }: PromptModalProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState('');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset edited prompt when modal opens
  useEffect(() => {
    if (prompt && isOpen) {
      setEditedPrompt(prompt.prompt);
      setIsEditing(false);
    }
  }, [prompt, isOpen]);

  const handleCopy = async () => {
    if (!prompt) return;

    // Always use the current version (edited if in edit mode, or saved version)
    const textToCopy = isEditing ? editedPrompt : prompt.prompt;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success('Prompt kopioitu leikepöydälle!', {
        duration: 2000,
        icon: '📋',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Kopiointi epäonnistui');
    }
  };

  const handleOpenChatGPT = () => {
    if (!prompt) return;
    
    try {
      // Get the current prompt (edited or original)
      const textToSend = isEditing ? editedPrompt : prompt.prompt;
      
      // Encode the prompt for URL
      const encodedPrompt = encodeURIComponent(textToSend);
      
      // Open ChatGPT with prompt in the input field (not sent)
      window.open(`https://chat.openai.com/?prompt=${encodedPrompt}`, '_blank');
      
      toast.success('ChatGPT avattu promptin kanssa valmiina!', {
        duration: 3000,
        icon: '🚀',
      });
    } catch {
      toast.error('ChatGPT:n avaaminen epäonnistui');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Update the original prompt with the edited version
    if (prompt) {
      prompt.prompt = editedPrompt;
    }
    setIsEditing(false);
    toast.success('Prompt tallennettu! Voit nyt kopioida tai avata ChatGPT:ssä.', {
      duration: 3000,
      icon: '✅',
    });
  };

  const handleCancel = () => {
    setEditedPrompt(prompt?.prompt || '');
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !prompt) return null;

  const isVibePrompt = prompt.type === 'vibe';
  const title = isVibePrompt ? (prompt as VibePrompt).app : (prompt as Prompt).act;
  const contributor = isVibePrompt ? (prompt as VibePrompt).contributor : null;
  
  // Get the current prompt (edited or original)
  const currentPrompt = isEditing ? editedPrompt : prompt.prompt;

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className={`relative w-full max-w-4xl max-h-[90vh] md:max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
        darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        {/* Header */}
        <div className={`p-4 md:p-6 border-b ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
        }`}>
          {/* Mobile Layout */}
          <div className="block md:hidden space-y-3">
            {/* Top row - Title and Close */}
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold truncate ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {title}
              </h2>
              <button
                onClick={handleClose}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Second row - Badges */}
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              {/* Type Badge */}
              {isVibePrompt ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className={`text-xs font-medium ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    Vibe Prompt
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <User className="h-3 w-3 text-blue-500" />
                  <span className={`text-xs font-medium ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Perinteinen prompt
                  </span>
                </div>
              )}

              {/* Category Badge */}
              {prompt.category && (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 border border-gray-600' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}>
                  {prompt.category}
                </span>
              )}
            </div>
            
            {/* Third row - Action buttons */}
            <div className="flex items-center justify-end space-x-1">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-blue-400' 
                      : 'hover:bg-blue-50 text-gray-500 hover:text-blue-600'
                  }`}
                  title="Muokkaa promptia"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              ) : (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handleSave}
                    className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                    title="Tallenna"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    title="Peruuta muokkaus"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Type Badge */}
              {isVibePrompt ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    Vibe Prompt
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-blue-500" />
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Perinteinen prompt
                  </span>
                </div>
              )}

              {/* Category Badge */}
              {prompt.category && (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 border border-gray-600' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}>
                  {prompt.category}
                </span>
              )}

              {/* Title */}
              <h2 className={`text-xl font-bold truncate max-w-md ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {title}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              {/* Edit Button */}
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-blue-400' 
                      : 'hover:bg-blue-50 text-gray-500 hover:text-blue-600'
                  }`}
                  title="Muokkaa promptia"
                >
                  <Edit3 className="h-5 w-5" />
                </button>
              ) : (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handleSave}
                    className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                    title="Tallenna"
                  >
                    <Save className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    title="Peruuta muokkaus"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={handleClose}
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
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <div className="space-y-4 md:space-y-6">
            {/* Contributor Info */}
            {contributor && (
              <div className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span className="font-medium">Tekijä:</span> {contributor}
              </div>
            )}

            {/* Prompt Content */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 md:mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Prompt
              </h3>
              
              {isEditing ? (
                <textarea
                  value={editedPrompt}
                  onChange={(e) => setEditedPrompt(e.target.value)}
                  className={`w-full h-48 md:h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Muokkaa promptiasi tässä..."
                  rows={8}
                />
              ) : (
                <div className={`p-4 md:p-6 rounded-xl border max-h-64 md:max-h-96 overflow-y-auto ${
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-gray-300' 
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}>
                  <pre className="whitespace-pre-wrap font-sans text-sm lg:text-base leading-relaxed">
                    {currentPrompt}
                  </pre>
                </div>
              )}

              <div className={`text-xs md:text-sm p-3 md:p-4 rounded-lg border ${
                darkMode 
                  ? 'bg-blue-900/20 border-blue-800 text-blue-200' 
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                💡 <strong>Vinkki:</strong> Muokkaa promptia tarpeidesi mukaan ja tallenna muutokset ennen kopiointia tai ChatGPT:n avaamista.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 md:p-6 border-t ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
        }`}>
          {/* Mobile Layout */}
          <div className="block md:hidden space-y-3">
            <div className={`text-sm text-center ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {isEditing
                ? 'Muokataan promptia - Tallenna käyttääksesi toimintopainikkeita'
                : 'Klikkaa painikkeita kopioidaksesi tai avataksesi ChatGPT:ssä'
              }
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={handleCopy}
                className={`inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                  copied
                    ? 'bg-green-500 text-white'
                    : isEditing
                      ? darkMode
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : darkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={isEditing}
                title={isEditing ? 'Tallenna ensin muutokset' : 'Kopioi prompt'}
              >
                <Copy className="h-4 w-4" />
                <span>{copied ? 'Kopioitu!' : 'Kopioi'}</span>
              </button>

              <button
                onClick={handleOpenChatGPT}
                className={`inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isEditing
                    ? darkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                disabled={isEditing}
                title={isEditing ? 'Tallenna ensin muutokset' : 'Avaa ChatGPT:ssä'}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Avaa ChatGPT:ssä</span>
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <div className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {isEditing
                ? 'Muokataan promptia - Tallenna käyttääksesi toimintopainikkeita'
                : 'Klikkaa painikkeita kopioidaksesi tai avataksesi ChatGPT:ssä'
              }
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopy}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  copied
                    ? 'bg-green-500 text-white'
                    : isEditing
                      ? darkMode
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : darkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={isEditing}
                title={isEditing ? 'Tallenna ensin muutokset' : 'Kopioi prompt'}
              >
                <Copy className="h-4 w-4" />
                <span>{copied ? 'Kopioitu!' : 'Kopioi'}</span>
              </button>

              <button
                onClick={handleOpenChatGPT}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isEditing
                    ? darkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                disabled={isEditing}
                title={isEditing ? 'Tallenna ensin muutokset' : 'Avaa ChatGPT:ssä'}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Avaa ChatGPT:ssä</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 