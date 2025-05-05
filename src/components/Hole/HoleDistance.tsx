import { View, Text, StyleSheet } from "react-native";

export default function HoleDistance({ hole }: { hole: any }) {
  const { tee, green } = hole.coordinates;
  const distance = calculateDistance(tee, green);

  return (
    <View style={styles.block}>
      <Text style={styles.label}>Till mitten på green</Text>
      <Text style={styles.value}>{distance} m</Text>
    </View>
  );
}

function calculateDistance(coord1: any, coord2: any) {
  const toRad = (val: number) => (val * Math.PI) / 180;
  const R = 6371e3;
  const φ1 = toRad(coord1.latitude);
  const φ2 = toRad(coord2.latitude);
  const Δφ = toRad(coord2.latitude - coord1.latitude);
  const Δλ = toRad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

const styles = StyleSheet.create({
  block: { alignItems: "center", marginBottom: 8 },
  label: { fontSize: 16, marginBottom: 4 },
  value: { fontSize: 28, fontWeight: "600" },
});
