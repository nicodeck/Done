import { TodoListsAtom } from "@/state";
import { useMemo } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { atom, useAtomValue, useSetAtom } from "jotai";
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

  const setCurrentTodoListKey = useSetAtom(currentTodoListKeyAtom);

  const handleClickOnDrawerLine = () => {
    setCurrentTodoListKey(todoListKey);
    closeDrawerFunction();
  };

  return (
    <Pressable style={styles.container} onPress={handleClickOnDrawerLine}>
      <Text style={styles.title}>{todoListName}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingLeft: 16,
    paddingRight: 8,
    borderColor: "#00000022",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
