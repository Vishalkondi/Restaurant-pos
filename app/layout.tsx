import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurant POS",
  description: "Premium Restaurant Billing System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      suppressHydrationWarning
    >

      <body className="min-h-screen bg-black text-white antialiased">

        {children}

      </body>

    </html>

  );
}