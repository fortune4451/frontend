'use client'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChakraProvider } from '@chakra-ui/react';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from '@chakra-ui/react';


import React from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight, MenuIcon, User, ChartCandlestick, Users, ChartNoAxesCombined } from 'lucide-react'
import Link from "next/link";


export const NavigationBar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <div className=" md:py-2 md:px-10 px-7 py-2 bg-[#001638] text-white  fixed w-screen  z-40">
        <div className="md:mx-[5%] flex justify-between md:gap-[50px] lg:gap-0 items-center" >
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center ">
              <ChartNoAxesCombined size={22} color='#e99a2b' stroke="#e99a2b" strokeWidth={2}/> 
              <div className="font-bold font-mono text-xl " translate="no">PrimeBullTrade</div> 
            </div>
          </Link>

            {/* Nav list */}
          <div className='hidden md:flex items-center gap-2 md:gap-1'>
            <p><Button variant='link'>Company</Button></p>
            <p className="text-white">
              <DropdownMenu>
                <DropdownMenuTrigger><Button variant='link'>Investment</Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>CRYPTO & FOREX</DropdownMenuItem>
                  <DropdownMenuItem>REAL ESTATE</DropdownMenuItem>
                  <DropdownMenuItem>AGRICULTURE</DropdownMenuItem>
                  <DropdownMenuItem>GOLD</DropdownMenuItem>
                  <DropdownMenuItem>OIL & GAS</DropdownMenuItem>
                  <DropdownMenuItem>MEDICAL CANNABIS</DropdownMenuItem>
                  <DropdownMenuItem>SHARES</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </p>
              <p>
              <DropdownMenu>
                <DropdownMenuTrigger><Button variant='link'>Help</Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>NEWS</DropdownMenuItem>
                  <DropdownMenuItem>CONTACT</DropdownMenuItem>
                  <DropdownMenuItem>FAQ</DropdownMenuItem>
                  <DropdownMenuItem>TERMS & CONDITIONS</DropdownMenuItem>
                  <DropdownMenuItem>PRIVACY POLICY</DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
              </p>
            <p>
              <Link href="/login">
                  <Button variant='link'>Log In</Button>
              </Link>
              </p>
            <p>
            <Link href="/register">
               <Button variant="custom" size="custom" >
                  Create Account  
                  <User size={15}/>  
                </Button> 
            </Link>
               </p>
          </div>

          {/* Nav button */}
          <div className=' md:hidden flex items-center gap-3 '>
            <Link href="/register"> 
              <Users size={19}/>
            </Link>
            
            <Button onClick={onOpen} variant="nav" size="navIcon">
              <MenuIcon size={22} strokeWidth={2}  className="" />
            </Button>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent  bg="#001638">
                <DrawerCloseButton color="white"/>
                <DrawerHeader color='white'>PrimeBullTrade</DrawerHeader>
                <DrawerBody color='white'>
                  {/* Content goes here */}
                  <div className="flex flex-col gap-3">
                  <Link href="/">Home</Link>
                  <Link href="#">Company</Link>
                  <Link href="#">Investment</Link>
                  <Link href="#">Help</Link>
                  <Link href="/login">Login</Link>
                  <Link href="/register">Create Account</Link>

                  </div>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </ChakraProvider>
  )
}
