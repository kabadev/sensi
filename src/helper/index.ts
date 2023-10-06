export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const options = {
		timeZone: "Africa/Freetown",
	};
	const formattedDate = {
		year: date.toLocaleDateString(undefined, { year: "numeric", ...options }),
		month: date.toLocaleDateString(undefined, { month: "long", ...options }),
		day: date.toLocaleDateString(undefined, { day: "numeric", ...options }),
	};

	return `${formattedDate.month} ${formattedDate.day}, ${formattedDate.year}`;
};
