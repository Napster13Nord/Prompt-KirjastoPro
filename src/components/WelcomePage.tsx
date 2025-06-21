'use client';

import React, { useState } from 'react';
import { Sparkles, BookOpen, Zap, Target, Shield, Star, ArrowRight } from 'lucide-react';
import AuthModal from './AuthModal';

interface WelcomePageProps {
  darkMode: boolean;
  onAuthSuccess: () => void;
}

export default function WelcomePage({ darkMode, onAuthSuccess }: WelcomePageProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 pt-20 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Title */}
      <div className="flex items-center justify-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-sans text-center leading-tight">
          Prompt-Kirjasto Pro
        </h1>
      </div>
      
      {/* Main Description */}
      <p className={`text-2xl lg:text-3xl font-bold mb-8 max-w-3xl mx-auto text-center ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Kattavin prompt-kirjasto <span className="text-blue-600">tekoälyn hallintaan</span>
      </p>
      
      {/* Subtitle */}
      <p className={`text-lg mb-8 max-w-3xl mx-auto text-center ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        200+ testattua ja optimoitua promptia ChatGPT:lle, Claudelle, Geminille ja muille tekoälyille. 
        Muuta tekoälykeskustelusi poikkeuksellisiksi tuloksiksi.
      </p>
      
      {/* Badge */}
      <div className="flex justify-center items-center w-full mb-8 px-4">
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-center ${
          darkMode 
            ? 'bg-blue-900/30 text-blue-400 border border-blue-700' 
            : 'bg-blue-100 text-blue-600 border border-blue-200'
        }`}>
          <span className="text-center">🌟 Eksklusiivinen pääsy kurssin opiskelijoille</span>
        </div>
      </div>
      
      {/* CTA Button */}
      <button
        onClick={() => setShowAuthModal(true)}
        className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
      >
        <span>Käytä kirjastoani</span>
        <ArrowRight className="h-5 w-5" />
      </button>
      
      <p className={`text-sm ${
        darkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>
        🔐 Kirjaudu sisään kurssin koodilla
      </p>

      {/* Features Section */}
      <div className="w-full max-w-6xl mt-20">
        <h2 className={`text-2xl lg:text-3xl font-bold text-center mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Kaikki mitä tarvitset <span className="text-blue-600">promptien hallintaan</span>
        </h2>
        
        <p className={`text-center mb-12 text-lg ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Täydellinen ja ammattimainen työkalu, joka muuttaa tapasi olla vuorovaikutuksessa tekoälyn kanssa
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-blue-500/50' 
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-blue-100/50'
          } backdrop-blur-sm`}>
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg group-hover:shadow-blue-500/25 transition-shadow">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                200+ testattua promptia
              </h3>
              <p className={`leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Kuratoitu kokoelma parhaista prompteista ChatGPT:lle, Claudelle, Geminille ja muille tekoälyille
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Feature 2 */}
          <div className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-yellow-500/50' 
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-yellow-300 hover:shadow-yellow-100/50'
          } backdrop-blur-sm`}>
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mb-6 shadow-lg group-hover:shadow-yellow-500/25 transition-shadow">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Älykäs haku
              </h3>
              <p className={`leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Löydä täydellinen prompt sekunneissa kehittyneen semanttisen haun avulla
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Feature 3 */}
          <div className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-green-500/50' 
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-green-300 hover:shadow-green-100/50'
          } backdrop-blur-sm`}>
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6 shadow-lg group-hover:shadow-green-500/25 transition-shadow">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Kategorioitu järjestely
              </h3>
              <p className={`leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Liiketoiminta, Kehitys, Luovuus, Koulutus ja paljon muuta järjestetty sinulle
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Feature 4 */}
          <div className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500/50' 
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-purple-300 hover:shadow-purple-100/50'
          } backdrop-blur-sm`}>
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl mb-6 shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Kaikille tasoille
              </h3>
              <p className={`leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Aloittelijoista kokeneisiin kehittäjiin, meillä on promptit kaikille
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Feature 5 */}
          <div className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-pink-500/50' 
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-pink-300 hover:shadow-pink-100/50'
          } backdrop-blur-sm`}>
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl mb-6 shadow-lg group-hover:shadow-pink-500/25 transition-shadow">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Suosikkijärjestelmä
              </h3>
              <p className={`leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Tallenna suosikkipromptisi ja luo henkilökohtainen kirjastosi
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Feature 6 */}
          <div className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-red-500/50' 
              : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-red-300 hover:shadow-red-100/50'
          } backdrop-blur-sm`}>
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl mb-6 shadow-lg group-hover:shadow-red-500/25 transition-shadow">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Elinikäinen pääsy
              </h3>
              <p className={`leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Kerran opiskelija, aina pääsy. Ei kuukausimaksuja tai uusimisia
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-16 pb-8 text-center ${
        darkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>
        <p className="text-sm">
          © 2025 Prompt-Kirjasto Pro. Eksklusiivinen työkalu kurssin opiskelijoille.
        </p>
        <p className="text-xs mt-2">
          Kehitetty ❤️:lla maksimoimaan potentiaalisi tekoälyn kanssa
        </p>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={onAuthSuccess}
        darkMode={darkMode}
      />
    </div>
  );
} 