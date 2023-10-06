"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, FolderEdit, MoreVertical, Trash } from "lucide-react";

import Link from "next/link";

import { formatDate } from "@/helper";

export const columns: ColumnDef<any>[] = [
	{
		id: "Business",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => {
						column.toggleSorting(column.getIsSorted() === "asc");
					}}
				>
					Business
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const business = row.original.business.businessName;
			return <span>{business}</span>;
		},
	},
	{
		header: "Purpose",
		accessorKey: "purpose",
	},
	{
		header: "Amount",
		accessorKey: "amount",
	},
	{
		header: "Request Type",
		accessorKey: "requestType",
	},
	{
		header: "Type Name",
		accessorKey: "typeName",
	},
	{
		id: "date",
		header: ({ table }) => {
			return <span>Date</span>;
		},
		cell: ({ row }) => {
			const date = row.original.dateOfRequest;

			return <span>{formatDate(date)}</span>;
		},
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: "status",
		header: ({ table }) => {
			return <span>Status</span>;
		},
		cell: ({ row }) => {
			const status = row.original.status;
			let badgeClass = "";
			let textClass = "";

			switch (status) {
				case "pending":
					badgeClass = "bg-yellow-500";
					textClass = "text-yellow-900";
					break;
				case "approved":
					badgeClass = "bg-green-500";
					textClass = "text-green-900";
					break;
				case "rejected":
					badgeClass = "bg-red-500";
					textClass = "text-red-900";
					break;
				default:
					badgeClass = "bg-gray-400";
					textClass = "text-gray-900";
			}

			return (
				<span
					className={`inline-block px-2 py-1 rounded-full ${badgeClass} ${textClass}`}
				>
					{status}
				</span>
			);
		},
	},

	{
		id: "actions",
		cell: ({ row }) => {
			// const { isFetching, deleteData, fetchData } = useDataFetch();
			const request = row.original;
			const id = request._id;

			// const handleDelete = async () => {
			// 	await deleteData(id);
			// 	fetchData();
			// };
			return (
				<DropdownMenu>
					{/* {isFetching && <Loader />} */}
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="w-8 h-8 p-0">
							<MoreVertical className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem>
							<Link
								href={`/admin/requests/${id}`}
								className=" flex gap-1 text-sm"
							>
								<FolderEdit className="w-4 h-4" /> View
							</Link>
						</DropdownMenuItem>
						{/* <DropdownMenuItem
							className=" flex gap-1 text-sm"
							// onClick={handleDelete}
						>
							<Trash className="w-4 h-4" /> Delete
						</DropdownMenuItem> */}
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
];
