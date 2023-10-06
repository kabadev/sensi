"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle, ChevronRight, XCircle } from "lucide-react"; // Import Lucide icons
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/ui/Loader";
import { formatDate } from "@/helper";
import Image from "next/image";

const Request: React.FC<any> = ({ params }: { params: { id: string } }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [request, setRequest] = useState<any>({});

	const getData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("/api/requests/" + params.id);
			const res = response.data.data;
			setRequest(res);
			setIsLoading(false);
		} catch (error) {
			console.error("Error:", error);
			setIsLoading(false);
			toast.error("something went wrong");
		}
	};
	useEffect(() => {
		getData();
	}, [params?.id]);

	let badgeClass = "";
	let textClass = "";

	switch (request?.status) {
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
		<div className="mb-2">
			{isLoading && <Loader />}
			<div className="min-h-[100px] pb-4 border-b-2 border-slate-300 flex justify-between ">
				<div className="flex flex-col gap-3">
					<div>
						{/* <span>Purpose {request.purpose}</span> */}
						<h2 className="text-3xl font-bold max-md:text-2xl">
							{request?.purpose}
						</h2>
						<span className=" text-gray-400">{request?.purpose}</span>
					</div>
					<div>
						{/* <span>{request.dateOfRequest}</span> */}
						<span>{formatDate(request?.dateOfRequest)}</span>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<div>
						<span>Requested Amount</span>
						<h2 className="text-3xl font-bold max-md:text-2xl">
							{request?.amount}
						</h2>
						<span></span>
					</div>
					<div className="flex gap-2 items-center">
						<span>Status:</span>
						<span
							className={`inline-block px-2 py-1 rounded-full ${badgeClass} ${textClass}`}
						>
							{request?.status}
						</span>
					</div>
				</div>
			</div>
			<div className="flex items-start gap-7 mt-6 flex-col md:flex-row">
				<div className="w-full md:w-[70%]">
					<h2 className="text-2xl font-bold">Details</h2>
					<div className="mt-4 flex flex-col gap-2">
						<div className="flex gap-2 p-2 items-start rounded-sm border border-gray-100   min-h-[60px] w-full">
							<ChevronRight className="w-5 text-primary-color" />
							<div>
								<p className=" text-[18px] font-bold">Purpose</p>
								<p className="text-[14px] ">{request?.purpose}</p>
							</div>
						</div>
						<div className="flex gap-2 p-2 items-start rounded-sm border border-gray-100   min-h-[60px] w-full">
							<ChevronRight className="w-5 text-primary-color" />
							<div>
								<p className=" text-[18px] font-bold">Amount</p>
								<p className="text-[14px] ">{request?.amount}</p>
							</div>
						</div>
						<div className="flex gap-2 p-2 items-start rounded-sm border border-gray-100   min-h-[60px] w-full">
							<ChevronRight className="w-5 text-primary-color" />
							<div>
								<p className=" text-[18px] font-bold">Supplier</p>
								<p className="text-[14px] ">{request?.supplier}</p>
							</div>
						</div>
						<div className="flex gap-2 p-2 items-start rounded-sm border border-gray-100   min-h-[60px] w-full">
							<ChevronRight className="w-5 text-primary-color" />
							<div>
								<p className=" text-[18px] font-bold">Specification</p>
								<p className="text-[14px] ">{request?.requestType}</p>
							</div>
						</div>
						<div className="flex gap-2 p-2 items-start rounded-sm border border-gray-100   min-h-[60px] w-full">
							<ChevronRight className="w-5 text-primary-color" />
							<div>
								<p className=" text-[18px] font-bold">Specification Name</p>
								<p className="text-[14px] ">{request?.typeName}</p>
							</div>
						</div>
					</div>
					<div className="mt-4">
						<p className=" text-[18px] font-bold">Note</p>
						<p className="text-[14px] ">{request?.note}</p>
					</div>
				</div>
				<div className="w-full md:w-[30%]">
					<div className="mb-4">
						<h2 className=" text-[18px] font-bold">Supporting Documents</h2>
						<div className="grid grid-cols-2">
							{request?.documents?.map((document: any, i: number) => (
								<div className="flex flex-col items-center" key={i}>
									<Image width={100} src="/pdf-icon.png" alt="document icon" />
									<p>{document.documentName}</p>
								</div>
							))}
						</div>
					</div>
					<div className=" bg-primary-color-light min-h-[300px]  rounded-md p-2">
						<p className="text-2lg text-primary-color-darkest font-bold text-center">
							Feedbak
						</p>

						{request?.feedback ? (
							<p className="  text-sm leading-[2] text-primary-color-darkest ">
								{request?.feedback}
							</p>
						) : (
							<div className="flex items-center justify-center h-[200px] w-full">
								<span className="text-lg font-bold text-center">
									No feedback
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Request;
