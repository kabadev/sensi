"use client";
import Loader from "@/components/ui/Loader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await axios.post("/api/login", {
				email: email,
				password: password,
			});
			toast.success(res.data.message);
			setIsLoading(false);
			if (res.data.data.isAdmin) {
				router.push("/admin");
			} else {
				router.push("/");
			}
		} catch (error: any) {
			if (error.response.status === 400) {
				toast.error("incorrect email or password");
				setIsLoading(false);
			} else {
				toast.error("Something went wrong please try again");
				setIsLoading(false);
			}
		}
	};
	return (
		<div className="flex h-screen items-center max-md:flex-col">
			{isLoading && <Loader />}
			<div className="w-[50%] max-md:w-[95%]  max-md: order-2 max-md:h-screen max-md:mt-[-70px]">
				<form className="bg-white p-[50px]  max-md:w-full max-md:p-[20px]  max-md:rounded-t-[20px] max-md:h-full ">
					<h1 className="text-xl font-bold text-center mb-4">
						Login to Your Account
					</h1>

					<div className="flex flex-col gap-4 w-[60%] m-auto max-md:w-[100%]">
						<div className="flex flex-col">
							<label className="text-slate-500" htmlFor="purpose">
								Email:
							</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Email.. "
								className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col">
							<label className="text-slate-500" htmlFor="password">
								Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Password "
								className="text-sm outline-none placeholder:text-sm p-2 border-slate-300 rounded-sm w-full border"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div className=" flex items-center justify-center mt-6 ">
						<button
							onClick={handleLogin}
							className={` bg-primary-color hover:bg-primary-color-darkest text-white px-6 py-2 `}
						>
							Login
						</button>
					</div>
				</form>
			</div>
			<div className=" flex flex-col  items-center justify-center w-[50%] bg-gradient-to-r from-primary-color-light to-primary-color-darkest h-full rounded-l-[20px] max-md:w-full max-md:h-[200px] max-md:rounded-l-[0px] max-md:justify-start max-md:pt-[30px] max-md:bg-primary-color max-md:from-primary-color ">
				<h1 className="text-3xl font-bold text-white">Welcom back</h1>
				<p className="text-white">Sensi Business Partner</p>
			</div>
		</div>
	);
}
