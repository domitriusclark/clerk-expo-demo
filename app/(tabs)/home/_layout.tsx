import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
