// Color palettes for the two supported themes.
// Every component reads colors from the active palette via useApp().

export const lightTheme = {
  mode: 'light',
  background: '#F3F4F8',
  surface: '#FFFFFF',
  text: '#111827',
  textMuted: '#6B7280',
  primary: '#4F46E5',
  primaryText: '#FFFFFF',
  border: '#E5E7EB',
  danger: '#DC2626',
  success: '#16A34A',
};

export const darkTheme = {
  mode: 'dark',
  background: '#0B1020',
  surface: '#161B2E',
  text: '#F9FAFB',
  textMuted: '#9CA3AF',
  primary: '#818CF8',
  primaryText: '#0B1020',
  border: '#2A3150',
  danger: '#F87171',
  success: '#4ADE80',
};
