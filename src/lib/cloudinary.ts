import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.warn("Cloudinary environment variables are missing! Uploads will fail.");
}

cloudinary.config({
    cloud_name: (process.env.CLOUDINARY_CLOUD_NAME || "").trim(),
    api_key: (process.env.CLOUDINARY_API_KEY || "").trim(),
    api_secret: (process.env.CLOUDINARY_API_SECRET || "").trim(),
    secure: true,
});

export default cloudinary;

export async function uploadToCloudinary(
    fileBuffer: Buffer,
    fileName: string,
    folder: string = 'engineer_uploads'
): Promise<{ url: string; public_id: string }> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return reject(error);
                }
                if (!result) {
                    return reject(new Error('Cloudinary upload failed: No result'));
                }
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        );

        uploadStream.end(fileBuffer);
    });
}
