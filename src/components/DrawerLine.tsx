import { View, Text, StyleSheet } from "react-native";

export default function DrawerLine() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DrawerLine</Text>
    </View>
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
