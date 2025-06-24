'use client';

import React, { useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import FilterSidebar from '@/components/FilterSidebar';
import PromptCard from '@/components/PromptCard';
import WelcomePage from '@/components/WelcomePage';
import ClientOnly from '@/components/ClientOnly';
import { useAppStore } from '@/store/useAppStore';
import { useHydration } from '@/hooks/useHydration';
import { useAuth } from '@/hooks/useAuth';
import { csvToPrompts, csvToVibePrompts } from '@/lib/csvParser';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { 
    darkMode, 
    filteredPrompts,
    isLoading, 
    error, 
    setPrompts, 
    setVibePrompts,
    setLoading, 
    setError 
  } = useAppStore();

  const isHydrated = useHydration();
  const { hasAccess, isAuthenticated } = useAuth();

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Load prompts-fi.csv
      const promptsResponse = await fetch('/data/prompts-fi.csv');
      if (!promptsResponse.ok) {
        throw new Error('Failed to load prompts data');
      }
      const promptsText = await promptsResponse.text();
      const promptsData = csvToPrompts(promptsText);
      setPrompts(promptsData);

      // Load vibeprompts-fi.csv
      const vibePromptsResponse = await fetch('/data/vibeprompts-fi.csv');
      if (!vibePromptsResponse.ok) {
        throw new Error('Failed to load vibe prompts data');
      }
      const vibePromptsText = await vibePromptsResponse.text();
      const vibePromptsData = csvToVibePrompts(vibePromptsText);
      setVibePrompts(vibePromptsData);

    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while loading data');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setPrompts, setVibePrompts]);

  useEffect(() => {
    // Only load data if user is authenticated and has access
    if (isAuthenticated && hasAccess) {
      loadData();
    }
  }, [isAuthenticated, hasAccess, loadData]);

  useEffect(() => {
    // Apply dark mode to document only after hydration
    if (isHydrated) {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode, isHydrated]);

  // Show loading state during hydration or auth
  if (!isHydrated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <Loader2 className={`mx-auto h-12 w-12 animate-spin mb-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`} />
          <p className={`text-lg font-medium ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Ladataan Prompt-Kirjasto Pro...
          </p>
        </div>
      </div>
    );
  }

  // Show welcome page if not authenticated or no access
  if (!isAuthenticated || !hasAccess) {
    return (
      <>
        <WelcomePage 
          darkMode={darkMode} 
          onAuthSuccess={() => {
            // Refresh will be handled by auth state change
            window.location.reload();
          }} 
        />
        <ClientOnly>
          <Toaster position="top-right" />
        </ClientOnly>
      </>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center p-8">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-500 text-2xl">⚠️</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Virhe tietojen lataamisessa</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Yritä uudelleen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`} suppressHydrationWarning={true}>
      {/* Header */}
      <Header />

      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 p-4 lg:p-6">
          {isLoading ? (
            // Loading State
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Loader2 className={`mx-auto h-12 w-12 animate-spin mb-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <p className={`text-lg font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Ladataan prompteja...
                </p>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Odota hetki, haemme uusimmat promptit
                </p>
              </div>
            </div>
          ) : filteredPrompts.length === 0 ? (
            // Empty State
            <div className="text-center py-20">
              <div className={`text-6xl mb-6 ${
                darkMode ? 'text-gray-600' : 'text-gray-300'
              }`}>
                🔍
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Ei tuloksia löytynyt
              </h3>
              <p className={`text-lg mb-8 max-w-md mx-auto ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Säädä hakuasi tai suodattimiasi löytääksesi etsimäsi.
              </p>
              <p className={`text-sm ${
                darkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                Käytä vasemman puolen suodattimia tarkentaaksesi hakuasi
              </p>
            </div>
          ) : (
            // Prompts Grid
            <>
              {/* Results Header */}
              <div className="mb-4 lg:mb-6">
                <h2 className={`text-xl lg:text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'promptia'} löydetty
                </h2>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Löydä täydelliset tekoälypromptit tarpeisiisi
                </p>
              </div>

              {/* Prompts Grid - Responsive */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {filteredPrompts.map((prompt, index) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    index={index}
                  />
                ))}
              </div>

              {/* Load More (Future Implementation) */}
              {filteredPrompts.length > 0 && (
                <div className="mt-8 lg:mt-12 text-center">
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Näytetään kaikki {filteredPrompts.length} tulosta
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Toast Notifications */}
      <ClientOnly>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: darkMode ? 'dark-toast' : '',
            duration: 3000,
            style: {
              background: darkMode ? '#374151' : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000',
              border: darkMode ? '1px solid #4B5563' : '1px solid #E5E7EB',
            },
          }}
        />
      </ClientOnly>
    </div>
  );
}
