import { Text, StyleSheet } from "react-native";
import TaskLine from "../../components/TaskLine";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAtom } from "jotai";
import useTasks from "../../hooks/useTasks";

export default function HomeScreen() {
  const { tasks } = useTasks();

  return (
    <SafeAreaView>
      <Text style={styles.title}>My tasks</Text>
      {Object.keys(tasks).map((key) => {
        return <TaskLine key={key} taskKey={key} />;
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
});
