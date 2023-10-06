"use client";
import { useState } from "react";
import axios from "axios";

interface FetchResult<T> {
	data: T | null;
	isLoading: boolean;
	error: Error | null;

	fetchData: (url: string) => Promise<void>;
	deleteData: (url: string) => Promise<void>;
}

function useFetch<T>(): FetchResult<T> {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async (url: string) => {
		setIsLoading(true);
		try {
			const response = await axios.get<T>(url);
			setData(response.data);
		} catch (error: any) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteData = async (url: string) => {
		setIsLoading(true);
		try {
			await axios.delete(url);
		} catch (error: any) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { data, isLoading, error, fetchData, deleteData };
}

export default useFetch;
