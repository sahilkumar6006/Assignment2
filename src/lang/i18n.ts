import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import en from './en.json';
import ar from './ar.json';
import { store } from '../store';

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
    compatibilityJSON: 'v3',
    lng: (store.getState().language?.code as 'en' | 'ar') ?? 'en',
    fallbackLng: 'en',
    resources: languageResources,
    interpolation: { escapeValue: false },
  });
}

export const changeLanguage = async (lngOrName: string) => {
  try {
    const lng = getLanguageCode(lngOrName);
    await i18next.changeLanguage(lng);
    const isRTL = ['ar', 'ur'].includes(lng);
    I18nManager.forceRTL(isRTL);
    return true;
  } catch (error) {
    console.error('Error changing language:', error);
    return false;
  }
};

export default i18next;
