'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import withAuth from '@/app/path/to/withAuth'

import {
    LayoutDashboard,
    Activity,
    MenuIcon,
    HandCoins,
    LogOut,
    Wallet,
    Waypoints,
    User2Icon,
    ChartNoAxesCombined,
} from 'lucide-react'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { baseUrl } from '@/utils/constants'
import axios from 'axios'

export const UserNavbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        depositWallet: 0,
        interestWallet: 0,
    })
    const [loading, setLoading] = useState(true) // Loading state
    const router = useRouter()
    const pathname = usePathname()

    const links = [
        {
            label: 'Dashboard',
            href: '/userdashboard/dashboard',
            icon: LayoutDashboard,
        },
        {
            label: 'Investment',
            href: '/userdashboard/investments',
            icon: Activity,
        },
        { label: 'Deposit', href: '/userdashboard/deposit', icon: HandCoins },
        { label: 'Withdraw', href: '/userdashboard/withdraw', icon: Wallet },
        {
            label: 'Transaction',
            href: '/userdashboard/transaction',
            icon: Waypoints,
        },
        { label: 'Profile', href: '/userdashboard/profile', icon: User2Icon },
        {
            label: 'Log Out',
            href: '/',
            icon: LogOut,
            onLogOut: () => {
                console.log('Logging out')
                localStorage.removeItem('token')
                localStorage.removeItem('dashboardData')
                localStorage.removeItem('profitData')

                router.push('/login')
            },
        },
    ]

    useEffect(() => {
        // First load user data from localStorage if available
        const localUserData = localStorage.getItem('userData')
        if (localUserData) {
            setUserData(JSON.parse(localUserData))
            setLoading(false) // Initial display without reloading
        }

        // Fetch the actual data from API and update localStorage and state
        const fetchUserData = async () => {
            const token =
                localStorage.getItem('token') || sessionStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }

            setLoading(true) // Set loading to true before fetching data

            try {
                const response = await fetch(`${baseUrl}/users/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (response.status === 401) {
                    localStorage.removeItem('token')
                    sessionStorage.removeItem('token')
                    router.push('/login')
                    return
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch user data')
                }

                const interest = await axios({
                    method: 'GET',
                    url: `${baseUrl}/users/investments`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                const data = await response.json()
                const updatedData = {
                    firstName: data.firstname,
                    lastName: data.lastname,
                    depositWallet:
                        data.DepositWallet.availableBal.toLocaleString(),
                    interestWallet: interest.data.interest.toLocaleString(), // update if more fields are available
                }

                setUserData(updatedData)
                localStorage.setItem('userData', JSON.stringify(updatedData)) // Save to localStorage
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()

        const intervalId = setInterval(() => {
            fetchUserData()
        }, 5000) // 60,000 milliseconds = 60 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId)
    }, [])

    const handleLinkClick = (href: string) => {
        router.push(href)
        onClose()
    }

    const userInitials = `${userData.firstName[0]}${userData.lastName[0]}`

    return (
        <ChakraProvider>
            <div className="md:px-10 px-5 text-white fixed w-screen z-40">
                <div className="flex justify-between md:gap-[50px] lg:gap-0 items-center">
                    {/* Logo */}
                    <div className="flex items-center ">
                        <ChartNoAxesCombined
                            size={23}
                            color="#e99a2b"
                            stroke="#e99a2b"
                            strokeWidth={2}
                        />
                        <div
                            className="font-bold font-mono text-lg sm:text-xl text-[#0a0f57]"
                            translate="no"
                        >
                            PrimeBullTrade
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {/* User Initial */}
                        <div className="md:flex items-center gap-2 md:gap-1">
                            <div className="bg-blue-600 w-9 h-9 text-center rounded-full grid items-center">
                                {userInitials}
                            </div>
                        </div>

                        {/* Nav button */}
                        <div className="lg:hidden flex items-center gap-3">
                            <Button
                                onClick={onOpen}
                                variant="userNav"
                                size="user"
                            >
                                <MenuIcon size={22} strokeWidth={2} />
                            </Button>

                            <Drawer
                                isOpen={isOpen}
                                placement="left"
                                onClose={onClose}
                            >
                                <DrawerOverlay />
                                <DrawerContent bg="white" maxW="250px">
                                    <DrawerCloseButton color="black" />
                                    <DrawerHeader color="black">
                                        <div className="flex items-center ">
                                            <ChartNoAxesCombined
                                                size={23}
                                                color="#e99a2b"
                                                stroke="#e99a2b"
                                                strokeWidth={2}
                                            />
                                            <div
                                                className="font-bold font-mono text-xl text-[#0a0f57]"
                                                translate="no"
                                            >
                                                PrimeBullTrade
                                            </div>
                                        </div>
                                    </DrawerHeader>
                                    <hr />
                                    <DrawerBody
                                        color="black"
                                        className="flex flex-col gap-5"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <h2 className="font-semibold">
                                                Account Balance
                                            </h2>
                                            <p className="text-sm font-light">
                                                Deposit Wallet:
                                            </p>
                                            <span>
                                                $ {userData.depositWallet}.00
                                            </span>
                                            <p className="text-sm font-light">
                                                Interest Wallet:
                                            </p>
                                            <span>
                                                $ {userData.interestWallet}.00
                                            </span>
                                        </div>
                                        {/* Content */}
                                        <div className="flex flex-col gap-3">
                                            {links.map(link => (
                                                <div
                                                    key={link.href}
                                                    onClick={() => {
                                                        if (!link.onLogOut) {
                                                            handleLinkClick(
                                                                link.href,
                                                            )
                                                        } else {
                                                            link.onLogOut()
                                                        }
                                                    }}
                                                    className={`flex items-center gap-2 p-2 pl-2 rounded-md ${
                                                        pathname === link.href
                                                            ? 'bg-blue-700 text-white'
                                                            : ''
                                                    } hover:bg-slate-200 hover:text-black`}
                                                >
                                                    <link.icon size={20} />
                                                    <p>{link.label}</p>
                                                </div>
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
    )
}

export default withAuth(UserNavbar)
