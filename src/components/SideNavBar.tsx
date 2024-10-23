'use client'

import React, { useState, useEffect } from 'react'
import { Nav } from '@/components/ui/nav'
import {
    Waypoints,
    Activity,
    LayoutDashboard,
    User,
    Wallet,
    LogOut,
    HandCoins,
} from 'lucide-react'
import { useWindowWidth } from '@react-hook/window-size'
import axios from 'axios'
import { baseUrl } from '@/utils/constants'

type SideNavbarProps = {
    children: React.ReactNode
}

export default function SideNavbar({ children }: SideNavbarProps) {
    const onlyWidth = useWindowWidth()
    const mobileWidth = onlyWidth < 254
    const [token, setToken] = useState<string | null>(null)

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        depositWallet: 0,
        interestWallet: 0,
    })

    // Fetch user data from the backend
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // This ensures the code runs only on the client-side
            const storedToken =
                sessionStorage.getItem('token') || localStorage.getItem('token')
            setToken(storedToken)
        }

        if (token) {
            const fetchUserData = async () => {
                try {
                    const { data } = await axios({
                        method: 'GET',
                        url: `${baseUrl}/users/me`,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })

                    const response = await axios({
                        method: 'GET',
                        url: `${baseUrl}/users/investments`,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })

                    setUserData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        depositWallet: data.DepositWallet.availableBal,
                        interestWallet: response.data.interest,
                    })
                } catch (error) {
                    console.error('Error fetching user data:', error)
                }
            }

            // Initial fetch when the component mounts
            fetchUserData()

            // Set up interval to fetch data every 60 seconds (or adjust interval as needed)
            const intervalId = setInterval(() => {
                fetchUserData()
            }, 5000) // 60,000 milliseconds = 60 seconds

            // Cleanup interval on component unmount
            return () => clearInterval(intervalId)
        }
    }, [token])

    return (
        <div className="bg-white">
            {/* Header section for mobile */}

            {/* Sidebar navigation */}
            <div className="relative  flex-col  gap-7 md:px-3 px-1 pt-5 pb-10 z-40 h-[100vh] flex ">
                <div className="flex flex-col gap-2 ml-2">
                    <h2 className="font-semibold">Account Balance</h2>
                    <p className="text-sm font-light">
                        Deposit Wallet: ${userData.depositWallet.toFixed(2)}
                    </p>
                    <p className="text-sm font-light">
                        Interest Wallet: ${userData.interestWallet.toFixed(2)}
                    </p>
                </div>

                {/* Navigation menu */}
                <Nav
                    isCollapsed={mobileWidth ? true : false}
                    links={[
                        {
                            title: 'Dashboard',
                            href: '/userdashboard/dashboard',
                            icon: LayoutDashboard,
                            variant: 'default',
                        },
                        {
                            title: 'Investments',
                            href: '/userdashboard/investments',
                            icon: Activity,
                            variant: 'ghost',
                        },
                        {
                            title: 'Deposit',
                            href: '/userdashboard/deposit',
                            icon: HandCoins,
                            variant: 'ghost',
                        },
                        {
                            title: 'Withdraw',
                            href: '/userdashboard/withdraw',
                            icon: Wallet,
                            variant: 'ghost',
                        },
                        {
                            title: 'Transactions',
                            href: '/userdashboard/transaction',
                            icon: Waypoints,
                            variant: 'ghost',
                        },
                        {
                            title: 'Profile',
                            href: '/userdashboard/profile',
                            icon: User,
                            variant: 'ghost',
                        },
                        {
                            title: 'Log Out',
                            href: '/',
                            icon: LogOut,
                            variant: 'ghost',
                        },
                    ]}
                />
            </div>
        </div>
    )
}
