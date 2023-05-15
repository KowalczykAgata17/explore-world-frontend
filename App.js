import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import AppStackNavigator from './navigation/AppNavigator';

LogBox.ignoreAllLogs(); // Ignore all log notifications

export default function App() {
  return (
    <AppStackNavigator />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
