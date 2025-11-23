import { useAppSelector } from '../store/hooks';


const useIsRTL = (): boolean => {
  const languageCode = useAppSelector((state) => state.language?.code as 'en' | 'ar');
  return ['ar', 'ur'].includes(languageCode || 'en');
};

export default useIsRTL;

