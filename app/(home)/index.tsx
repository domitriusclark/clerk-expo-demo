import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();

  return (
    <View>
      <SignedIn>
        <Text>Welcome {user?.firstName}</Text>
        <Link href="/dashboard">
          <Text>Dashboard</Text>
        </Link>
      </SignedIn>

      <SignedOut>
        <View>
          <Link href="/sign-in">
            <Text>Sign In</Text>
          </Link>
          <Link href="/sign-up">
            <Text>Sign Up</Text>
          </Link>
        </View>
      </SignedOut>
    </View>
  );
}
