import { Link } from "expo-router";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  const user = useUser();

  return (
    <>
      <SignedIn>
        <View style={styles.container}>
          <Text>
            Welcome,{" "}
            {user.user?.firstName
              ? user.user?.firstName
              : user.user?.emailAddresses[0].emailAddress}
          </Text>
          <View style={styles.cards}>
            <View style={styles.card}></View>
            <View style={styles.card}></View>
            <View style={styles.card}></View>
            <View style={styles.card}></View>
          </View>
        </View>
      </SignedIn>
      <SignedOut>
        <View style={styles.container}>
          <Link href="/sign-in" style={styles.button}>
            <Text>Sign In</Text>
          </Link>
          <Link href="/sign-up" style={styles.button}>
            <Text>Sign Up</Text>
          </Link>
        </View>
      </SignedOut>
    </>
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
  cards: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    gap: 12,
    height: "80%",
    width: "100%",
  },
  card: {
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 8,
    height: "45%",
    width: "45%",
  },
});
