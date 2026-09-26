import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider } from 'expo-sqlite';

import { migrateDbIfNeeded } from './data/migrations';
import HomeScreen from './screens/HomeScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
import EditTaskScreen from './screens/EditTaskScreen';
import LoginScreen from './screens/LoginScreen';
import { Task } from './types/Task';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  CreateTask: undefined;
  EditTask: { task: Task };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SQLiteProvider databaseName="tasks.db" onInit={migrateDbIfNeeded}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Minhas tarefas' }} 
          />
          <Stack.Screen 
            name="CreateTask" 
            component={CreateTaskScreen} 
            options={{ title: 'Nova tarefa' }} 
          />
          <Stack.Screen 
            name="EditTask" 
            component={EditTaskScreen} 
            options={{ title: 'Editar tarefa' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}