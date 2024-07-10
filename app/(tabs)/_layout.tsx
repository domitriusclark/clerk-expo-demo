import { useAuth } from "@clerk/clerk-expo";
import { Tabs, Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#000",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#7DF9FF",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          href: isSignedIn ? "/home" : null,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home-account" size={32} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          href: isSignedIn === true ? "/dashboard/(tabs)" : null,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="view-dashboard" size={32} />
          ),
        }}
      />
    </Tabs>
  );
}
