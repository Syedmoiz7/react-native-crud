import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTaskCompletion, deleteTask, archiveOldCompletedTasks } from '../store/tasksSlice';
import { useThemeContext } from '../theme/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/MainNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type TaskListNavigationProp = StackNavigationProp<RootStackParamList, 'TaskList'>;

const TaskListScreen = () => {
  const { theme } = useThemeContext();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigation = useNavigation<TaskListNavigationProp>();

  useEffect(() => {
    dispatch(archiveOldCompletedTasks());
  }, [dispatch]);

  const sortedTasks = tasks
    .filter((t) => !t.archived)
    .sort((a, b) => {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const renderItem = ({ item }: any) => (
    <View style={[styles.taskItem, { backgroundColor: theme.colors.primary + '20' }]}>
      <TouchableOpacity style={{ flex: 1 }}>
        <Text
          style={[
            styles.taskName,
            {
              textDecorationLine: item.completed ? 'line-through' : 'none',
              color: theme.colors.text,
            },
          ]}
        >
          {item.name}
        </Text>
        <Text style={[styles.priority, { color: theme.colors.text }]}>
          Priority: {item.priority}
        </Text>
      </TouchableOpacity>

      <View style={styles.delteCompleteButtons}>
        <TouchableOpacity
          onPress={() => dispatch(deleteTask(item.id))}
          style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => dispatch(toggleTaskCompletion(item.id))}
          style={[styles.deleteButton, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.deleteText}>{item?.completed ? 'Incomplete' : 'Completed'}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ThemeToggle />
      <Text style={[styles.header, { color: theme.colors.text }]}>Your Tasks</Text>
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ color: theme.colors.text }}>No tasks found.</Text>}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('AddTask')}
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
      >
        <Text style={styles.addText}>+ Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  taskItem: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  taskName: {
    fontSize: 16,
  },
  priority: {
    fontSize: 14,
    opacity: 0.8,
  },
  addButton: {
    marginTop: 12,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
  },
  delteCompleteButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'crimson',
    borderRadius: 6,
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
