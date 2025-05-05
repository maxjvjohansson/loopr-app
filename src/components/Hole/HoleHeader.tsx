import { View, Text, StyleSheet } from "react-native";

export default function HoleHeader({ hole }: { hole: any }) {
  return (
    <View style={styles.holeHeading}>
      <Text style={styles.holeNumber}>{hole.id}</Text>
      <View>
        <Text style={styles.parText}>Par {hole.par}</Text>
        <Text style={styles.indexText}>Index {hole.index}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  holeHeading: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 24,
    marginBottom: 16,
  },
  holeNumber: {
    fontSize: 32,
    fontWeight: "bold",
    marginRight: 12,
  },
  parText: { fontSize: 16 },
  indexText: { fontSize: 16 },
});
