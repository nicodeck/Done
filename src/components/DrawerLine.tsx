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
    backgroundColor: "#00000009",
    marginRight: 16,
    marginVertical: 8,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 8,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
