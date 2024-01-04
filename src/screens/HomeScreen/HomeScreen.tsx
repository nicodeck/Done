import { useRef } from "react";
import { DrawerLayoutAndroid, View, Text } from "react-native";
import TodoDrawer from "../../components/TodoDrawer";
import TodoList from "../../components/TodoList";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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
        <View>
          <Text>My Tasks</Text>
        </View>
        <TodoList />
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
}
