import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { colors, spacing, typography } from '@/theme';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={typography.h1}>CWS Mobile</Text>
            <Text style={[typography.body, styles.subtitle]}>Sign in to your account</Text>
          </View>

          <LoginForm />

          <Link href="/(public)/forgot-password" style={styles.forgotLink}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  header: { gap: spacing.sm },
  subtitle: { color: colors.text.secondary },
  forgotLink: { alignSelf: 'center' },
  forgotText: { color: colors.primary, fontSize: 14, fontWeight: '500' },
});
