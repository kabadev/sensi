import axios from "axios";

export const handleLogout = async () => {
	try {
		await axios.post("/api/logout");
		window.location.href = "/login";
	} catch (error) {
		console.log(error);
	}
};
