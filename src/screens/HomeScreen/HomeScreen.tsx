import { Text, StyleSheet, Pressable, ScrollView } from "react-native";
import TaskLine from "../../components/TaskLine";
import { SafeAreaView } from "react-native-safe-area-context";
import useTasks from "../../hooks/useTasks";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen() {
  const { tasks, addTask } = useTasks();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My tasks</Text>
      <ScrollView>
        {Object.keys(tasks).map((key) => {
          return <TaskLine key={key} taskKey={key} />;
        })}
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
