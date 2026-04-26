import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { ProfileProvider } from '../context/ProfileContext';
import ResponsiveLayout from '../components/ResponsiveLayout';
import '../global.css';

export default function RootLayout() {
  if (Platform.OS === 'web') {
    return (
      <ProfileProvider>
        <ResponsiveLayout>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0F0520' } }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="mentor-profile" />
            <Stack.Screen name="booking" />
            <Stack.Screen name="workshop" />
            <Stack.Screen name="edit-profile" />
            <Stack.Screen name="terms-of-service" />
            <Stack.Screen name="privacy-policy" />
            <Stack.Screen name="help-support" />
          </Stack>
        </ResponsiveLayout>
      </ProfileProvider>
    );
  }

  return (
    <ProfileProvider>
      <ResponsiveLayout>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0F0520' } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="mentor-profile" />
          <Stack.Screen name="booking" />
          <Stack.Screen name="workshop" />
          <Stack.Screen name="edit-profile" />
          <Stack.Screen name="terms-of-service" />
          <Stack.Screen name="privacy-policy" />
          <Stack.Screen name="help-support" />
        </Stack>
      </ResponsiveLayout>
    </ProfileProvider>
  );
}

