export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="p-4 border-b mb-4">
        <h3 className="text-2xl">Welcome to Todo App</h3>
      </nav>
      {children}
    </div>
  );
}
