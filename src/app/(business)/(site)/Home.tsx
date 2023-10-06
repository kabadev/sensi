"use client";

import Widigets from "./components/Widigets";
import { BusinessDataTable } from "./data-table";
import React, { useEffect, useState } from "react";

import { columns } from "./columns";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { useRequestFetch } from "@/context/RequestContext";
import Loader from "@/components/ui/Loader";
import Overlay from "@/app/admin/components/Overlay";
import { formatDate } from "@/helper";

const Home = () => {
	const { userRequests, isFetching, fetchUserRequests } = useRequestFetch();

	useEffect(() => {
		fetchUserRequests();
	}, []);

	let badgeClass = "";
	let textClass = "";
	const latest = userRequests[0];
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
		<>
			<div className="header max-md:h-[200px]">
				{isFetching && <Loader />}
				<Navbar />
				<div className="flex w-[80%] m-auto max-md:w-[95%] pt-12 max-sm:pt-4">
					<h1 className="text-[35px] font-bold text-white w-[40%] max-md:w-[95%] max-sm:text-lg">
						Welcome to Sensi
					</h1>
				</div>
			</div>

			<div className="w-[80%] m-auto mt-[-100px] max-md:w-[95%] max-md:mt-[-80px]">
				<Widigets />

				<div className="flex gap-4 max-md:flex-col max-md:gap-2">
					<div className="bg-white mt-8 p-6 rounded-lg w-[70%] max-md:w-[100%] max-md:order-2">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-bold">Latest Requests</h2>
							<Link
								className="bg-primary-color py-3 px-10 rounded-md text-white hover:bg-primary-color-darkest transition-all duration-300"
								href="/requests"
							>
								view All
							</Link>
						</div>
						<BusinessDataTable columns={columns} data={userRequests} />
					</div>
					<div className="bg-og text-white mt-8 p-6 rounded-lg w-[30%] max-md:w-[100%] ">
						<h2 className="text-lg font-bold border-b border-slate-200 pb-2">
							Last Request
						</h2>
						{userRequests.length > 0 ? (
							<>
								<span className="text-primary-color mt-3">Purpose</span>
								<h1 className="text-xl font-bold">{latest?.purpose}</h1>
								<div className="flex mt-8 justify-between">
									<div>
										<h1 className="text-3xl font-bold text-primary-color ">
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
								<div className="flex justify-center items-center mt-2">
									<Link
										href={`/requests/${latest?._id}`}
										className="p-2 px-10 bg-primary-color rounded-sm text-white"
									>
										View
									</Link>
								</div>
							</>
						) : (
							<h1 className="text-lg font-bold text-primary-color ">
								No record found
							</h1>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
