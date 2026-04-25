import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Colors } from '../../constants/Colors';

const upcoming = [
  { id: 1, mentor: 'Priya Sharma', emoji: '👩‍💼', topic: 'Product Strategy', date: 'Apr 27', time: '6:00 PM', status: 'confirmed' },
  { id: 2, mentor: 'Rahul Verma', emoji: '👨‍💻', topic: 'DSA Interview Prep', date: 'Apr 29', time: '8:00 PM', status: 'pending' },
];

const past = [
  { id: 1, mentor: 'Anita Nair', emoji: '👩‍🎨', topic: 'UX Portfolio Review', date: 'Apr 20', rating: 5 },
  { id: 2, mentor: 'Vikram Singh', emoji: '👨‍🚀', topic: 'Startup Roadmap', date: 'Apr 15', rating: 4 },
];

const quickActions = [
  { emoji: '📅', label: 'Book Session', action: () => {} },
  { emoji: '🔄', label: 'Reschedule', action: () => {} },
  { emoji: '📝', label: 'My Notes', action: () => {} },
  { emoji: '🎯', label: 'Set Goals', action: () => {} },
];

export default function DashboardScreen() {
  const handleJoin = (mentor: string) => {
    Alert.alert('🎉 Joining Session', `Connecting you to ${mentor}'s session...`, [{ text: 'OK' }]);
  };

  const handleRebook = () => {
    router.push('/booking');
  };

  const handleQuickAction = (label: string) => {
    if (label === 'Book Session') router.push('/(tabs)/mentors');
    else if (label === 'Reschedule') router.push('/booking');
    else Alert.alert('Coming Soon', `${label} feature coming soon!`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#4C1D95', '#6B46C1', '#9333EA']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>My Dashboard</Text>
        <Text style={styles.headerSub}>Track your mentorship journey</Text>
        <View style={styles.statsRow}>
          {[
            { label: 'Sessions', value: '12', emoji: '📅' },
            { label: 'Hours', value: '18', emoji: '⏱️' },
            { label: 'Mentors', value: '4', emoji: '👨‍💼' },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statEmoji}>{s.emoji}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Upcoming Sessions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
        {upcoming.map((s) => (
          <View key={s.id} style={styles.sessionCard}>
            <View style={styles.sessionLeft}>
              <View style={styles.sessionAvatar}>
                <Text style={styles.sessionEmoji}>{s.emoji}</Text>
              </View>
              <View>
                <Text style={styles.sessionMentor}>{s.mentor}</Text>
                <Text style={styles.sessionTopic}>{s.topic}</Text>
                <Text style={styles.sessionTime}>📅 {s.date} • ⏰ {s.time}</Text>
              </View>
            </View>
            <View style={styles.sessionRight}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: s.status === 'confirmed' ? '#D1FAE5' : '#FEF3C7' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: s.status === 'confirmed' ? '#065F46' : '#92400E' }
                ]}>
                  {s.status === 'confirmed' ? '✅ Confirmed' : '⏳ Pending'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.joinBtn}
                onPress={() => handleJoin(s.mentor)}
              >
                <Text style={styles.joinBtnText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Past Sessions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Sessions</Text>
        {past.map((s) => (
          <View key={s.id} style={styles.pastCard}>
            <View style={styles.sessionAvatar}>
              <Text style={styles.sessionEmoji}>{s.emoji}</Text>
            </View>
            <View style={styles.pastInfo}>
              <Text style={styles.sessionMentor}>{s.mentor}</Text>
              <Text style={styles.sessionTopic}>{s.topic}</Text>
              <Text style={styles.sessionTime}>📅 {s.date}</Text>
            </View>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>{'⭐'.repeat(s.rating)}</Text>
              <TouchableOpacity style={styles.rebookBtn} onPress={handleRebook}>
                <Text style={styles.rebookText}>Rebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((a) => (
            <TouchableOpacity
              key={a.label}
              style={styles.actionCard}
              onPress={() => handleQuickAction(a.label)}
            >
              <Text style={styles.actionEmoji}>{a.emoji}</Text>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 32 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 4 },
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16, padding: 14, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
  },
  statEmoji: { fontSize: 22, marginBottom: 6 },
  statValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.textDark, marginBottom: 14 },
  sessionCard: {
    backgroundColor: Colors.white, borderRadius: 18, padding: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  sessionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  sessionAvatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  sessionEmoji: { fontSize: 26 },
  sessionMentor: { fontSize: 14, fontWeight: '700', color: Colors.textDark },
  sessionTopic: { fontSize: 12, color: Colors.textGray, marginVertical: 2 },
  sessionTime: { fontSize: 11, color: Colors.primary, fontWeight: '600' },
  sessionRight: { alignItems: 'flex-end', gap: 8 },
  statusBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 11, fontWeight: '700' },
  joinBtn: {
    backgroundColor: Colors.primary, borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 7,
  },
  joinBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  pastCard: {
    backgroundColor: Colors.white, borderRadius: 18, padding: 16,
    flexDirection: 'row', alignItems: 'center', marginBottom: 12,
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  pastInfo: { flex: 1, marginLeft: 12 },
  ratingBox: { alignItems: 'flex-end', gap: 6 },
  ratingText: { fontSize: 12 },
  rebookBtn: {
    borderWidth: 1.5, borderColor: Colors.primary,
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 5,
  },
  rebookText: { color: Colors.primary, fontSize: 11, fontWeight: '700' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: {
    width: '47%', backgroundColor: Colors.white, borderRadius: 18,
    padding: 20, alignItems: 'center',
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  actionEmoji: { fontSize: 32, marginBottom: 10 },
  actionLabel: { fontSize: 13, fontWeight: '700', color: Colors.textDark },
});