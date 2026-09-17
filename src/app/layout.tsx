import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { StoreDataProvider } from "@/context/StoreDataContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutModal from "@/components/cart/CheckoutModal";
import SearchModal from "@/components/layout/SearchModal";
import WelcomePopup from "@/components/layout/WelcomePopup";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Royal Dry Fruits — Premium Dry Fruits & Nuts",
  description:
    "Royal Dry Fruits (RDF) — premium selection of almonds, cashews, pistachios, dates, and dried fruits. Handpicked quality, crafted gift boxes, delivered nationwide across Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorantGaramond.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-ivory text-charcoal" suppressHydrationWarning>
        <StoreDataProvider>
          <CartProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
            <CartDrawer />
            <CheckoutModal />
            <SearchModal />
            <WelcomePopup />
          </CartProvider>
        </StoreDataProvider>
      </body>
    </html>
  );
}