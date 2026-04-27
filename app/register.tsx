import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../constants/firebaseConfig';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform, ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../constants/Colors';

const { height } = Dimensions.get('window');

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'mentee' | 'mentor'>('mentee');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) { setError('Please fill in all fields.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser!, { displayName: name });
      router.replace('/(tabs)');
    } catch (e: any) {
      setError(e.message ?? 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container} bounces={false}>
        <LinearGradient
          colors={['#4C1D95', '#6B46C1', '#9333EA']}
          style={[styles.header, { height: Platform.OS === 'web' ? 240 : height * 0.28 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🎯</Text>
            </View>
            <Text style={styles.appName}>MentorSarthi</Text>
            <Text style={styles.headerSubtitle}>Create your account</Text>
          </View>
        </LinearGradient>

        <View className="flex-1" style={{ backgroundColor: Colors.background }}>
          <View style={styles.formCard}>
          <Text style={styles.formTitle}>Sign Up</Text>
          <Text style={styles.formSubtitle}>Join thousands of mentees & mentors</Text>

          {/* Role Selector */}
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[styles.roleBtn, role === 'mentee' && styles.roleBtnActive]}
              onPress={() => setRole('mentee')}
            >
              <Text style={styles.roleEmoji}>🎓</Text>
              <Text style={[styles.roleText, role === 'mentee' && styles.roleTextActive]}>
                I'm a Mentee
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleBtn, role === 'mentor' && styles.roleBtnActive]}
              onPress={() => setRole('mentor')}
            >
              <Text style={styles.roleEmoji}>👨‍💼</Text>
              <Text style={[styles.roleText, role === 'mentor' && styles.roleTextActive]}>
                I'm a Mentor
              </Text>
            </TouchableOpacity>
          </View>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Your full name"
                placeholderTextColor={Colors.textLight}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={Colors.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Create a strong password"
                placeholderTextColor={Colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.inputIcon}>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Repeat your password"
                placeholderTextColor={Colors.textLight}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Register Button */}
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={handleRegister}
            disabled={loading}
          >
            <LinearGradient
              colors={['#6B46C1', '#9333EA']}
              style={styles.registerBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.registerBtnText}>{loading ? 'Creating account...' : 'Create Account →'}</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Button */}
          <TouchableOpacity style={styles.googleBtn}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        <View className="h-10" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { height: height * 0.28, justifyContent: 'flex-end', paddingBottom: 40 },
  headerContent: { alignItems: 'center' },
  logoCircle: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 10, borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  logoEmoji: { fontSize: 32 },
  appName: { fontSize: 26, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  formCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    borderBottomLeftRadius: Platform.OS === 'web' ? 32 : 0,
    borderBottomRightRadius: Platform.OS === 'web' ? 32 : 0,
    marginTop: -24, padding: 28, paddingTop: 32,
    shadowColor: '#6B46C1', shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1, shadowRadius: 12, elevation: 8,
  },
  formTitle: { fontSize: 24, fontWeight: '800', color: Colors.textDark },
  formSubtitle: { fontSize: 14, color: Colors.textGray, marginTop: 4, marginBottom: 20 },
  roleContainer: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  roleBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 12, borderRadius: 14,
    borderWidth: 1.5, borderColor: Colors.border,
    backgroundColor: Colors.background, gap: 8,
  },
  roleBtnActive: { borderColor: Colors.primary, backgroundColor: '#F3EEFF' },
  roleEmoji: { fontSize: 18 },
  roleText: { fontSize: 14, fontWeight: '600', color: Colors.textGray },
  roleTextActive: { color: Colors.primary },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', color: Colors.textDark, marginBottom: 8 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14, paddingHorizontal: 14,
    borderWidth: 1.5, borderColor: Colors.border,
  },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, height: 50, fontSize: 15, color: Colors.textDark },
  registerBtn: { borderRadius: 14, overflow: 'hidden', marginTop: 8, marginBottom: 20 },
  errorText: { color: '#DC2626', fontSize: 13, marginBottom: 12, textAlign: 'center' },
  registerBtnGradient: { height: 52, alignItems: 'center', justifyContent: 'center' },
  registerBtnText: { color: '#fff', fontSize: 17, fontWeight: '700', letterSpacing: 0.5 },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { color: Colors.textGray, fontSize: 13, marginHorizontal: 12 },
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: 14,
    height: 52, marginBottom: 24, backgroundColor: Colors.white,
  },
  googleIcon: { fontSize: 18, fontWeight: '800', color: '#4285F4', marginRight: 10 },
  googleText: { fontSize: 15, fontWeight: '600', color: Colors.textDark },
  loginRow: { flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 },
  loginText: { color: Colors.textGray, fontSize: 14 },
  loginLink: { color: Colors.primary, fontSize: 14, fontWeight: '700' },
});