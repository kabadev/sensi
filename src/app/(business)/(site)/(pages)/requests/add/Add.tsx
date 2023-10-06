"use client";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadToS3 } from "@/lib/s3";
import {
	CheckCircle,
	CheckCircle2,
	Circle,
	FileText,
	ScrollText,
} from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
interface FormData {
	purpose: string;
	amount: string;
	supplier: string;
	requestType: string;
	typeName: string;
	note: string;
	documents: Documents[];
}

interface Documents {
	id: number;
	documentName: string;
	fileName: string;
	key: string;
}
const initialFormData = {
	purpose: "",
	amount: "",
	supplier: "",
	requestType: "",
	typeName: "",
	note: "",
	documents: [],
};

const Add: React.FC = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<FormData>(initialFormData);

	const [currentStep, setCurrentStep] = useState(1);
	const [errors, setErrors] = useState<Partial<FormData>>({});

	const [docName, setDocName] = useState("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [docNameerr, setDocNameerr] = useState("");
	const [docFileerr, setDocFileerr] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	const [documentList, setDocumentList] = useState<Documents[]>([]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const [selectedOption, setSelectedOption] = useState("");
	const options = [
		{ label: "Goods", value: "Goods" },
		{ label: "Services", value: "Services" },
		{ label: "Work", value: "Work" },
	];
	const handleOptionChange = (option: string) => {
		setSelectedOption(option);
		setFormData({ ...formData, requestType: option });
	};

	// file functions
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];

			if (!file.type || !file.type.startsWith("application/pdf")) {
				setDocFileerr("Only PDF files are allowed");
			} else {
				if (file.size > 10 * 1024 * 1024) {
					setDocFileerr("File size exceeds the 10MB limit");
				} else {
					setSelectedFile(event.target.files[0]);
				}
			}
		}
	};

	const handleUpload = async () => {
		if (selectedFile && docName) {
			try {
				setIsUploading(true);
				const { fileName, key } = await uploadToS3(selectedFile);

				setDocumentList((prevItems) => [
					...prevItems,
					{
						id: documentList.length + 1,
						documentName: docName,
						fileName: fileName,
						key: key,
					},
				]);

				setDocName("");
				setSelectedFile(null);
				setDocFileerr("");
				setDocNameerr("");
			} catch (error) {
				console.error("Error uploading file:", error);
			} finally {
				setIsUploading(false);
			}
		} else if (!selectedFile) {
			setDocFileerr("Document requried");
		} else if (!docName) {
			setDocNameerr("Document Name requried");
		}
	};

	// file functions

	const validateStep1 = () => {
		const errors: Partial<FormData> = {};
		if (!formData.purpose.trim()) {
			errors.purpose = "Purpose is required";
		}
		if (!formData.amount.trim()) {
			errors.amount = "Amount is required";
		}
		if (!formData.supplier.trim()) {
			errors.supplier = "Supplier name is required";
		}
		if (!formData.typeName.trim()) {
			errors.typeName = "Goods/Services/Work Name is required";
		}
		if (!formData.requestType.trim()) {
			errors.requestType = "Specification name is required";
		}
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const nextStep = () => {
		if (validateStep1()) {
			setCurrentStep(2);
		}
	};

	const prevStep = () => {
		setCurrentStep(1);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		formData.documents = documentList;
		setIsLoading(true);
		try {
			const res = await axios.post("/api/requests", formData);
			setFormData(initialFormData);
			setDocumentList([]);
			setIsLoading(false);
			toast.success("Request Submited Successfully");
			router.push("/requests/" + res.data.data._id);
		} catch (error) {
			toast.error("something went wrong");
			console.log(error);
		}
	};

	return (
		<div className="mb-10">
			{isUploading && <Loader />}
			{isLoading && <Loader />}

			<h2 className="text-lg font-bold">New Request</h2>
			<div className="relative flex my-10 mb-10 items-center justify-between">
				<div className="absolute  mt-[18px]  flex flex-col  ">
					<span className="w-10 h-10 flex justify-center items-center rounded-full   bg-primary-color text-white ">
						<ScrollText />
					</span>
					<h2 className="text-gray-500">Basic Information</h2>
				</div>

				<div className="flex-1 h-1 w-full bg-gray-300">
					<div
						className={`h-full w-[100%] bg-primary-color ${
							currentStep === 1 && "w-[50%]"
						}`}
					></div>
				</div>

				<div className="absolute right-0 mt-[18px] flex flex-col items-end ">
					<span
						className={`w-10 h-10 flex justify-center items-center  rounded-full ${
							currentStep === 2
								? "bg-primary-color text-white"
								: "bg-gray-200 text-gray-500 border-gray-200"
						}`}
					>
						<FileText />
					</span>
					<h2 className="text-gray-500">Supporting Documents</h2>
				</div>
			</div>
			<br />

			<div className="mt">
				<form onSubmit={handleSubmit}>
					{currentStep === 1 && (
						<>
							<h1 className="text-center font-[500]">Basic Information</h1>

							<div className="grid grid-cols-auto-fill-md gap-5 max-md:grid-cols-auto-fill-full">
								<div className="flex flex-col">
									<label className="text-slate-500" htmlFor="purpose">
										Purpose:
									</label>
									<input
										type="text"
										name="purpose"
										id="purpose"
										placeholder="Purpose"
										className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
										value={formData.purpose}
										onChange={handleInputChange}
									/>
									{errors.purpose && (
										<span className="text-red-500">{errors.purpose}</span>
									)}
								</div>
								<div className="flex flex-col">
									<label className="text-slate-500" htmlFor="purpose">
										Amount:
									</label>
									<input
										type="number"
										name="amount"
										id="amount"
										placeholder="Amount "
										className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
										value={formData.amount}
										onChange={handleInputChange}
									/>
									{errors.amount && (
										<span className="text-red-500">{errors.amount}</span>
									)}
								</div>
								<div className="flex flex-col">
									<label className="text-slate-500" htmlFor="purpose">
										Supplier Name:
									</label>
									<input
										type="text"
										name="supplier"
										id="supplier"
										placeholder="Supplier Name"
										className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
										value={formData.supplier}
										onChange={handleInputChange}
									/>
									{errors.supplier && (
										<span className="text-red-500">{errors.supplier}</span>
									)}
								</div>
								<div className="flex flex-col">
									<label className="text-slate-500" htmlFor="purpose">
										Specification:
									</label>

									<div className="flex space-x-2 items-center">
										{options.map((option) => (
											<div
												key={option.value}
												className={`flex items-center space-x-2 cursor-pointer  p-1 px-2 border border-slate-300 ${
													selectedOption === option.value
														? "bg-primary-color text-white"
														: "text-gray-500"
												} `}
												onClick={() => handleOptionChange(option.value)}
											>
												{selectedOption === option.value ? (
													<CheckCircle size={20} />
												) : (
													<Circle size={20} />
												)}
												<span>{option.label}</span>
											</div>
										))}
									</div>
									{errors.requestType && (
										<span className="text-red-500">{errors.requestType}</span>
									)}
								</div>
								<div className="flex flex-col">
									<label className="text-slate-500" htmlFor="purpose">
										Goods/Services/Work Name
									</label>
									<input
										type="text"
										name="typeName"
										id="typeName"
										placeholder="Goods/Services/Work Name"
										className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
										value={formData.typeName}
										onChange={handleInputChange}
									/>
									{errors.typeName && (
										<span className="text-red-500">{errors.typeName}</span>
									)}
								</div>
							</div>
							<div className="mt-4">
								<label className="text-slate-500" htmlFor="">
									Note :
								</label>
								<textarea
									value={formData.note}
									onChange={handleTextareaChange}
									name="note"
									id="note"
									className="min-h-[200px] text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
								></textarea>
							</div>
						</>
					)}

					{currentStep === 2 && (
						<div>
							<h1 className="text-center font-[500]">Supporting Documents</h1>
							<div className="flex gap-4 mt-10">
								<div className="w-[50%]">
									<h1 className=" font-[500]">Uploaded Files:</h1>
									<div className="flex flex-col gap-4 mt-4">
										{documentList.map((document, index) => (
											<div key={index} className="flex items-start gap-2">
												<span>
													<CheckCircle2 className="text-primary-color" />
												</span>
												<div>
													<h3 className="">{document.documentName}</h3>
													<div className="text-gray-500 ml-3 text-sm">
														{document.fileName}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
								<div className="w-[50%] flex flex-col gap-2">
									<div className="flex flex-col ">
										<label className="text-slate-700" htmlFor="documentName">
											Document Name:
										</label>
										<input
											type="text"
											name="documentName"
											id="documentName"
											placeholder="Document Name"
											className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
											value={docName}
											onChange={(e) => setDocName(e.target.value)}
										/>
										{docNameerr && (
											<span className="text-red-500">{docNameerr}</span>
										)}
									</div>
									<div className="flex w-full items-center space-x-2">
										<Input
											className="w-full cursor-pointer"
											type="file"
											onChange={handleFileChange}
										/>
										{docFileerr && (
											<span className="text-red-500">{docFileerr}</span>
										)}
										<Button type="button" onClick={handleUpload}>
											Add
										</Button>
									</div>
								</div>
							</div>
						</div>
					)}

					<div
						className={`flex  ${
							currentStep === 2 ? "justify-between" : "justify-end"
						} m-6`}
					>
						{currentStep === 2 && (
							<Button
								type="button"
								className="bg-primary-color hover:bg-primary-color-darkest"
								onClick={prevStep}
							>
								Previous
							</Button>
						)}

						{currentStep === 2 ? (
							<Button
								type="button"
								className="justify-self-end bg-primary-color hover:bg-primary-color-darkest"
								onClick={handleSubmit}
							>
								Submit
							</Button>
						) : (
							<Button
								type="button"
								className="justify-self-end bg-primary-color hover:bg-primary-color-darkest"
								onClick={nextStep}
							>
								Next
							</Button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Add;
