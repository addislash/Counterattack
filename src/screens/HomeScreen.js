import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph, Button, Text, Divider, Appbar } from 'react-native-paper';
import { COLORS, SIZES, SHADOWS } from '../theme';

export default function HomeScreen({ navigation }) {
  // Mock data for recent tournaments (in a real app, this would come from an API)
  const [recentTournaments, setRecentTournaments] = useState([
    { id: '1', name: 'Summer Classic 2025', teams: 24, startDate: 'May 15, 2025', code: 'SUMCL25' },
    { id: '2', name: 'Regional Championships', teams: 16, startDate: 'June 3, 2025', code: 'REGCHMP' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Counterattack" subtitle="Water Polo Tournament Manager" />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Title style={styles.welcomeTitle}>Welcome to Counterattack</Title>
            <Paragraph style={styles.welcomeText}>
              The easiest way to manage and participate in water polo tournaments.
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button 
              mode="contained" 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('JoinTournament')}
            >
              Join Tournament
            </Button>
            <Button 
              mode="outlined" 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('CreateTournament')}
            >
              Create Tournament
            </Button>
          </Card.Actions>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Recent Tournaments</Text>
        </View>

        {recentTournaments.length > 0 ? (
          recentTournaments.map((tournament) => (
            <Card 
              key={tournament.id} 
              style={styles.tournamentCard}
              onPress={() => navigation.navigate('TournamentDetails', { tournament })}
            >
              <Card.Content>
                <Title style={styles.tournamentTitle}>{tournament.name}</Title>
                <View style={styles.tournamentDetails}>
                  <Paragraph>Teams: {tournament.teams}</Paragraph>
                  <Paragraph>Starts: {tournament.startDate}</Paragraph>
                </View>
                <Divider style={styles.divider} />
                <Paragraph>Tournament Code: <Text style={styles.code}>{tournament.code}</Text></Paragraph>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Card style={styles.emptyCard}>
            <Card.Content>
              <Paragraph style={styles.emptyText}>
                You haven't joined any tournaments yet. 
                Join or create a tournament to get started.
              </Paragraph>
            </Card.Content>
          </Card>
        )}

        <View style={styles.quickTips}>
          <Text style={styles.sectionTitle}>Quick Tips</Text>
          <Card style={styles.tipCard}>
            <Card.Content>
              <Paragraph style={styles.tipText}>
                • Use the tournament code to join an existing tournament{"\n"}
                • Organizers can upload Excel schedules for easy distribution{"\n"}
                • Search for your team to quickly find your games
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
  },
  scrollView: {
    padding: SIZES.padding,
  },
  welcomeCard: {
    marginBottom: SIZES.margin * 1.5,
    borderRadius: SIZES.radius * 1.5,
    ...SHADOWS.medium,
  },
  welcomeTitle: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.margin / 2,
  },
  welcomeText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
  },
  cardActions: {
    justifyContent: 'space-between',
    padding: SIZES.padding,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
  },
  secondaryButton: {
    borderColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
  },
  sectionHeader: {
    marginVertical: SIZES.margin,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin / 2,
  },
  tournamentCard: {
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  tournamentTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  tournamentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SIZES.margin / 2,
  },
  divider: {
    marginVertical: SIZES.margin / 2,
  },
  code: {
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  emptyCard: {
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.surface,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textLight,
  },
  quickTips: {
    marginTop: SIZES.margin,
    marginBottom: SIZES.margin * 3,
  },
  tipCard: {
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.radius,
  },
  tipText: {
    lineHeight: 24,
  },
});
