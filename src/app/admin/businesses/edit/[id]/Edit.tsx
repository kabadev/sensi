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

// const EditB = ({ params }: { params: { id: string } }) => {
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
// 			const response = await axios.get("/api/businesses/" + params?.id);
// 			const res = response.data.data;
// 			setBusiness(res);
// 			setFormData({
// 				businessName: res.businessName,
// 				address: res.address,
// 				email: res.email,
// 				contact: res.contact,
// 				password: "",
// 				description: res.description,
// 				photo: {},
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
// 	const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
// 		const { value } = e.target;
// 		setFormData({ ...formData, description: value });
// 	};

// 	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const file = e.target.files?.[0];
// 		if (file) setFileImage(file);
// 	};

// 	const validateForm = () => {
// 		const errors: any = {};

// 		// Business Name
// 		if (!formData.businessName) {
// 			errors.businessName = "Business Name is required";
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

// 		// Business Description
// 		if (!formData.description) {
// 			errors.description = "Business Description is required";
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
// 					"/api/businesses/" + business._id,
// 					dataToSend
// 				);
// 				getData();
// 				setIsLoading(false);
// 				toast.success("Edited Succcessfully");
// 				router.push("/admin/businesses");
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

// 			<h1 className="text-lg font-[600]">Edit Business</h1>
// 			<div className="my-6">
// 				<form onSubmit={handleFormSubmit}>
// 					<div className="grid grid-cols-auto-fill-md gap-5 max-md:grid-cols-auto-fill-full">
// 						{/* Business Name */}
// 						<div className="flex flex-col">
// 							<label className="text-slate-500" htmlFor="businessName">
// 								Business Name:
// 							</label>
// 							<input
// 								type="text"
// 								name="businessName"
// 								id="businessName"
// 								placeholder="Business Name"
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
// 								placeholder="Business Contacts"
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
// 									height={100}
// 									width={100}
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
// 					<div className="mt-10">
// 						<label className="text-slate-500" htmlFor="description">
// 							Business Description :
// 						</label>
// 						<textarea
// 							name="description"
// 							id="description"
// 							value={formData.description || business.description}
// 							onChange={handleTextareaChange}
// 							className="min-h-[200px] text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
// 						></textarea>
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

// export default EditB;
"use client";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { uploadToS3 } from "@/lib/s3";
import axios from "axios";
import { ImagePlus, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface BusinessData {
	businessName: string;
	address: string;
	email: string;
	contact: string;
	password: string;
	description: string;
	photo: { fileName: string; key: string };
	_id: string;
}

interface FormErrors {
	businessName: string;
	address: string;
	email: string;
	contact: string;
	password: string;
	photo: string;
	description: string;
}

const EditB: React.FC<{ params: { id: string } }> = ({ params }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const initialFormData: BusinessData = {
		businessName: "",
		address: "",
		email: "",
		contact: "",
		password: "",
		description: "",
		_id: "",
		photo: { fileName: "", key: "" },
	};
	const [business, setBusiness] = useState<BusinessData>({
		...initialFormData,
	});
	const [formData, setFormData] = useState<BusinessData>({
		...initialFormData,
	});
	const [fileImage, setFileImage] = useState<File | null>(null);

	const getData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(`/api/businesses/${params?.id}`);
			const res = response.data.data as BusinessData;
			setBusiness(res);
			setFormData({
				businessName: res.businessName,
				address: res.address,
				email: res.email,
				contact: res.contact,
				password: "",
				_id: res._id,
				description: res.description,
				photo: { fileName: res.photo.fileName, key: res.photo.key },
			});
			setIsLoading(false);
		} catch (error) {
			console.error("Error submitting form:", error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, [params?.id]);

	const [formErrors, setFormErrors] = useState<FormErrors>({
		businessName: "",
		address: "",
		email: "",
		contact: "",
		password: "",
		photo: "",
		description: "",
	});

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setFormData({ ...formData, description: value });
	};

	const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) setFileImage(file);
	};

	const validateForm = () => {
		const errors: any = {};

		// Business Name
		if (!formData.businessName) {
			errors.businessName = "Business Name is required";
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

		// Business Description
		if (!formData.description) {
			errors.description = "Business Description is required";
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			setIsLoading(true);
			const dataToSend = { ...formData };

			if (fileImage) {
				const { fileName, key } = await uploadToS3(fileImage);
				dataToSend.photo = { fileName: fileName, key: key };
			}

			try {
				const response = await axios.patch(
					`/api/businesses/${business._id}`,
					dataToSend
				);
				getData();
				setIsLoading(false);
				toast.success("Edited Successfully");
				router.push("/admin/businesses");
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

			<h1 className="text-lg font-[600]">Edit Business</h1>
			<div className="my-6">
				<form onSubmit={handleFormSubmit}>
					<div className="grid grid-cols-auto-fill-md gap-5 max-md:grid-cols-auto-fill-full">
						{/* Business Name */}
						<div className="flex flex-col">
							<label className="text-slate-500" htmlFor="businessName">
								Business Name:
							</label>
							<input
								type="text"
								name="businessName"
								id="businessName"
								placeholder="Business Name"
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
								placeholder="Business Contacts"
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
									height={100}
									width={100}
									className="h-full w-full absolute top-0 bottom-0"
									src={
										fileImage
											? URL.createObjectURL(fileImage)
											: `https://s3-ap-south-1.amazonaws.com/sensibusiness/${business?.photo?.key}`
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
					<div className="mt-10">
						<label className="text-slate-500" htmlFor="description">
							Business Description:
						</label>
						<textarea
							name="description"
							id="description"
							value={formData.description || business.description}
							onChange={handleTextareaChange}
							className="min-h-[200px] text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
						></textarea>
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

export default EditB;
