// components/LanguageToggle.tsx
'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';

export default function LanguageToggle() {
  const { toggleLanguage, language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  return (
    <div className="flex items-center">
      <button 
        onClick={toggleLanguage}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 ${
          language === 'en' ? 'bg-blue-700' : 'bg-emerald-500'
        }`}
        aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
      >
        {/* Toggle knob with smooth sliding animation */}
        <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-all duration-300 ${
          language === 'en' ? 'translate-x-1' : 'translate-x-9'
        }`} />
        
        {/* Language labels positioned appropriately */}
        <span className={`absolute left-2 text-xs font-medium transition-all duration-200 ${
          language === 'en' ? 'text-black opacity-100' : 'text-transparent opacity-0'
        }`}>
          EN
        </span>
        <span className={`absolute right-2 text-xs font-medium transition-all duration-200 ${
          language === 'ar' ? 'text-black opacity-100' : 'text-transparent opacity-0'
        }`}>
          AR
        </span>
      </button>
      
      {/* Optional: Display current language name */}
      <span className="ml-3 text-sm font-medium text-gray-700 min-w-[60px]">
        {language === 'en' ? 'English' : 'عربي'}
      </span>
    </div>
  );
}