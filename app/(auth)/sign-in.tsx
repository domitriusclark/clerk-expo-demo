import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, Redirect, useRouter } from "expo-router";
import { Text, TextInput, Button, StyleSheet, View } from "react-native";
import React from "react";
import { OAuthButtons } from "@/components/OAuthButtons";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

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

  if (isSignedIn) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <View style={styles.container}>
      <OAuthButtons />

      <TextInput
        autoCapitalize="none"
        style={styles.input}
        value={emailAddress}
        placeholder="Email..."
        placeholderTextColor="#000"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />

      <TextInput
        value={password}
        style={styles.input}
        placeholder="Password..."
        placeholderTextColor="#000"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <Button title="Sign In" onPress={onSignInPress} />

      <View>
        <Text>Have an account?</Text>

        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "75%",
  },
});
