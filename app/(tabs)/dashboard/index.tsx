import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSession, useUser } from "@clerk/clerk-expo";
import SignOutButton from "@/components/SignOutButton";

function RenderScrollableData({
  headerTitle,
  data,
}: {
  headerTitle: string;
  data: {};
}) {
  return (
    <View style={styles.content}>
      <Text>{headerTitle}:</Text>
      <ScrollView style={styles.dataContainer}>
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </ScrollView>
    </View>
  );
}

export default function Dashboard() {
  const { user } = useUser();
  const session = useSession();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ display: "flex" }}>
          <Text style={styles.title}>Hello {user?.firstName}</Text>
        </View>
        <SignOutButton />
      </View>
      <Image
        style={{
          height: 80,
          width: 80,
          borderRadius: 999,
        }}
        src={user?.imageUrl}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  token: {
    marginTop: 15,
    paddingVertical: 15,
    fontSize: 15,
  },
  content: {
    paddingTop: 24,
    height: "40%",
    width: "95%",
  },
  dataContainer: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
  },
});
