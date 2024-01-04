import { useRef } from "react";
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

export default function HomeScreen() {
  const drawer = useRef<DrawerLayoutAndroid>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={TodoDrawer}
      >
        <View style={styles.header}>
          <Pressable style={styles.menuHamburger}>
            <Ionicons name="menu-outline" size={32} color="black" />
          </Pressable>
          <Text style={styles.headerText}>My Tasks</Text>
        </View>
        <TodoList />
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingRight: 16,
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
