import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  TextInput, 
  Button, 
  Title, 
  Paragraph, 
  Card, 
  Appbar,
  HelperText,
  IconButton,
  Snackbar,
  Divider,
  Text,
} from 'react-native-paper';
import { COLORS, SIZES, SHADOWS } from '../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CreateTournamentScreen({ navigation }) {
  const [tournamentName, setTournamentName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [nameError, setNameError] = useState('');
  const [dateError, setDateError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    let isValid = true;

    if (!tournamentName.trim()) {
      setNameError('Tournament name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!startDate.trim()) {
      setDateError('Start date is required');
      isValid = false;
    } else {
      setDateError('');
    }

    return isValid;
  };

  const generateTournamentCode = () => {
    // Generate a random code based on the tournament name
    if (tournamentName.trim()) {
      const nameInitials = tournamentName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
      
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
      const code = nameInitials + randomNum;
      
      setGeneratedCode(code);
    } else {
      setNameError('Enter a tournament name to generate a code');
    }
  };

  const handleCreateTournament = () => {
    if (validateInputs()) {
      setIsLoading(true);
      
      // Generate a code if not already generated
      if (!generatedCode) {
        generateTournamentCode();
      }
      
      // Simulate API call with timeout
      setTimeout(() => {
        setIsLoading(false);
        setShowSnackbar(true);
        
        // Navigate to upload schedule screen
        setTimeout(() => {
          navigation.navigate('UploadSchedule', {
            tournament: {
              name: tournamentName,
              startDate,
              endDate,
              location,
              code: generatedCode || 'GENERATED',
            }
          });
        }, 1500);
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Create Tournament" />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        <Title style={styles.title}>Create a New Tournament</Title>
        <Paragraph style={styles.description}>
          Fill out the tournament details to get started. You'll be able to upload your schedule in the next step.
        </Paragraph>
        
        <Card style={styles.formCard}>
          <Card.Content>
            <TextInput
              label="Tournament Name"
              value={tournamentName}
              onChangeText={setTournamentName}
              style={styles.input}
              mode="outlined"
              error={!!nameError}
            />
            {nameError ? <HelperText type="error">{nameError}</HelperText> : null}
            
            <View style={styles.codeContainer}>
              <TextInput
                label="Tournament Code"
                value={generatedCode}
                style={styles.codeInput}
                mode="outlined"
                disabled
              />
              <IconButton
                icon="refresh"
                size={24}
                onPress={generateTournamentCode}
                style={styles.generateButton}
                color={COLORS.primary}
              />
            </View>
            <HelperText>Click the refresh icon to generate a unique code</HelperText>
            
            <TextInput
              label="Start Date"
              value={startDate}
              onChangeText={setStartDate}
              style={styles.input}
              mode="outlined"
              placeholder="MM/DD/YYYY"
              error={!!dateError}
            />
            {dateError ? <HelperText type="error">{dateError}</HelperText> : null}
            
            <TextInput
              label="End Date"
              value={endDate}
              onChangeText={setEndDate}
              style={styles.input}
              mode="outlined"
              placeholder="MM/DD/YYYY"
            />
            
            <TextInput
              label="Location"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
              mode="outlined"
            />
            
            <Button
              mode="contained"
              onPress={handleCreateTournament}
              style={styles.button}
              loading={isLoading}
              disabled={isLoading}
            >
              Continue to Upload Schedule
            </Button>
          </Card.Content>
        </Card>
        
        <Card style={styles.infoCard}>
          <Card.Content>
            <Title style={styles.infoTitle}>What's Next?</Title>
            <Divider style={styles.divider} />
            <View style={styles.stepContainer}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepText}>
                Create your tournament with basic details
              </Text>
            </View>
            <View style={styles.stepContainer}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepText}>
                Upload your Excel schedule in the next step
              </Text>
            </View>
            <View style={styles.stepContainer}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepText}>
                Share your tournament code with teams so they can join
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={2000}
      >
        Tournament created successfully! Proceeding to schedule upload.
      </Snackbar>
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
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.margin,
    marginBottom: SIZES.margin / 2,
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginBottom: SIZES.margin * 1.5,
  },
  formCard: {
    marginBottom: SIZES.margin * 1.5,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  input: {
    marginBottom: SIZES.margin,
    backgroundColor: COLORS.background,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.margin / 4,
  },
  codeInput: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  generateButton: {
    marginLeft: SIZES.margin / 2,
  },
  button: {
    marginTop: SIZES.margin,
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding / 4,
  },
  infoCard: {
    marginBottom: SIZES.margin * 3,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.tertiary,
  },
  infoTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginBottom: SIZES.margin / 2,
  },
  divider: {
    marginBottom: SIZES.margin,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: SIZES.margin,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: SIZES.medium,
  },
});
