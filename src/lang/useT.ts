import { useAppSelector } from '../store/hooks';
import en from './en.json';
import ar from './ar.json';

type Dict = Record<string, string>;
const DICTS: Record<'en' | 'ar', Dict> = { en, ar } as const;

function interpolate(template: string, values?: Record<string, string | number>) {
  if (!values) return template;
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, k: string) =>
    values[k] !== undefined && values[k] !== null ? String(values[k]) : ''
  );
}

export const useT = () => {
  const lang = useAppSelector((s) => (s.language?.code ?? 'en') as 'en' | 'ar');
  const dict = DICTS[lang] || DICTS.en;
  return (key: string, values?: Record<string, string | number>) =>
    interpolate(dict[key] ?? key, values);
};
