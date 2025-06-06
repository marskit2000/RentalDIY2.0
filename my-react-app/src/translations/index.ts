import { en } from './en';
import { zhTW } from './zh-TW';
import { zhCN } from './zh-CN';
import { Language } from '../contexts/LanguageContext';

// Export all translations
export const translations = {
  'en': en,
  'zh-TW': zhTW,
  'zh-CN': zhCN
};

// Helper function to get translations based on current language
export const getTranslation = (language: Language) => {
  return translations[language];
};

// Helper function to get a specific translation key
export const t = (language: Language, key: string): string => {
  const translationObj = translations[language];
  return translationObj[key as keyof typeof translationObj] || key;
};

/**
 * Helper function to get localized image path based on current language
 * @param imageMap - Object mapping language codes to image paths
 * @param language - Current language code
 * @param fallback - Optional fallback image path if language-specific image is not found
 * @returns The appropriate image path for the current language
 * 
 * Example usage:
 * const logoImage = getLocalizedImage({
 *   'en': '/images/logo-en.png',
 *   'zh-TW': '/images/logo-zh-tw.png',
 *   'zh-CN': '/images/logo-zh-cn.png'
 * }, language, '/images/logo-default.png');
 */
export const getLocalizedImage = (
  imageMap: Record<Language, string>,
  language: Language,
  fallback?: string
): string => {
  // Return the image path for the current language if it exists
  if (imageMap[language]) {
    return imageMap[language];
  }
  
  // If no image exists for the current language, return the fallback or the first available image
  return fallback || Object.values(imageMap)[0] || '';
};
