import * as AWS from "aws-sdk";

export async function uploadToS3(file: File) {
	try {
		AWS.config.update({
			accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
			secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
			region: "ap-south-1",
		});
		const s3 = new AWS.S3();

		const fileKey =
			"uploads/" + Date.now().toString() + file.name.replace(/ /g, "-");

		const params: AWS.S3.PutObjectRequest = {
			Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
			Key: fileKey,
			Body: file,
		};

		const data = await s3.upload(params).promise(); // Use promise to wait for upload completion

		console.log("File uploaded successfully. ETag:", data.ETag);
		return { fileName: file.name, key: fileKey };
	} catch (error) {
		console.error("Error uploading file:", error);
		throw error;
	}
}
export async function deleteS3File(file: string) {
	try {
		AWS.config.update({
			accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
			secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
			region: "ap-south-1",
		});
		const s3 = new AWS.S3();

		const params: AWS.S3.PutObjectRequest = {
			Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
			Key: file,
		};

		await s3.deleteObject(params).promise(); // Use promise to wait for upload completion

		console.log("File Deleted successfully. ");
	} catch (error) {
		console.error("Error uploading file:", error);
		throw error;
	}
}
