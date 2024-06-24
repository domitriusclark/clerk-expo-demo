import { Button } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function SignOutButton() {
  const { signOut } = useAuth();

  const onSignOutPress = async () => {
    try {
      await signOut();
    } catch (err: any) {}
  };

  return <Button onPress={onSignOutPress} title="Sign out" />;
}
