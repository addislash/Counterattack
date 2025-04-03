import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Text, Chip, Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, SHADOWS } from '../theme';

/**
 * Reusable tournament card component
 * @param {Object} props - Component props
 * @param {Object} props.tournament - Tournament data
 * @param {Function} props.onPress - Callback for card press
 * @param {Boolean} props.showCode - Whether to display tournament code
 * @returns {JSX.Element} TournamentCard component
 */
const TournamentCard = ({ tournament, onPress, showCode = true }) => {
  return (
    <Card 
      style={styles.card}
      onPress={onPress}
    >
      <Card.Content>
        <View style={styles.header}>
          <Title style={styles.title}>{tournament.name}</Title>
          {tournament.isOrganizer && (
            <Chip 
              style={styles.organizerChip}
              textStyle={styles.organizerChipText}
            >
              Organizer
            </Chip>
          )}
        </View>
        
        <View style={styles.detailsRow}>
          {tournament.startDate && (
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="calendar" size={16} color={COLORS.textLight} />
              <Text style={styles.detailText}>{tournament.startDate}</Text>
            </View>
          )}
          
          {tournament.teams && (
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="account-group" size={16} color={COLORS.textLight} />
              <Text style={styles.detailText}>{tournament.teams} Teams</Text>
            </View>
          )}
          
          {tournament.location && (
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="map-marker" size={16} color={COLORS.textLight} />
              <Text style={styles.detailText}>{tournament.location}</Text>
            </View>
          )}
        </View>
        
        {showCode && tournament.code && (
          <>
            <Divider style={styles.divider} />
            <View style={styles.codeContainer}>
              <Text style={styles.codeLabel}>Tournament Code:</Text>
              <Text style={styles.codeValue}>{tournament.code}</Text>
            </View>
          </>
        )}
        
        {tournament.teamName && (
          <View style={styles.teamContainer}>
            <Text style={styles.teamLabel}>Your Team:</Text>
            <Text style={styles.teamName}>{tournament.teamName}</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin / 2,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    flex: 1,
    marginRight: SIZES.margin / 2,
  },
  organizerChip: {
    backgroundColor: COLORS.accent,
  },
  organizerChipText: {
    fontSize: SIZES.xSmall,
    color: COLORS.text,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.margin / 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.margin,
    marginBottom: SIZES.margin / 2,
  },
  detailText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  divider: {
    marginVertical: SIZES.margin / 2,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.margin / 4,
  },
  codeLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginRight: SIZES.margin / 2,
  },
  codeValue: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  teamContainer: {
    marginTop: SIZES.margin / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginRight: SIZES.margin / 2,
  },
  teamName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
});

export default TournamentCard;
