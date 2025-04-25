import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardPage() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Välkommen tillbaka till Loopr Max, redo för nästa runda?
      </Text>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.primaryButtonText}>Starta ny runda</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace("/(tabs)/bag")}
      >
        <Text style={styles.secondaryButtonText}>Kolla din bag</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 32,
    color: "#000000",
    textAlign: "center",
  },
  primaryButton: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#2fc586",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#efefef",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  secondaryButtonText: {
    color: "#2fc586",
    fontSize: 16,
    fontWeight: "600",
  },
});
