import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import MainNavigator from './src/navigation/MainNavigator';
import { ThemeProvider, useThemeContext } from './src/theme/ThemeContext';

const AppContent = () => {
  const { theme } = useThemeContext();

  return (
    <NavigationContainer theme={theme.navigationTheme}>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}
