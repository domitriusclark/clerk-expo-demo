import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { View, Text, Button, TouchableOpacity } from "react-native";

export default function ManageTOTPMfa() {
  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) return null;

  const disableTOTP = async () => {
    await user.disableTOTP();
  };

  const MFAEnabled = () => {
    return (
      <View>
        <Text>TOTP via authentication app enabled - </Text>
        <Button onPress={() => disableTOTP()} title="Remove" />
      </View>
    );
  };

  const MFADisabled = () => {
    return (
      <View>
        <Text>Add TOTP via authentication app - </Text>
        <TouchableOpacity>
          <Link href="/add-mfa">
            <Text>Add</Text>
          </Link>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Text>Current MFA Settings</Text>

      <Text>Authenticator App</Text>

      {user.totpEnabled ? <MFAEnabled /> : <MFADisabled />}

      {user.backupCodeEnabled && (
        <View>
          <Text>Backup codes</Text>
          <Button title="Regenerate" />
        </View>
      )}
    </>
  );
}
