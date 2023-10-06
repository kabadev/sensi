// "use client";
// import Loader from "@/components/ui/Loader";
// import { Button } from "@/components/ui/button";
// import { uploadToS3 } from "@/lib/s3";
// import axios from "axios";
// import { ImagePlus, Loader2 } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import toast from "react-hot-toast";

// const Add = () => {
// 	const router = useRouter();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const initialFormData = {
// 		businessName: "",
// 		address: "",
// 		email: "",
// 		contact: "",
// 		password: "",
// 		photo: null,
// 	};
// 	const [formData, setFormData] = useState(initialFormData);
// 	const [fileImage, setFileImage] = useState<File | null>(null);
// 	const [formErrors, setFormErrors] = useState({
// 		businessName: "",
// 		address: "",
// 		email: "",
// 		contact: "",
// 		password: "",
// 		photo: "",
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
// 	};

// 	const validateForm = () => {
// 		const errors: any = {};

// 		// Business Name
// 		if (!formData.businessName) {
// 			errors.businessName = " Name is required";
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
// 		if (!formData.password) {
// 			errors.password = "Password is required";
// 		} else if (formData.password.length < 6) {
// 			errors.password = "Password must be at least 6 characters long";
// 		}

// 		// Photo
// 		if (!fileImage) {
// 			errors.photo = "Photo is required";
// 		}

// 		setFormErrors(errors);
// 		return Object.keys(errors).length === 0;
// 	};

// 	const handleFormSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();

// 		if (validateForm()) {
// 			setIsLoading(true);

// 			const { fileName, key } = await uploadToS3(fileImage);

// 			const dataToSend = {
// 				...formData,
// 				photo: { fileName: fileName, key: key },
// 			};
// 			try {
// 				await axios.post("/api/users", dataToSend);

// 				setFormData(initialFormData);
// 				setIsLoading(false);
// 				toast.success("User Created Successfully");
// 				router.push("/admin/users");
// 			} catch (error: any) {
// 				setIsLoading(false);
// 				if (error.response.status === 400) {
// 					toast.error("User already exists");
// 				} else {
// 					toast.error("Something went wrong");
// 				}
// 			}
// 		}
// 	};

// 	return (
// 		<div className="bg-white rounded-md p-5 mb-6 mt-4 max-md:p-2">
// 			{isLoading && <Loader />}

// 			<h1 className="text-lg font-[600]">Add new Admin</h1>
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
// 								value={formData.businessName}
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
// 								value={formData.address}
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
// 								value={formData.email}
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
// 								value={formData.contact}
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
// 								{fileImage && (
// 									<Image
// 										width={100}
// 										height={100}
// 										className="h-full w-full absolute top-0 bottom-0"
// 										src={URL.createObjectURL(fileImage)}
// 										alt=""
// 									/>
// 								)}

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
// 							Submit
// 						</Button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default Add;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
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
	photo: File | null;
}

const Add: React.FC = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const initialFormData: FormData = {
		businessName: "",
		address: "",
		email: "",
		contact: "",
		password: "",
		photo: null,
	};
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [fileImage, setFileImage] = useState<File | null>(null);

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
		if (!formData.password) {
			errors.password = "Password is required";
		} else if (formData.password.length < 6) {
			errors.password = "Password must be at least 6 characters long";
		}

		// Photo
		if (!fileImage) {
			errors.photo = "Photo is required";
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			setIsLoading(true);

			const { fileName, key } = await uploadToS3(fileImage!);

			const dataToSend: any = {
				...formData,
				photo: { fileName, key },
			};
			try {
				await axios.post("/api/users", dataToSend);

				setFormData(initialFormData);
				setIsLoading(false);
				toast.success("User Created Successfully");
				router.push("/admin/users");
			} catch (error: any) {
				setIsLoading(false);
				if (error.response.status === 400) {
					toast.error("User already exists");
				} else {
					toast.error("Something went wrong");
				}
			}
		}
	};

	return (
		<div className="bg-white rounded-md p-5 mb-6 mt-4 max-md:p-2">
			{isLoading && <Loader />}

			<h1 className="text-lg font-[600]">Add new Admin</h1>
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
								value={formData.businessName}
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
								value={formData.address}
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
								value={formData.email}
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
								value={formData.contact}
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
								{fileImage && (
									<Image
										width={100}
										height={100}
										className="h-full w-full absolute top-0 bottom-0"
										src={URL.createObjectURL(fileImage)}
										alt=""
									/>
								)}

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
							className="bg-primary-color text-slate-100 "
						>
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Add;
