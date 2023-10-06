import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
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

	photo: {
		fileName: {
			type: String,
		},
		key: {
			type: String,
		},
	},
});

const User = mongoose.models.business || mongoose.model("user", userSchema);

export default User;

// User Actions
export const getUsers = () => User.find();
export const getUserById = (id: string) => User.findById(id);

export const getUserByEmail = (email: string) => User.findOne({ email });

export const deleteUserById = (id: string) =>
	User.findOneAndDelete({ _id: id });
