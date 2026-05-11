import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  h1: { fontSize: 32, fontWeight: '700', color: colors.text.primary, letterSpacing: -0.5 },
  h2: { fontSize: 24, fontWeight: '700', color: colors.text.primary },
  h3: { fontSize: 20, fontWeight: '600', color: colors.text.primary },
  h4: { fontSize: 18, fontWeight: '600', color: colors.text.primary },
  body: { fontSize: 16, fontWeight: '400', color: colors.text.primary, lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400', color: colors.text.secondary, lineHeight: 20 },
  label: { fontSize: 14, fontWeight: '500', color: colors.text.primary },
  caption: { fontSize: 12, fontWeight: '400', color: colors.text.secondary },
});
