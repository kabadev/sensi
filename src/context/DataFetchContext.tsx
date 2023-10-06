// "use client";
// import React, { createContext, useContext, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { deleteS3File } from "@/lib/s3";

// const DataFetchContext = createContext(undefined);

// export const useDataFetch = () => {
// 	return useContext(DataFetchContext);
// };

// export const DataFetchProvider = ({ children }) => {
// 	const [BusinessData, setData] = useState([]);
// 	const [users, setUsers] = useState([]);
// 	const [finrequests, setRequests] = useState([]);
// 	const [isFetching, setIsFetching] = useState(false);
// 	const [error, setError] = useState(null);

// 	const fetchUser = async () => {
// 		setIsFetching(true);
// 		try {
// 			const response = await axios.get("/api/users");
// 			setUsers(response.data.data);
// 		} catch (error: any) {
// 			setError(error);
// 			toast.error("Something went wrong");
// 		} finally {
// 			setIsFetching(false);
// 		}
// 	};

// 	const fetchData = async () => {
// 		setIsFetching(true);
// 		try {
// 			const response = await axios.get("/api/businesses");
// 			setData(response.data.data);
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
// 			const res = await axios.delete("/api/businesses/" + id);
// 			await deleteS3File(res.data.data.photo.key);
// 			toast.success("Deleted Successfully");
// 			// setIsFetching(false);
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

// 	return (
// 		<DataFetchContext.Provider
// 			value={{
// 				BusinessData,
// 				users,
// 				isFetching,
// 				error,
// 				finrequests,
// 				fetchUser,
// 				fetchData,
// 				deleteData,
// 				fetchRequests,
// 			}}
// 		>
// 			{children}
// 		</DataFetchContext.Provider>
// 	);
// };

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { deleteS3File } from "@/lib/s3";

// Define the types for your context data
type DataFetchContextData = {
	BusinessData: any[];
	users: any[];
	finrequests: any[];
	isFetching: boolean;
	error: any;
	fetchUser: () => void;
	fetchData: () => void;
	deleteData: (id: string) => void;
	fetchRequests: () => void;
};

const DataFetchContext = createContext<DataFetchContextData | undefined>(
	undefined
);

export const useDataFetch = (): DataFetchContextData => {
	const context = useContext(DataFetchContext);
	if (!context) {
		throw new Error("useDataFetch must be used within a DataFetchProvider");
	}
	return context;
};

type DataFetchProviderProps = {
	children: ReactNode;
};

export const DataFetchProvider: React.FC<DataFetchProviderProps> = ({
	children,
}) => {
	const [BusinessData, setData] = useState<any[]>([]);
	const [users, setUsers] = useState<any[]>([]);
	const [finrequests, setRequests] = useState<any[]>([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState<any>(null);

	const fetchUser = async () => {
		setIsFetching(true);
		try {
			const response = await axios.get("/api/users");
			setUsers(response.data.data);
		} catch (error: any) {
			setError(error);
			toast.error("Something went wrong");
		} finally {
			setIsFetching(false);
		}
	};

	const fetchData = async () => {
		setIsFetching(true);
		try {
			const response = await axios.get("/api/businesses");
			setData(response.data.data);
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
			const res = await axios.delete("/api/businesses/" + id);
			await deleteS3File(res.data.data.photo.key);
			toast.success("Deleted Successfully");
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

	const contextData: DataFetchContextData = {
		BusinessData,
		users,
		finrequests,
		isFetching,
		error,
		fetchUser,
		fetchData,
		deleteData,
		fetchRequests,
	};

	return (
		<DataFetchContext.Provider value={contextData}>
			{children}
		</DataFetchContext.Provider>
	);
};
