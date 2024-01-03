import { View, TextInput, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import useTasks from "../hooks/useTasks";

interface TaskLineProps {
  taskKey: string;
}

export default function TaskLine({ taskKey }: TaskLineProps) {
  const { tasks, toggleTaskIsCompleted, updateTaskName } = useTasks();

  const { isCompleted, name } = tasks[taskKey];

  const handleToggleTask = () => {
    toggleTaskIsCompleted(taskKey);
  };

  const handleTaskNameUpdate = (newName: string) => {
    updateTaskName(taskKey, newName);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleToggleTask} style={styles.isCompletedPressable}>
        {isCompleted ? (
          <Ionicons name="checkmark-circle-outline" size={32} color="black" />
        ) : (
          <Ionicons name="ellipse-outline" size={32} color="black" />
        )}
      </Pressable>

      <TextInput
        style={styles.taskText}
        value={name}
        onChangeText={handleTaskNameUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomColor: "#00000022",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  isCompletedPressable: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  taskText: {
    fontSize: 20,
    flex: 1,
    height: 48,
    paddingLeft: 16,
  },
});
