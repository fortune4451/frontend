'use client'

import { Nav } from '@/components/ui/nav'
import { Waypoints, LayoutDashboard, LogOut } from 'lucide-react'
import { useWindowWidth } from '@react-hook/window-size'

type SideNavbarProps = {
    children: React.ReactNode
}

export default function AdminSideBar({ children }: SideNavbarProps) {
    const onlyWidth = useWindowWidth()
    const mobileWidth = onlyWidth < 254

    return (
        <div className="bg-white">
            {/* Header section for mobile */}

            {/* Sidebar navigation */}
            <div className="relative  flex-col  gap-7 md:px-3 px-1 pt-5 pb-10 z-40 h-[100vh] flex ">
                {/* Navigation menu */}
                <Nav
                    isCollapsed={mobileWidth ? true : false}
                    links={[
                        {
                            title: 'Dashboard',
                            href: '/adminDashboard',
                            icon: LayoutDashboard,
                            variant: 'default',
                        },
                        {
                            title: 'Transactions',
                            href: '/adminDashboard/transactions',
                            icon: Waypoints,
                            variant: 'ghost',
                        },
                        {
                            title: 'Log Out',
                            href: '/login',
                            icon: LogOut,
                            variant: 'ghost',
                        },
                    ]}
                />
            </div>
        </div>
    )
}
