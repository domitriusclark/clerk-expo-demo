import { useAuth } from "@clerk/clerk-expo";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  const { isSignedIn } = useAuth();
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
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home-account" size={32} />
          ),
        }}
      />
      <Tabs.Screen
        name="auth"
        options={{
          href: isSignedIn === true ? null : "/auth/sign-in",
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          href: isSignedIn === true ? "/dashboard" : null,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="view-dashboard" size={32} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          href: isSignedIn === true ? "/account" : null,
          tabBarIcon: () => <MaterialCommunityIcons name="account" size={32} />,
        }}
      />
    </Tabs>
  );
}
