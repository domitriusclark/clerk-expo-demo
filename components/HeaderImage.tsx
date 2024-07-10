import { Image } from "react-native";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function HeaderImage() {
  const { user } = useUser();
  return (
    <SignedIn>
      <Link href="/home">
        <Image src={user?.imageUrl} style={styles.image} />
      </Link>
    </SignedIn>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 35,
    width: 35,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "black",
  },
});
