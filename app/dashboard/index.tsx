import React from "react";

import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, useRouter } from "expo-router";

import { useAuth, useUser, useSignIn, useSessionList } from "@clerk/clerk-expo";
import { UserDataJSON } from "@clerk/types";
import * as Linking from "expo-linking";

export type Actor = {
  object: string;
  id: string;
  status: "pending" | "accepted" | "revoked";
  user_id: string;
  actor: object;
  token: string | null;
  url: string | null;
  created_at: Number;
  updated_at: Number;
};

function useImpersonation(
  actorId: string | undefined,
  userId: string | undefined
) {
  const [actor, setActor] = React.useState<Actor>();
  React.useEffect(() => {
    async function generateAndSetToken() {
      // if (typeof actorId === "string" && typeof userId === "string") {
      const res = await fetch("/generateActorToken", {
        method: "POST",
        body: JSON.stringify({
          user_id: "user_2aqE3TWuC03FDFTEpwXc2QySvqu", // The ID of who you want to impersonate
          actor: {
            sub: "user_2WoCG4EvQZHegEd9ILoBsEO2kgm", // The ID of who is impersonating
          },
        }),
      });

      const data = await res.json();

      setActor(data);
    }
    // }

    generateAndSetToken();
  }, []);

  return actor;
}

function useImpersonatedUser(
  actorSub: string,
  setImpersonator: React.Dispatch<React.SetStateAction<string | UserDataJSON>>
) {
  React.useEffect(() => {
    const getImpersonatedUser = async () => {
      const res = await fetch(`/getImpersonatedUser`, {
        method: "POST",
        body: JSON.stringify({
          impersonator_id: actorSub,
        }),
      });

      const data = await res.json();

      setImpersonator(data);

      getImpersonatedUser();
    };
  }, [actorSub]);
}

export default function Page() {
  const [impersonator, setImpersonator] = React.useState<UserDataJSON | string>(
    ""
  );
  const { signOut, actor } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user } = useUser();
  const router = useRouter();
  const { sessions } = useSessionList();

  const actorRes = useImpersonation(actor?.sub, user?.id);
  const actorUserData = useImpersonatedUser(actor?.sub || "", setImpersonator);

  function extractTicketValue(input: string): string | undefined {
    const index = input.indexOf("ticket=");
    if (index !== -1) {
      return input.slice(index + 7);
    }
    return undefined;
  }

  async function impersonateUser() {
    if (!isLoaded) return;

    if (typeof actorRes?.url === "string") {
      const ticket = extractTicketValue(actorRes.url);

      if (ticket) {
        try {
          const { createdSessionId } = await signIn.create({
            strategy: "ticket",
            ticket,
          });

          await setActive({ session: createdSessionId });
          await user?.reload();

          router.replace("/dashboard");
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  const onSignOutPress = async (sessionId: string) => {
    try {
      if (isLoaded && sessions && sessions?.length > 1) {
        const noActiveSessions = sessions.filter(
          (session) => session.user?.id !== user?.id
        );

        await setActive({ session: noActiveSessions[0].id });
      }
      const redirectUrl = Linking.createURL("/dashboard", { scheme: "myapp" });

      await signOut({
        sessionId,
      });

      router.replace(redirectUrl);
    } catch (err: any) {}
  };

  return (
    <View style={styles.container}>
      <Link href="/account">
        <Text>Account</Text>
      </Link>
      <Text style={styles.title}>Hello {user?.firstName}</Text>

      {sessions?.map((sesh) => {
        console.log(sessions.length);
        return (
          <TouchableOpacity
            onPress={() => onSignOutPress(sesh.id)}
            style={styles.link}
            key={sesh.id}
          >
            <Text style={styles.linkText}>
              Sign out of {sesh?.user?.primaryEmailAddress?.emailAddress}
            </Text>
          </TouchableOpacity>
        );
      })}

      {actorRes && (
        <Button
          title="Impersonate"
          onPress={async () => await impersonateUser()}
        />
      )}
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
