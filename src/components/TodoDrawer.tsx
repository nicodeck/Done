import { View, Text, StyleSheet, Pressable } from "react-native";
import { atom, useSetAtom, useAtomValue } from "jotai";
import Ionicons from "@expo/vector-icons/Ionicons";
import DrawerLine from "./DrawerLine";
import { TodoListsAtom } from "@/state";

interface TodoDrawerProps {
  closeDrawerFunction: () => void;
}

const TodoListsKeysAtom = atom<string[]>((get) =>
  Object.keys(get(TodoListsAtom))
);

export default function TodoDrawer({ closeDrawerFunction }: TodoDrawerProps) {
  const setTodoLists = useSetAtom(TodoListsAtom);

  const todoListsKeys = useAtomValue(TodoListsKeysAtom);

  return (
    <View>
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={closeDrawerFunction}>
          <Ionicons name="close-outline" size={32} color="black" />
        </Pressable>
        <Text style={styles.headerText}>My Todo Lists</Text>
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
  header: {
    paddingRight: 8,
    paddingVertical: 24,
    flexDirection: "row",
    borderColor: "#00000022",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  closeButton: {
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
