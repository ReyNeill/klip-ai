import { auth } from "@/app/(auth)/auth";
import { getChatsByUserId } from "@/lib/db/queries";

export async function GET() {
  try {
    const session = await auth();
    console.log("API History - Session:", JSON.stringify(session, null, 2));

    if (!session || !session.user) {
      console.error("API History - Unauthorized: No session or user found");
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    if (!userId) {
      console.error(
        "API History - Error: User ID not found in session",
        JSON.stringify(session.user, null, 2),
      );
      return Response.json(
        { error: "User ID missing in session" },
        { status: 500 },
      );
    }

    const chats = await getChatsByUserId({ id: userId });
    return Response.json(chats);
  } catch (error) {
    console.error("API History - Unexpected error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
