import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useProfile } from '../../context/ProfileContext';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const menuItems = [
  { emoji: '👤', label: 'Edit Profile', sub: 'Update your info' },
  { emoji: '📅', label: 'My Bookings', sub: 'View all sessions' },
  { emoji: '❤️', label: 'Saved Mentors', sub: '3 mentors saved' },
  { emoji: '🔔', label: 'Notifications', sub: 'Manage alerts' },
  { emoji: '🔒', label: 'Privacy & Security', sub: 'Password, 2FA' },
  { emoji: '📄', label: 'Terms of Service', sub: 'Read our terms' },
  { emoji: '🛡️', label: 'Privacy Policy', sub: 'How we use data' },
  { emoji: '💬', label: 'Help & Support', sub: 'Get assistance' },
];

export default function ProfileScreen() {
  const { profile } = useProfile();

  const handleMenuPress = (label: string) => {
    if (label === 'My Bookings') router.push('/(tabs)/dashboard');
    else if (label === 'Saved Mentors') router.push('/(tabs)/mentors');
    else if (label === 'Edit Profile') router.push('/edit-profile');
    else if (label === 'Terms of Service') router.push('/terms-of-service');
    else if (label === 'Privacy Policy' || label === 'Privacy & Security') router.push('/privacy-policy');
    else if (label === 'Help & Support' || label === 'Notifications') router.push('/help-support');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}
      <LinearGradient
        colors={['#4C1D95', '#6B46C1', '#9333EA']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>🧑‍💻</Text>
          </View>
        </View>
        <Text style={styles.userName}>{profile.name}</Text>
        <Text style={styles.userEmail}>{profile.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>🎓 Mentee</Text>
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsRow}>
        {[
          { label: 'Sessions', value: '12' },
          { label: 'Mentors', value: '4' },
          { label: 'Hours', value: '18' },
        ].map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
          key={item.label}
          style={[styles.menuItem, index === menuItems.length - 1 && { borderBottomWidth: 0 }]}
          onPress={() => handleMenuPress(item.label)}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconBox}>
                <Text style={styles.menuEmoji}>{item.emoji}</Text>
              </View>
              <View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <View style={styles.logoutSection}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.logoutText}>🚪 Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>MentorSarthi v1.0.0 • by Enorvia Global</Text>
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 64, paddingBottom: 36, alignItems: 'center' },
  avatarRing: {
    width: 96, height: 96, borderRadius: 48,
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  avatar: {
    width: 84, height: 84, borderRadius: 42,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 44 },
  userName: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  userEmail: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 12 },
  roleBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 6,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  roleText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row', marginHorizontal: 20, marginTop: -20,
    backgroundColor: Colors.white, borderRadius: 20, padding: 20,
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12, shadowRadius: 16, elevation: 8,
    marginBottom: 20,
  },
  statCard: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: Colors.primary },
  statLabel: { fontSize: 12, color: Colors.textGray, marginTop: 4 },
  menuSection: {
    backgroundColor: Colors.white, marginHorizontal: 20,
    borderRadius: 20, overflow: 'hidden',
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  menuIconBox: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center',
  },
  menuEmoji: { fontSize: 20 },
  menuLabel: { fontSize: 14, fontWeight: '700', color: Colors.textDark },
  menuSub: { fontSize: 12, color: Colors.textGray, marginTop: 2 },
  menuArrow: { fontSize: 22, color: Colors.textLight, fontWeight: '300' },
  logoutSection: { alignItems: 'center', marginTop: 24, marginHorizontal: 20 },
  logoutBtn: {
    width: '100%', backgroundColor: '#FEF2F2',
    borderRadius: 16, padding: 16, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#FECACA', marginBottom: 16,
  },
  logoutText: { color: Colors.error, fontSize: 15, fontWeight: '700' },
  versionText: { fontSize: 12, color: Colors.textLight },
});
