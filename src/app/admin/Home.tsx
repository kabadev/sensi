"use client";
import React, { useEffect } from "react";

import Widigets from "../(business)/(site)/components/Widigets";

import BusinessDataTable from "./data-table";
import { columns } from "./columns";
import { useDataFetch } from "@/context/DataFetchContext";
import Link from "next/link";
import { formatDate } from "@/helper";
import Loader from "@/components/ui/Loader";

const Home = () => {
	const { finrequests, isFetching, fetchRequests } = useDataFetch();

	useEffect(() => {
		fetchRequests();
	}, []);

	let badgeClass = "";
	let textClass = "";
	const latest = finrequests[0];
	switch (latest?.status) {
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
		<div className="mt-4">
			{isFetching && <Loader />}
			<div className="flex gap-4 max-md:flex-col">
				<div className="w-[70%] max-md:w-full">
					<Widigets />
				</div>
				<div className="bg-primary-color text-white  p-6 rounded-lg  w-[30%] max-md:w-[100%] ">
					<div className=" flex justify-between border-b border-slate-200 pb-2">
						<h2 className="text-lg font-bold ">Last Request</h2>
						{finrequests.length > 0 && (
							<Link className="text-sm" href={`/admin/requests/${latest?._id}`}>
								View detail
							</Link>
						)}
					</div>
					<div className="flex flex-col justify-between min-h-[250px]">
						{finrequests.length > 0 ? (
							<>
								<div>
									<span className="text-gray-300 mt-3">Purpose</span>
									<h1 className="text-xl font-bold">{latest?.purpose}</h1>
									<span className="text-gray-300 mt-3">
										BY: {latest?.business.businessName}
									</span>
								</div>
								<div className="flex  justify-between">
									<div>
										<h1 className="text-3xl font-bold text-primary-color-light ">
											{latest?.amount}
										</h1>
										<span className="text-white">
											{formatDate(latest?.dateOfRequest)}
										</span>
									</div>
									<div className="flex flex-col">
										<span>status</span>
										<span
											className={`inline-block px-3 py-1 rounded-full ${badgeClass} ${textClass}`}
										>
											{latest?.status}
										</span>
									</div>
								</div>
							</>
						) : (
							<h1 className="text-3xl font-bold text-primary-color-light ">
								No record found
							</h1>
						)}
					</div>
				</div>
			</div>
			<div className="">
				<div className="bg-white mt-8 p-6 rounded-lg  max-md:order-2 max-md:p-2">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-bold">Latest Requests</h2>
						<Link
							className="py-2 px-10 rounded-md hover:underline  transition-all duration-300"
							href="/admin/requests"
						>
							view All
						</Link>
					</div>
					<BusinessDataTable columns={columns} data={finrequests} />
				</div>
			</div>
		</div>
	);
};

export default Home;
