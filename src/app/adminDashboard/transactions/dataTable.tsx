"use client";

import * as React from "react";

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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Shadcn Select
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [statusTypeFilter, setStatusTypeFilter] = React.useState(""); // Updated state for status filter
  const [walletTypeFilter, setWalletTypeFilter] = React.useState(""); // State for wallet type filter
  const [idFilter, setIdFilter] = React.useState(""); // State for ID filter

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
  });

  // Function to handle setting all filters: wallet, status, and id
  const updateFilters = (wallet: string, status: string, id: string) => {
    const filters: ColumnFiltersState = [];
    if (wallet && wallet !== "All") {
      filters.push({ id: "wallet", value: wallet });
    }
    if (status && status !== "All") {
      filters.push({ id: "status", value: status });
    }
    if (id) {
      filters.push({ id: "id", value: id });
    }
    setColumnFilters(filters);
  };

  const handleIdFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const idValue = event.target.value;
    setIdFilter(idValue);
    updateFilters(walletTypeFilter, statusTypeFilter, idValue); // Update all filters
  };

  const handleWalletTypeChange = (value: string) => {
    setWalletTypeFilter(value);
    updateFilters(value, statusTypeFilter, idFilter); // Update all filters
  };

  const handleStatusTypeChange = (value: string) => {
    setStatusTypeFilter(value);
    updateFilters(walletTypeFilter, value, idFilter); // Update all filters
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        {/* Select Dropdown for Wallet Type */}
        {/* <Select onValueChange={handleWalletTypeChange}>
          <SelectTrigger className="max-w-sm">
            <SelectValue
              placeholder={walletTypeFilter ? walletTypeFilter : "Filter by Wallet"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Deposit">Deposit</SelectItem>
            <SelectItem value="Interest">Interest</SelectItem>
            <SelectItem value="Withdrawal">Withdrawal</SelectItem>
          </SelectContent>
        </Select> */}

        {/* Select Dropdown for Status Type */}
        <Select onValueChange={handleStatusTypeChange}>
          <SelectTrigger className="max-w-sm">
            {/* Dynamic placeholder */}
            <SelectValue
              placeholder={statusTypeFilter ? statusTypeFilter : "Filter by Status"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="gap-[10px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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
  );
}
