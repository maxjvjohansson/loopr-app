import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="hole" options={{ title: "Hole" }} />
      <Tabs.Screen name="bag" options={{ title: "Bag" }} />
      <Tabs.Screen name="scorecard" options={{ title: "Scorecard" }} />
    </Tabs>
  );
}
