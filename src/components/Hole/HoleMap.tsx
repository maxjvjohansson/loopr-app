import { useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import { Svg, Defs, RadialGradient, Rect, Stop, Mask } from "react-native-svg";

export default function HoleMap({ hole }: { hole: any }) {
  const mapRef = useRef<MapView>(null);
  const { tee, ["green-center"]: greenCenter } = hole.coordinates;

  const heading = getHeading(tee, greenCenter);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.fitToCoordinates([tee, greenCenter], {
      edgePadding: { top: 80, bottom: 80, left: 40, right: 40 },
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
        <Marker
          coordinate={greenCenter}
          pinColor="green"
          title="Green (center)"
        />
      </MapView>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient
            id="fade"
            cx="50%"
            cy="50%"
            rx="50%"
            ry="50%"
            fx="50%"
            fy="50%"
          >
            <Stop offset="90%" stopColor="white" stopOpacity="0" />
            <Stop offset="100%" stopColor="white" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#fade)" />
      </Svg>
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
    aspectRatio: 0.8,
    borderRadius: 150,
    overflow: "hidden",
    marginBottom: 48,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
