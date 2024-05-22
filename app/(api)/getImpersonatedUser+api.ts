export async function POST(request: Request) {
  const body: { impersonator_id: string } = await request.json();

  const { impersonator_id } = body;
  const res = await fetch(`https://api.clerk.com/v1/users/${impersonator_id}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  });
  const data = await res.json();

  return Response.json(data);
}
