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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/Loader";
import { useDataFetch } from "@/context/DataFetchContext";
import Image from "next/image";

export const columns: ColumnDef<any>[] = [
	{
		id: "Photo",
		header: ({ table }) => {
			return <span>Photo</span>;
		},
		cell: ({ row }) => {
			const imageUrl = row.original.photo.key;
			return (
				<Image
					width={39}
					height={39}
					className="w-9 h-9 rounded-md"
					src={"https://s3-ap-south-1.amazonaws.com/sensibusiness/" + imageUrl}
					alt="Photo"
				/>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},

	{
		header: "Business Name",
		accessorKey: "businessName",
	},
	{
		header: "Email",
		accessorKey: "email",
	},
	{
		header: "Contact",
		accessorKey: "contact",
	},
	{
		header: "Address",
		accessorKey: "address",
	},
	{
		id: "actions",
		cell: function Cell({ row }) {
			const { isFetching, deleteData, fetchData } = useDataFetch();
			const business = row.original;
			const id = business._id;

			const handleDelete = async () => {
				await deleteData(id);
				fetchData();
			};
			return (
				<DropdownMenu>
					{isFetching && <Loader />}
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="w-8 h-8 p-0">
							<MoreVertical className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem>
							<Link
								href={`/admin/businesses/edit/${id}`}
								className=" flex gap-1 text-sm"
							>
								<FolderEdit className="w-4 h-4" /> Edit
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							className=" flex gap-1 text-sm"
							onClick={handleDelete}
						>
							<Trash className="w-4 h-4" /> Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
