import { useState, useEffect } from "react";

type ActorToken = {
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

export default function useImpersonation(sub: String | undefined) {
  const [actorToken, setActorToken] = useState<ActorToken>();
  useEffect(() => {
    async function generateAndSetToken() {
      if (typeof sub !== "string") {
        const res = await fetch("/generateActorToken", {
          method: "POST",
          body: JSON.stringify({
            user_id: "user_2dYLl8lKOwT0moWQCehalJGbv1f",
            actor: {
              sub: "user_2WoCG4EvQZHegEd9ILoBsEO2kgm",
            },
          }),
        });

        const data = await res.json();

        setActorToken(data);
      }
    }

    generateAndSetToken();
  }, []);

  return [actorToken];
}
