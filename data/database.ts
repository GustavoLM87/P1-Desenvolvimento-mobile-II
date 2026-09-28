import { type SQLiteDatabase } from 'expo-sqlite';
import { Task } from '../types/Task';

export async function getTasks(db: SQLiteDatabase): Promise<Task[]> {
  const result = await db.getAllAsync<{ id: string; title: string; description: string | null; completed: number }>(
    'SELECT * FROM tasks;'
  );

  return result.map(row => ({
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    completed: Boolean(row.completed),
  }));
}

export async function addTask(db: SQLiteDatabase, task: Task) {
  await db.runAsync(
    'INSERT INTO tasks (id, title, description, completed) VALUES (?, ?, ?, ?);',
    [task.id, task.title, task.description || '', task.completed ? 1 : 0]
  );
}

export async function toggleTask(db: SQLiteDatabase, id: string, completed: boolean) {
  await db.runAsync(
    'UPDATE tasks SET completed = ? WHERE id = ?;',
    [completed ? 1 : 0, id]
  );
}

export async function updateTask(db: SQLiteDatabase, id: string, title: string, description: string) {
  await db.runAsync(
    'UPDATE tasks SET title = ?, description = ? WHERE id = ?;',
    [title, description, id]
  );
}

export async function deleteTask(db: SQLiteDatabase, id: string) {
  await db.runAsync('DELETE FROM tasks WHERE id = ?;', [id]);
}