import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Card,
  Title,
  Paragraph,
  Text,
  Appbar,
  Divider,
  TextInput,
  Button,
  Chip,
  Avatar,
  List,
  Searchbar,
  FAB,
  Menu,
  Portal,
  Modal,
  DataTable,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, SHADOWS } from '../theme';

export default function TournamentDetailsScreen({ route, navigation }) {
  const { tournament } = route.params || { name: 'Tournament', code: 'CODE' };
  const isOrganizer = tournament.isOrganizer || false;
  
  const [teamName, setTeamName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  
  // Mock schedule data
  const mockSchedule = [
    { id: '1', date: '05/15/2025', time: '10:00 AM', pool: 'A', homeTeam: 'Sharks', awayTeam: 'Dolphins', score: '10-8' },
    { id: '2', date: '05/15/2025', time: '01:30 PM', pool: 'B', homeTeam: 'Sharks', awayTeam: 'Barracudas', score: 'TBD' },
    { id: '3', date: '05/16/2025', time: '09:45 AM', pool: 'A', homeTeam: 'Otters', awayTeam: 'Sharks', score: 'TBD' },
    { id: '4', date: '05/16/2025', time: '03:15 PM', pool: 'C', homeTeam: 'Sharks', awayTeam: 'Stingrays', score: 'TBD' },
    { id: '5', date: '05/17/2025', time: '11:30 AM', pool: 'A', homeTeam: 'Sharks', awayTeam: 'Marlins', score: 'TBD' },
  ];
  
  // Filter schedule based on search query or team name
  const filteredSchedule = mockSchedule.filter(game => {
    const teamSearchTerm = teamName.toLowerCase() || searchQuery.toLowerCase();
    if (!teamSearchTerm) return true;
    
    return (
      game.homeTeam.toLowerCase().includes(teamSearchTerm) || 
      game.awayTeam.toLowerCase().includes(teamSearchTerm)
    );
  });
  
  const handleSearch = () => {
    // In a real app, this would filter the games based on the team name
    setSearchQuery(teamName);
  };
  
  const handleReset = () => {
    setTeamName('');
    setSearchQuery('');
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join my water polo tournament! Tournament name: ${tournament.name}, Code: ${tournament.code}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={tournament.name} subtitle="Tournament Details" />
        {isOrganizer && (
          <Appbar.Action icon="dots-vertical" onPress={() => setMenuVisible(true)} />
        )}
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={{ x: 0, y: 0 }}
          style={styles.menu}
        >
          <Menu.Item
            icon="share"
            onPress={() => {
              setMenuVisible(false);
              setShareModalVisible(true);
            }}
            title="Share Tournament"
          />
          <Menu.Item
            icon="file-upload"
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('UploadSchedule', { tournament });
            }}
            title="Update Schedule"
          />
          <Divider />
          <Menu.Item
            icon="information"
            onPress={() => {
              setMenuVisible(false);
              // Show tournament info
            }}
            title="Tournament Info"
          />
        </Menu>
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        <Card style={styles.infoCard}>
          <Card.Content>
            <View style={styles.tournamentHeader}>
              <View style={styles.tournamentInfo}>
                <Text style={styles.label}>Tournament Code</Text>
                <Chip style={styles.codeChip} textStyle={styles.codeText}>{tournament.code}</Chip>
              </View>
              
              {tournament.startDate && (
                <View style={styles.dateInfo}>
                  <Text style={styles.label}>Date</Text>
                  <Text style={styles.dateText}>{tournament.startDate}</Text>
                  {tournament.endDate && <Text style={styles.dateText}>to {tournament.endDate}</Text>}
                </View>
              )}
            </View>
            
            {tournament.location && (
              <View style={styles.locationContainer}>
                <MaterialCommunityIcons name="map-marker" size={16} color={COLORS.textLight} />
                <Text style={styles.locationText}>{tournament.location}</Text>
              </View>
            )}
          </Card.Content>
        </Card>
        
        <Card style={styles.searchCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Find Your Team</Title>
            <Paragraph style={styles.description}>
              Enter your team name to view your game schedule.
            </Paragraph>
            
            <View style={styles.searchContainer}>
              <TextInput
                label="Team Name"
                value={teamName}
                onChangeText={setTeamName}
                style={styles.input}
                mode="outlined"
                right={
                  teamName ? (
                    <TextInput.Icon 
                      icon="close" 
                      onPress={handleReset}
                      color={COLORS.textLight}
                    />
                  ) : null
                }
              />
              <Button 
                mode="contained" 
                onPress={handleSearch}
                style={styles.searchButton}
                disabled={!teamName.trim()}
              >
                Search
              </Button>
            </View>
          </Card.Content>
        </Card>
        
        <Card style={styles.scheduleCard}>
          <Card.Content>
            <View style={styles.scheduleHeader}>
              <Title style={styles.cardTitle}>Tournament Schedule</Title>
              {searchQuery && (
                <Chip 
                  mode="outlined" 
                  onClose={handleReset}
                  style={styles.filterChip}
                >
                  Team: {searchQuery}
                </Chip>
              )}
            </View>
            
            {filteredSchedule.length > 0 ? (
              <DataTable style={styles.table}>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title style={styles.dateColumn}>Date/Time</DataTable.Title>
                  <DataTable.Title style={styles.poolColumn}>Pool</DataTable.Title>
                  <DataTable.Title style={styles.teamColumn}>Teams</DataTable.Title>
                  <DataTable.Title style={styles.scoreColumn}>Score</DataTable.Title>
                </DataTable.Header>
                
                {filteredSchedule.map((game) => (
                  <DataTable.Row key={game.id} style={styles.tableRow}>
                    <DataTable.Cell style={styles.dateColumn}>
                      <Text style={styles.dateText}>{game.date}</Text>
                      <Text style={styles.timeText}>{game.time}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.poolColumn}>
                      <View style={styles.poolContainer}>
                        <Text style={styles.poolText}>{game.pool}</Text>
                      </View>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.teamColumn}>
                      <Text style={styles.teamText}>{game.homeTeam}</Text>
                      <Text style={styles.vsText}>vs</Text>
                      <Text style={styles.teamText}>{game.awayTeam}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.scoreColumn}>
                      <Text style={styles.scoreText}>{game.score}</Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            ) : (
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="calendar-remove" size={48} color={COLORS.textLight} />
                <Text style={styles.emptyText}>No games found for this team</Text>
              </View>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
      
      {isOrganizer && (
        <FAB
          style={styles.fab}
          icon="share"
          onPress={() => setShareModalVisible(true)}
          color="white"
        />
      )}
      
      <Portal>
        <Modal
          visible={shareModalVisible}
          onDismiss={() => setShareModalVisible(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Title style={styles.modalTitle}>Share Tournament</Title>
          <Divider style={styles.divider} />
          
          <View style={styles.tournamentShareInfo}>
            <Text style={styles.shareLabel}>Tournament Name:</Text>
            <Text style={styles.shareValue}>{tournament.name}</Text>
          </View>
          
          <View style={styles.tournamentShareInfo}>
            <Text style={styles.shareLabel}>Tournament Code:</Text>
            <Text style={styles.shareValue}>{tournament.code}</Text>
          </View>
          
          <Paragraph style={styles.shareInstructions}>
            Share this code with teams so they can join your tournament. They can enter
            the code in the "Join Tournament" screen.
          </Paragraph>
          
          <Button
            mode="contained"
            icon="share"
            onPress={handleShare}
            style={styles.shareButton}
          >
            Share Tournament Code
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => setShareModalVisible(false)}
            style={styles.closeButton}
          >
            Close
          </Button>
        </Modal>
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
  menu: {
    marginTop: 40,
  },
  infoCard: {
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  tournamentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tournamentInfo: {
    flex: 1,
  },
  label: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: SIZES.margin / 4,
  },
  codeChip: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
  },
  codeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateInfo: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.margin,
  },
  locationText: {
    marginLeft: SIZES.margin / 4,
    color: COLORS.textLight,
  },
  searchCard: {
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchButton: {
    marginLeft: SIZES.margin,
    backgroundColor: COLORS.primary,
  },
  scheduleCard: {
    marginBottom: SIZES.margin * 3,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: SIZES.margin,
  },
  filterChip: {
    marginLeft: SIZES.margin,
    backgroundColor: COLORS.tertiary,
  },
  table: {
    marginTop: SIZES.margin / 2,
  },
  tableHeader: {
    backgroundColor: COLORS.surface,
  },
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  dateColumn: {
    flex: 1.2,
  },
  poolColumn: {
    flex: 0.6,
    justifyContent: 'center',
  },
  teamColumn: {
    flex: 2,
    justifyContent: 'center',
  },
  scoreColumn: {
    flex: 0.8,
    justifyContent: 'center',
  },
  timeText: {
    fontSize: SIZES.xSmall,
    color: COLORS.textLight,
  },
  poolContainer: {
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: 2,
    alignItems: 'center',
    width: 30,
  },
  poolText: {
    fontSize: SIZES.xSmall,
    fontWeight: 'bold',
  },
  teamText: {
    fontSize: SIZES.small,
  },
  vsText: {
    fontSize: SIZES.xSmall,
    color: COLORS.textLight,
    marginVertical: 2,
  },
  scoreText: {
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: SIZES.padding * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: SIZES.margin,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: SIZES.margin,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: SIZES.padding * 1.5,
    margin: SIZES.margin,
    borderRadius: SIZES.radius,
  },
  modalTitle: {
    fontSize: SIZES.large,
    marginBottom: SIZES.margin / 2,
    color: COLORS.primary,
  },
  divider: {
    marginBottom: SIZES.margin,
  },
  tournamentShareInfo: {
    marginBottom: SIZES.margin,
  },
  shareLabel: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  shareValue: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  shareInstructions: {
    fontSize: SIZES.medium,
    marginVertical: SIZES.margin,
  },
  shareButton: {
    marginTop: SIZES.margin,
    backgroundColor: COLORS.primary,
  },
  closeButton: {
    marginTop: SIZES.margin,
    borderColor: COLORS.primary,
  },
});
