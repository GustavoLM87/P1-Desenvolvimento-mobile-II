import { Text,View, StyleSheet, FlatList ,ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Task } from '../types/Task';
 
import Button from '../components/Button';
import TaskItem from '../components/TaskItem';
 
type Props = NativeStackScreenProps<
  RootStackParamList,
  'Home'
> & {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};
 
export default function HomeScreen({
  navigation,
  tasks,
  onDelete,
  onToggle,
}: Props) {
  function handleEdit(task: Task) {
    navigation.navigate('EditTask', {
      task,
    });
  }
 
  return (
    <View style={styles.container}>
      <ScrollView>
      <Button
        title="+ Nova tarefa"
        onPress={() =>
          navigation.navigate('CreateTask')
        }
        style={styles.addButton}
      />
 
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Nenhuma tarefa cadastrada.
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={onToggle}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
          )}
        />
      )}
      </ScrollView>
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
