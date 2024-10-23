'use client'

import * as React from 'react'
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select' // Import Shadcn Select
import { Input } from '@/components/ui/input' // Ensure you are using your Input component

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: 'createdAt', desc: true }, // Sorting by date in descending order (latest first)
    ])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState('') // Filter for ID
    const [transactionTypeFilter, setTransactionTypeFilter] = React.useState('') // State for transaction type filter
    const [statusFilter, setStatusFilter] = React.useState('') // State for status filter
    const [idFilter, setIdFilter] = React.useState('') // State for ID filter

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    })

    // Function to handle setting all filters: status, type, and id
    const updateFilters = (status: string, type: string, id: string) => {
        const filters: ColumnFiltersState = []
        if (status && status !== 'All') {
            filters.push({ id: 'status', value: status })
        }
        if (type && type !== 'All') {
            filters.push({ id: 'type', value: type })
        }
        if (id) {
            filters.push({ id: 'id', value: id })
        }
        setColumnFilters(filters)
    }

    // Update transaction type and reset if "All" is selected
    const handleTransactionTypeChange = (value: string) => {
        if (value === 'All') {
            setTransactionTypeFilter('')
        } else {
            setTransactionTypeFilter(value)
        }
        updateFilters(statusFilter, value === 'All' ? '' : value, idFilter) // Update all filters
    }

    // Update status and reset if "All" is selected
    const handleStatusFilterChange = (value: string) => {
        if (value === 'All') {
            setStatusFilter('')
        } else {
            setStatusFilter(value)
        }
        updateFilters(value === 'All' ? '' : value, transactionTypeFilter, idFilter) // Update all filters
    }

    // Update ID filter
    const handleIdFilterChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const idValue = event.target.value
        setIdFilter(idValue)
        updateFilters(statusFilter, transactionTypeFilter, idValue) // Update all filters
    }

    return (
        <div className="flex flex-col gap-2 p-4 shadow-sm border rounded-sm">
            <div className="flex gap-5 justify-between">
                {/* Input for Transaction ID */}
                {/* <Input
                    placeholder="Transaction ID. . ."
                    value={idFilter}
                    onChange={handleIdFilterChange}
                    className="max-w-sm outline-none focus:outline-none"
                /> */}

                {/* Select Dropdown for Status */}
                <Select onValueChange={handleStatusFilterChange}>
                    <SelectTrigger className="max-w-sm">
                        {/* Dynamic placeholder */}
                        <SelectValue
                            placeholder={
                                statusFilter
                                    ? statusFilter
                                    : 'Filter by Status'
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Success">Success</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>

                {/* Select Dropdown for Transaction Type */}
                <Select onValueChange={handleTransactionTypeChange}>
                    <SelectTrigger className="max-w-sm">
                        {/* Dynamic placeholder */}
                        <SelectValue
                            placeholder={
                                transactionTypeFilter
                                    ? transactionTypeFilter
                                    : 'Filter by Type'
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Deposit">Deposit</SelectItem>
                        <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                        <SelectItem value="Invest">Invest</SelectItem>
                        <SelectItem value="Interest">Interest</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader className="gap-[10px]">
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4 cursor-pointer">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
