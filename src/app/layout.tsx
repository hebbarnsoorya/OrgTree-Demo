import "./globals.css";

export const metadata = {
  title: "Family Tree",
  description: "Family tree with navigation (Next.js + TS + Tailwind + SCSS)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
