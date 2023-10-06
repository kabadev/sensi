"use client";
import React, { useEffect } from "react";

import Link from "next/link";

import BusinessDataTable from "./data-table";
import { columns } from "./columns";
import { useDataFetch } from "@/context/DataFetchContext";
import Loader from "@/components/ui/Loader";

const Business = () => {
	const { BusinessData, isFetching, fetchData } = useDataFetch();

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			{isFetching && <Loader />}
			<div className="flex items-center justify-between mt-4">
				<h3 className="text-2xl font-[500]">Business Partners</h3>
				<Link
					className="bg-primary-color py-3 px-10 rounded-md text-white hover:bg-primary-color-darkest transition-all duration-300"
					href="/admin/businesses/add"
				>
					Add New
				</Link>
			</div>
			<BusinessDataTable columns={columns} data={BusinessData} />
		</div>
	);
};

export default Business;
