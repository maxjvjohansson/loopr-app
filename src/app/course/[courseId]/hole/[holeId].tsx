import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

export default function CoursePage() {
  const tee = { latitude: 57.94176901908634, longitude: 12.031278555480554 };
  const green = { latitude: 57.94077458061409, longitude: 12.03264098100342 };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        mapType="satellite"
        initialRegion={{
          latitude: tee.latitude,
          longitude: tee.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
      >
        <Marker coordinate={tee} title="Tee" />
        <Marker coordinate={green} title="Green" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
