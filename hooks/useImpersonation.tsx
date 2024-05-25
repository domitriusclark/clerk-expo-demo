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
            user_id: "user_2aqE3TWuC03FDFTEpwXc2QySvqu", // this is the user ID of the use you're going to impersonate,
            actor: {
              sub: "user_2WoCG4EvQZHegEd9ILoBsEO2kgm", // this is the ID of the impersonator,
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
