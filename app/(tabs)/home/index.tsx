import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  const user = useUser();

  return (
    <View>
      <SignedIn>
        <View style={styles.container}>
          <Text>{user.user?.emailAddresses[0].emailAddress}</Text>
        </View>
      </SignedIn>
      <SignedOut>
        <View style={styles.container}>
          <Text style={styles.title}>Clerk 🤝 Expo</Text>
          <Link href="/home/sign-in" style={styles.button}>
            <Text>Sign In</Text>
          </Link>
          <Link href="/home/sign-up" style={styles.button}>
            <Text>Sign Up</Text>
          </Link>
        </View>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
  },
  button: {
    padding: 12,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "rebeccapurple",
    color: "white",
    width: 200,
    textAlign: "center",
    marginVertical: 8,
  },
});
