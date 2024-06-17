import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
    </Stack>
  );
}
