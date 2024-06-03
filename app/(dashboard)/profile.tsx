import { useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";

export default function Profile() {
  const { user } = useUser();
  return <Text>{user?.emailAddresses[0].emailAddress}</Text>;
}
