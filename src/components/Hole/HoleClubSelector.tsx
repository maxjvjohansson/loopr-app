import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HoleClubSelector() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Din klubba</Text>
        <Text style={styles.club}>Järn 7</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ange slag</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  label: { fontSize: 14, marginBottom: 4 },
  club: { fontSize: 20, fontWeight: "600" },
  button: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { fontSize: 16, fontWeight: "500" },
});
