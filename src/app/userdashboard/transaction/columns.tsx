'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type Transaction = {
    uuid: string
    amount: number
    type: string
    status: 'pending' | 'success' | 'rejected'
    isApproved: boolean
    createdAt: string
}

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: 'type',
        header: 'Type',
    },
    {
        accessorKey: 'amount',
        header: () => <div className="text-left">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'))
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return (
                <div
                    className={`text-left font-medium ${
                        amount > 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                >
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
            const date = new Date(
                row.getValue('createdAt'),
            ).toLocaleDateString()

            return <span className="text-xs text-gray-500">{date}</span>
        },
    },
    {
        accessorKey: '',
        id: 'actions',
        cell: ({ row }) => {
            const transaction = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(transaction.uuid)
                            }
                        >
                            Copy Transaction ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
