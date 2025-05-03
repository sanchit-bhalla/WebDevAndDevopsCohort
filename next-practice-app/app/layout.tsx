import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <h3 className="p-4 border-b">Todo App</h3> */}

        {children}
      </body>
    </html>
  );
}
