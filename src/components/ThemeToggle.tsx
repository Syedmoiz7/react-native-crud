import React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme.navigationTheme.dark;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isDark ? '#1e90ff' : '#f4f3f4'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default ThemeToggle;
