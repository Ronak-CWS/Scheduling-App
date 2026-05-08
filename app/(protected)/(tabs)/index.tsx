import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/auth.store';
import { colors, spacing, typography } from '@/theme';

export default function DashboardScreen() {
  const user = useAuthStore((s) => s.user);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={typography.h2}>Dashboard</Text>
        {user && (
          <Text style={[typography.body, styles.welcome]}>Welcome back, {user.name}</Text>
        )}
        <Text style={[typography.bodySmall, styles.placeholder]}>
          Dashboard content coming soon.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: spacing.lg, gap: spacing.sm },
  welcome: { color: colors.text.secondary },
  placeholder: { marginTop: spacing.md },
});
