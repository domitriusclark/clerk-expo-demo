import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { QrCodeSvg } from "react-native-qr-svg";
import { FlatList, Button, Text, TextInput, View } from "react-native";

import { BackupCodeResource, TOTPResource } from "@clerk/types";

type AddTotpSteps = "add" | "verify" | "backupcodes" | "success";
type DisplayFormat = "qr" | "uri";

function AddTOTPMfa({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<AddTotpSteps>>;
}) {
  const [totp, setTotp] = React.useState<TOTPResource | undefined>(undefined);
  const [displayFormat, setDisplayFormat] = React.useState<DisplayFormat>("qr");
  const { user } = useUser();

  React.useEffect(() => {
    void user
      ?.createTOTP()
      .then((totp: TOTPResource) => setTotp(totp))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <View>
      <Text>Add TOTP MFA</Text>

      {totp && displayFormat === "qr" && (
        <>
          <View>
            <QrCodeSvg value={totp?.uri || ""} frameSize={200} />
          </View>
          <Button title="Use URI" onPress={() => setDisplayFormat("uri")} />
        </>
      )}

      {totp && displayFormat === "uri" && (
        <>
          <View>
            <Text>{totp.uri}</Text>
          </View>
          <Button title="Use QR Code" onPress={() => setDisplayFormat("qr")} />
        </>
      )}

      <Button title="Verify" onPress={() => setStep("verify")} />
      <Button title="Reset" onPress={() => setStep("add")} />
    </View>
  );
}

function VerifyMFA({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<AddTotpSteps>>;
}) {
  const [code, setCode] = React.useState("");

  const { user } = useUser();

  const verifyTotp = async (e: any) => {
    await user
      ?.verifyTOTP({ code })
      .then(() => setStep("backupcodes"))
      .catch((error) => console.log("Error", error));
  };

  return (
    <>
      <Text>Verify MFA</Text>
      <TextInput value={code} onChangeText={(c) => setCode(c)} />
      <Button onPress={verifyTotp} title="Verify Code" />
      <Button onPress={() => setStep("add")} title="Reset" />
    </>
  );
}

function BackupCodes({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<AddTotpSteps>>;
}) {
  const { user } = useUser();
  const [backupCode, setBackupCode] = React.useState<
    BackupCodeResource | undefined
  >(undefined);

  React.useEffect(() => {
    if (backupCode) {
      return;
    }

    void user
      ?.createBackupCode()
      .then((backupCode: BackupCodeResource) => setBackupCode(backupCode))
      .catch((error) => console.log("Error", error));
  }, []);

  return (
    <>
      <Text>Save Backup Codes</Text>
      {backupCode && (
        <View>
          <Text>
            Save this list of backup codes somewhere safe in case you need to
            access your account in an emergency
          </Text>

          <FlatList
            data={backupCode.codes.map((code) => ({
              key: code,
            }))}
            renderItem={({ item }) => <Text>{item.key}</Text>}
          />

          <Button title="Finish" onPress={() => setStep("success")} />
        </View>
      )}
    </>
  );
}

function Success() {
  return (
    <>
      <Text>Success</Text>
      <Text>
        You successfully added TOTP Mfa via an authentication application
      </Text>
    </>
  );
}

export default function AddMfaScreen() {
  const [step, setStep] = React.useState<AddTotpSteps>("add");

  return (
    <>
      {step === "add" && <AddTOTPMfa setStep={setStep} />}
      {step === "verify" && <VerifyMFA setStep={setStep} />}
      {step === "backupcodes" && <BackupCodes setStep={setStep} />}
      {step === "success" && <Success />}

      <Link href="/account">
        <Text>Manage MFA</Text>
      </Link>
    </>
  );
}
