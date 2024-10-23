'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './dataTable'
import { baseUrl } from '@/utils/constants'
import { format } from 'date-fns'


// Transaction type definition
type Transaction = {
    uuid: string
    amount: number
    type: string
    status: 'pending' | 'success' | 'rejected'
    isApproved: boolean
    createdAt: string
}

export default function TransactionPage(): JSX.Element {
    const [data, setData] = useState<Transaction[]>([])
    const [token, setToken] = useState<string | null>(null)

    // Fetch transaction data from the API
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // This ensures the code runs only on the client-side
            const storedToken =
                sessionStorage.getItem('token') || localStorage.getItem('token')
            setToken(storedToken)
        }
        const fetchTransactions = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `${baseUrl}/transactions`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // Map the API data to the expected structure
                const formattedData = response.data.map((transaction: any) => ({
                    uuid: transaction.uuid,
                    amount: parseFloat(transaction.amount),
                    type:
                        transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1),
                    status: transaction.status,
                    isApproved: transaction.isApproved,
                    createdAt: new Date(transaction.createdAt).toLocaleString(),
                }))

                // Sort the data in descending order based on createdAt
                console.log({ formattedData })

                setData(formattedData.reverse())
            } catch (error) {
                console.error('Failed to fetch data:', error)
            }
        }

        fetchTransactions()
    }, [token])

    const columns: ColumnDef<Transaction>[] = [
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
            header: () => <div className="text-left">Amount</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue('amount'))
                const transactionType = row.getValue('type') as string
                const formatted = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(amount)

                let amountColor = ''
                if (
                    transactionType === 'Withdrawal' ||
                    transactionType === 'Invest'
                ) {
                    amountColor = 'text-red-500'
                } else if (
                    transactionType === 'Deposit' ||
                    transactionType === 'Interest'
                ) {
                    amountColor = 'text-green-500'
                }

                return (
                    <div className={`text-left font-medium ${amountColor}`}>
                        {formatted}
                    </div>
                )
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.getValue('status') as string
                let statusColor = ''

                switch (status) {
                    case 'success':
                        statusColor = 'text-green-500'
                        break
                    case 'pending':
                        statusColor = 'text-gray-500'
                        break
                    case 'rejected':
                        statusColor = 'text-red-500'
                        break
                    default:
                        statusColor = 'text-gray-500'
                }

                return (
                    <span className={`font-semibold ${statusColor}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                )
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'Date',
            cell: ({ row }) => {
                const createdAt = new Date(row.getValue('createdAt'))
        
                // Format the date and time using date-fns
                const formattedDate = format(createdAt, 'yyyy-MM-dd')
                const formattedTime = format(createdAt, 'HH:mm')
        
                return (
                    <div className="text-left">
                        <div className="text-xs text-gray-500">
                            {formattedDate} at {formattedTime}
                        </div>
                    </div>
                )
            },
        }
    ]

    return (
        <div className="md:p-4">
            <div className="flex flex-col gap-2">
                <p className="font-semibold text-lg">Transaction</p>
                <h1 className="text-[#0a0f57]">My Transactions History</h1>
                <hr />
                <div className="bg-white rounded-sm">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    )
}
