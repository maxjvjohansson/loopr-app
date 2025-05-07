import { useLocalSearchParams, useNavigation } from "expo-router";
import holesData from "@lib/mock-data/holes.json";
import HoleScreen from "@components/Hole/HoleScreen";
import { useLayoutEffect, useRef } from "react";
import { FlatList, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function HolePage() {
  const { holeId } = useLocalSearchParams();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);

  const course = holesData.course;
  const club = holesData.club;
  const holes = holesData.holes;

  const startIndex = holes.findIndex((h) => h.id === Number(holeId));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${club} · ${course}`,
    });
  }, [navigation]);

  return (
    <FlatList
      ref={flatListRef}
      data={holes}
      horizontal
      pagingEnabled
      initialScrollIndex={startIndex >= 0 ? startIndex : 0}
      getItemLayout={(data, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ width }}>
          <HoleScreen hole={item} />
        </View>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
}
