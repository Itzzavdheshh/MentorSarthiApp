import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  categories,
  findCategoryLabel,
  mentorMatchesQuery,
  mentors,
  workshops,
} from '../../constants/AppData';
import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const searchQuery = searchText.trim();
  const visibleMentors = useMemo(
    () => searchQuery
      ? mentors.filter((mentor) => mentorMatchesQuery(mentor, searchQuery))
      : mentors.slice(0, 4),
    [searchQuery]
  );

  const openMentorSearch = () => {
    const category = findCategoryLabel(searchQuery);

    router.push({
      pathname: '/(tabs)/mentors',
      params: category
        ? { category }
        : searchQuery
          ? { search: searchQuery }
          : {},
    });
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
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good Morning 👋</Text>
            <Text style={styles.userName}>Find Your Mentor</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => router.push('/(tabs)/dashboard')}>
            <Text style={styles.notifEmoji}>🔔</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={openMentorSearch}
            returnKeyType="search"
            placeholder="Search mentors, categories..."
            placeholderTextColor={Colors.textGray}
          />
        </View>
      </LinearGradient>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {[
          { label: 'Mentors', value: '500+', emoji: '👨‍💼' },
          { label: 'Sessions', value: '10K+', emoji: '📅' },
          { label: 'Rating', value: '4.9★', emoji: '⭐' },
        ].map((stat) => (
          <TouchableOpacity key={stat.label} style={styles.statCard} onPress={() => router.push('/(tabs)/mentors')}>
            <Text style={styles.statEmoji}>{stat.emoji}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.label}
              style={styles.categoryCard}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/mentors',
                  params: { category: cat.label },
                })
              }
            >
              <View style={styles.categoryIcon}>
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              </View>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Top Mentors */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{searchQuery ? 'Search Results' : 'Top Mentors'}</Text>
          <TouchableOpacity onPress={openMentorSearch}>
            <Text style={styles.seeAll}>See All →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {visibleMentors.map((mentor) => (
            <TouchableOpacity
              key={mentor.id}
              style={styles.mentorCard}
              onPress={() => router.push('/mentor-profile')}
            >
              <View style={styles.mentorAvatar}>
                <Text style={styles.mentorEmoji}>{mentor.emoji}</Text>
              </View>
              <View style={styles.mentorTagBadge}>
                <Text style={styles.mentorTagText}>{mentor.tag}</Text>
              </View>
              <Text style={styles.mentorName}>{mentor.name}</Text>
              <Text style={styles.mentorRole} numberOfLines={2}>{mentor.role}</Text>
              <View style={styles.mentorMeta}>
                <Text style={styles.mentorRating}>⭐ {mentor.rating}</Text>
                <Text style={styles.mentorSessions}>{mentor.sessions} sessions</Text>
              </View>
              <TouchableOpacity
                style={styles.bookBtn}
                onPress={() => router.push('/mentor-profile')}
              >
                <Text style={styles.bookBtnText}>Book Now</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {visibleMentors.length === 0 && (
          <View style={styles.emptySearchCard}>
            <Text style={styles.emptySearchTitle}>No mentors found</Text>
            <Text style={styles.emptySearchText}>Try another mentor name or category.</Text>
          </View>
        )}
      </View>

      {/* Upcoming Workshops */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Workshops</Text>
          <TouchableOpacity onPress={() => router.push('/workshop')}>
            <Text style={styles.seeAll}>See All →</Text>
          </TouchableOpacity>
        </View>
        {workshops.slice(0, 3).map((w) => (
          <TouchableOpacity
            key={w.id}
            style={styles.workshopCard}
            onPress={() => router.push('/booking')}
          >
            <View style={styles.workshopLeft}>
              <View style={styles.workshopEmojiBox}>
                <Text style={styles.workshopEmoji}>{w.emoji}</Text>
              </View>
              <View style={styles.workshopInfo}>
                <Text style={styles.workshopTitle}>{w.title}</Text>
                <Text style={styles.workshopDate}>📅 {w.date}</Text>
                <Text style={styles.workshopSeats}>🪑 {w.seats} seats left</Text>
              </View>
            </View>
            <View style={styles.workshopRight}>
              <Text style={styles.workshopPrice}>{w.price}</Text>
              <TouchableOpacity
                style={styles.joinBtn}
                onPress={() => router.push('/booking')}
              >
                <Text style={styles.joinBtnText}>Join</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 32 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  greeting: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  userName: { fontSize: 26, fontWeight: '800', color: '#fff' },
  notifBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  notifEmoji: { fontSize: 20 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16,
    paddingHorizontal: 16, height: 50,
  },
  searchIcon: { fontSize: 18, marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: Colors.textDark },
  statsRow: {
    flexDirection: 'row', marginHorizontal: 20,
    marginTop: -20, gap: 12, marginBottom: 8,
  },
  statCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: 16,
    padding: 14, alignItems: 'center',
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  statEmoji: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '800', color: Colors.primary },
  statLabel: { fontSize: 11, color: Colors.textGray, marginTop: 2 },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.textDark, marginBottom: 14 },
  seeAll: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  categoryScroll: { marginLeft: -4 },
  categoryCard: { alignItems: 'center', marginRight: 16 },
  categoryIcon: {
    width: 60, height: 60, borderRadius: 20,
    backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
    marginBottom: 8,
  },
  categoryEmoji: { fontSize: 28 },
  categoryLabel: { fontSize: 12, fontWeight: '600', color: Colors.textDark },
  emptySearchCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptySearchTitle: { fontSize: 15, fontWeight: '800', color: Colors.textDark, marginBottom: 6 },
  emptySearchText: { fontSize: 12, color: Colors.textGray, textAlign: 'center' },
  mentorCard: {
    width: 170, backgroundColor: Colors.white, borderRadius: 20,
    padding: 16, marginRight: 14,
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 12, elevation: 4,
  },
  mentorAvatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  mentorEmoji: { fontSize: 32 },
  mentorTagBadge: {
    backgroundColor: '#F3EEFF', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 3,
    alignSelf: 'flex-start', marginBottom: 8,
  },
  mentorTagText: { fontSize: 10, color: Colors.primary, fontWeight: '700' },
  mentorName: { fontSize: 14, fontWeight: '700', color: Colors.textDark, marginBottom: 4 },
  mentorRole: { fontSize: 11, color: Colors.textGray, marginBottom: 10, lineHeight: 16 },
  mentorMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  mentorRating: { fontSize: 12, fontWeight: '700', color: Colors.textDark },
  mentorSessions: { fontSize: 10, color: Colors.textGray },
  bookBtn: {
    backgroundColor: Colors.primary, borderRadius: 10,
    paddingVertical: 8, alignItems: 'center',
  },
  bookBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  workshopCard: {
    backgroundColor: Colors.white, borderRadius: 16, padding: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  workshopLeft: { flexDirection: 'row', flex: 1, marginRight: 12 },
  workshopEmojiBox: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  workshopEmoji: { fontSize: 24 },
  workshopInfo: { flex: 1 },
  workshopTitle: { fontSize: 14, fontWeight: '700', color: Colors.textDark, marginBottom: 4 },
  workshopDate: { fontSize: 11, color: Colors.textGray, marginBottom: 2 },
  workshopSeats: { fontSize: 11, color: Colors.warning },
  workshopRight: { alignItems: 'center' },
  workshopPrice: { fontSize: 14, fontWeight: '800', color: Colors.primary, marginBottom: 8 },
  joinBtn: {
    backgroundColor: Colors.primary, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 7,
  },
  joinBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
