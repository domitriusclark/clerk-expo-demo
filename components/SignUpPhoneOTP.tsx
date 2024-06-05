import * as React from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Button, Text, TextInput } from "react-native";

export default function SignUpPhoneOTP() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const router = useRouter();

  async function handleSubmit() {
    if (!isLoaded && !signUp) return null;

    try {
      // Start the sign-up process using the phone number method
      await signUp.create({
        phoneNumber: phone,
      });

      // Start the verification - a SMS message will be sent to the
      // number with a one-time code
      await signUp.preparePhoneNumberVerification();

      // Set verifying to true to display second form and capture the OTP code
      setVerifying(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  }

  async function handleVerification() {
    if (!isLoaded && !signUp) return null;

    try {
      // Use the code provided by the user and attempt verification
      const signInAttempt = await signUp.attemptPhoneNumberVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });

        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(signInAttempt);
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  }

  if (verifying) {
    return (
      <>
        <Link href="/">
          <Text>Home</Text>
        </Link>
        <Text>Verify your phone number</Text>

        <TextInput value={code} id="code" onChangeText={(c) => setCode(c)} />
        <Button title="Verify" onPress={handleVerification} />
      </>
    );
  }

  return (
    <>
      <Text>Sign up</Text>

      <TextInput
        value={phone}
        id="phone"
        inputMode="tel"
        onChangeText={(number) => setPhone(number)}
      />
      <Button title="Continue" onPress={handleSubmit} />
    </>
  );
}
