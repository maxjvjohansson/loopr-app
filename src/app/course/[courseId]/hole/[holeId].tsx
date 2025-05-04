import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useRef, useEffect } from "react";
import holes from "@lib/mock-data/holes.json";

const { width } = Dimensions.get("window");

export default function HoleMap() {
  const mapRef = useRef<MapView>(null);
  const hole = holes.find((h) => h.id === 1);
  if (!hole) return null;

  const { tee, green } = hole.coordinates;

  const getHeading = (from: any, to: any) => {
    const dx = to.longitude - from.longitude;
    const dy = to.latitude - from.latitude;
    const angle = (Math.atan2(dx, dy) * 180) / Math.PI;
    return (angle + 360) % 360;
  };

  const heading = getHeading(tee, green);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.fitToCoordinates([tee, green], {
      edgePadding: { top: 60, bottom: 60, left: 40, right: 40 },
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
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0015,
          }}
        >
          <Marker coordinate={tee} title="Tee" pinColor="green" />
          <Marker coordinate={green} title="Green" pinColor="red" />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Vitt utanför
    alignItems: "center",
    justifyContent: "center",
  },
  mapWrapper: {
    width: width,
    height: "auto",
    aspectRatio: 1,
    borderRadius: 150,
    overflow: "hidden",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
