"use client";
import React, { useEffect } from "react";

import Link from "next/link";

import BusinessDataTable from "./data-table";
import { columns } from "./columns";
import { useDataFetch } from "@/context/DataFetchContext";
import Loader from "@/components/ui/Loader";

const Users = () => {
	const { users, isFetching, fetchUser } = useDataFetch();

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<div>
			{isFetching && <Loader />}
			<div className="flex items-center justify-between mt-4">
				<h3 className="text-2xl font-[500]">Admins</h3>
				<Link
					className="bg-primary-color py-3 px-10 rounded-md text-white hover:bg-primary-color-darkest transition-all duration-300 max-md:p-2"
					href="/admin/users/add"
				>
					Add New
				</Link>
			</div>
			<BusinessDataTable columns={columns} data={users} />
		</div>
	);
};

export default Users;
