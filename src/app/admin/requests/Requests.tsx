"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import BusinessDataTable from "./data-table";
import { columns } from "./columns";
import { useDataFetch } from "@/context/DataFetchContext";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Requests = () => {
	const { finrequests, isFetching, fetchRequests } = useDataFetch();

	const [requestdata, setRequestdata] = useState(finrequests);
	const [filterStatus, setFilterStatus] = useState<string | null>(null);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	useEffect(() => {
		fetchRequests();
	}, []);

	useEffect(() => {
		// Filter the data based on the selected options
		const filtered = finrequests.filter((item) => {
			const statusMatch = filterStatus ? item.status === filterStatus : true;
			const dateMatch =
				startDate && endDate
					? new Date(item.dateOfRequest) >= startDate &&
					  new Date(item.dateOfRequest) <= endDate
					: true;
			return statusMatch && dateMatch;
		});
		setRequestdata(filtered);
	}, [filterStatus, startDate, endDate, finrequests]);

	const handleFilter = () => {
		// Filter the data based on the selected options
		const filtered = finrequests.filter((item: any) => {
			const statusMatch = filterStatus ? item.status === filterStatus : true;
			const dateMatch =
				startDate && endDate
					? new Date(item.dateOfRequest) >= startDate &&
					  new Date(item.dateOfRequest) <= endDate
					: true;
			return statusMatch && dateMatch;
		});

		setRequestdata(filtered);
	};

	return (
		<div>
			{isFetching && <Loader />}
			<div className="flex items-center justify-between">
				<h3 className="text-2xl font-[500]">Requests</h3>
			</div>
			<div className="bg-white p-6 rounded-lg mt-6 max-md:p-2">
				<div className="flex justify-between max-md:flex-col max-md:gap-3">
					<div className="flex gap-1">
						<Button variant={"outline"} onClick={() => setFilterStatus(null)}>
							All
						</Button>
						<Button
							variant={"outline"}
							className={` ${
								filterStatus === "approved" && "bg-primary-color text-white"
							}`}
							onClick={() => setFilterStatus("approved")}
						>
							Approved
						</Button>
						<Button
							variant={"outline"}
							className={`${
								filterStatus === "rejected" && "bg-primary-color text-white"
							}`}
							onClick={() => setFilterStatus("rejected")}
						>
							Rejected
						</Button>
						<Button
							variant={"outline"}
							className={`${
								filterStatus === "pending" && "bg-primary-color text-white"
							}`}
							onClick={() => setFilterStatus("pending")}
						>
							Pending
						</Button>
					</div>
					<div className="flex gap-2 max-md:flex-col">
						<DatePicker
							className="border border-slate-200 p-2 rounded-sm"
							selected={startDate}
							onChange={(date: any) => setStartDate(date)}
							selectsStart
							startDate={startDate}
							endDate={endDate}
							placeholderText="Start Date"
						/>
						<DatePicker
							className="border border-slate-200 p-2 rounded-sm"
							selected={endDate}
							onChange={(date: any) => setEndDate(date)}
							selectsEnd
							startDate={startDate}
							endDate={endDate}
							minDate={startDate}
							placeholderText="End Date"
						/>
					</div>
				</div>
				<BusinessDataTable columns={columns} data={requestdata} />
			</div>
		</div>
	);
};

export default Requests;
