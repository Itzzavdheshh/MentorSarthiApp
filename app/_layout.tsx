import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform, Text } from 'react-native';

export default function RootLayout() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarLogo}>
            <Text style={styles.logoEmoji}>🎯</Text>
            <Text style={styles.logoText}>MentorSarthi</Text>
          </View>
          <Text style={styles.sidebarTagline}>Your Growth. Our Mission.</Text>
          <View style={styles.sidebarDivider} />
          <View style={styles.sidebarLinks}>
            {['🏠  Home', '👨‍💼  Mentors', '📊  Dashboard', '👤  Profile'].map((item) => (
              <View key={item} style={styles.sidebarLink}>
                <Text style={styles.sidebarLinkText}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.sidebarBottom}>
            <Text style={styles.sidebarBottomText}>by Enorvia Global</Text>
            <Text style={styles.sidebarVersion}>v1.0.0</Text>
          </View>
        </View>

        {/* Center — App */}
        <View style={styles.centerPanel}>
          <View style={styles.phoneFrame}>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="register" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="mentor-profile" />
              <Stack.Screen name="booking" />
            </Stack>
          </View>
        </View>

        {/* Right Panel */}
        <View style={styles.rightPanel}>
          <Text style={styles.rightTitle}>Platform Stats</Text>
          {[
            { emoji: '👨‍💼', label: 'Expert Mentors', value: '500+' },
            { emoji: '📅', label: 'Sessions Done', value: '10,000+' },
            { emoji: '⭐', label: 'Avg Rating', value: '4.9 / 5' },
            { emoji: '🏢', label: 'B2B Clients', value: '50+' },
            { emoji: '🌍', label: 'Cities', value: '20+' },
          ].map((s) => (
            <View key={s.label} style={styles.statRow}>
              <Text style={styles.statRowEmoji}>{s.emoji}</Text>
              <View style={styles.statRowInfo}>
                <Text style={styles.statRowValue}>{s.value}</Text>
                <Text style={styles.statRowLabel}>{s.label}</Text>
              </View>
            </View>
          ))}
          <View style={styles.rightDivider} />
          <Text style={styles.rightTitle}>Why MentorSarthi?</Text>
          {[
            '✅ 1-on-1 expert sessions',
            '✅ Live workshops & events',
            '✅ B2B corporate mentoring',
            '✅ Flexible scheduling',
            '✅ Secure Razorpay payments',
          ].map((item) => (
            <Text key={item} style={styles.featureItem}>{item}</Text>
          ))}
        </View>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="mentor-profile" />
        <Stack.Screen name="booking" />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0F0520',
    minHeight: '100vh' as any,
  },
  sidebar: {
    width: 240,
    backgroundColor: '#1a0533',
    paddingTop: 40,
    paddingHorizontal: 24,
    borderRightWidth: 1,
    borderRightColor: 'rgba(107,70,193,0.3)',
  },
  sidebarLogo: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  logoEmoji: { fontSize: 28 },
  logoText: { fontSize: 20, fontWeight: '800', color: '#fff' },
  sidebarTagline: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 24 },
  sidebarDivider: { height: 1, backgroundColor: 'rgba(107,70,193,0.3)', marginBottom: 24 },
  sidebarLinks: { gap: 8 },
  sidebarLink: {
    paddingVertical: 12, paddingHorizontal: 16,
    borderRadius: 12, backgroundColor: 'rgba(107,70,193,0.15)',
  },
  sidebarLinkText: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '600' },
  sidebarBottom: { position: 'absolute' as any, bottom: 32, left: 24 },
  sidebarBottomText: { color: 'rgba(255,255,255,0.4)', fontSize: 12 },
  sidebarVersion: { color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 4 },
  centerPanel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    backgroundColor: '#0F0520',
  },
  phoneFrame: {
    width: 390,
    height: 780,
    borderRadius: 48,
    overflow: 'hidden',
    borderWidth: 8,
    borderColor: 'rgba(107,70,193,0.6)',
    shadowColor: '#9333EA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
  },
  rightPanel: {
    width: 260,
    backgroundColor: '#1a0533',
    paddingTop: 40,
    paddingHorizontal: 24,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(107,70,193,0.3)',
  },
  rightTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 16,
    textTransform: 'uppercase' as any,
    letterSpacing: 1,
  },
  statRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, marginBottom: 16,
    backgroundColor: 'rgba(107,70,193,0.15)',
    padding: 12, borderRadius: 12,
  },
  statRowEmoji: { fontSize: 24 },
  statRowInfo: {},
  statRowValue: { fontSize: 16, fontWeight: '800', color: '#9333EA' },
  statRowLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  rightDivider: { height: 1, backgroundColor: 'rgba(107,70,193,0.3)', marginVertical: 20 },
  featureItem: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 10, fontWeight: '500' },
});