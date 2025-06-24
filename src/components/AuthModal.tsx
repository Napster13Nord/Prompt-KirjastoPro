'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, Key, Eye, EyeOff, LogIn, UserPlus, AlertCircle, User } from 'lucide-react';
import { signIn, signUp } from '@/lib/auth';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  darkMode: boolean;
}

// Função para traduzir mensagens de erro do Supabase para finlandês
const translateErrorMessage = (message: string): string => {
  const errorTranslations: { [key: string]: string } = {
    'Invalid login credentials': 'Virheelliset kirjautumistiedot',
    'User not found': 'Käyttäjää ei löytynyt',
    'Invalid email': 'Virheellinen sähköpostiosoite',
    'Password should be at least 6 characters': 'Salasanan tulee olla vähintään 6 merkkiä',
    'Email not confirmed': 'Sähköpostia ei ole vahvistettu. Tarkista sähköpostisi ja roskapostikansio.',
    'Too many requests': 'Liian monta pyyntöä, yritä myöhemmin uudelleen',
    'User already registered': 'Käyttäjä on jo rekisteröitynyt',
    'Signup disabled': 'Rekisteröinti on poistettu käytöstä',
  };

  // Etsi käännös, jos ei löydy, palauta alkuperäinen viesti tai yleinen virheviesti
  return errorTranslations[message] || message || 'Virhe pyynnön käsittelyssä';
};

export default function AuthModal({ isOpen, onClose, onSuccess, darkMode }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success('Kirjautuminen onnistui!');
      } else {
        if (!accessCode) {
          setError('Pääsykoodi vaaditaan tilin luomiseen');
          return;
        }
        if (!fullName.trim()) {
          setError('Nimi on pakollinen');
          return;
        }
        await signUp(email, password, accessCode, fullName);
        toast.success('Tili luotu onnistuneesti! Tarkista sähköpostisi.');
      }
      
      onSuccess();
      onClose();
      
      // Reset form
      setEmail('');
      setPassword('');
      setFullName('');
      setAccessCode('');
      setError('');
    } catch (err: unknown) {
      const originalMessage = err instanceof Error ? err.message : 'Virhe pyynnön käsittelyssä';
      const translatedMessage = translateErrorMessage(originalMessage);
      setError(translatedMessage);
      toast.error(translatedMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setAccessCode('');
    setFullName('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-2xl shadow-2xl ${
        darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className={`text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {isLogin ? 'Kirjaudu sisään' : 'Luo tili'}
            </h2>
            <p className={`text-sm mt-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {isLogin 
                ? 'Kirjaudu kurssi-tilillesi' 
                : 'Luo tilisi kurssin koodilla'
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700 dark:text-red-400">{error}</span>
            </div>
          )}

          {/* Access Code (only for signup) */}
          {!isLogin && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Kurssin pääsykoodi *
              </label>
              <div className="relative">
                <Key className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Syötä kurssin koodi"
                  required={!isLogin}
                />
              </div>
              <p className={`text-xs mt-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Sait tämän koodin ostaessasi kurssin
              </p>
            </div>
          )}

          {/* Full Name (only for signup) */}
          {!isLogin && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Koko nimi *
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Syötä koko nimesi"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Sähköposti *
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="sinun@email.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Salasana *
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Syötä salasanasi"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                {isLogin ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                <span>{isLogin ? 'Kirjaudu sisään' : 'Luo tili'}</span>
              </>
            )}
          </button>

          {/* Toggle Mode */}
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={toggleMode}
              className={`text-sm font-medium transition-colors ${
                darkMode 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              {isLogin 
                ? 'Ei tiliä? Luo tili tässä' 
                : 'Onko sinulla jo tili? Kirjaudu sisään'
              }
            </button>
            <p className={`text-xs mt-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Tarvitset kurssin pääsykoodin luodaksesi tilin
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 