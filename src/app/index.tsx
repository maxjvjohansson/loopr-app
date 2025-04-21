import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loopr</Text>
      <Text style={styles.subTitle}>Din personliga digitala caddie</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/hole")}
      >
        <Text style={styles.buttonText}>Kom igång</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#2fc586",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
    color: "#ffffff",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#2f7dc5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
