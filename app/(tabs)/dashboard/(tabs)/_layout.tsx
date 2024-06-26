import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";

import { ParamListBase, TabNavigationState } from "@react-navigation/native";

import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  return (
    <MaterialTopTabs>
      <MaterialTopTabs.Screen name="index" options={{ title: "Profile" }} />
      <MaterialTopTabs.Screen name="user-details" options={{ title: "User" }} />
      <MaterialTopTabs.Screen
        name="session-details"
        options={{ title: "Session" }}
      />
    </MaterialTopTabs>
  );
}
