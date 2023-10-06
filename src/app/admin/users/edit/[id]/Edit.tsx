// "use client";
// import Loader from "@/components/ui/Loader";
// import { Button } from "@/components/ui/button";
// import { uploadToS3 } from "@/lib/s3";
// import axios from "axios";
// import { ImagePlus, Loader2 } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const Edit = ({ params }: { params: { id: string } }) => {
// 	const router = useRouter();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const initialFormData = {
// 		businessName: "",
// 		address: "",
// 		email: "",
// 		contact: "",
// 		password: "",
// 		description: "",
// 		photo: {},
// 	};
// 	const [business, setBusiness] = useState({});
// 	const [formData, setFormData] = useState(initialFormData);
// 	const [fileImage, setFileImage] = useState<File | null>(null);
// 	const getData = async () => {
// 		setIsLoading(true);
// 		try {
// 			const response = await axios.get("/api/users/" + params?.id);
// 			const res = response.data.data;
// 			setBusiness(res);
// 			setFormData({
// 				businessName: res.businessName,
// 				address: res.address,
// 				email: res.email,
// 				contact: res.contact,
// 				password: "",
// 				description: res.description,
// 				photo: null,
// 			});
// 			setIsLoading(false);
// 		} catch (error) {
// 			console.error("Error submitting form:", error);
// 			setIsLoading(false);
// 		}
// 	};
// 	useEffect(() => {
// 		getData();
// 	}, [params?.id]);

// 	const [formErrors, setFormErrors] = useState({
// 		businessName: "",
// 		address: "",
// 		email: "",
// 		contact: "",
// 		password: "",
// 		photo: "",
// 		description: "",
// 	});

// 	const handleInputChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// 	) => {
// 		const { name, value } = e.target;
// 		setFormData({
// 			...formData,
// 			[name]: value,
// 		});
// 	};

// 	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const file = e.target.files?.[0];
// 		if (file) {
// 			setFileImage(file);
// 		}
// 		// setFormData({
// 		// 	...formData,
// 		// 	photo: file,
// 		// });
// 	};

// 	const validateForm = () => {
// 		const errors: any = {};

// 		// Business Name
// 		if (!formData.businessName) {
// 			errors.businessName = "Name is required";
// 		}

// 		// Address
// 		if (!formData.address) {
// 			errors.address = "Address is required";
// 		}

// 		// Email
// 		if (!formData.email) {
// 			errors.email = "Email is required";
// 		} else if (
// 			!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
// 		) {
// 			errors.email = "Invalid email address";
// 		}

// 		// Contact
// 		if (!formData.contact) {
// 			errors.contact = "Business Contacts is required";
// 		} else if (!/^\d+$/.test(formData.contact)) {
// 			errors.contact = "Invalid contact number";
// 		}

// 		// Password
// 		if (formData.password) {
// 			if (formData.password.length < 6) {
// 				errors.password = "Password must be at least 6 characters long";
// 			}
// 		}

// 		setFormErrors(errors);
// 		return Object.keys(errors).length === 0;
// 	};

// 	const handleFormSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();

// 		if (validateForm()) {
// 			setIsLoading(true);
// 			const dataToSend = {
// 				...formData,
// 			};

// 			if (fileImage) {
// 				const { fileName, key } = await uploadToS3(fileImage);
// 				dataToSend.photo = { fileName: fileName, key: key };
// 			}

// 			try {
// 				const response = await axios.patch(
// 					"/api/users/" + business._id,
// 					dataToSend
// 				);
// 				setIsLoading(false);
// 				toast.success("Edited Successfully");
// 				router.push("/admin/users");
// 			} catch (error) {
// 				console.error("Error submitting form:", error);
// 				setIsLoading(false);
// 				toast.error("Something went wrong");
// 			}
// 		}
// 	};

// 	return (
// 		<div className="bg-white rounded-md p-5 mb-6 max-md:p-2 mt-4">
// 			{isLoading && <Loader />}

// 			<h1 className="text-lg font-[600]">Edit Admin</h1>
// 			<div className="my-6">
// 				<form onSubmit={handleFormSubmit}>
// 					<div className="grid grid-cols-auto-fill-md gap-5 max-md:grid-cols-auto-fill-full">
// 						{/* Business Name */}
// 						<div className="flex flex-col">
// 							<label className="text-slate-500" htmlFor="businessName">
// 								Full Name:
// 							</label>
// 							<input
// 								type="text"
// 								name="businessName"
// 								id="businessName"
// 								placeholder="Name"
// 								className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
// 								value={formData.businessName || business.businessName}
// 								onChange={handleInputChange}
// 							/>
// 							<span className="text-red-500">{formErrors.businessName}</span>
// 						</div>

// 						{/* Address */}
// 						<div className="flex flex-col">
// 							<label className="text-slate-500" htmlFor="address">
// 								Address:
// 							</label>
// 							<input
// 								type="text"
// 								name="address"
// 								id="address"
// 								placeholder="Address"
// 								className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
// 								value={formData.address || business.address}
// 								onChange={handleInputChange}
// 							/>
// 							<span className="text-red-500">{formErrors.address}</span>
// 						</div>

// 						{/* Email */}
// 						<div className="flex flex-col">
// 							<label className="text-slate-500" htmlFor="email">
// 								Email:
// 							</label>
// 							<input
// 								type="email"
// 								name="email"
// 								id="email"
// 								placeholder="Email"
// 								className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
// 								value={formData.email || business.email}
// 								onChange={handleInputChange}
// 							/>
// 							<span className="text-red-500">{formErrors.email}</span>
// 						</div>

// 						{/* Contact */}
// 						<div className="flex flex-col">
// 							<label className="text-slate-500" htmlFor="contact">
// 								Contact:
// 							</label>
// 							<input
// 								type="number"
// 								name="contact"
// 								id="contact"
// 								placeholder="Contacts"
// 								className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
// 								value={formData.contact || business.contact}
// 								onChange={handleInputChange}
// 							/>
// 							<span className="text-red-500">{formErrors.contact}</span>
// 						</div>

// 						{/* Password */}
// 						<div className="flex flex-col">
// 							<label className="text-slate-500" htmlFor="password">
// 								Password:
// 							</label>
// 							<input
// 								type="password"
// 								name="password"
// 								id="password"
// 								placeholder="Password"
// 								className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
// 								value={formData.password}
// 								onChange={handleInputChange}
// 							/>
// 							<span className="text-red-500">{formErrors.password}</span>
// 						</div>

// 						{/* Photo */}
// 						<div className="flex flex-col justify-center">
// 							<label className="text-slate-500" htmlFor="photo">
// 								Photo:
// 							</label>
// 							<div className="relative flex items-center justify-center overflow-hidden rounded-md w-[150px] h-[100px] border-slate-300 border-2 border-dashed">
// 								<Image
// 									width={100}
// 									height={100}
// 									className="h-full w-full absolute top-0 bottom-0"
// 									src={
// 										fileImage
// 											? URL.createObjectURL(fileImage)
// 											: "https://s3-ap-south-1.amazonaws.com/sensibusiness/" +
// 											  business?.photo?.key
// 									}
// 									alt=""
// 								/>
// 								<span>
// 									<ImagePlus className="text-slate-400" />
// 								</span>
// 								<input
// 									type="file"
// 									name="photo"
// 									id="photo"
// 									className="absolute top-0 bottom-0 opacity-0 cursor-pointer h-full w-full"
// 									onChange={handlePhotoChange}
// 								/>
// 							</div>
// 							<span className="text-red-500">{formErrors.photo}</span>
// 						</div>
// 					</div>

// 					<div className="flex items-center justify-center mt-5">
// 						<Button
// 							onClick={handleFormSubmit}
// 							className="bg-primary-color text-slate-100 "
// 						>
// 							Update
// 						</Button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default Edit;

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadToS3 } from "@/lib/s3";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";

interface FormData {
	businessName: string;
	address: string;
	email: string;
	contact: string;
	password: string;
	description: string;
	photo: File | null;
}

interface BusinessData {
	_id: string;
	businessName: string;
	address: string;
	email: string;
	contact: string;
	description: string;
	photo: { fileName: string; key: string };
}

interface EditProps {
	params: {
		id: string;
	};
}

const Edit: React.FC<EditProps> = ({ params }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const initialFormData: FormData = {
		businessName: "",
		address: "",
		email: "",
		contact: "",
		password: "",
		description: "",
		photo: null,
	};
	const [business, setBusiness] = useState<any>([]);
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [fileImage, setFileImage] = useState<File | null>(null);

	const getData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("/api/users/" + params?.id);
			const res = response.data.data;
			setBusiness(res);
			setFormData({
				businessName: res.businessName,
				address: res.address,
				email: res.email,
				contact: res.contact,
				password: "",
				description: res.description,
				photo: null,
			});
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, [params?.id]);

	const [formErrors, setFormErrors] = useState<any>({});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFileImage(file);
		}
	};

	const validateForm = () => {
		const errors: any = {};

		// Business Name
		if (!formData.businessName) {
			errors.businessName = "Name is required";
		}

		// Address
		if (!formData.address) {
			errors.address = "Address is required";
		}

		// Email
		if (!formData.email) {
			errors.email = "Email is required";
		} else if (
			!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
		) {
			errors.email = "Invalid email address";
		}

		// Contact
		if (!formData.contact) {
			errors.contact = "Business Contacts is required";
		} else if (!/^\d+$/.test(formData.contact)) {
			errors.contact = "Invalid contact number";
		}

		// Password
		if (formData.password) {
			if (formData.password.length < 6) {
				errors.password = "Password must be at least 6 characters long";
			}
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			setIsLoading(true);
			const dataToSend: any = {
				...formData,
			};

			if (fileImage) {
				const { fileName, key } = await uploadToS3(fileImage);
				dataToSend.photo = { fileName: fileName, key: key };
			}

			try {
				await axios.patch("/api/users/" + business._id, dataToSend);
				setIsLoading(false);
				toast.success("Edited Successfully");
				router.push("/admin/users");
			} catch (error) {
				console.error("Error submitting form:", error);
				setIsLoading(false);
				toast.error("Something went wrong");
			}
		}
	};

	return (
		<div className="bg-white rounded-md p-5 mb-6 max-md:p-2 mt-4">
			{isLoading && <Loader />}

			<h1 className="text-lg font-[600]">Edit Admin</h1>
			<div className="my-6">
				<form onSubmit={handleFormSubmit}>
					<div className="grid grid-cols-auto-fill-md gap-5 max-md:grid-cols-auto-fill-full">
						{/* Business Name */}
						<div className="flex flex-col">
							<label className="text-slate-500" htmlFor="businessName">
								Full Name:
							</label>
							<input
								type="text"
								name="businessName"
								id="businessName"
								placeholder="Name"
								className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
								value={formData.businessName || business.businessName}
								onChange={handleInputChange}
							/>
							<span className="text-red-500">{formErrors.businessName}</span>
						</div>

						{/* Address */}
						<div className="flex flex-col">
							<label className="text-slate-500" htmlFor="address">
								Address:
							</label>
							<input
								type="text"
								name="address"
								id="address"
								placeholder="Address"
								className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
								value={formData.address || business.address}
								onChange={handleInputChange}
							/>
							<span className="text-red-500">{formErrors.address}</span>
						</div>

						{/* Email */}
						<div className="flex flex-col">
							<label className="text-slate-500" htmlFor="email">
								Email:
							</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Email"
								className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
								value={formData.email || business.email}
								onChange={handleInputChange}
							/>
							<span className="text-red-500">{formErrors.email}</span>
						</div>

						{/* Contact */}
						<div className="flex flex-col">
							<label className="text-slate-500" htmlFor="contact">
								Contact:
							</label>
							<input
								type="number"
								name="contact"
								id="contact"
								placeholder="Contacts"
								className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
								value={formData.contact || business.contact}
								onChange={handleInputChange}
							/>
							<span className="text-red-500">{formErrors.contact}</span>
						</div>

						{/* Password */}
						<div className="flex flex-col">
							<label className="text-slate-500" htmlFor="password">
								Password:
							</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Password"
								className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
								value={formData.password}
								onChange={handleInputChange}
							/>
							<span className="text-red-500">{formErrors.password}</span>
						</div>

						{/* Photo */}
						<div className="flex flex-col justify-center">
							<label className="text-slate-500" htmlFor="photo">
								Photo:
							</label>
							<div className="relative flex items-center justify-center overflow-hidden rounded-md w-[150px] h-[100px] border-slate-300 border-2 border-dashed">
								<Image
									width={100}
									height={100}
									className="h-full w-full absolute top-0 bottom-0"
									src={
										fileImage
											? URL.createObjectURL(fileImage)
											: "https://s3-ap-south-1.amazonaws.com/sensibusiness/" +
											  business?.photo?.key
									}
									alt=""
								/>
								<span>
									<ImagePlus className="text-slate-400" />
								</span>
								<input
									type="file"
									name="photo"
									id="photo"
									className="absolute top-0 bottom-0 opacity-0 cursor-pointer h-full w-full"
									onChange={handlePhotoChange}
								/>
							</div>
							<span className="text-red-500">{formErrors.photo}</span>
						</div>
					</div>

					<div className="flex items-center justify-center mt-5">
						<Button
							onClick={handleFormSubmit}
							className="bg-primary-color text-slate-100"
						>
							Update
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Edit;
