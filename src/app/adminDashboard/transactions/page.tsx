'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { DataTable } from './dataTable'
import PageTitle from '@/components/ui/pageTitle'
import { ColumnDef } from '@tanstack/react-table'
import { HiViewGridAdd } from 'react-icons/hi'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { baseUrl, baseUrlStatic } from '@/utils/constants'
import { useToast } from '@chakra-ui/react'
import { AiOutlineClose } from 'react-icons/ai'
import Image from 'next/image'

type Props = {}

type User = {
    emailAddress: string
}

type Transaction = {
    uuid: string
    amount: string
    type: string
    status: string
    isApproved: boolean
    userID: string
    createdAt: string
    walletAddress: string
}

export default function UsersPage({}: Props): JSX.Element {
    const [data, setData] = useState<Transaction[]>([])
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const toast = useToast()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [receiptImage, setReceiptImage] = useState<string | null>(null)

    console.log(receiptImage, isModalOpen)

    // Fetch pending transactions data from the API and refresh every 3 seconds
    useEffect(() => {
        const storedToken =
            sessionStorage.getItem('token') || localStorage.getItem('token')
        setToken(storedToken)

        const storedData = localStorage.getItem('transactionsData')
        if (storedData) {
            setData(JSON.parse(storedData)) // Initially set data from localStorage
        }

        const fetchDashboardData = async () => {
            try {
                const transactions = await axios({
                    method: 'GET',
                    url: `${baseUrl}/transactions/all`,
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                })

                const fetchedData = transactions.data.reverse()
                setData(fetchedData)
                // Update local storage with the latest data
                localStorage.setItem(
                    'transactionsData',
                    JSON.stringify(fetchedData),
                )
            } catch (error) {
                console.error('Error fetching transactions:', error)
            } finally {
                setLoading(false) // Set loading to false after fetching
            }
        }

        // Initial data fetch
        fetchDashboardData()

        // Refresh data every 3 seconds
        const interval = setInterval(fetchDashboardData, 5000)

        // Clean up interval on component unmount
        return () => clearInterval(interval)
    }, [token])

    const handleApprove = async (uuid: string) => {
        try {
            await axios({
                method: 'PATCH',
                url: `${baseUrl}/transactions/${uuid}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    status: 'successful',
                },
            })

            // Update the data state locally
            setData(prev =>
                prev.map(item =>
                    item.uuid === uuid
                        ? { ...item, status: 'successful' }
                        : item,
                ),
            )

            // Also update the localStorage
            const updatedData = data.map(item =>
                item.uuid === uuid ? { ...item, status: 'successful' } : item,
            )
            localStorage.setItem(
                'transactionsData',
                JSON.stringify(updatedData),
            )
        } catch (error) {
            console.error('Error approving transaction:', error)
        }
    }

    const handleDecline = async (uuid: string) => {
        try {
            await axios({
                method: 'PATCH',
                url: `${baseUrl}/transactions/${uuid}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    status: 'failed',
                },
            })

            // Update the data state locally
            setData(prev =>
                prev.map(item =>
                    item.uuid === uuid ? { ...item, status: 'rejected' } : item,
                ),
            )

            // Also update the localStorage
            const updatedData = data.map(item =>
                item.uuid === uuid ? { ...item, status: 'rejected' } : item,
            )
            localStorage.setItem(
                'transactionsData',
                JSON.stringify(updatedData),
            )
        } catch (error) {
            console.error('Error declining transaction:', error)
        }
    }

    const handleCopyAddress = (walletAddress: string) => {
        navigator.clipboard
            .writeText(walletAddress)
            .then(() => {
                toast({
                    title: 'Wallet address copied!',
                    description:
                        'The wallet address has been successfully copied to your clipboard.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            })
            .catch(error => {
                console.error('Failed to copy wallet address:', error)
            })
    }

    const handleViewReceipt = async (imageUrl: string) => {
        console.log(imageUrl, 'Yhisk ieklqwopioui;jwbK')
        try {
            imageUrl
                ? setReceiptImage(`${baseUrlStatic}${imageUrl}`)
                : setReceiptImage(null)
            setIsModalOpen(true)
        } catch (error) {
            console.error('Error fetching receipt:', error)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setReceiptImage(null)
    }

    const columns: ColumnDef<Transaction>[] = [
        {
            accessorKey: 'user',
            header: 'Email',
            cell: ({ row }) => {
                const user = row.getValue('user') as User
                return (
                    <div className="text-left">
                        <div className="font-medium">{user.emailAddress}</div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }) => {
                const transactionType = row.getValue('type') as string

                return (
                    <div className="text-left">
                        <div className="font-medium">{transactionType}</div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'amount',
            header: 'Amount',
            cell: ({ row }) => {
                return `$${row.getValue('amount')}`
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.getValue('status') as string
                const statusColor =
                    status === 'pending'
                        ? 'text-gray-500'
                        : status === 'successful'
                        ? 'text-green-500'
                        : 'text-red-500'

                return (
                    <span className={`font-semibold ${statusColor}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                )
            },
        },
        {
            accessorKey: 'address',
            header: 'Wallet Address',
            cell: ({ row }) => {
                const address = row.getValue('address') as string

                return (
                    <span>
                        {address.charAt(0).toUpperCase() + address.slice(1)}
                    </span>
                )
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'Date',
            cell: ({ row }) => {
                const createdAt = new Date(row.getValue('createdAt'))
                const date = createdAt.toLocaleDateString()
                const time = createdAt.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })
                return (
                    <div className="text-left">
                        <div className="text-xs text-gray-500">
                            {date} at {time}
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'uuid',
            header: 'Actions',
            cell: ({ row }) => {
                const uuid = row.getValue('uuid') as string
                const walletAddress = row.getValue('address') as string
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-2 p-2 border rounded cursor-pointer">
                                <HiViewGridAdd size={18} />
                                <span className="hidden sm:block">Actions</span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                Pending Transactions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => handleApprove(uuid)}
                            >
                                Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDecline(uuid)}
                            >
                                Decline
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleCopyAddress(walletAddress)}
                            >
                                Copy Address
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
        {
            accessorKey: 'imageUrl',
            header: 'Receipt',
            cell: ({ row }) => {
                const imageUrl = row.getValue('imageUrl') as string
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-2 p-2 border rounded cursor-pointer">
                                <HiViewGridAdd size={18} />
                                <span className="hidden sm:block">Actions</span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => handleViewReceipt(imageUrl)}
                            >
                                Receipt
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ] //

    return (
        <div className="flex flex-col gap-5 w-full bg-we p-3">
            <PageTitle title="Users Transactions" />
            <DataTable columns={columns} data={data} />

            {isModalOpen && receiptImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600"
                            onClick={closeModal}
                        >
                            <AiOutlineClose size={20} />
                        </button>
                        <img
                            src={receiptImage}
                            alt="Receipt"
                            className="max-w-full h-auto w-auto"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
