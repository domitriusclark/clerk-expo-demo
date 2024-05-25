import { Slot } from "expo-router";
import { tokenCache } from "@/cache";
import { View } from "react-native";

import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

export default function RootLayout() {
  return <RootLayoutNav />;
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Slot />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
