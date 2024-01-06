import { View, TextInput, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import useTasks from "../hooks/useTasks";
import { useState } from "react";

interface TaskLineProps {
  todoListKey: string;
  taskKey: string;
}

export default function TaskLine({ todoListKey, taskKey }: TaskLineProps) {
  const { todoLists, toggleTaskIsCompleted, updateTaskName } = useTasks();

  const { isCompleted, name } = todoLists[todoListKey].tasks[taskKey];

  const [isFocused, setIsFocused] = useState(false);

  const handleToggleTask = () => {
    toggleTaskIsCompleted(todoListKey, taskKey);
  };

  const handleTaskNameUpdate = (newName: string) => {
    updateTaskName(todoListKey, taskKey, newName);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleToggleTask} style={styles.isCompletedPressable}>
        {isCompleted ? (
          <Ionicons name="checkmark-circle-outline" size={24} color="black" />
        ) : (
          <Ionicons name="ellipse-outline" size={24} color="black" />
        )}
      </Pressable>

      <TextInput
        style={[
          styles.taskText,
          isCompleted ? styles.taskTextIsCompleted : null,
        ]}
        value={name}
        onChangeText={handleTaskNameUpdate}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <View>
        {isFocused ? (
          <Ionicons name="trash-outline" size={24} color="red" />
        ) : null}
      </View>
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
    fontSize: 16,
    flex: 1,
    height: 48,
    paddingLeft: 8,
    color: "black",
  },
  taskTextIsCompleted: {
    color: "#00000055",
    textDecorationLine: "line-through",
  },
});
