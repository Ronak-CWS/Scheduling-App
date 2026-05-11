import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { colors, spacing, typography } from '@/theme';

export default function ForgotPasswordScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={typography.h2}>Reset Password</Text>
          <Text style={[typography.body, styles.description]}>
            Password reset will be available once the backend is connected.
          </Text>
        </View>
        <Button title="Back to Login" onPress={() => router.back()} variant="outline" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: spacing.lg, gap: spacing.xl, justifyContent: 'center' },
  header: { gap: spacing.sm },
  description: { color: colors.text.secondary },
});
