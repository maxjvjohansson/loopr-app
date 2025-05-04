import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import { useRef, useEffect, useLayoutEffect } from "react";
import holesData from "@lib/mock-data/holes.json";
import { useNavigation } from "expo-router";

export default function HoleMap() {
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();
  const course = holesData.course;
  const club = holesData.club;
  const hole = holesData.holes.find((h) => h.id === 1);
  if (!hole) return null;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${club} · ${course}`,
    });
  }, [navigation]);

  const { tee, green } = hole.coordinates;

  const calculateDistance = (
    coord1: { latitude: number; longitude: number },
    coord2: { latitude: number; longitude: number }
  ) => {
    const toRad = (val: number) => (val * Math.PI) / 180;
    const R = 6371e3;
    const φ1 = toRad(coord1.latitude);
    const φ2 = toRad(coord2.latitude);
    const Δφ = toRad(coord2.latitude - coord1.latitude);
    const Δλ = toRad(coord2.longitude - coord1.longitude);

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const getHeading = (from: any, to: any) => {
    const dx = to.longitude - from.longitude;
    const dy = to.latitude - from.latitude;
    const angle = (Math.atan2(dx, dy) * 180) / Math.PI;
    return (angle + 360) % 360;
  };

  const heading = getHeading(tee, green);
  const distance = calculateDistance(tee, green);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.fitToCoordinates([tee, green], {
      edgePadding: { top: 100, bottom: 100, left: 50, right: 50 },
      animated: true,
    });

    mapRef.current.animateCamera(
      {
        heading,
        pitch: 0,
      },
      { duration: 1000 }
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.holeHeading}>
        <Text style={styles.holeNumber}>{hole.id}</Text>
        <View>
          <Text style={styles.parText}>Par {hole.par}</Text>
          <Text style={styles.indexText}>Index {hole.index}</Text>
        </View>
      </View>

      <View style={styles.mapWrapper}>
        <MapView
          ref={mapRef}
          style={styles.map}
          mapType="satellite"
          showsCompass={false}
          zoomEnabled={true}
          scrollEnabled={true}
          pitchEnabled={false}
          rotateEnabled={false}
          initialRegion={{
            latitude: (tee.latitude + green.latitude) / 2,
            longitude: (tee.longitude + green.longitude) / 2,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
        />
      </View>

      <View style={styles.distanceBlock}>
        <Text style={styles.distanceLabel}>Till mitten på green</Text>
        <Text style={styles.distanceValue}>{distance} m</Text>
      </View>
      <View style={styles.clubContainer}>
        <View style={styles.clubInfo}>
          <Text style={styles.clubLabel}>Din klubba</Text>
          <Text style={styles.clubName}>Järn 7</Text>
        </View>
        <TouchableOpacity style={styles.shotButton}>
          <Text style={styles.shotButtonText}>Ange slag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
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
  parText: {
    fontSize: 16,
  },
  indexText: {
    fontSize: 16,
  },
  mapWrapper: {
    width: "80%",
    aspectRatio: 0.65,
    borderRadius: 150,
    overflow: "hidden",
    marginBottom: 32,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  distanceBlock: {
    alignItems: "center",
    marginBottom: 8,
  },
  distanceLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  distanceValue: {
    fontSize: 28,
    fontWeight: "600",
  },
  clubContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  clubInfo: {
    flexDirection: "column",
  },

  clubLabel: {
    fontSize: 14,
    marginBottom: 4,
  },

  clubName: {
    fontSize: 20,
    fontWeight: "600",
  },

  shotButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },

  shotButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
