import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import JoinTournamentScreen from '../screens/JoinTournamentScreen';
import CreateTournamentScreen from '../screens/CreateTournamentScreen';
import TournamentDetailsScreen from '../screens/TournamentDetailsScreen';
import UploadScheduleScreen from '../screens/UploadScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { COLORS } from '../theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define tab icons and when to hide tab bar
const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  const hideOnScreens = ['TournamentDetails', 'UploadSchedule'];
  return hideOnScreens.includes(routeName) ? false : true;
};

// Main tab navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        headerShown: false,
        tabBarStyle: {
          paddingVertical: 5,
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="JoinTournament" 
        component={JoinTournamentScreen}
        options={{
          tabBarLabel: 'Join',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="CreateTournament" 
        component={CreateTournamentScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trophy" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main stack navigator that includes the tab navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={MainTabs} 
        options={{ headerShown: false }} 
      />
      
      <Stack.Screen 
        name="TournamentDetails" 
        component={TournamentDetailsScreen}
        options={{ title: 'Tournament Details' }}
      />
      
      <Stack.Screen 
        name="UploadSchedule" 
        component={UploadScheduleScreen}
        options={{ title: 'Upload Schedule' }}
      />
    </Stack.Navigator>
  );
}
