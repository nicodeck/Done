import { TodoListsAtom } from "@/state";
import { useMemo } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { atom, useAtomValue, useAtom } from "jotai";
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

  const handlePressOnDrawerLine = () => {
    setCurrentTodoListKey(todoListKey);
    closeDrawerFunction();
  };

  return (
    <Pressable
      style={[
        styles.container,
        currentTodoListKey === todoListKey && styles.activeContainer,
      ]}
      onPress={handlePressOnDrawerLine}
    >
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
  activeContainer: {
    backgroundColor: "#00000010",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
