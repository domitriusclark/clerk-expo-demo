import React from "react";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { Platform } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

export function OAuthButtons() {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  React.useEffect(() => {
    if (Platform.OS !== "android") return;

    void WebBrowser.warmUpAsync();
    return () => {
      if (Platform.OS !== "android") return;

      void WebBrowser.coolDownAsync();
    };
  }, []);

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity style={styles.google} onPress={onPress}>
      <Text>
        <AntDesign name="google" size={20} color="black" /> Continue with Google
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  google: {
    display: "flex",
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 999,
  },
});
