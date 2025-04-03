import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../theme';

/**
 * Custom logo component for the app
 * @param {Object} props - Component props
 * @param {Number} props.size - Size multiplier for the logo (default: 1)
 * @param {Boolean} props.vertical - Whether to display logo vertically (default: false)
 * @param {String} props.color - Primary color for the logo (default: COLORS.primary)
 * @returns {JSX.Element} Logo component
 */
const Logo = ({ size = 1, vertical = false, color = COLORS.primary }) => {
  const fontSize = SIZES.large * size;
  const iconSize = 24 * size;
  
  return (
    <View style={[
      styles.container, 
      vertical ? styles.vertical : styles.horizontal
    ]}>
      <MaterialCommunityIcons name="water-polo" size={iconSize} color={color} />
      <View style={vertical ? styles.verticalText : styles.horizontalText}>
        <Text style={[styles.counter, { fontSize, color }]}>Counter</Text>
        <Text style={[styles.attack, { fontSize, color }]}>attack</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
  horizontalText: {
    flexDirection: 'row',
    marginLeft: SIZES.margin / 2,
  },
  verticalText: {
    flexDirection: 'row',
    marginTop: SIZES.margin / 2,
  },
  counter: {
    fontWeight: 'bold',
  },
  attack: {
    fontWeight: 'normal',
  },
});

export default Logo;
