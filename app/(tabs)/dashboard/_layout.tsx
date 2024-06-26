import { Redirect, Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";

export default function DashboardLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Stack
      screenOptions={{
        title: "",
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
