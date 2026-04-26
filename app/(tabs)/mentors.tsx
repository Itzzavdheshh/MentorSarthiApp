import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { mentorFilters, mentorMatchesQuery, mentors } from '../../constants/AppData';

function getParamValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function getSelectedFilter(category?: string | string[]) {
  const selectedCategory = getParamValue(category);
  return selectedCategory && mentorFilters.includes(selectedCategory) ? selectedCategory : 'All';
}

export default function MentorsScreen() {
  const { category, search } = useLocalSearchParams<{
    category?: string | string[];
    search?: string | string[];
  }>();
  const selectedFilter = getSelectedFilter(category);
  const [searchText, setSearchText] = useState(getParamValue(search) ?? '');

  useEffect(() => {
    setSearchText(getParamValue(search) ?? '');
  }, [search]);

  const filteredMentors = useMemo(
    () => mentors.filter((mentor) => {
      const matchesFilter = selectedFilter === 'All' || mentor.tag === selectedFilter;
      return matchesFilter && mentorMatchesQuery(mentor, searchText);
    }),
    [selectedFilter, searchText]
  );

  return (
    <View style={styles.container}>
      <View className="w-full max-w-6xl mx-auto pb-8">
      {/* Header */}
      <LinearGradient
        colors={['#4C1D95', '#6B46C1', '#9333EA']}
        className="pt-14 px-5 pb-8 lg:rounded-b-3xl lg:px-8"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Find Mentors</Text>
        <Text style={styles.headerSub}>500+ experts ready to guide you</Text>
        <View className="flex-row items-center bg-white rounded-2xl px-4 h-14 w-full max-w-3xl">
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            placeholder="Search by name or skill..."
            placeholderTextColor={Colors.textGray}
          />
          <TouchableOpacity
            style={styles.filterIconBtn}
            onPress={() => {
              setSearchText('');
              router.setParams({ search: '' });
            }}
          >
            <Text style={styles.filterIcon}>{searchText ? '×' : '⚙️'}</Text>
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
          {mentorFilters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterPill, selectedFilter === f && styles.filterPillActive]}
              onPress={() => router.setParams({ category: f === 'All' ? '' : f })}
            >
              <Text style={[styles.filterText, selectedFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results Count */}
        <View style={styles.resultsRow}>
          <Text style={styles.resultsText}>
            Showing{' '}
            <Text style={styles.resultsCount}>
              {filteredMentors.length} {filteredMentors.length === 1 ? 'mentor' : 'mentors'}
            </Text>
          </Text>
          <TouchableOpacity style={styles.sortBtn}>
            <Text style={styles.sortText}>Sort by: Rating ↓</Text>
          </TouchableOpacity>
        </View>

        {/* Mentor Cards */}
        <View className="px-5 lg:px-8 gap-4 grid sm:grid-cols-2 lg:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <TouchableOpacity
            key={mentor.id}
            style={styles.mentorCard}
            className="!mb-0 flex-1"
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
          {filteredMentors.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No mentors found</Text>
              <Text style={styles.emptyText}>Try another mentor name or category.</Text>
            </View>
          )}
        </View>
        <View style={{ height: 24 }} />
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 4 },
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 16 },
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
  emptyState: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: Colors.textDark, marginBottom: 6 },
  emptyText: { fontSize: 13, color: Colors.textGray, textAlign: 'center' },
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
    overflow: 'hidden',
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
