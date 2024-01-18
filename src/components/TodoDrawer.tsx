import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import { atom, useSetAtom, useAtomValue } from "jotai";
import Ionicons from "@expo/vector-icons/Ionicons";
import DrawerLine from "./DrawerLine";
import { TodoListsAtom, lastCreatedTodoListKeyAtom } from "@/state";
import { currentTodoListKeyAtom } from "@/state/ui";
import { useEffect, useState } from "react";

interface TodoDrawerProps {
  closeDrawerFunction: () => void;
}

const TodoListsKeysAtom = atom<string[]>((get) =>
  Object.keys(get(TodoListsAtom))
);

export default function TodoDrawer({ closeDrawerFunction }: TodoDrawerProps) {
  const [justAddedANewTodoList, setJustAddedANewTodoList] = useState(false);

  const setTodoLists = useSetAtom(TodoListsAtom);

  const lastCreatedTodoListKey = useAtomValue(lastCreatedTodoListKeyAtom);

  const setCurrentTodoListKey = useSetAtom(currentTodoListKeyAtom);

  const todoListsKeys = useAtomValue(TodoListsKeysAtom);

  const darkModeIsOn = useColorScheme() == "dark";

  const handlePressOnAddButton = () => {
    setTodoLists({ type: "AddNewTodoList" });
    setJustAddedANewTodoList(true);
  };

  useEffect(() => {
    if (justAddedANewTodoList) {
      setCurrentTodoListKey(lastCreatedTodoListKey);
      closeDrawerFunction();
      setJustAddedANewTodoList(false);
    }
  }, [justAddedANewTodoList]);

  return (
    <View style={[styles.container, darkModeIsOn && styles.containerDark]}>
      <View style={[styles.header, darkModeIsOn && styles.headerDark]}>
        <Pressable style={styles.closeButton} onPress={closeDrawerFunction}>
          <Ionicons
            name="close-outline"
            size={32}
            color={darkModeIsOn ? "white" : "black"}
          />
        </Pressable>
        <Text
          style={[styles.headerText, darkModeIsOn && styles.headerTextDark]}
        >
          My Todo Lists
        </Text>
        <Pressable style={styles.addButton} onPress={handlePressOnAddButton}>
          <Ionicons
            name="add-outline"
            size={32}
            color={darkModeIsOn ? "white" : "black"}
          />
        </Pressable>
      </View>
      {todoListsKeys.map((todoListKey) => (
        <DrawerLine
          key={todoListKey}
          todoListKey={todoListKey}
          closeDrawerFunction={closeDrawerFunction}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  header: {
    paddingVertical: 8,
    flexDirection: "row",
    borderColor: "#00000022",
    borderStyle: "solid",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  headerDark: {
    borderColor: "#ffffff22",
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  addButton: {
    marginLeft: "auto",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTextDark: {
    color: "white",
  },
});
