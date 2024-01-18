import { useMemo } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  Alert,
  useColorScheme,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { atom, useAtomValue, useAtom, useSetAtom } from "jotai";
import { TodoListsAtom } from "@/state";
import { currentTodoListKeyAtom } from "@/state/ui";

interface DrawerLineProps {
  todoListKey: string;
  closeDrawerFunction: () => void;
}

export default function DrawerLine({
  todoListKey,
  closeDrawerFunction,
}: DrawerLineProps) {
  const todoListNameAtom = useMemo(
    () => atom((get) => get(TodoListsAtom)[todoListKey].name),
    []
  );

  const todoListName = useAtomValue(todoListNameAtom);

  const [currentTodoListKey, setCurrentTodoListKey] = useAtom(
    currentTodoListKeyAtom
  );

  const setTodoLists = useSetAtom(TodoListsAtom);

  const darkModeIsOn = useColorScheme() == "dark";

  const handlePressOnDrawerLine = () => {
    setCurrentTodoListKey(todoListKey);
    closeDrawerFunction();
  };

  const handlePressOnDeleteButton = () => {
    Alert.alert(
      "Delete " + todoListName + "?",
      "",
      [
        {
          text: "No",
        },
        {
          text: "Yes, delete it",
          onPress: () =>
            setTodoLists({ type: "DeleteTodoList", todoListKey: todoListKey }),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <Pressable
      style={[
        styles.container,
        darkModeIsOn && styles.containerDark,
        currentTodoListKey === todoListKey && styles.activeContainer,
        currentTodoListKey === todoListKey &&
          darkModeIsOn &&
          styles.activeContainerDark,
      ]}
      onPress={handlePressOnDrawerLine}
    >
      <Text style={[styles.title, darkModeIsOn && styles.titleDark]}>
        {todoListName}
      </Text>
      <Pressable
        onPress={handlePressOnDeleteButton}
        style={styles.deleteButton}
      >
        <Ionicons
          name="close-outline"
          size={24}
          color={darkModeIsOn ? "white" : "black"}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    paddingLeft: 16,
    paddingRight: 8,
    borderColor: "#00000022",
    borderStyle: "solid",
    borderBottomWidth: 1,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerDark: {
    borderColor: "#ffffff22",
  },
  activeContainer: {
    backgroundColor: "#00000010",
  },
  activeContainerDark: {
    backgroundColor: "#ffffff10",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titleDark: {
    color: "white",
  },
  deleteButton: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
