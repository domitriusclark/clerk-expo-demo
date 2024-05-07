import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  const user = useUser();

  return (
    <View>
      <SignedIn>{user.user?.firstName}</SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
