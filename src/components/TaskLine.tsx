import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { TodoListsAtom } from "@/state";
import { useMemo } from "react";

interface TaskLineProps {
  todoListKey: string;
  taskKey: string;
}

export default function TaskLine({ todoListKey, taskKey }: TaskLineProps) {
  const taskAtom = useMemo(
    () => atom((get) => get(TodoListsAtom)[todoListKey].tasks[taskKey]),
    []
  );

  const { isCompleted, name } = useAtomValue(taskAtom);

  const setTodoLists = useSetAtom(TodoListsAtom);

  const darkModeIsOn = useColorScheme() == "dark";

  const handleToggleTask = () => {
    setTodoLists({
      type: "ToggleTaskIsCompleted",
      todoListKey: todoListKey,
      taskKey: taskKey,
    });
  };

  const handleTaskNameUpdate = (newName: string) => {
    setTodoLists({
      type: "UpdateTaskName",
      todoListKey: todoListKey,
      taskKey: taskKey,
      name: newName,
    });
  };

  const handlePressOnDelete = () => {
    setTodoLists({
      type: "DeleteTask",
      todoListKey: todoListKey,
      taskKey: taskKey,
    });
  };

  return (
    <View style={[styles.container, darkModeIsOn && styles.containerDark]}>
      <Pressable onPress={handleToggleTask} style={styles.isCompletedPressable}>
        {isCompleted ? (
          <Ionicons
            name="checkmark-circle-outline"
            size={24}
            color={darkModeIsOn ? "white" : "black"}
          />
        ) : (
          <Ionicons
            name="ellipse-outline"
            size={24}
            color={darkModeIsOn ? "white" : "black"}
          />
        )}
      </Pressable>
      <TextInput
        style={[
          styles.taskText,
          darkModeIsOn && styles.taskTextDark,
          isCompleted && styles.taskTextIsCompleted,
          isCompleted && darkModeIsOn && styles.taskTextIsCompletedDark,
        ]}
        onChangeText={handleTaskNameUpdate}
        placeholder="Task name"
        placeholderTextColor="#aaaaaa"
      >
        {name}
      </TextInput>
      <Pressable onPress={handlePressOnDelete} style={styles.deleteButton}>
        <Ionicons
          name="close-outline"
          size={24}
          color={darkModeIsOn ? "white" : "black"}
        />
      </Pressable>
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
    height: 72,
    borderBottomColor: "#00000022",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  containerDark: {
    borderBottomColor: "#ffffff22",
  },
  isCompletedPressable: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  taskText: {
    fontSize: 16,
    color: "black",
    flex: 1,
    padding: 16,
    paddingLeft: 8,
  },
  taskTextDark: {
    color: "white",
  },
  taskTextIsCompleted: {
    color: "#00000055",
    textDecorationLine: "line-through",
  },
  taskTextIsCompletedDark: {
    color: "#ffffff88",
  },
  deleteButton: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
