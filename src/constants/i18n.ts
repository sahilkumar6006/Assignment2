export type Lang = 'en' | 'ar';

export const dict = {
  home: { en: 'Home', ar: 'الرئيسية' },
  settings: { en: 'Settings', ar: 'الإعدادات' },
  language: { en: 'Language', ar: 'اللغة' },
  english: { en: 'English', ar: 'الإنجليزية' },
  arabic: { en: 'Arabic', ar: 'العربية' },
  add: { en: 'Add to Cart', ar: 'أضف إلى السلة' },
  added: { en: 'Added', ar: 'تمت الإضافة' },
} as const;

export type DictKey = keyof typeof dict;

export const makeTranslator = (lang: Lang) => (key: DictKey): string => dict[key][lang];
