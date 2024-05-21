// user_id: "user_2dYLl8lKOwT0moWQCehalJGbv1f",
// actor: {
//  sub: "user_2WoCG4EvQZHegEd9ILoBsEO2kgm",
// },

export async function POST(request: Request) {
  const body: { user_id: string; actor: { sub: string } } =
    await request.json();

  const { user_id, actor } = body;

  const res = await fetch("https://api.clerk.com/v1/actor_tokens", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      actor: {
        sub: actor.sub,
      },
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
