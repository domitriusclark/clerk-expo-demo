import { Text, Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function SignOutButton() {
  const { signOut } = useAuth();

  const onSignOutPress = async () => {
    try {
      await signOut({ redirectUrl: "/home" });
    } catch (err: any) {}
  };

  return (
    <Pressable
      style={{
        borderRadius: 8,
        backgroundColor: "red",
        padding: 12,
        marginTop: 8,
      }}
      onPress={onSignOutPress}
    >
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        Sign out
      </Text>
    </Pressable>
  );
}
