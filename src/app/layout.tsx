import { Poppins } from "next/font/google";
import "./globals.css";
import { NavigationBar } from "@/components/ui/navBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Add the weights you need
});

export const metadata = {
  title: "PrimeBullTrade",
  description: "No 1 Investment Program",
  icons: {
    icon: '/prime.svg',
  },
  viewport: {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: "no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div>
          <div className=" ">{children}</div>
        </div>
      </body>
    </html>
  );
}
