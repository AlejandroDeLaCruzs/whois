import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 Inicio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f14", alignItems: "center", justifyContent: "center" },
  text: { color: "#f1f5f9", fontSize: 24, fontWeight: "700" },
});