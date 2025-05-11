import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Task = {
  id: string;
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  archived?: boolean;
};

type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : undefined;
      }
    },
    archiveOldCompletedTasks: (state) => {
      const now = new Date();
      state.tasks.forEach((task) => {
        if (
          task.completed &&
          task.completedAt &&
          !task.archived &&
          now.getTime() - new Date(task.completedAt).getTime() > 24 * 60 * 60 * 1000
        ) {
          task.archived = true;
        }
      });
    },
  },
});

export const { addTask, deleteTask, toggleTaskCompletion, archiveOldCompletedTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
