import React from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Checkbox from "expo-checkbox";

export default function SignInMFAForm() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [useBackupCode, setUseBackupCode] = React.useState(false);
  const [displayTOTP, setDisplayTOTP] = React.useState(false);
  const router = useRouter();

  const handleFirstStage = async () => {
    if (!isLoaded) return;

    try {
      const attemptFirstFactor = await signIn.create({
        identifier: email,
        password,
      });

      if (attemptFirstFactor.status === "complete") {
        await setActive({ session: attemptFirstFactor.createdSessionId });
        router.replace("/dashboard");
      } else if (attemptFirstFactor.status === "needs_second_factor") {
        setDisplayTOTP(true);
      } else {
        console.error(JSON.stringify(attemptFirstFactor, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressTOTP = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      // Attempt the TOTP or backup code verification
      const attemptSecondFactor = await signIn.attemptSecondFactor({
        strategy: useBackupCode ? "backup_code" : "totp",
        code: code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (attemptSecondFactor.status === "complete") {
        await setActive({ session: attemptSecondFactor.createdSessionId });

        router.replace("/dashboard");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.log(attemptSecondFactor);
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log(err);
    }
  }, [isLoaded, email, password, code, useBackupCode]);

  if (displayTOTP) {
    return (
      <View>
        <Text>Verify your account</Text>

        <View>
          <Text>Code</Text>
          <TextInput
            value={code}
            placeholder="OTP or Backup Code"
            onChangeText={(c) => setCode(c)}
          />
        </View>
        <View>
          <Text>This code is a backup code</Text>
          <Checkbox
            value={useBackupCode}
            onValueChange={() => setUseBackupCode((prev) => !prev)}
          />
        </View>
        <TouchableOpacity onPress={onPressTOTP}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <Text>Sign In</Text>
      <View>
        <TextInput
          value={email}
          placeholder="Email..."
          placeholderTextColor="#000"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View>
        <TextInput
          value={password}
          placeholder="Password..."
          placeholderTextColor="#000"
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={handleFirstStage}>
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
