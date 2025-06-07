export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex justify-center p-4 py-6">
      <div className="max-w-3xl">{children}</div>
    </div>
  );
}
