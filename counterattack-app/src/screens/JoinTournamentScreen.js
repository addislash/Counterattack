import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  TextInput, 
  Button, 
  Title, 
  Paragraph, 
  Text,
  Card,
  Appbar,
  HelperText,
} from 'react-native-paper';
import { COLORS, SIZES, SHADOWS } from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function JoinTournamentScreen({ navigation }) {
  const [tournamentCode, setTournamentCode] = useState('');
  const [teamName, setTeamName] = useState('');
  const [codeError, setCodeError] = useState('');
  const [teamError, setTeamError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    let isValid = true;

    if (!tournamentCode.trim()) {
      setCodeError('Tournament code is required');
      isValid = false;
    } else if (tournamentCode.length < 4) {
      setCodeError('Tournament code must be at least 4 characters');
      isValid = false;
    } else {
      setCodeError('');
    }

    if (!teamName.trim()) {
      setTeamError('Team name is required');
      isValid = false;
    } else {
      setTeamError('');
    }

    return isValid;
  };

  const handleJoinTournament = () => {
    if (validateInputs()) {
      setIsLoading(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        setIsLoading(false);
        
        // Mock successful join - in a real app, this would verify the code with an API
        const mockTournament = {
          id: '123',
          name: 'Summer Classic 2025',
          code: tournamentCode.toUpperCase(),
          teamName: teamName,
        };
        
        navigation.navigate('TournamentDetails', { tournament: mockTournament });
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Join Tournament" />
      </Appbar.Header>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="account-group" size={80} color={COLORS.primary} />
        </View>
        
        <Title style={styles.title}>Join a Tournament</Title>
        <Paragraph style={styles.description}>
          Enter the tournament code and your team name to view your schedule and game details.
        </Paragraph>
        
        <Card style={styles.formCard}>
          <Card.Content>
            <TextInput
              label="Tournament Code"
              value={tournamentCode}
              onChangeText={setTournamentCode}
              style={styles.input}
              mode="outlined"
              autoCapitalize="characters"
              error={!!codeError}
            />
            {codeError ? <HelperText type="error">{codeError}</HelperText> : null}
            
            <TextInput
              label="Team Name"
              value={teamName}
              onChangeText={setTeamName}
              style={styles.input}
              mode="outlined"
              error={!!teamError}
            />
            {teamError ? <HelperText type="error">{teamError}</HelperText> : null}
            
            <Button
              mode="contained"
              onPress={handleJoinTournament}
              style={styles.button}
              loading={isLoading}
              disabled={isLoading}
            >
              Join Tournament
            </Button>
          </Card.Content>
        </Card>
        
        <Card style={styles.helpCard}>
          <Card.Content>
            <Text style={styles.helpTitle}>Can't find your tournament code?</Text>
            <Text style={styles.helpText}>
              Tournament codes are provided by the tournament organizer. 
              Please contact them if you need assistance.
            </Text>
          </Card.Content>
        </Card>
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
    flex: 1,
  },
  contentContainer: {
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
  },
  iconContainer: {
    marginVertical: SIZES.margin,
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin / 2,
    textAlign: 'center',
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SIZES.margin * 1.5,
    maxWidth: '90%',
  },
  formCard: {
    width: '100%',
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  input: {
    marginBottom: SIZES.margin / 2,
    backgroundColor: COLORS.background,
  },
  button: {
    marginTop: SIZES.margin,
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding / 4,
  },
  helpCard: {
    width: '100%',
    marginTop: SIZES.margin,
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.radius,
  },
  helpTitle: {
    fontWeight: 'bold',
    marginBottom: SIZES.margin / 2,
  },
  helpText: {
    color: COLORS.textLight,
  },
});
