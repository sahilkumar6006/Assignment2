import React, { useEffect } from 'react'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/store'
import { RootStack } from './src/routes/RootNavigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { initializeLanguage } from './src/lang/i18n'
import { useAppSelector } from './src/store/hooks'

enableScreens()

const LanguageInitializer = ({ children }: { children: React.ReactNode }) => {
  const languageCode = useAppSelector((state) => state.language?.code as 'en' | 'ar');
  
  useEffect(() => {
    if (languageCode) {
      initializeLanguage(languageCode);
    }
  }, []);
  
  return <>{children}</>;
};

const AppContent = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PersistGate 
        persistor={persistor}
        loading={null} // You can add a loading component here if needed
      >
        <LanguageInitializer>
          <RootStack/>
        </LanguageInitializer>
      </PersistGate>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App