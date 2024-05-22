import { useAuth, useUser, Clerk, useSignIn } from "@clerk/clerk-expo";
import React from "react";

import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, Stack, useRouter, useLocalSearchParams } from "expo-router";
import useImpersonation from "@/hooks/useImpersonation";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  const { getToken, signOut, actor } = useAuth();
  const { user } = useUser();
  const [sessionToken, setSessionToken] = React.useState("");
  const [impersonator, setImpersonator] = React.useState();
  const params = useLocalSearchParams();

  const router = useRouter();

  const [actorToken] = useImpersonation(actor?.sub || undefined);

  const onSignOutPress = async () => {
    try {
      await signOut(() => router.replace("/"));
    } catch (err: any) {}
  };

  React.useEffect(() => {
    if (typeof actor?.sub === "string") {
      const getImpersonatedUser = async () => {
        const res = await fetch(`/getImpersonatedUser`, {
          method: "POST",
          body: JSON.stringify({
            impersonator_id: actor?.sub,
          }),
        });

        const data = await res.json();

        setImpersonator(data);
      };
      getImpersonatedUser();
    }
  }, [actor, impersonator]);

  React.useEffect(() => {
    const scheduler = setInterval(async () => {
      const token = await getToken();
      setSessionToken(token as string);
    }, 1000);

    return () => clearInterval(scheduler);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Dashboard",
        }}
      />
      <Link href="/account">
        <Text>Account</Text>
      </Link>
      <Text style={styles.title}>Hello {user?.firstName}</Text>
      <TouchableOpacity onPress={onSignOutPress} style={styles.link}>
        <Text style={styles.linkText}>Sign out</Text>
      </TouchableOpacity>

      {actorToken && (
        <Button
          title="Impersonate"
          onPress={async () => {
            if (typeof actorToken.url === "string") {
              await WebBrowser.openAuthSessionAsync(
                actorToken.url,
                "/dashboard"
              );
            }
          }}
        />
      )}
      <Text style={styles.token}>{sessionToken}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  token: {
    marginTop: 15,
    paddingVertical: 15,
    fontSize: 15,
  },
});
