import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Card,
  Title,
  Paragraph,
  Text,
  Appbar,
  Divider,
  List,
  ActivityIndicator,
  Chip,
  Portal,
  Dialog,
} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, SHADOWS } from '../theme';

export default function UploadScheduleScreen({ route, navigation }) {
  const { tournament } = route.params || { name: 'New Tournament' };
  
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  
  // Sample expected format data
  const expectedFormat = [
    { header: 'Date', description: 'Game date (e.g. 05/15/2025)' },
    { header: 'Time', description: 'Game start time (e.g. 14:30)' },
    { header: 'Pool', description: 'Pool or location identifier' },
    { header: 'Home Team', description: 'Name of the home team' },
    { header: 'Away Team', description: 'Name of the away team' },
    { header: 'Score', description: 'Game score (optional)' },
  ];

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx],
      });
      
      setFile({
        name: result[0].name,
        size: result[0].size,
        type: result[0].type,
        uri: result[0].uri,
      });
      
      setValidationErrors([]);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Error picking document:', err);
      }
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
      
      // Simulate processing
      setTimeout(() => {
        // Random validation result (in actual app, would validate Excel format)
        const hasErrors = Math.random() > 0.7;
        
        if (hasErrors) {
          setValidationErrors([
            'Column "Home Team" is missing in the spreadsheet',
            'Some dates are not in the correct format (MM/DD/YYYY)'
          ]);
          setShowDialog(true);
        } else {
          setProcessingComplete(true);
        }
      }, 2000);
    }, 2500);
  };

  const handleComplete = () => {
    // Navigate to tournament details
    navigation.navigate('TournamentDetails', { 
      tournament: {
        ...tournament,
        isOrganizer: true,
        hasSchedule: true
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Upload Schedule" />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        <Card style={styles.tournamentCard}>
          <Card.Content>
            <Text style={styles.label}>Tournament</Text>
            <Title style={styles.tournamentName}>{tournament.name}</Title>
            <View style={styles.codeContainer}>
              <Text style={styles.codeLabel}>Code:</Text>
              <Chip style={styles.codeChip}>{tournament.code}</Chip>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.uploadCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Upload Schedule</Title>
            <Paragraph style={styles.description}>
              Upload an Excel (.xlsx) file with your tournament schedule. The system will
              automatically extract team names, game times, and opponents.
            </Paragraph>
            
            <Divider style={styles.divider} />
            
            {!file ? (
              <TouchableOpacity style={styles.uploadBox} onPress={handleFilePick}>
                <MaterialCommunityIcons name="file-upload" size={48} color={COLORS.primary} />
                <Text style={styles.uploadText}>Tap to select Excel file</Text>
                <Text style={styles.fileTypeText}>(.xlsx files only)</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.fileInfoContainer}>
                <MaterialCommunityIcons name="file-excel" size={36} color={COLORS.primary} />
                <View style={styles.fileDetails}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  <Text style={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</Text>
                </View>
                <TouchableOpacity onPress={handleFilePick}>
                  <MaterialCommunityIcons name="refresh" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            )}
            
            <Button
              mode="contained"
              onPress={handleUpload}
              style={styles.button}
              disabled={!file || isUploading || uploadComplete}
              loading={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </Button>
            
            {uploadComplete && (
              <View style={styles.statusContainer}>
                <View style={styles.statusItem}>
                  <MaterialCommunityIcons name="check-circle" size={24} color={COLORS.success} />
                  <Text style={styles.statusText}>Upload Complete</Text>
                </View>
                
                <View style={styles.statusItem}>
                  {processingComplete ? (
                    <MaterialCommunityIcons name="check-circle" size={24} color={COLORS.success} />
                  ) : (
                    <ActivityIndicator size={24} color={COLORS.primary} />
                  )}
                  <Text style={styles.statusText}>
                    {processingComplete ? 'Processing Complete' : 'Processing Schedule...'}
                  </Text>
                </View>
              </View>
            )}
            
            {processingComplete && (
              <Button
                mode="contained"
                onPress={handleComplete}
                style={[styles.button, styles.completeButton]}
              >
                Complete Setup
              </Button>
            )}
          </Card.Content>
        </Card>
        
        <Card style={styles.formatCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Expected Format</Title>
            <Paragraph style={styles.description}>
              Your Excel file should include the following columns:
            </Paragraph>
            
            <List.Section>
              {expectedFormat.map((item, index) => (
                <List.Item
                  key={index}
                  title={item.header}
                  description={item.description}
                  left={props => <List.Icon {...props} icon="table-column" color={COLORS.primary} />}
                  titleStyle={styles.listTitle}
                  descriptionStyle={styles.listDescription}
                  style={styles.listItem}
                />
              ))}
            </List.Section>
            
            <Text style={styles.note}>
              Note: Additional columns will be ignored. The order of columns doesn't matter.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
      
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>Validation Errors</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.dialogText}>
              There are issues with your Excel file that need to be fixed:
            </Paragraph>
            
            {validationErrors.map((error, index) => (
              <View key={index} style={styles.errorItem}>
                <MaterialCommunityIcons name="alert-circle" size={20} color={COLORS.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ))}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)}>Cancel</Button>
            <Button onPress={handleFilePick}>Upload New File</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  tournamentCard: {
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  label: {
    color: COLORS.textLight,
    fontSize: SIZES.small,
  },
  tournamentName: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin / 2,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeLabel: {
    marginRight: SIZES.margin / 2,
    color: COLORS.textLight,
  },
  codeChip: {
    backgroundColor: COLORS.tertiary,
  },
  uploadCard: {
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  cardTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginBottom: SIZES.margin / 2,
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginBottom: SIZES.margin,
  },
  divider: {
    marginBottom: SIZES.margin,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: COLORS.tertiary,
    borderStyle: 'dashed',
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  uploadText: {
    marginTop: SIZES.margin,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  fileTypeText: {
    marginTop: SIZES.margin / 2,
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  fileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin,
  },
  fileDetails: {
    flex: 1,
    marginLeft: SIZES.margin,
  },
  fileName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  fileSize: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  button: {
    backgroundColor: COLORS.primary,
    marginBottom: SIZES.margin,
  },
  completeButton: {
    backgroundColor: COLORS.success,
    marginTop: SIZES.margin,
  },
  statusContainer: {
    marginVertical: SIZES.margin,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.margin / 2,
  },
  statusText: {
    marginLeft: SIZES.margin / 2,
    fontSize: SIZES.medium,
  },
  formatCard: {
    marginBottom: SIZES.margin * 3,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.surface,
  },
  listItem: {
    paddingVertical: SIZES.padding / 4,
  },
  listTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  listDescription: {
    fontSize: SIZES.small,
  },
  note: {
    fontSize: SIZES.small,
    fontStyle: 'italic',
    color: COLORS.textLight,
    marginTop: SIZES.margin,
  },
  dialogText: {
    marginBottom: SIZES.margin,
  },
  errorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.margin / 2,
  },
  errorText: {
    marginLeft: SIZES.margin / 2,
    color: COLORS.error,
  },
});
