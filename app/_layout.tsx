import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Tabs } from "expo-router";
import { tokenCache } from "@/cache";

import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Tabs>
          <Tabs.Screen
            name="(home)"
            options={{ title: "Home", headerShown: false }}
          />
          <Tabs.Screen
            name="(auth)"
            options={{ title: "Auth", headerShown: false }}
          />
          <Tabs.Screen
            name="(dashboard)"
            options={{ title: "Dashboard", headerShown: false }}
          />
        </Tabs>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
