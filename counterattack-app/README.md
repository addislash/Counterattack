# Counterattack 🏊‍♂️ 🏐

A mobile app for water polo tournament management.

## Overview

**Counterattack** streamlines tournament management for water polo by automating schedule management. It's designed to help both tournament organizers and participating teams with the following key features:

- **Schedule Importing:** Upload Excel spreadsheets containing tournament schedules
- **Team Search:** Find specific team information including game times and opponents
- **Tournament Creation:** Create tournaments with unique joining codes
- **Tournament Join:** Join tournaments using a code and view your team's schedule

## Project Structure

```
counterattack-app/
├── src/
│   ├── assets/         # App images, fonts and other assets
│   ├── components/     # Reusable UI components
│   ├── navigation/     # Navigation configuration
│   ├── screens/        # App screens/pages
│   ├── services/       # API services and data fetching
│   ├── utils/          # Utility functions
│   └── theme.js        # App-wide styling constants
├── App.js              # Main app component
└── package.json        # Project dependencies
```

## Screens

### Main Screens

- **Home Screen:** Dashboard with recent tournaments and quick actions
- **Join Tournament:** Enter tournament code and team name to view schedule
- **Create Tournament:** Set up a new tournament with details and upload schedule
- **Profile:** User profile and settings

### Secondary Screens

- **Tournament Details:** View full schedule with team filtering
- **Upload Schedule:** Upload and validate Excel schedule files

## Features

1. **Schedule Upload & Parsing**
   - Support for Excel (.xlsx) files
   - Auto-extraction of teams, games, and schedules
   - Validation of uploaded schedules

2. **Team Search**
   - Find your team's games quickly
   - View detailed game information

3. **Tournament Management**
   - Create tournaments with automatic code generation
   - Join existing tournaments with codes
   - View tournament details and schedules

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- React Native development environment
- Android Studio or Xcode (for device emulation)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/counterattack-app.git
   cd counterattack-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Run on Android or iOS
   ```
   npm run android
   # or
   npm run ios
   ```

## Tech Stack

- **Frontend:** React Native with React Native Paper UI library
- **State Management:** React Context API and Hooks
- **Navigation:** React Navigation
- **Excel Parsing:** xlsx library

## Future Enhancements

- Push notifications for game alerts
- Real-time score updates
- Team registration and roster management
- Stats tracking and standings tables
- Tournament bracketing tools

## License

This project is licensed under the MIT License - see the LICENSE file for details.
