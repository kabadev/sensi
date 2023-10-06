import mongoose from "mongoose";
import { Document, Types } from "mongoose";
interface FinrequestSchema {
	purpose: string;
	amount: number;
	supplier: string;
	requestType: string;
	typeName: string;
	note: string;
	documents: {
		id: number;
		documentName: string;
		fileName: string;
		key: string;
	}[];
	status: "pending" | "rejected" | "approved";
	dateOfRequest: Date;
	dateOfApproval?: Date;
	dateOfRejected?: Date;
	feedback?: string;
	paid: boolean;
	business: Types.ObjectId; // Reference to BusinessModel
}

const finrequestSchema = new mongoose.Schema({
	business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
	purpose: { type: String, required: true },
	amount: { type: Number, required: true },
	supplier: { type: String, required: true },
	requestType: { type: String, required: true },
	typeName: { type: String, required: true },
	note: { type: String, required: true },
	documents: [
		{
			id: { type: Number, required: true },
			documentName: { type: String, required: true },
			fileName: { type: String, required: true },
			key: { type: String, required: true },
		},
	],
	status: {
		type: String,
		enum: ["pending", "rejected", "approved"],
		default: "pending",
	},
	dateOfRequest: { type: Date, default: Date.now },
	dateOfStatus: { type: Date },
	feedback: { type: String },
	paid: { type: Boolean, default: false },
});

const FinrequestModel =
	mongoose.models.finrequest || mongoose.model("finrequest", finrequestSchema);

export default FinrequestModel;

// Function to add a new financial request
export const addFinrequest = (requestData: any): Promise<any> => {
	const newFinrequest = new FinrequestModel(requestData);
	return newFinrequest.save();
};

// Fetch all financial requests
export const getAllFinrequests = (): Promise<any[]> => {
	return FinrequestModel.find().populate("business").exec();
};

// Fetch a financial request by its ID
export const getFinrequestById = (id: string): Promise<any> => {
	return FinrequestModel.findById(id).populate("business").exec();
};
export const getFinrequestsByUser = (business: string): Promise<Document[]> => {
	return FinrequestModel.find({ business }).exec();
};
// Fetch only approved financial requests
export const getApprovedFinrequests = (): Promise<any[]> => {
	return FinrequestModel.find({ status: "approved" })
		.populate("business", "name")
		.exec();
};

// Fetch the last financial request
export const getLastFinrequest = (): Promise<Document | null> => {
	return FinrequestModel.findOne()
		.sort({ dateOfRequest: -1 })
		.populate("business")
		.exec();
};

// Update the status of a financial request by ID
export const updateStatusById = (
	id: string,
	newStatus: string
): Promise<Document | null> => {
	return FinrequestModel.findByIdAndUpdate(id, { status: newStatus }).exec();
};

// Update the paid status of a financial request by ID
export const updatePaidStatusById = (
	id: string,
	isPaid: boolean
): Promise<Document | null> => {
	return FinrequestModel.findByIdAndUpdate(id, { paid: isPaid }).exec();
};

// Delete a financial request by ID
export const deleteFinrequestById = (id: string): Promise<any | null> => {
	return FinrequestModel.findByIdAndDelete(id).exec();
};
