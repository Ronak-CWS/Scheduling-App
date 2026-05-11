import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '@/theme';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: 'small' | 'large';
}

export function LoadingSpinner({ fullScreen, size = 'large' }: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <View style={styles.fullScreen}>
        <ActivityIndicator size={size} color={colors.primary} />
      </View>
    );
  }
  return <ActivityIndicator size={size} color={colors.primary} />;
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
