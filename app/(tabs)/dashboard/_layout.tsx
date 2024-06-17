import { Redirect, Slot } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function DashboardLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/home/sign-in"} />;
  }

  return <Slot />;
}
