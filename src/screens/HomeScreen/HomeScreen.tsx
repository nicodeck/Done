import { useEffect, useRef } from "react";
import {
  DrawerLayoutAndroid,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import TodoDrawer from "../../components/TodoDrawer";
import TodoList from "../../components/TodoList";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TodoListsAtom } from "@/state";
import { atom, useAtom } from "jotai";

const currentTodoListKeyAtom = atom<string>("");

export default function HomeScreen() {
  const [todoLists, setTodoLists] = useAtom(TodoListsAtom);

  const drawer = useRef<DrawerLayoutAndroid>(null);

  const [currentTodoListKey, setCurrentTodoListKey] = useAtom(
    currentTodoListKeyAtom
  );

  const handleHamburgerPress = () => {
    drawer.current?.openDrawer();
  };

  const handleDrawerCloseButton = () => {
    drawer.current?.closeDrawer();
  };

  useEffect(() => {
    setTodoLists({ type: "SeedTodoLists" });
  }, []);

  useEffect(() => {
    if (currentTodoListKey !== "") return;

    if (Object.keys(todoLists).length > 0) {
      setCurrentTodoListKey(Object.keys(todoLists)[0]);
    }
  }, [todoLists]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={() => (
          <TodoDrawer closeButtonFunction={handleDrawerCloseButton} />
        )}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.menuHamburger}
            onPress={handleHamburgerPress}
          >
            <Ionicons name="menu-outline" size={32} color="black" />
          </Pressable>
          <Text style={styles.headerText}>My Tasks</Text>
        </View>
        <TodoList todoListKey={currentTodoListKey} />
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingRight: 16,
    paddingVertical: 16,
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
  },
});
