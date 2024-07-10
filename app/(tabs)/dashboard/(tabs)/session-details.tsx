import Scrollable from "@/components/Scrollable";
import { useSession } from "@clerk/clerk-expo";

export default function Session() {
  const { session } = useSession();
  return <Scrollable data={session} />;
}
