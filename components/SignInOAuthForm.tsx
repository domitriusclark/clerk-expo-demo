import { useSignIn } from "@clerk/clerk-expo";
import { useLocalSearchParams, Link, useRouter } from "expo-router";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { OAuthButtons } from "@/components/OAuthButtons";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

export default function SignInOAuthForm() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onImpersonation = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      if (typeof params["__clerk_ticket"] === "string") {
        const completeSignIn = await signIn.create({
          strategy: "ticket",
          ticket: params["__clerk_ticket"],
        });
        await setActive({ session: completeSignIn.createdSessionId });
        return WebBrowser.dismissBrowser();
      }
    } catch (err: any) {}
  }, [isLoaded, emailAddress, password]);

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {}
  }, [isLoaded, emailAddress, password]);

  if (Platform.OS === "web" && params["__clerk_ticket"]) {
    return (
      <View>
        <View>
          <Link href="/">
            <Text>Logging impersonator in</Text>
          </Link>
        </View>

        <TouchableOpacity onPress={onImpersonation}>
          <Text>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <View>
        <Link href="/">
          <Text>Home</Text>
        </Link>
      </View>
      <View>
        <OAuthButtons />
      </View>

      <View>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          placeholderTextColor="#000"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View>
        <TextInput
          value={password}
          placeholder="Password..."
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={onSignInPress}>
        <Text>Sign in</Text>
      </TouchableOpacity>

      <View>
        <Text>Have an account?</Text>

        <Link href="/sign-up" asChild>
          <TouchableOpacity>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
