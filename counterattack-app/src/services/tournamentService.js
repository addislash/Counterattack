// tournamentService.js
// Service for tournament-related API calls
// Note: This is a mock implementation without actual API integration

// Simulate API delay
const simulateApiDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Create a new tournament
 * @param {Object} tournamentData - Tournament data
 * @returns {Promise} Promise with created tournament
 */
export const createTournament = async (tournamentData) => {
  // Simulate API call
  await simulateApiDelay(1500);
  
  // Generate a random tournament ID
  const tournamentId = `t_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    id: tournamentId,
    ...tournamentData,
    createdAt: new Date().toISOString(),
  };
};

/**
 * Join a tournament using a code
 * @param {String} tournamentCode - Tournament code
 * @param {String} teamName - Team name
 * @returns {Promise} Promise with tournament details
 */
export const joinTournament = async (tournamentCode, teamName) => {
  // Simulate API call
  await simulateApiDelay(1200);
  
  // In a real app, this would validate the code against the backend
  if (!tournamentCode || tournamentCode.length < 4) {
    throw new Error('Invalid tournament code');
  }
  
  // Mock tournament data
  return {
    id: `t_${Math.random().toString(36).substr(2, 9)}`,
    name: `Tournament ${tournamentCode}`,
    code: tournamentCode,
    teamName: teamName,
    startDate: '05/15/2025',
    endDate: '05/17/2025',
    location: 'Aquatic Center',
  };
};

/**
 * Upload tournament schedule
 * @param {String} tournamentId - Tournament ID
 * @param {File} scheduleFile - Excel file with schedule
 * @returns {Promise} Promise with upload result
 */
export const uploadSchedule = async (tournamentId, scheduleFile) => {
  // Simulate API call
  await simulateApiDelay(2000);
  
  // In a real app, this would send the file to the backend for processing
  return {
    success: true,
    message: 'Schedule uploaded successfully',
  };
};

/**
 * Get tournament details
 * @param {String} tournamentId - Tournament ID
 * @returns {Promise} Promise with tournament details
 */
export const getTournamentDetails = async (tournamentId) => {
  // Simulate API call
  await simulateApiDelay(800);
  
  // Mock tournament data
  return {
    id: tournamentId,
    name: 'Summer Classic 2025',
    code: 'SUMCL25',
    startDate: '05/15/2025',
    endDate: '05/17/2025',
    location: 'Seaside Aquatic Center',
    teams: 24,
  };
};

/**
 * Get tournament schedule
 * @param {String} tournamentId - Tournament ID
 * @returns {Promise} Promise with tournament schedule
 */
export const getTournamentSchedule = async (tournamentId) => {
  // Simulate API call
  await simulateApiDelay(1000);
  
  // Mock schedule data
  return [
    { id: '1', date: '05/15/2025', time: '10:00 AM', pool: 'A', homeTeam: 'Sharks', awayTeam: 'Dolphins', score: '10-8' },
    { id: '2', date: '05/15/2025', time: '01:30 PM', pool: 'B', homeTeam: 'Sharks', awayTeam: 'Barracudas', score: 'TBD' },
    { id: '3', date: '05/16/2025', time: '09:45 AM', pool: 'A', homeTeam: 'Otters', awayTeam: 'Sharks', score: 'TBD' },
    { id: '4', date: '05/16/2025', time: '03:15 PM', pool: 'C', homeTeam: 'Sharks', awayTeam: 'Stingrays', score: 'TBD' },
    { id: '5', date: '05/17/2025', time: '11:30 AM', pool: 'A', homeTeam: 'Sharks', awayTeam: 'Marlins', score: 'TBD' },
    { id: '6', date: '05/15/2025', time: '11:15 AM', pool: 'B', homeTeam: 'Dolphins', awayTeam: 'Marlins', score: '7-7' },
    { id: '7', date: '05/15/2025', time: '02:45 PM', pool: 'A', homeTeam: 'Stingrays', awayTeam: 'Otters', score: '12-9' },
    { id: '8', date: '05/16/2025', time: '11:00 AM', pool: 'C', homeTeam: 'Barracudas', awayTeam: 'Dolphins', score: 'TBD' },
    { id: '9', date: '05/16/2025', time: '04:30 PM', pool: 'B', homeTeam: 'Marlins', awayTeam: 'Otters', score: 'TBD' },
    { id: '10', date: '05/17/2025', time: '10:00 AM', pool: 'A', homeTeam: 'Stingrays', awayTeam: 'Barracudas', score: 'TBD' },
  ];
};

/**
 * Get list of user's tournaments
 * @returns {Promise} Promise with list of tournaments
 */
export const getUserTournaments = async () => {
  // Simulate API call
  await simulateApiDelay(1000);
  
  // Mock user tournaments
  return [
    { id: '1', name: 'Summer Classic 2025', teams: 24, startDate: 'May 15, 2025', code: 'SUMCL25' },
    { id: '2', name: 'Regional Championships', teams: 16, startDate: 'June 3, 2025', code: 'REGCHMP' },
  ];
};

/**
 * Get teams in a tournament
 * @param {String} tournamentId - Tournament ID
 * @returns {Promise} Promise with list of teams
 */
export const getTournamentTeams = async (tournamentId) => {
  // Simulate API call
  await simulateApiDelay(800);
  
  // Mock team data
  return [
    'Sharks',
    'Dolphins',
    'Barracudas',
    'Otters',
    'Stingrays',
    'Marlins',
  ];
};

/**
 * Generate a unique tournament code
 * @param {String} tournamentName - Tournament name
 * @returns {Promise} Promise with generated code
 */
export const generateTournamentCode = async (tournamentName) => {
  // Simulate API call
  await simulateApiDelay(500);
  
  if (!tournamentName) {
    return 'TOUR1234';
  }
  
  // Generate code based on tournament name
  const nameInitials = tournamentName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
  
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return `${nameInitials}${randomNum}`;
};
