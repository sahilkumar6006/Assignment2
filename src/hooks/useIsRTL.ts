import { useAppSelector } from '../store/hooks';

/**
 * Hook to determine if the current language is RTL (Right-to-Left)
 * Reads from Redux language state
 * 
 * @returns {boolean} true if current language is RTL (Arabic, Urdu, etc.), false otherwise
 * 
 * @example
 * const isRTL = useIsRTL();
 * const styles = useMemo(() => StyleSheet.create({
 *   container: {
 *     flexDirection: isRTL ? 'row-reverse' : 'row',
 *     textAlign: isRTL ? 'right' : 'left',
 *   }
 * }), [isRTL]);
 */
const useIsRTL = (): boolean => {
  const languageCode = useAppSelector((state) => state.language?.code as 'en' | 'ar');
  return ['ar', 'ur'].includes(languageCode || 'en');
};

export default useIsRTL;

