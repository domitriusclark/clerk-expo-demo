import * as React from "react";
import { TextInput, View, StyleSheet, Button } from "react-native";
import { useSignUp, useAuth } from "@clerk/clerk-expo";
import { OAuthButtons } from "@/components/OAuthButtons";
import { Redirect } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn } = useAuth();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (isSignedIn) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <View>
      {!pendingVerification && (
        <View style={styles.container}>
          <OAuthButtons />

          <TextInput
            autoCapitalize="none"
            value={firstName}
            style={styles.input}
            placeholder="First Name..."
            onChangeText={(firstName) => setFirstName(firstName)}
          />

          <TextInput
            autoCapitalize="none"
            style={styles.input}
            value={lastName}
            placeholder="Last Name..."
            onChangeText={(lastName) => setLastName(lastName)}
          />

          <TextInput
            autoCapitalize="none"
            style={styles.input}
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
          />

          <TextInput
            value={password}
            style={styles.input}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

          <Button title="Sign Up" onPress={onSignUpPress} />
        </View>
      )}
      {pendingVerification && (
        <View>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />

          <Button title="Verify Email" onPress={onPressVerify} />
        </View>
      )}
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
