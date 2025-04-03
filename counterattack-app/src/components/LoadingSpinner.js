import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { COLORS, SIZES } from '../theme';

/**
 * Reusable loading spinner component
 * @param {Object} props - Component props
 * @param {String} props.message - Optional message to display
 * @param {Boolean} props.fullscreen - Whether to display in full screen mode
 * @returns {JSX.Element} LoadingSpinner component
 */
const LoadingSpinner = ({ message = 'Loading...', fullscreen = false }) => {
  if (fullscreen) {
    return (
      <View style={styles.fullscreen}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={COLORS.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  message: {
    marginTop: SIZES.margin / 2,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});

export default LoadingSpinner;
