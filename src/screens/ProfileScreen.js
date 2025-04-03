import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Button,
  List,
  Switch,
  Divider,
  Text,
  Appbar,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, SHADOWS } from '../theme';

export default function ProfileScreen({ navigation }) {
  // Mock user data
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'Coach',
    team: 'Seaside Sharks',
  });
  
  // Notification settings
  const [notifyGameReminder, setNotifyGameReminder] = useState(true);
  const [notifyScheduleChanges, setNotifyScheduleChanges] = useState(true);
  const [notifyResults, setNotifyResults] = useState(false);
  
  // Mock tournament history
  const [tournamentHistory, setTournamentHistory] = useState([
    { id: '1', name: 'Summer Classic 2024', date: 'May 2024', role: 'Coach', team: 'Seaside Sharks', placement: '2nd Place' },
    { id: '2', name: 'Regional Championships', date: 'June 2024', role: 'Coach', team: 'Seaside Sharks', placement: '1st Place' },
    { id: '3', name: 'Winter Invitational', date: 'December 2024', role: 'Coach', team: 'Seaside Sharks', placement: '3rd Place' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Profile" />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Icon 
              size={80} 
              icon="account"
              style={styles.avatar}
              color="white"
            />
            <View style={styles.userInfo}>
              <Title style={styles.userName}>{user.name}</Title>
              <Paragraph style={styles.userDetail}>{user.email}</Paragraph>
              <View style={styles.roleContainer}>
                <Text style={styles.roleText}>{user.role}</Text>
                <Divider style={styles.roleDivider} />
                <Text style={styles.teamText}>{user.team}</Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button 
              mode="outlined" 
              style={styles.editButton}
              onPress={() => {/* Navigate to edit profile */}}
            >
              Edit Profile
            </Button>
          </Card.Actions>
        </Card>
        
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Notification Settings</Title>
            
            <List.Item
              title="Game Reminders"
              description="Receive notifications before your games"
              left={props => <List.Icon {...props} icon="alarm" color={COLORS.primary} />}
              right={props => <Switch 
                value={notifyGameReminder} 
                onValueChange={setNotifyGameReminder}
                color={COLORS.primary}
              />}
            />
            <Divider />
            
            <List.Item
              title="Schedule Changes"
              description="Be notified when there are changes to the tournament schedule"
              left={props => <List.Icon {...props} icon="calendar-clock" color={COLORS.primary} />}
              right={props => <Switch 
                value={notifyScheduleChanges} 
                onValueChange={setNotifyScheduleChanges}
                color={COLORS.primary}
              />}
            />
            <Divider />
            
            <List.Item
              title="Tournament Results"
              description="Receive notifications about tournament results"
              left={props => <List.Icon {...props} icon="trophy" color={COLORS.primary} />}
              right={props => <Switch 
                value={notifyResults} 
                onValueChange={setNotifyResults}
                color={COLORS.primary}
              />}
            />
          </Card.Content>
        </Card>
        
        <Card style={styles.historyCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Tournament History</Title>
            
            {tournamentHistory.map((tournament, index) => (
              <React.Fragment key={tournament.id}>
                <List.Item
                  title={tournament.name}
                  description={`${tournament.date} • ${tournament.team}`}
                  left={props => <List.Icon {...props} icon="trophy-award" color={COLORS.accent} />}
                  right={props => (
                    <View style={styles.placementContainer}>
                      <Text style={styles.placementText}>{tournament.placement}</Text>
                    </View>
                  )}
                  onPress={() => {/* Navigate to tournament details */}}
                  style={styles.historyItem}
                />
                {index < tournamentHistory.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            
            {tournamentHistory.length === 0 && (
              <Paragraph style={styles.emptyText}>
                You haven't participated in any tournaments yet.
              </Paragraph>
            )}
          </Card.Content>
        </Card>
        
        <Card style={styles.supportCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Support & Feedback</Title>
            
            <List.Item
              title="Help Center"
              left={props => <List.Icon {...props} icon="help-circle" color={COLORS.primary} />}
              right={props => <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textLight} />}
              onPress={() => {/* Navigate to help center */}}
            />
            <Divider />
            
            <List.Item
              title="Send Feedback"
              left={props => <List.Icon {...props} icon="message-text" color={COLORS.primary} />}
              right={props => <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textLight} />}
              onPress={() => {/* Navigate to feedback form */}}
            />
            <Divider />
            
            <List.Item
              title="About Counterattack"
              left={props => <List.Icon {...props} icon="information" color={COLORS.primary} />}
              right={props => <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textLight} />}
              onPress={() => {/* Show app info */}}
            />
          </Card.Content>
        </Card>
        
        <Button 
          mode="outlined" 
          icon="logout" 
          style={styles.logoutButton}
          onPress={() => {/* Handle logout */}}
        >
          Sign Out
        </Button>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Counterattack v1.0.0</Text>
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
  profileCard: {
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: COLORS.primary,
    marginRight: SIZES.margin,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  userDetail: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: SIZES.margin / 2,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  roleDivider: {
    height: 12,
    width: 1,
    backgroundColor: COLORS.textLight,
    marginHorizontal: SIZES.margin / 2,
  },
  teamText: {
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding,
  },
  editButton: {
    borderColor: COLORS.primary,
  },
  settingsCard: {
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  cardTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginBottom: SIZES.margin,
  },
  historyCard: {
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  historyItem: {
    paddingVertical: SIZES.padding / 2,
  },
  placementContainer: {
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: 2,
  },
  placementText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textLight,
    marginTop: SIZES.margin,
  },
  supportCard: {
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  logoutButton: {
    marginBottom: SIZES.margin,
    borderColor: COLORS.error,
    borderWidth: 1,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: SIZES.margin * 3,
  },
  versionText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
});
