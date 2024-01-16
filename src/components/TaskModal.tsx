import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  currentTodoListKeyAtom,
  taskModalIsVisibleAtom,
  taskModalTaskKeyAtom,
} from "@/state/ui";
import { useMemo } from "react";
import { TodoListsAtom } from "@/state";

export default function TaskModal() {
  const [taskModalIsVisible, setTaskModalIsVisible] = useAtom(
    taskModalIsVisibleAtom
  );

  const handlePressOnCloseButton = () => {
    setTaskModalIsVisible(false);
  };

  const currentTodoListKey = useAtomValue(currentTodoListKeyAtom);

  const taskModalTaskKey = useAtomValue(taskModalTaskKeyAtom);

  const taskInfoAtom = useMemo(
    () =>
      atom(
        (get) => get(TodoListsAtom)[currentTodoListKey].tasks[taskModalTaskKey]
      ),
    [currentTodoListKey, taskModalTaskKey]
  );

  const taskInfo = useAtomValue(taskInfoAtom);

  const setTodoLists = useSetAtom(TodoListsAtom);

  const handleTaskNameChange = (newTaskName: string) => {
    setTodoLists({
      type: "UpdateTaskName",
      todoListKey: currentTodoListKey,
      taskKey: taskModalTaskKey,
      name: newTaskName,
    });
  };

  return (
    <Modal visible={taskModalIsVisible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.closeButtonRow}>
          <Pressable
            style={styles.closeButton}
            onPress={handlePressOnCloseButton}
          >
            <Ionicons name="close-outline" size={32} color="black" />
          </Pressable>
        </View>
        <TextInput
          value={taskInfo?.name}
          style={styles.taskNameInput}
          onChangeText={handleTaskNameChange}
          placeholder="Enter a task name..."
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeeeee",
    flex: 1,
  },
  closeButtonRow: {
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#cccccc",
    height: 72,
    justifyContent: "center",
  },
  closeButton: {
    height: 48,
    width: 48,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  taskNameInput: {
    height: 64,
    fontSize: 24,
    backgroundColor: "white",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#cccccc",
  },
});
