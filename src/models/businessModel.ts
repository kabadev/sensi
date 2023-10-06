import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
	businessName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	contact: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: { type: Boolean, default: false },
	description: {
		type: String,
	},
	photo: {
		fileName: {
			type: String,
		},
		key: {
			type: String,
		},
	},
});

const Business =
	mongoose.models.Business || mongoose.model("Business", businessSchema);

export default Business;

// User Actions
export const getBusinesses = () => Business.find({ isAdmin: false });
export const getBusinessById = (id: string) => Business.findById(id);

export const getBusinessByEmail = (email: string) =>
	Business.findOne({ email });
export const getAdmin = () => Business.find({ isAdmin: true });

export const deleteBusinessById = (id: string) =>
	Business.findOneAndDelete({ _id: id });
