import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DrawerLine from "./DrawerLine";

interface TodoDrawerProps {
  closeButtonFunction: () => void;
}

export default function TodoDrawer({ closeButtonFunction }: TodoDrawerProps) {
  return (
    <View>
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={closeButtonFunction}>
          <Ionicons name="close-outline" size={32} color="black" />
        </Pressable>
        <Text style={styles.headerText}>My Todo Lists</Text>
      </View>
      <DrawerLine />
      <DrawerLine />
      <DrawerLine />
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
