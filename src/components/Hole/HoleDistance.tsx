import { View, Text, StyleSheet } from "react-native";

export default function HoleDistance({ hole }: { hole: any }) {
  const {
    tee,
    ["green-front"]: greenFront,
    ["green-center"]: greenCenter,
    ["green-back"]: greenBack,
  } = hole.coordinates;

  const distanceToFront = calculateDistance(tee, greenFront);
  const distanceToCenter = calculateDistance(tee, greenCenter);
  const distanceToBack = calculateDistance(tee, greenBack);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Avstånd till green</Text>
      <View style={styles.row}>
        <Distance label="Fram" value={distanceToFront} />
        <Distance label="Mitten" value={distanceToCenter} />
        <Distance label="Bak" value={distanceToBack} />
      </View>
    </View>
  );
}

function Distance({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.distanceBlock}>
      <Text style={styles.distanceLabel}>{label}</Text>
      <Text style={styles.distanceValue}>{value} m</Text>
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
  container: {
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  distanceBlock: {
    alignItems: "center",
  },
  distanceLabel: {
    fontSize: 14,
    color: "#555",
  },
  distanceValue: {
    fontSize: 20,
    fontWeight: "600",
  },
});
