import { useState } from "react";
import { Text, StyleSheet, Pressable, ScrollView, View } from "react-native";
import TaskLine from "./TaskLine";
import useTasks from "../hooks/useTasks";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TodoList() {
  const { tasks, addTask } = useTasks();

  const [completedTasksContainerIsOpen, setCompletedTasksContainerIsOpen] =
    useState(false);

  const handlePressOnCompletedTasksHeader = () => {
    setCompletedTasksContainerIsOpen(!completedTasksContainerIsOpen);
  };

  const completedTasksList = () => {
    return (
      <View>
        {Object.keys(tasks).map((key) => {
          if (tasks[key].isCompleted) {
            return <TaskLine key={key} taskKey={key} />;
          }
        })}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {Object.keys(tasks).map((key) => {
          if (!tasks[key].isCompleted) {
            return <TaskLine key={key} taskKey={key} />;
          }
        })}
        <Pressable
          style={styles.completedTasksHeaderContainer}
          onPress={handlePressOnCompletedTasksHeader}
        >
          <Text style={styles.completedTasksHeaderText}>Completed Tasks</Text>
          {completedTasksContainerIsOpen ? (
            <Ionicons name="chevron-up-outline" size={20} color="black" />
          ) : (
            <Ionicons name="chevron-down-outline" size={20} color="black" />
          )}
        </Pressable>
        {completedTasksContainerIsOpen ? completedTasksList() : null}
      </ScrollView>
      <Pressable onPress={addTask} style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  completedTasksHeaderContainer: {
    padding: 16,
    backgroundColor: "#00000011",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedTasksHeaderText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "black",
    borderRadius: 50,
    position: "absolute",
    bottom: 24,
    right: 24,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
  },
});
