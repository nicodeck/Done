import { Text, StyleSheet, Pressable, ScrollView, View } from "react-native";
import TaskLine from "../../components/TaskLine";
import { SafeAreaView } from "react-native-safe-area-context";
import useTasks from "../../hooks/useTasks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

export default function HomeScreen() {
  const { tasks, addTask } = useTasks();

  const [completedTasksContainerIsOpen, setCompletedTasksContainerIsOpen] =
    useState(false);

  const handlePressOnCompletedTasksHeader = () => {
    setCompletedTasksContainerIsOpen(!completedTasksContainerIsOpen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My tasks</Text>
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
        <View
          style={
            completedTasksContainerIsOpen
              ? styles.completedTasksVisible
              : styles.completedTasksInvisible
          }
        >
          {Object.keys(tasks).map((key) => {
            if (tasks[key].isCompleted) {
              return <TaskLine key={key} taskKey={key} />;
            }
          })}
        </View>
      </ScrollView>
      <Pressable onPress={addTask} style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: "#00000022",
    borderBottomWidth: 1,
    borderStyle: "solid",
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
  completedTasksInvisible: {
    display: "none",
  },
  completedTasksVisible: {
    display: "flex",
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
