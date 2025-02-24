import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeneralProvider } from "../context/GeneralContext";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.className}  antialiased bg-[#F1F7FF] font-normal`}
      >
        <GeneralProvider>{children}</GeneralProvider>
      </body>
    </html>
  );
}
