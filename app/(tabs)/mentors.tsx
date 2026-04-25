import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const filters = ['All', 'Tech', 'Design', 'Business', 'Finance', 'Career'];

const mentors = [
  { id: 1, name: 'Priya Sharma', role: 'Product Manager @ Google', rating: 4.9, sessions: 234, emoji: '👩‍💼', tag: 'Tech', price: '₹1,500/hr', exp: '8 yrs' },
  { id: 2, name: 'Rahul Verma', role: 'SDE-3 @ Amazon', rating: 4.8, sessions: 189, emoji: '👨‍💻', tag: 'Tech', price: '₹1,200/hr', exp: '6 yrs' },
  { id: 3, name: 'Anita Nair', role: 'UX Lead @ Swiggy', rating: 4.95, sessions: 312, emoji: '👩‍🎨', tag: 'Design', price: '₹1,000/hr', exp: '7 yrs' },
  { id: 4, name: 'Vikram Singh', role: 'Startup Founder', rating: 4.7, sessions: 156, emoji: '👨‍🚀', tag: 'Business', price: '₹2,000/hr', exp: '10 yrs' },
  { id: 5, name: 'Neha Gupta', role: 'Data Scientist @ Flipkart', rating: 4.85, sessions: 98, emoji: '👩‍🔬', tag: 'Tech', price: '₹900/hr', exp: '5 yrs' },
  { id: 6, name: 'Arjun Mehta', role: 'Investment Banker', rating: 4.75, sessions: 201, emoji: '👨‍💰', tag: 'Finance', price: '₹1,800/hr', exp: '9 yrs' },
];

export default function MentorsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4C1D95', '#6B46C1', '#9333EA']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Find Mentors</Text>
        <Text style={styles.headerSub}>500+ experts ready to guide you</Text>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or skill..."
            placeholderTextColor={Colors.textGray}
          />
          <TouchableOpacity style={styles.filterIconBtn}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        >
          {filters.map((f, i) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterPill, i === 0 && styles.filterPillActive]}
            >
              <Text style={[styles.filterText, i === 0 && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results Count */}
        <View style={styles.resultsRow}>
          <Text style={styles.resultsText}>Showing <Text style={styles.resultsCount}>6 mentors</Text></Text>
          <TouchableOpacity style={styles.sortBtn}>
            <Text style={styles.sortText}>Sort by: Rating ↓</Text>
          </TouchableOpacity>
        </View>

        {/* Mentor Cards */}
        <View style={styles.mentorList}>
          {mentors.map((mentor) => (
            <TouchableOpacity
            key={mentor.id}
            style={styles.mentorCard}
            onPress={() => router.push('/mentor-profile')}
            >
              {/* Left */}
              <View style={styles.mentorLeft}>
                <View style={styles.avatarWrapper}>
                  <Text style={styles.avatarEmoji}>{mentor.emoji}</Text>
                </View>
              </View>

              {/* Middle */}
              <View style={styles.mentorInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.mentorName}>{mentor.name}</Text>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagText}>{mentor.tag}</Text>
                  </View>
                </View>
                <Text style={styles.mentorRole}>{mentor.role}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaItem}>⭐ {mentor.rating}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaItem}>📅 {mentor.sessions} sessions</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaItem}>🏆 {mentor.exp}</Text>
                </View>
                <View style={styles.bottomRow}>
                  <Text style={styles.price}>{mentor.price}</Text>
                  <TouchableOpacity style={styles.bookBtn}
                  onPress={() => router.push('/mentor-profile')}
                  >
                    <LinearGradient
                      colors={['#6B46C1', '#9333EA']}
                      style={styles.bookBtnGrad}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.bookBtnText}>Book</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 28 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 4 },
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 16 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16,
    paddingHorizontal: 16, height: 50,
  },
  searchIcon: { fontSize: 18, marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: Colors.textDark },
  filterIconBtn: { padding: 4 },
  filterIcon: { fontSize: 20 },
  filterScroll: { marginTop: 16, marginBottom: 4 },
  filterPill: {
    paddingHorizontal: 18, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1.5,
    borderColor: Colors.border, backgroundColor: Colors.white,
  },
  filterPillActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontSize: 13, fontWeight: '600', color: Colors.textGray },
  filterTextActive: { color: '#fff' },
  resultsRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, marginVertical: 12,
  },
  resultsText: { fontSize: 13, color: Colors.textGray },
  resultsCount: { color: Colors.primary, fontWeight: '700' },
  sortBtn: {
    backgroundColor: Colors.white, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: Colors.border,
  },
  sortText: { fontSize: 12, color: Colors.textDark, fontWeight: '600' },
  mentorList: { paddingHorizontal: 20, gap: 14 },
  mentorCard: {
    backgroundColor: Colors.white, borderRadius: 20,
    padding: 16, flexDirection: 'row',
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  mentorLeft: { marginRight: 14 },
  avatarWrapper: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.border,
  },
  avatarEmoji: { fontSize: 36 },
  mentorInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  mentorName: { fontSize: 15, fontWeight: '800', color: Colors.textDark },
  tagBadge: {
    backgroundColor: '#F3EEFF', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  tagText: { fontSize: 10, color: Colors.primary, fontWeight: '700' },
  mentorRole: { fontSize: 12, color: Colors.textGray, marginBottom: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 4 },
  metaItem: { fontSize: 11, color: Colors.textDark, fontWeight: '500' },
  metaDot: { fontSize: 11, color: Colors.textLight, marginHorizontal: 2 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 15, fontWeight: '800', color: Colors.primary },
  bookBtn: { borderRadius: 10, overflow: 'hidden' },
  bookBtnGrad: { paddingHorizontal: 20, paddingVertical: 8, alignItems: 'center' },
  bookBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});