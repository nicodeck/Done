import { useEffect, useRef } from "react";
import {
  DrawerLayoutAndroid,
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import TodoDrawer from "@/components/TodoDrawer";
import TodoList from "@/components/TodoList";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TodoListsAtom } from "@/state";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentTodoListKeyAtom } from "@/state/ui";

const currentTodoListNameAtom = atom((get) => {
  const todoLists = get(TodoListsAtom);
  const currentTodoListKey = get(currentTodoListKeyAtom);
  return todoLists[currentTodoListKey]?.name;
});

const todoListsKeysAtom = atom((get) => Object.keys(get(TodoListsAtom)));

export default function HomeScreen() {
  const setTodoLists = useSetAtom(TodoListsAtom);

  const todoListsKeys = useAtomValue(todoListsKeysAtom);

  const drawer = useRef<DrawerLayoutAndroid>(null);

  const [currentTodoListKey, setCurrentTodoListKey] = useAtom(
    currentTodoListKeyAtom
  );

  const currentTodoListName = useAtomValue(currentTodoListNameAtom);

  const handleHamburgerPress = () => {
    drawer.current?.openDrawer();
  };

  const handleDrawerCloseButton = () => {
    drawer.current?.closeDrawer();
  };

  const handleTodoListNameUpdate = (newName: string) => {
    setTodoLists({
      type: "UpdateTodoListName",
      todoListKey: currentTodoListKey,
      todoListName: newName,
    });
  };

  useEffect(() => {
    if (todoListsKeys.length == 0) setTodoLists({ type: "SeedTodoLists" });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={() => (
          <TodoDrawer closeDrawerFunction={handleDrawerCloseButton} />
        )}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.menuHamburger}
            onPress={handleHamburgerPress}
          >
            <Ionicons name="menu-outline" size={32} color="black" />
          </Pressable>
          <TextInput
            style={styles.headerText}
            onChangeText={handleTodoListNameUpdate}
            placeholder="Todo List Name"
            value={currentTodoListName}
          />
        </View>
        <TodoList todoListKey={currentTodoListKey} />
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingRight: 16,
    height: 80,
    borderColor: "#00000022",
    borderBottomWidth: 1,
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
  },
  menuHamburger: {
    marginRight: 8,
    padding: 8,
    paddingLeft: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    paddingVertical: 8,
  },
});
