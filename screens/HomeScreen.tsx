import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';
import { Task } from '../types/Task';
import { getTasks, toggleTask, deleteTask } from '../data/database';

import Button from '../components/Button';
import TaskItem from '../components/TaskItem';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const db = useSQLiteContext();

  async function loadTasks() {
    try {
      const data = await getTasks(db);
      setTasks(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas do SQLite:', error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [db])
  );

  async function handleToggle(id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus = !task.completed;
    await toggleTask(db, id, newStatus);
    loadTasks(); // Atualiza a lista exibida
  }

  async function handleDelete(id: string) {
    await deleteTask(db, id);
    loadTasks(); // Atualiza a lista exibida
  }

  function handleEdit(task: Task) {
    navigation.navigate('EditTask', { task });
  }

  return (
    <View style={styles.container}>
      <Button
        title="+ Nova tarefa"
        onPress={() => navigation.navigate('CreateTask')}
        style={styles.addButton}
      />

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma tarefa cadastrada.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#777',
    fontSize: 16,
  },
}); 