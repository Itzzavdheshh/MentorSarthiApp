import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';

const slots = ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];
const days = ['Mon, Apr 28', 'Tue, Apr 29', 'Wed, Apr 30', 'Thu, May 1', 'Fri, May 2'];
const durations = ['30 min — ₹750', '60 min — ₹1,500', '90 min — ₹2,250'];

export default function BookingScreen() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState(1);

  const handlePayment = () => {
    Alert.alert(
      '🎉 Booking Confirmed!',
      'Your session with Priya Sharma has been booked for Apr 29 at 12:00 PM. You will receive a confirmation email shortly.',
      [{ text: 'Go to Dashboard', onPress: () => router.replace('/(tabs)/dashboard') }]
    );
  };

  return (
    <View style={{ paddingBottom: 16, flex: 1 , backgroundColor: Colors.background}}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <LinearGradient
          colors={['#4C1D95', '#6B46C1', '#9333EA']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book a Session</Text>
          <Text style={styles.headerSub}>with Priya Sharma</Text>
        </LinearGradient>

        {/* Mentor Summary */}
        <View style={styles.mentorCard}>
          <View style={styles.mentorAvatar}>
            <Text style={styles.mentorEmoji}>👩‍💼</Text>
          </View>
          <View style={styles.mentorInfo}>
            <Text style={styles.mentorName}>Priya Sharma</Text>
            <Text style={styles.mentorRole}>Product Manager @ Google</Text>
            <Text style={styles.mentorRating}>⭐ 4.9 • 234 sessions</Text>
          </View>
        </View>

        {/* Select Day */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {days.map((day, i) => (
              <TouchableOpacity
                key={day}
                style={[styles.dayBtn, selectedDay === i && styles.dayBtnActive]}
                onPress={() => setSelectedDay(i)}
              >
                <Text style={[styles.dayText, selectedDay === i && styles.dayTextActive]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Select Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏰ Select Time</Text>
          <View style={styles.slotsGrid}>
            {slots.map((slot, i) => (
              <TouchableOpacity
                key={slot}
                style={[styles.slotBtn, selectedSlot === i && styles.slotBtnActive]}
                onPress={() => setSelectedSlot(i)}
              >
                <Text style={[styles.slotText, selectedSlot === i && styles.slotTextActive]}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Select Duration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏱️ Session Duration</Text>
          {durations.map((dur, i) => (
            <TouchableOpacity
              key={dur}
              style={[styles.durationBtn, selectedDuration === i && styles.durationBtnActive]}
              onPress={() => setSelectedDuration(i)}
            >
              <Text style={[styles.durationText, selectedDuration === i && styles.durationTextActive]}>{dur}</Text>
              {selectedDuration === i && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧾 Order Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Mentor</Text>
              <Text style={styles.summaryValue}>Priya Sharma</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>{days[selectedDay]}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Time</Text>
              <Text style={styles.summaryValue}>{slots[selectedSlot]}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration</Text>
              <Text style={styles.summaryValue}>{durations[selectedDuration].split('—')[0].trim()}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{durations[selectedDuration].split('—')[1].trim()}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.paySection}>
        <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
          <LinearGradient
            colors={['#6B46C1', '#9333EA']}
            style={styles.payGrad}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.payText}>💳 Pay & Confirm Booking</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.payNote}>🔒 Secured by Razorpay</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 56, paddingBottom: 28, paddingHorizontal: 20 },
  backBtn: { marginBottom: 16 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: '600' },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  mentorCard: {
    backgroundColor: Colors.white, marginHorizontal: 20, marginTop: -16,
    borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center',
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12, shadowRadius: 16, elevation: 8, gap: 14,
  },
  mentorAvatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center',
  },
  mentorEmoji: { fontSize: 32 },
  mentorInfo: {},
  mentorName: { fontSize: 16, fontWeight: '800', color: Colors.textDark },
  mentorRole: { fontSize: 12, color: Colors.textGray, marginVertical: 2 },
  mentorRating: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: Colors.textDark, marginBottom: 14 },
  dayBtn: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12,
    backgroundColor: Colors.white, marginRight: 10,
    borderWidth: 1.5, borderColor: Colors.border,
  },
  dayBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  dayText: { fontSize: 13, color: Colors.textGray, fontWeight: '600' },
  dayTextActive: { color: '#fff' },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  slotBtn: {
    paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12,
    backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border,
  },
  slotBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  slotText: { fontSize: 14, color: Colors.textDark, fontWeight: '600' },
  slotTextActive: { color: '#fff' },
  durationBtn: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, borderRadius: 14, backgroundColor: Colors.white,
    borderWidth: 1.5, borderColor: Colors.border, marginBottom: 10,
  },
  durationBtnActive: { borderColor: Colors.primary, backgroundColor: '#F3EEFF' },
  durationText: { fontSize: 15, color: Colors.textDark, fontWeight: '600' },
  durationTextActive: { color: Colors.primary },
  checkmark: { fontSize: 18, color: Colors.primary, fontWeight: '800' },
  summaryCard: {
    backgroundColor: Colors.white, borderRadius: 20, padding: 20,
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: 14, color: Colors.textGray },
  summaryValue: { fontSize: 14, color: Colors.textDark, fontWeight: '600' },
  summaryDivider: { height: 1, backgroundColor: Colors.border, marginVertical: 8 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: Colors.textDark },
  totalValue: { fontSize: 18, fontWeight: '800', color: Colors.primary },
  paySection: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 20, backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.border, alignItems: 'center',
  },
  payBtn: { width: '100%', borderRadius: 16, overflow: 'hidden', marginBottom: 8 },
  payGrad: { height: 54, alignItems: 'center', justifyContent: 'center' },
  payText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  payNote: { fontSize: 12, color: Colors.textGray },
});