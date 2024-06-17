import { useUser } from "@clerk/clerk-expo";
import { Text, View, StyleSheet } from "react-native";

export default function Account() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <Text>{user?.emailAddresses[0].emailAddress}</Text>
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
});
