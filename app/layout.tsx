import type { Metadata } from "next";
import AnimationProvider from "../components/AnimationProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tapri & Co. — Kadak Chai, Garamgupshup · Since 1987",
  description: "Tapri & Co. — Kadak Chai, Garamgupshup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Yatra+One&family=Epilogue:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AnimationProvider />
        {children}
      </body>
    </html>
  );
}
