import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { BackupCodeResource } from "@clerk/types";

export default function ManageTOTPMfa() {
  const [backupCodes, setBackupCodes] = React.useState<
    BackupCodeResource | undefined
  >(undefined);
  const [loading, setLoading] = React.useState(false);

  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) return null;

  const generateBackupCodes = () => {
    setLoading(true);
    void user
      ?.createBackupCode()
      .then((backupCodes: BackupCodeResource) => {
        setBackupCodes(backupCodes);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false);
      });
  };

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
          <Text>Backup Codes</Text>
          {loading && <Text>Loading...</Text>}
          {backupCodes && !loading && (
            <FlatList
              data={backupCodes.codes}
              renderItem={(code) => <Text>{code.item}</Text>}
              keyExtractor={(item) => item}
            />
          )}
          <Button
            onPress={() => generateBackupCodes()}
            title="Regenerate Codes"
          />
        </View>
      )}
    </>
  );
}
