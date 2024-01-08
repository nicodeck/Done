import { Text, StyleSheet, Pressable, ScrollView, View } from "react-native";
import TaskLine from "./TaskLine";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TodoListsAtom } from "@/state";
import { atom, useAtom } from "jotai";

interface TodoListProps {
  todoListKey: string;
}

const completedTasksContainerIsOpenAtom = atom(false);

export default function TodoList({ todoListKey }: TodoListProps) {
  const [todoLists, setTodoLists] = useAtom(TodoListsAtom);

  const tasks = todoListKey ? todoLists[todoListKey].tasks : {};

  const countOfNotCompletedTasks = Object.values(tasks).reduce(
    (count, task) => (!task.isCompleted ? count + 1 : count),
    0
  );

  const countOfCompletedTasks = Object.values(tasks).reduce(
    (count, task) => (task.isCompleted ? count + 1 : count),
    0
  );

  const [completedTasksContainerIsOpen, setCompletedTasksContainerIsOpen] =
    useAtom(completedTasksContainerIsOpenAtom);

  const handlePressOnCompletedTasksHeader = () => {
    setCompletedTasksContainerIsOpen(!completedTasksContainerIsOpen);
  };

  const handlePressOnAddTask = () => {
    setTodoLists({
      type: "AddNewTask",
      todoListKey: todoListKey,
    });
  };

  const completedTasksList = () => {
    return (
      <View>
        {Object.keys(tasks).map((key) => {
          if (tasks[key].isCompleted) {
            return (
              <TaskLine key={key} todoListKey={todoListKey} taskKey={key} />
            );
          }
        })}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {countOfNotCompletedTasks > 0 ? (
          Object.keys(tasks).map((key) => {
            if (!tasks[key].isCompleted) {
              return (
                <TaskLine key={key} todoListKey={todoListKey} taskKey={key} />
              );
            }
          })
        ) : (
          <View style={styles.noTasksTextContainer}>
            <Text style={styles.noTasksText}>No tasks... Add one?</Text>
          </View>
        )}

        {countOfCompletedTasks > 0 && (
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
        )}
        {completedTasksContainerIsOpen ? completedTasksList() : null}
      </ScrollView>
      <Pressable onPress={handlePressOnAddTask} style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noTasksTextContainer: {
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#00000022",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  noTasksText: {
    fontSize: 16,
    color: "#000000aa",
    fontStyle: "italic",
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
