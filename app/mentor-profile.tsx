import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const reviews = [
  { name: 'Sneha R.', rating: 5, comment: 'Amazing session! Very insightful and practical advice.', date: 'Apr 2026' },
  { name: 'Karan M.', rating: 5, comment: 'Priya helped me crack my PM interview. Highly recommended!', date: 'Mar 2026' },
  { name: 'Divya S.', rating: 4, comment: 'Great mentor, very patient and knowledgeable.', date: 'Mar 2026' },
];

const slots = ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];
const days = ['Mon\nApr 28', 'Tue\nApr 29', 'Wed\nApr 30', 'Thu\nMay 1', 'Fri\nMay 2'];

export default function MentorProfileScreen() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(1);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom: 16 }}>
        {/* Header */}
        <LinearGradient
          colors={['#4C1D95', '#6B46C1', '#9333EA']}
          className="pt-14 pb-14 px-5 lg:rounded-b-3xl"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>👩‍💼</Text>
            </View>
            <Text style={styles.mentorName}>Priya Sharma</Text>
            <Text style={styles.mentorRole}>Product Manager @ Google</Text>
            <View style={styles.badgeRow}>
              <View style={styles.badge}><Text style={styles.badgeText}>⭐ 4.9</Text></View>
              <View style={styles.badge}><Text style={styles.badgeText}>📅 234 sessions</Text></View>
              <View style={styles.badge}><Text style={styles.badgeText}>🏆 8 yrs exp</Text></View>
            </View>
          </View>
        </LinearGradient>

        {/* Price + Quick Stats */}
        <View style={styles.priceCard}>
          <View style={styles.priceLeft}>
            <Text style={styles.priceLabel}>Session Rate</Text>
            <Text style={styles.priceValue}>₹1,500 <Text style={styles.priceUnit}>/hr</Text></Text>
          </View>
          <TouchableOpacity
            style={styles.bookNowBtn}
            onPress={() => router.push('/booking')}
          >
            <LinearGradient
              colors={['#6B46C1', '#9333EA']}
              style={styles.bookNowGrad}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.bookNowText}>Book Session →</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap gap-8 px-5 lg:px-8 mt-6">
          <View className="lg:col-span-7">
            {/* About */}
            <View className="mb-6">
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.aboutText}>
                Hi! I'm Priya, a Product Manager at Google with 8+ years of experience in building
                consumer products. I've helped 200+ mentees crack PM interviews at top companies
                including Google, Microsoft, Amazon and Flipkart. I specialize in product strategy,
                roadmap planning, and career transitions into product management.
              </Text>
            </View>

            {/* Expertise */}
            <View className="mb-6">
              <Text style={styles.sectionTitle}>Expertise</Text>
              <View style={styles.tagsRow}>
                {['Product Strategy', 'PM Interviews', 'Roadmapping', 'User Research', 'OKRs', 'Agile'].map((tag) => (
                  <View key={tag} style={styles.expertTag}>
                    <Text style={styles.expertTagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View className="lg:col-span-5">
            {/* Availability */}
            <View className="mb-6">
              <Text style={styles.sectionTitle}>Availability</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysScroll}>
                {days.map((day, i) => (
                  <TouchableOpacity key={day} style={[styles.dayCard, selectedDay === i && styles.dayCardActive]}
                  onPress={() => setSelectedDay(i)}
                  >
                    <Text style={[styles.dayText, selectedDay === i && styles.dayTextActive]}>{day}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.slotsGrid}>
                {slots.map((slot, i) => (
                  <TouchableOpacity key={slot} style={[styles.slotBtn, selectedSlot === i && styles.slotBtnActive]}
                  onPress={() => setSelectedSlot(i)}
                  >
                    <Text style={[styles.slotText, selectedSlot === i && styles.slotTextActive]}>{slot}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Reviews */}
        <View className="px-5 lg:px-8 mt-4">
          <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
          <View className="grid sm:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <View key={r.name} style={styles.reviewCard} className="!mb-0">
              <View style={styles.reviewTop}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.reviewAvatarText}>{r.name[0]}</Text>
                </View>
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewName}>{r.name}</Text>
                  <Text style={styles.reviewDate}>{r.date}</Text>
                </View>
                <Text style={styles.reviewRating}>{'⭐'.repeat(r.rating)}</Text>
              </View>
              <Text style={styles.reviewComment}>{r.comment}</Text>
            </View>
          ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Sticky Book Button */}
      <View style={styles.stickyBook} className="lg:hidden">
        <TouchableOpacity
          style={styles.stickyBookBtn}
          onPress={() => router.push('/booking')}
        >
          <LinearGradient
            colors={['#6B46C1', '#9333EA']}
            style={styles.stickyBookGrad}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.stickyBookText}>🗓️ Book a Session — ₹1,500/hr</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backBtn: { marginBottom: 16 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: '600' },
  profileTop: { alignItems: 'center' },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12, borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarEmoji: { fontSize: 48 },
  mentorName: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 4 },
  mentorRole: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 14 },
  badgeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  priceCard: {
    backgroundColor: Colors.white, marginHorizontal: 20, marginTop: -20,
    borderRadius: 20, padding: 20, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15, shadowRadius: 16, elevation: 8,
  },
  priceLeft: {},
  priceLabel: { fontSize: 12, color: Colors.textGray, marginBottom: 4 },
  priceValue: { fontSize: 24, fontWeight: '800', color: Colors.primary },
  priceUnit: { fontSize: 14, fontWeight: '400', color: Colors.textGray },
  bookNowBtn: { borderRadius: 14, overflow: 'hidden' },
  bookNowGrad: { paddingHorizontal: 20, paddingVertical: 12 },
  bookNowText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.textDark, marginBottom: 12 },
  aboutText: { fontSize: 14, color: Colors.textGray, lineHeight: 22 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  expertTag: {
    backgroundColor: '#F3EEFF', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 7,
    borderWidth: 1, borderColor: Colors.border,
  },
  expertTagText: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  daysScroll: { marginBottom: 14 },
  dayCard: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14,
    backgroundColor: Colors.white, marginRight: 10, alignItems: 'center',
    borderWidth: 1.5, borderColor: Colors.border,
  },
  dayCardActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  dayText: { fontSize: 12, color: Colors.textGray, fontWeight: '600', textAlign: 'center' },
  dayTextActive: { color: '#fff' },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  slotBtn: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 12,
    backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border,
  },
  slotBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  slotText: { fontSize: 13, color: Colors.textDark, fontWeight: '600' },
  slotTextActive: { color: '#fff' },
  reviewCard: {
    backgroundColor: Colors.white, borderRadius: 16, padding: 16,
    marginBottom: 12,
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  reviewTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  reviewAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  reviewAvatarText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  reviewInfo: { flex: 1 },
  reviewName: { fontSize: 14, fontWeight: '700', color: Colors.textDark },
  reviewDate: { fontSize: 11, color: Colors.textGray },
  reviewRating: { fontSize: 12 },
  reviewComment: { fontSize: 13, color: Colors.textGray, lineHeight: 20 },
  stickyBook: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 20, backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  stickyBookBtn: { borderRadius: 16, overflow: 'hidden' },
  stickyBookGrad: { height: 54, alignItems: 'center', justifyContent: 'center' },
  stickyBookText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});