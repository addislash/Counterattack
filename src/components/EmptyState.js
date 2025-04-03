import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../theme';

/**
 * Empty state component for when no data is available
 * @param {Object} props - Component props
 * @param {String} props.icon - Icon name from MaterialCommunityIcons
 * @param {String} props.title - Main title text
 * @param {String} props.message - Optional descriptive message
 * @param {String} props.buttonText - Text for the action button
 * @param {Function} props.onButtonPress - Callback for button press
 * @returns {JSX.Element} EmptyState component
 */
const EmptyState = ({ 
  icon = 'information-outline',
  title = 'No Data Available',
  message,
  buttonText,
  onButtonPress
}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={64} color={COLORS.textLight} />
      
      <Text style={styles.title}>{title}</Text>
      
      {message && <Text style={styles.message}>{message}</Text>}
      
      {buttonText && onButtonPress && (
        <Button 
          mode="contained" 
          onPress={onButtonPress}
          style={styles.button}
        >
          {buttonText}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding * 2,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.margin,
    marginBottom: SIZES.margin / 2,
    textAlign: 'center',
  },
  message: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SIZES.margin,
    paddingHorizontal: SIZES.padding,
  },
  button: {
    marginTop: SIZES.margin,
    backgroundColor: COLORS.primary,
  },
});

export default EmptyState;
