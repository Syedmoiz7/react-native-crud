import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import { useThemeContext } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';

const AddTaskScreen = () => {
  const { theme } = useThemeContext();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const [name, setName] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTask = () => {
    if (!name.trim()) return;

    dispatch(addTask({
      id: uuidv4(),
      name,
      priority,
      dueDate: dueDate.toISOString(),
      completed: false,
      createdAt: new Date().toISOString(),
    }));
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.label, { color: theme.colors.text }]}>Task Name</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.text }]}
        value={name}
        onChangeText={setName}
        placeholder="Enter task name"
        placeholderTextColor={theme.colors.text + '88'}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Priority</Text>
      <View style={[styles.pickerContainer, { borderColor: theme.colors.text }]}>
        <Picker
          selectedValue={priority}
          onValueChange={(value) => setPriority(value)}
          style={{ color: theme.colors.text }}
        >
          <Picker.Item label="High" value="High" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="Low" value="Low" />
        </Picker>
      </View>

      <Text style={[styles.label, { color: theme.colors.text }]}>Due Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={{ color: theme.colors.text }}>{dueDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, date) => {
            if (date) setDueDate(date);
            setShowDatePicker(false);
          }}
        />
      )}

      <TouchableOpacity onPress={handleAddTask} style={[styles.addButton, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.addText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
  },
  addButton: {
    marginTop: 24,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
