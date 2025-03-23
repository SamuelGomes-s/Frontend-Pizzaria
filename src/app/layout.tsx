import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pizza",
  description: "A melhor pizza da região",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000, style: {
              backgroundColor: '#8A8A8A',
              color: '#ffffff',
              borderColor: '#000000',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
