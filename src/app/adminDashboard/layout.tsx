'use client'

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PageTitle from '@/components/ui/pageTitle'
import { DepositProvider } from '@/components/depositContext';
import { ChakraProvider } from "@chakra-ui/react";
import { AdminNavbar } from '@/components/ui/adminNav';
import AdminSideBar from '@/components/adminSIdeBar';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Add the weights you need
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ChakraProvider>

      <DepositProvider>
        <html lang="en">
          <body
            className={cn(
              "min-h-screen w-full text-black bg-white",
              poppins.className,
              { "debug-screens": process.env.NODE_ENV === "development" }
            )}
          >
            {/* Navbar: spans the entire screen width */}
            <div className="w-full fixed top-0 left-0 h-[60px] bg-white z-50 shadow-md flex items-center justify-between ">
              <AdminNavbar/>
            </div>

            <div className="pt-[60px] flex min-h-screen">
              {/* Sidebar: only visible on medium (md) screens and up */}
              <div className="hidden lg:flex w-[200px] h-[calc(100vh-60px)] fixed left-0 bg-white shadow-md z-40">
                <AdminSideBar>Dashboard</AdminSideBar>
              </div>

              {/* Main content */}
              <div
                className={cn(
                  "w-full flex-1 bg-slate-100 overflow-hidden",
                  "p-4", // Space for navbar
                  "lg:pl-[210px]" // Space for sidebar on larger screens
                )}
              >
                {children}
              </div>
            </div>
          </body>
        </html>
      </DepositProvider>
    </ChakraProvider>
  );
}
