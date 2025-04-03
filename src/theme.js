// theme.js
// Contains styling constants for the app

export const COLORS = {
  primary: '#0077B6',   // Blue - representing water
  secondary: '#00B4D8', // Light blue
  tertiary: '#90E0EF',  // Very light blue
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#333333',
  textLight: '#757575',
  success: '#2E7D32',
  warning: '#F9A825',
  error: '#C62828',
  accent: '#FFB703',    // Accent color (Gold/Yellow) for highlights
};

export const FONTS = {
  regular: 'System',
  bold: 'System-Bold',
  light: 'System-Light',
};

export const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  
  // Spacing
  padding: 16,
  margin: 16,
  radius: 8,
};

// Consistent shadow style for cards and buttons
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
};
