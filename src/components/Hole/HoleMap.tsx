import { useRef, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { View, StyleSheet } from "react-native";

export default function HoleMap({ hole }: { hole: any }) {
  const mapRef = useRef<MapView>(null);
  const { tee, ["green-center"]: greenCenter } = hole.coordinates;

  const heading = getHeading(tee, greenCenter);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.fitToCoordinates([tee, greenCenter], {
      edgePadding: { top: 80, bottom: 80, left: 10, right: 10 },
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
          latitude: (tee.latitude + greenCenter.latitude) / 2,
          longitude: (tee.longitude + greenCenter.longitude) / 2,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        {hole.coordinates.fairway && (
          <Polyline
            coordinates={hole.coordinates.fairway}
            strokeColor="white"
            lineDashPattern={[4, 6]}
          />
        )}
        <Marker
          coordinate={greenCenter}
          title="Green (center)"
          pinColor="red"
        />
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
    aspectRatio: 0.7,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
