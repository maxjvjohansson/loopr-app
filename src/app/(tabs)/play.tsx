import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Router, useRouter } from "expo-router";

export default function PlayPage() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Text>Spela Golf</Text>
      <TouchableOpacity onPress={() => router.push("/course/1/hole/1")}>
        <Text>Gå till bana</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
