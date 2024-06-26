import { Image } from "react-native";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";

export default function HeaderImage() {
  const { user } = useUser();
  return (
    <SignedIn>
      <Link href="/home" style={{}}>
        <Image
          src={user?.imageUrl}
          style={{
            height: 35,
            width: 35,
            borderRadius: 999,
            borderWidth: 2,
            borderColor: "black",
          }}
        />
      </Link>
    </SignedIn>
  );
}
