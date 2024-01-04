import { useRef } from "react";
import { DrawerLayoutAndroid, View, Text, StyleSheet } from "react-native";
import TodoDrawer from "../../components/TodoDrawer";
import TodoList from "../../components/TodoList";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen() {
  const drawer = useRef<DrawerLayoutAndroid>(null);

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={TodoDrawer}
      >
        <View style={styles.header}>
          <Ionicons name="menu-outline" size={32} color="black" />
          <Text style={styles.headerText}>My Tasks</Text>
        </View>
        <TodoList />
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderColor: "#00000022",
    borderBottomWidth: 1,
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
