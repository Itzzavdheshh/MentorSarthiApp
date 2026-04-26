import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { useProfile, UserProfile } from '../context/ProfileContext';

const fields: {
  key: keyof UserProfile;
  label: string;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}[] = [
  { key: 'name', label: 'Name', placeholder: 'Enter your name' },
  { key: 'email', label: 'Email', placeholder: 'Enter your email', keyboardType: 'email-address' },
  { key: 'phone', label: 'Phone Number', placeholder: 'Enter your phone number', keyboardType: 'phone-pad' },
  { key: 'dob', label: 'Date of Birth', placeholder: 'DD MMM YYYY' },
];

export default function EditProfileScreen() {
  const { profile, updateProfile } = useProfile();
  const [form, setForm] = useState(profile);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const updateField = (key: keyof UserProfile, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      Alert.alert('Missing details', 'Name and email are required.');
      return;
    }

    updateProfile({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      dob: form.dob.trim(),
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <Text style={styles.headerSub}>Keep your mentor journey details current</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.formCard}>
          {fields.map((field) => (
            <View key={field.key} style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <TextInput
                style={styles.input}
                value={form[field.key]}
                onChangeText={(value) => updateField(field.key, value)}
                placeholder={field.placeholder}
                placeholderTextColor={Colors.textLight}
                keyboardType={field.keyboardType ?? 'default'}
                autoCapitalize={field.key === 'email' ? 'none' : 'words'}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <LinearGradient
            colors={['#6B46C1', '#9333EA']}
            style={styles.saveGrad}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.saveText}>Save Changes</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  content: { padding: 20, paddingBottom: 32 },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 18,
    gap: 16,
    shadowColor: '#6B46C1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  fieldGroup: { gap: 8 },
  fieldLabel: { fontSize: 13, color: Colors.textDark, fontWeight: '800' },
  input: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    paddingHorizontal: 14,
    fontSize: 15,
    color: Colors.textDark,
  },
  saveBtn: { borderRadius: 16, overflow: 'hidden', marginTop: 20 },
  saveGrad: { height: 52, alignItems: 'center', justifyContent: 'center' },
  saveText: { color: '#fff', fontSize: 15, fontWeight: '800' },
});
