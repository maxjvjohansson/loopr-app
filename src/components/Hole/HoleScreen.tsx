import { View, StyleSheet } from "react-native";
import HoleHeader from "./HoleHeader";
import HoleMap from "./HoleMap";
import HoleDistance from "./HoleDistance";
import HoleClubSelector from "./HoleClubSelector";

export default function HoleScreen({ hole }: { hole: any }) {
  return (
    <View style={styles.container}>
      <HoleHeader hole={hole} />
      <HoleMap hole={hole} />
      <HoleDistance hole={hole} />
      <HoleClubSelector />
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
});
