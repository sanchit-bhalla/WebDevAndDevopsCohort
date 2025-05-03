import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function GET() {
  const user = await client.user.findFirst({});

  // return Response.json(user);

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// export async function POST(request: Request) {
//   const body = await request.json();
//   console.log({ body });

//   return new Response(
//     JSON.stringify({ message: "Test User created successfully" }),
//     {
//       status: 201,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
// }

export async function POST(req: NextRequest) {
  const body = await req.json();

  // TODO: ZOD Validation

  const user = await client.user.create({
    data: body,
  });

  console.log({ user });

  return NextResponse.json({ message: "User signed up successfully 🎉" });
}
