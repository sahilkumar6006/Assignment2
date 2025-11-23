import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import en from './en.json';
import ar from './ar.json';

export const languageNameToCode: Record<string, string> = {
  English: 'en',
  Arabic: 'ar',
};

export function getLanguageCode(fullName: string) {
  return languageNameToCode[fullName] || fullName || 'en';
}

export const languageResources = {
  en: { translation: en },
  ar: { translation: ar },
};


if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: languageResources,
    interpolation: { escapeValue: false },
  });
}

export const initializeLanguage = (languageCode: 'en' | 'ar' = 'en') => {
  if (!i18next.isInitialized) {
    i18next.use(initReactI18next).init({
      lng: languageCode,
      fallbackLng: 'en',
      resources: languageResources,
      interpolation: { escapeValue: false },
    });
  } else {
    i18next.changeLanguage(languageCode);
  }
  
  // Allow RTL support for text direction
  // Layout RTL is handled manually through useIsRTL hook and RTL-aware styles
  const isRTL = ['ar', 'ur'].includes(languageCode);
  I18nManager.allowRTL(true);
  I18nManager.swapLeftAndRightInRTL(true);
};


export const changeLanguage = async (lngOrName: string) => {
  try {
    const lng = getLanguageCode(lngOrName) as 'en' | 'ar';
    await i18next.changeLanguage(lng);
    
    // Allow RTL support for text direction
    // Layout RTL is handled manually through useIsRTL hook and RTL-aware styles
    // This allows immediate layout changes without app restart
    I18nManager.allowRTL(true);
    I18nManager.swapLeftAndRightInRTL(true);
    
    return true;
  } catch (error) {
    console.error('Error changing language:', error);
    return false;
  }
};

export default i18next;
