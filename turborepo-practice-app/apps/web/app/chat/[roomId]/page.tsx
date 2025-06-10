export default async function ChatRoom({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return (
    <div>
      <h1>
        Welcome to <span style={{ color: "cyan" }}>Room {roomId}</span>
      </h1>
    </div>
  );
}
