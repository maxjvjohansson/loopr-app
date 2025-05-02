import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Router, useRouter } from "expo-router";

export default function SearchPage() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Text>Söksida</Text>
      <TouchableOpacity onPress={() => router.push("/course/1")}>
        <Text>Gå till bana</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
