import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import useTasks from "../hooks/useTasks";

interface TaskLineProps {
  taskKey: string;
}

export default function TaskLine({ taskKey }: TaskLineProps) {
  const { tasks, toggleTaskIsCompleted } = useTasks();

  const { isCompleted, name } = tasks[taskKey];

  const handleToggleTask = () => {
    toggleTaskIsCompleted(taskKey);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleToggleTask}>
        {isCompleted ? (
          <Ionicons
            style={styles.icon}
            name="checkmark-circle-outline"
            size={32}
            color="black"
          />
        ) : (
          <Ionicons
            style={styles.icon}
            name="ellipse-outline"
            size={32}
            color="black"
          />
        )}
      </Pressable>

      <Text style={styles.taskText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomColor: "#00000022",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  icon: {
    marginRight: 8,
  },
  taskText: {
    fontSize: 20,
  },
});
