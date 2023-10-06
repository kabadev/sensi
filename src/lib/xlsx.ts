import xlsx, { IJsonSheet } from "json-as-xlsx";

export function downloadToExcel(data: any) {
	let columns: IJsonSheet[] = [
		{
			sheet: "Financial requests",
			columns: [
				{ label: "Business Name", value: "business" },
				{ label: "Business email", value: "business_email" },
				{ label: "Business mobile", value: "business_mobile" },
				{ label: "Purpose", value: "purpose" },
				{ label: "Amount", value: "amount" },
				{ label: "status", value: "status" },
				{ label: "Date", value: "date" },
				// {
				// 	label: "Date of Birth",
				// 	value: (row) => new Date(row.date_of_birth).toLocaleDateString(),
				// },
			],
			content: data,
		},
	];

	let settings = {
		fileName: "Financial requests",
	};

	xlsx(columns, settings);
}
