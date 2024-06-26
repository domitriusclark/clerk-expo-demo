import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import SignOutButton from "@/components/SignOutButton";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hello {user?.firstName}</Text>
        </View>
        <SignOutButton />
      </View>
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
