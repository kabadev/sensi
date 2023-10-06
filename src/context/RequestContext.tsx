// "use client";
// import React, { createContext, useContext, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { deleteMultipleFiles, deleteS3File } from "@/lib/s3";

// const RequestContext = createContext(undefined);

// export const useRequestFetch = () => {
// 	return useContext(RequestContext);
// };

// export const RequestProvider = ({ children }) => {
// 	const [finrequests, setRequests] = useState([]);
// 	const [userRequests, setUserRequests] = useState([]);

// 	const [isFetching, setIsFetching] = useState(false);
// 	const [error, setError] = useState(null);

// 	const fetchUserRequests = async () => {
// 		setIsFetching(true);
// 		try {
// 			const response = await axios.get("/api/requests/usersRequests");
// 			setUserRequests(response.data.data);
// 		} catch (error: any) {
// 			setError(error);
// 			toast.error("Something went wrong");
// 		} finally {
// 			setIsFetching(false);
// 		}
// 	};
// 	const fetchRequests = async () => {
// 		setIsFetching(true);
// 		try {
// 			const response = await axios.get("/api/requests");
// 			setRequests(response.data.data);
// 		} catch (error: any) {
// 			setError(error);
// 			toast.error("Something went wrong");
// 		} finally {
// 			setIsFetching(false);
// 		}
// 	};

// 	const deleteData = async (id: string) => {
// 		setIsFetching(true);
// 		try {
// 			const res = await axios.delete("/api/requests/" + id);
// 			// await deleteMultipleFiles(res.data.data.documents);
// 			const deletePromises = res.data.data.documents.map(
// 				async (document: any) => {
// 					await deleteS3File(document.key);
// 				}
// 			);
// 			await Promise.all(deletePromises);

// 			toast.success("Deleted Successfully");
// 			// setIsFetching(false);
// 		} catch (error: any) {
// 			setError(error);
// 			toast.error("Something went wrong");
// 		} finally {
// 			setIsFetching(false);
// 		}
// 	};

// 	return (
// 		<RequestContext.Provider
// 			value={{
// 				finrequests,
// 				userRequests,
// 				isFetching,
// 				fetchRequests,
// 				fetchUserRequests,
// 				deleteData,
// 			}}
// 		>
// 			{children}
// 		</RequestContext.Provider>
// 	);
// };

"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { deleteS3File } from "@/lib/s3";

// Define the types for your context data
type RequestContextData = {
	finrequests: any[];
	userRequests: any[];
	isFetching: boolean;
	fetchRequests: () => void;
	fetchUserRequests: () => void;
	deleteData: (id: string) => void;
};

const RequestContext = createContext<RequestContextData | undefined>(undefined);

export const useRequestFetch = (): RequestContextData => {
	const context = useContext(RequestContext);
	if (!context) {
		throw new Error("useRequestFetch must be used within a RequestProvider");
	}
	return context;
};

type RequestProviderProps = {
	children: ReactNode;
};

export const RequestProvider: React.FC<RequestProviderProps> = ({
	children,
}) => {
	const [finrequests, setRequests] = useState<any[]>([]);
	const [userRequests, setUserRequests] = useState<any[]>([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchUserRequests = async () => {
		setIsFetching(true);
		try {
			const response = await axios.get("/api/requests/usersRequests");
			setUserRequests(response.data.data);
		} catch (error: any) {
			setError(error);
			toast.error("Something went wrong");
		} finally {
			setIsFetching(false);
		}
	};

	const fetchRequests = async () => {
		setIsFetching(true);
		try {
			const response = await axios.get("/api/requests");
			setRequests(response.data.data);
		} catch (error: any) {
			setError(error);
			toast.error("Something went wrong");
		} finally {
			setIsFetching(false);
		}
	};

	const deleteData = async (id: string) => {
		setIsFetching(true);
		try {
			const res = await axios.delete("/api/requests/" + id);
			const deletePromises = res.data.data.documents.map(
				async (document: any) => {
					await deleteS3File(document.key);
				}
			);
			await Promise.all(deletePromises);

			toast.success("Deleted Successfully");
		} catch (error: any) {
			setError(error);
			toast.error("Something went wrong");
		} finally {
			setIsFetching(false);
		}
	};

	const contextData: RequestContextData = {
		finrequests,
		userRequests,
		isFetching,
		fetchRequests,
		fetchUserRequests,
		deleteData,
	};

	return (
		<RequestContext.Provider value={contextData}>
			{children}
		</RequestContext.Provider>
	);
};
