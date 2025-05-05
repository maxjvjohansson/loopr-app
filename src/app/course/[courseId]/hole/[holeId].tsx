import { useLocalSearchParams, useNavigation } from "expo-router";
import holesData from "@lib/mock-data/holes.json";
import HoleScreen from "@components/Hole/HoleScreen";
import { useLayoutEffect } from "react";

export default function HolePage() {
  const { holeId } = useLocalSearchParams();
  const navigation = useNavigation();

  const hole = holesData.holes.find((h) => h.id === Number(holeId));
  const course = holesData.course;
  const club = holesData.club;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${club} · ${course}`,
    });
  }, [navigation]);

  if (!hole) return null;

  return <HoleScreen hole={hole} />;
}
