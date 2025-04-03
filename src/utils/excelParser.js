// excelParser.js
// Utility functions for parsing Excel tournament schedules

import * as XLSX from 'xlsx';

/**
 * Parse Excel file content into structured schedule data
 * @param {ArrayBuffer} fileContent - The content of the Excel file as ArrayBuffer
 * @returns {Object} Object containing parsed schedule and validation results
 */
export const parseScheduleFile = (fileContent) => {
  try {
    // Parse the Excel file
    const workbook = XLSX.read(fileContent, { type: 'array' });
    
    // Get the first sheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // Convert to JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Extract headers (first row)
    const headers = rawData[0].map(header => header.trim().toLowerCase());
    
    // Validate required columns
    const validationResult = validateScheduleColumns(headers);
    
    if (!validationResult.isValid) {
      return {
        success: false,
        validationErrors: validationResult.errors,
        data: null
      };
    }
    
    // Process data rows
    const scheduleData = processScheduleRows(rawData.slice(1), headers);
    
    return {
      success: true,
      validationErrors: [],
      data: scheduleData
    };
  } catch (error) {
    return {
      success: false,
      validationErrors: [`Failed to parse file: ${error.message}`],
      data: null
    };
  }
};

/**
 * Validate if the Excel file has all required columns
 * @param {Array} headers - Array of column headers
 * @returns {Object} Validation result with isValid flag and errors array
 */
const validateScheduleColumns = (headers) => {
  const requiredColumns = ['date', 'time', 'home team', 'away team'];
  const errors = [];
  
  // Check for required columns
  for (const column of requiredColumns) {
    if (!headers.some(header => header.includes(column))) {
      errors.push(`Column "${column}" is missing in the spreadsheet`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Process data rows into structured game objects
 * @param {Array} rows - Array of data rows
 * @param {Array} headers - Array of column headers
 * @returns {Array} Array of game objects
 */
const processScheduleRows = (rows, headers) => {
  const games = [];
  
  // Map column indices
  const columnMap = {
    date: headers.findIndex(h => h.includes('date')),
    time: headers.findIndex(h => h.includes('time')),
    pool: headers.findIndex(h => h.includes('pool') || h.includes('location')),
    homeTeam: headers.findIndex(h => h.includes('home')),
    awayTeam: headers.findIndex(h => h.includes('away')),
    score: headers.findIndex(h => h.includes('score') || h.includes('result'))
  };
  
  // Process each row
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    
    // Skip empty rows
    if (!row.length || !row[columnMap.homeTeam] || !row[columnMap.awayTeam]) {
      continue;
    }
    
    // Create game object
    const game = {
      id: `game_${i + 1}`,
      date: row[columnMap.date] ? formatDate(row[columnMap.date]) : 'TBD',
      time: row[columnMap.time] ? formatTime(row[columnMap.time]) : 'TBD',
      pool: columnMap.pool >= 0 ? (row[columnMap.pool] || '') : '',
      homeTeam: row[columnMap.homeTeam],
      awayTeam: row[columnMap.awayTeam],
      score: columnMap.score >= 0 ? (row[columnMap.score] || 'TBD') : 'TBD',
      // Additional fields can be added based on requirements
    };
    
    games.push(game);
  }
  
  return games;
};

/**
 * Format date strings consistently
 * @param {String|Date} dateValue - Date value from Excel
 * @returns {String} Formatted date string
 */
const formatDate = (dateValue) => {
  try {
    let date;
    
    // Handle different date formats
    if (dateValue instanceof Date) {
      date = dateValue;
    } else if (typeof dateValue === 'number') {
      // Excel stores dates as serial numbers, convert to JS Date
      date = XLSX.SSF.parse_date_code(dateValue);
    } else {
      // Try to parse string date
      date = new Date(dateValue);
    }
    
    // Format as MM/DD/YYYY
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${month}/${day}/${year}`;
  } catch (error) {
    // Return the original value if parsing fails
    return String(dateValue);
  }
};

/**
 * Format time values consistently
 * @param {String|Number} timeValue - Time value from Excel
 * @returns {String} Formatted time string
 */
const formatTime = (timeValue) => {
  try {
    let time;
    
    // Handle different time formats
    if (typeof timeValue === 'number') {
      // Excel stores times as decimal fractions of a day
      const totalMinutes = Math.round(timeValue * 24 * 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      // Format as HH:MM AM/PM
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
      
      return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
    } else {
      // Try to normalize string time
      if (timeValue.includes(':')) {
        // Assume it's already in a time format
        const [hourPart, minutePart] = timeValue.split(':');
        let hour = parseInt(hourPart, 10);
        
        // Check for AM/PM indicators
        const isPM = timeValue.toLowerCase().includes('pm');
        const isAM = timeValue.toLowerCase().includes('am');
        
        if (isPM && hour < 12) {
          hour += 12;
        } else if (isAM && hour === 12) {
          hour = 0;
        }
        
        const minute = parseInt(minutePart, 10);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        
        return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`;
      }
    }
    
    // Return original if we can't parse
    return String(timeValue);
  } catch (error) {
    return String(timeValue);
  }
};

/**
 * Get a list of all unique teams from the schedule
 * @param {Array} games - Array of game objects
 * @returns {Array} Array of unique team names
 */
export const extractTeams = (games) => {
  const teamSet = new Set();
  
  games.forEach(game => {
    if (game.homeTeam) teamSet.add(game.homeTeam);
    if (game.awayTeam) teamSet.add(game.awayTeam);
  });
  
  return Array.from(teamSet).sort();
};

/**
 * Filter schedule to get games for a specific team
 * @param {Array} games - Array of game objects
 * @param {String} teamName - Name of the team to filter for
 * @returns {Array} Array of games involving the specified team
 */
export const getGamesForTeam = (games, teamName) => {
  if (!teamName) return games;
  
  const normalizedTeamName = teamName.toLowerCase().trim();
  
  return games.filter(game => 
    game.homeTeam.toLowerCase().includes(normalizedTeamName) || 
    game.awayTeam.toLowerCase().includes(normalizedTeamName)
  );
};

/**
 * Group games by date
 * @param {Array} games - Array of game objects
 * @returns {Object} Object with dates as keys and arrays of games as values
 */
export const groupGamesByDate = (games) => {
  const groupedGames = {};
  
  games.forEach(game => {
    if (!groupedGames[game.date]) {
      groupedGames[game.date] = [];
    }
    
    groupedGames[game.date].push(game);
  });
  
  // Sort games by time within each date
  Object.keys(groupedGames).forEach(date => {
    groupedGames[date].sort((a, b) => {
      return a.time.localeCompare(b.time);
    });
  });
  
  return groupedGames;
};
