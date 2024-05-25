import { useState, useEffect } from "react";

type Actor = {
  object: string;
  id: string;
  status: "pending" | "accepted" | "revoked";
  user_id: string;
  actor: object;
  token: string | null;
  url: string | null;
  created_at: Number;
  updated_at: Number;
};

export default function useImpersonation(
  actorId: string | undefined,
  userId: string | undefined
) {
  const [actor, setActor] = useState<Actor>();
  useEffect(() => {
    async function generateAndSetToken() {
      if (typeof actorId !== "string") {
        const res = await fetch("/generateActorToken", {
          method: "POST",
          body: JSON.stringify({
            user_id: userId, // this is the user ID of the use you're going to impersonate,
            actor: {
              sub: actorId, // this is the ID of the impersonator,
            },
          }),
        });

        const data = await res.json();

        setActor(data);
      }
    }

    generateAndSetToken();
  }, []);

  return actor;
}
