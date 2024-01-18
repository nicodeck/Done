import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
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

  const darkModeIsOn = useColorScheme() == "dark";

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
      <View style={[styles.container, darkModeIsOn && styles.containerDark]}>
        <View
          style={[
            styles.closeButtonRow,
            darkModeIsOn && styles.closeButtonRowDark,
          ]}
        >
          <Pressable
            style={styles.closeButton}
            onPress={handlePressOnCloseButton}
          >
            <Ionicons
              name="close-outline"
              size={32}
              color={darkModeIsOn ? "white" : "black"}
            />
          </Pressable>
        </View>
        <TextInput
          value={taskInfo?.name}
          style={[
            styles.taskNameInput,
            darkModeIsOn && styles.taskNameInputDark,
          ]}
          onChangeText={handleTaskNameChange}
          placeholder="Enter a task name..."
          placeholderTextColor={darkModeIsOn ? "#ffffffaa" : "#000000aa"}
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
  containerDark: {
    backgroundColor: "#222222",
  },
  closeButtonRow: {
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#cccccc",
    height: 72,
    justifyContent: "center",
  },
  closeButtonRowDark: {
    borderColor: "#444444",
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
  taskNameInputDark: {
    backgroundColor: "#121212",
    borderColor: "#444444",
    color: "white",
  },
});
