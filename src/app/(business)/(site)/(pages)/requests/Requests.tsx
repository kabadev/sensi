"use client";
import React, { useEffect } from "react";

import Link from "next/link";

import BusinessDataTable from "./data-table";
import { columns } from "./columns";
import { useDataFetch } from "@/context/DataFetchContext";
import Loader from "@/components/ui/Loader";
import { useRequestFetch } from "@/context/RequestContext";

const Requests = () => {
	const { userRequests, isFetching, fetchUserRequests } = useRequestFetch();

	useEffect(() => {
		fetchUserRequests();
	}, []);

	return (
		<div>
			{isFetching && <Loader />}
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold">Your Request</h2>
				<Link
					className="bg-primary-color py-3 px-10 rounded-md text-white hover:bg-primary-color-darkest transition-all duration-300 max-md:p-2 text-sm"
					href="/requests/add"
				>
					Add New
				</Link>
			</div>
			<BusinessDataTable columns={columns} data={userRequests} />
		</div>
	);
};

export default Requests;
