"use client";
import React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
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
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { downloadToExcel } from "@/lib/xlsx";
import { formatDate } from "@/helper";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function BusinessDataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),

		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,

		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,

		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	const excelData: any[] = data.map((item: any) => ({
		business: item.business.businessName,
		business_email: item.business.email || "",
		business_mobile: item.business.contact || "",
		purpose: item.purpose,
		amount: item.amount,
		date: formatDate(item.dateOfRequest),
	}));

	return (
		<div className=" my-6 ">
			{/* input */}
			<div className="flex items-center justify-between py-4 max-md:flex-col max-md:gap-2">
				<Input
					placeholder="Filter Purpose "
					value={(table.getColumn("purpose")?.getFilterValue() as string) || ""}
					onChange={(e) => {
						table.getColumn("purpose")?.setFilterValue(e.target.value);
					}}
					className="max-w-sm"
				/>

				<div className="flex gap-2">
					<Button onClick={() => downloadToExcel(excelData)} className="ml-4">
						Export to Excel
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<div className="flex gap-1 items-center bg-primary-color text-white p-2 px-5 rounded-sm h-full ml-4">
								<small>Visible</small> <ChevronDown />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value: boolean) => {
												column.toggleVisibility(!!value);
											}}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* table */}
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => {
							return (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
											</TableHead>
										);
									})}
								</TableRow>
							);
						})}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell>No results</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{/* pagination */}
			<div className="flex items-center justify-start space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => {
						table.previousPage();
					}}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => {
						table.nextPage();
					}}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
			<div className="flex-1 text-sm text-muted-foreground">
				{table.getFilteredSelectedRowModel().rows.length} of{" "}
				{table.getFilteredRowModel().rows.length} row(s) selected
			</div>
		</div>
	);
}

export default BusinessDataTable;