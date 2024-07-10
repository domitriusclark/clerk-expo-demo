import Scrollable from "@/components/Scrollable";
import { useUser } from "@clerk/clerk-expo";

export default function UserDetails() {
  const { user } = useUser();
  return <Scrollable data={user} />;
}
