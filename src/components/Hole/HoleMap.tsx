import { useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

export default function HoleMap({ hole }: { hole: any }) {
  const mapRef = useRef<MapView>(null);
  const { tee, green } = hole.coordinates;

  const heading = getHeading(tee, green);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.fitToCoordinates([tee, green], {
      edgePadding: { top: 100, bottom: 100, left: 50, right: 50 },
      animated: true,
    });
    mapRef.current.animateCamera({ heading, pitch: 0 }, { duration: 1000 });
  }, []);

  return (
    <View style={styles.mapWrapper}>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType="satellite"
        showsCompass={false}
        zoomEnabled
        scrollEnabled
        pitchEnabled={false}
        rotateEnabled={false}
        initialRegion={{
          latitude: (tee.latitude + green.latitude) / 2,
          longitude: (tee.longitude + green.longitude) / 2,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        <Marker coordinate={tee} pinColor="green" />
        <Marker coordinate={green} pinColor="red" />
      </MapView>
    </View>
  );
}

function getHeading(from: any, to: any) {
  const dx = to.longitude - from.longitude;
  const dy = to.latitude - from.latitude;
  const angle = (Math.atan2(dx, dy) * 180) / Math.PI;
  return (angle + 360) % 360;
}

const styles = StyleSheet.create({
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
});
