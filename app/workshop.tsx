import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { workshops } from '../constants/AppData';
import { Colors } from '../constants/Colors';

export default function WorkshopScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4C1D95', '#6B46C1', '#9333EA']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Workshops</Text>
            <Text style={styles.headerSub}>Live sessions to sharpen your next move</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {workshops.map((workshop) => (
          <TouchableOpacity
            key={workshop.id}
            style={styles.workshopCard}
            onPress={() => router.push('/booking')}
          >
            <View style={styles.workshopLeft}>
              <View style={styles.workshopEmojiBox}>
                <Text style={styles.workshopEmoji}>{workshop.emoji}</Text>
              </View>
              <View style={styles.workshopInfo}>
                <Text style={styles.workshopTitle}>{workshop.title}</Text>
                <Text style={styles.workshopDate}>📅 {workshop.date}</Text>
                <Text style={styles.workshopSeats}>🪑 {workshop.seats} seats left</Text>
              </View>
            </View>
            <View style={styles.workshopRight}>
              <Text style={styles.workshopPrice}>{workshop.price}</Text>
              <TouchableOpacity
                style={styles.joinBtn}
                onPress={() => router.push('/booking')}
              >
                <Text style={styles.joinBtnText}>Join</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 28 },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { color: '#fff', fontSize: 34, fontWeight: '500', lineHeight: 38 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 4 },
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.75)' },
  content: { padding: 20, gap: 14, paddingBottom: 32 },
  workshopCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#6B46C1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  workshopLeft: { flexDirection: 'row', flex: 1, marginRight: 12 },
  workshopEmojiBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  workshopEmoji: { fontSize: 26 },
  workshopInfo: { flex: 1 },
  workshopTitle: { fontSize: 15, fontWeight: '800', color: Colors.textDark, marginBottom: 5 },
  workshopDate: { fontSize: 12, color: Colors.textGray, marginBottom: 3 },
  workshopSeats: { fontSize: 12, color: Colors.warning, fontWeight: '600' },
  workshopRight: { alignItems: 'center' },
  workshopPrice: { fontSize: 15, fontWeight: '800', color: Colors.primary, marginBottom: 8 },
  joinBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  joinBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
