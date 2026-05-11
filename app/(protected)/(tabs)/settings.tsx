import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth.store';
import { colors, spacing, typography } from '@/theme';

export default function SettingsScreen() {
  const { clearAuth, user } = useAuthStore((s) => ({ clearAuth: s.clearAuth, user: s.user }));

  const handleLogout = () => {
    clearAuth();
    router.replace('/(public)/login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={typography.h2}>Settings</Text>
          {user && (
            <View style={styles.userInfo}>
              <Text style={typography.label}>{user.name}</Text>
              <Text style={[typography.bodySmall]}>{user.email}</Text>
              <Text style={[typography.caption, styles.role]}>{user.role}</Text>
            </View>
          )}
        </View>

        <View style={styles.spacer} />

        <Button title="Sign Out" onPress={handleLogout} variant="outline" fullWidth />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  header: { gap: spacing.md },
  userInfo: { gap: spacing.xs },
  role: { textTransform: 'capitalize' },
  spacer: { flex: 1 },
});
