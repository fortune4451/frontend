'use client'

import {
  LayoutDashboard,
  Activity,
  MenuIcon,
  HandCoins,
  LogOut,
  Wallet,
  Waypoints,
  ChartNoAxesCombined
} from 'lucide-react';

import { ChakraProvider } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export const AdminNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
// Access Next.js router to get current path

  const links = [
    { label: 'Dashboard', href: '/adminDashboard', icon: LayoutDashboard },
    { label: 'Transaction', href: '/adminDashboard/transactions', icon: Waypoints },
    { label: 'Log Out', href: '/login', icon: LogOut },
  ];

  const handleLinkClick = () => {
    onClose(); // Close the Drawer when a link is clicked
  };

  return (
    <ChakraProvider>
      <div className="md:px-10 px-5 text-white fixed w-screen z-40">
        <div className=" flex justify-between md:gap-[50px] lg:gap-0 items-center">
          {/* Logo */}
          <Link href="#">
          <div className="flex items-center ">
              <ChartNoAxesCombined size={23} color='#e99a2b' stroke="#e99a2b" strokeWidth={2}/> 
              <div className="font-bold font-mono text-xl text-[#0a0f57]" translate="no">PrimeBullTrade</div> 
          </div>
          </Link>

          <div className="flex gap-3">
            {/* Nav list */}
            {/* Admin Initial */}
            <div className="md:flex items-center gap-2 md:gap-1">
              <div className="bg-blue-600 p-2 rounded-full grid items-center font-semibold">F V</div>
            </div>

            {/* Nav button */}
            <div className="lg:hidden flex items-center gap-3">
              <Button onClick={onOpen} variant="userNav" size="user">
                <MenuIcon size={22} strokeWidth={2} />
              </Button>

              <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent bg="white" maxW="250px">
                  <DrawerCloseButton color="black" />
                  <DrawerHeader color="black" className='text-base'>Admin</DrawerHeader>
                  <hr />
                  <DrawerBody color="black">
                    {/* Content */}
                    <div className="flex flex-col gap-3">
                      {links.map((link) => (
                        <Link href={link.href} key={link.href} passHref>
                          <div
                            onClick={handleLinkClick}
                            className={`flex items-center gap-2 p-2 pl-2 rounded-md active:bg-blue-800 hover:bg-blue-800 hover:text-white`}
                          >
                            <link.icon size={20} />
                            <p>{link.label}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};
