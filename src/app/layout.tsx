import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

import { BookingProvider } from "../../contexts/Bookingcontext";
import Script from "next/script";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RP Royalty",
  description: "Book your next cab here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDmCVRh13hcyv1pA-Oq6ywSC02w6M0V4pY&libraries=places"
          strategy="beforeInteractive"
        />
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <BookingProvider>
          <Header />
          {children}
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
