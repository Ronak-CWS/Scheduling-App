# UI Guidelines

## Theme

All design tokens are in `src/theme/`:

```typescript
import { colors, spacing, typography } from '@/theme';
```

### Colors (`src/theme/colors.ts`)

Use `colors.*` for all color values. Never use raw hex strings in components.

```typescript
colors.primary          // #2563EB — primary actions, links
colors.error            // #DC2626 — errors, destructive actions
colors.background       // #F8FAFC — screen backgrounds
colors.surface          // #FFFFFF — cards, inputs
colors.border           // #E2E8F0 — dividers, input borders
colors.text.primary     // #0F172A — main text
colors.text.secondary   // #64748B — supporting text
```

### Spacing (`src/theme/spacing.ts`)

```typescript
spacing.xs   // 4
spacing.sm   // 8
spacing.md   // 16
spacing.lg   // 24
spacing.xl   // 32
spacing.xxl  // 48
```

### Typography (`src/theme/typography.ts`)

Use `StyleSheet.create` styles from typography directly:

```typescript
<Text style={typography.h1}>Title</Text>
<Text style={typography.body}>Body copy</Text>
<Text style={typography.caption}>Small label</Text>
```

## Shared UI Components

Located in `src/components/ui/`. Use these before building new ones.

### Button

```typescript
<Button title="Save" onPress={handleSave} />
<Button title="Cancel" onPress={handleCancel} variant="outline" />
<Button title="Loading" onPress={noop} loading />
<Button title="Full Width" onPress={noop} fullWidth />
```

Variants: `primary`, `secondary`, `outline`, `ghost`

### Input

```typescript
<Input
  label="Email"
  value={value}
  onChangeText={onChange}
  error={errors.email?.message}
  keyboardType="email-address"
  autoCapitalize="none"
/>
```

### LoadingSpinner

```typescript
<LoadingSpinner />                 // inline
<LoadingSpinner fullScreen />     // full screen centered
```

### ErrorMessage

```typescript
<ErrorMessage message="Something went wrong" />
```

Returns null if message is empty.

## Layout Conventions

- Wrap screens in `<SafeAreaView>` from `react-native-safe-area-context`
- Use `gap` in StyleSheet instead of margins where possible
- Use `minHeight: 48` on all tappable elements (accessibility)
- Use `KeyboardAvoidingView` on screens with forms

## Adding New Components

Before building a new component:
1. Check if an existing one can be extended with props
2. Keep it generic — no feature-specific logic in shared components
3. Use `StyleSheet.create` for all styles
4. Export named (not default) from component files
