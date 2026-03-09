import { v2 as cloudinary } from 'cloudinary';
import envVars from './env';

cloudinary.config({
    cloud_name: envVars.cloudinary.cloud_name,
    api_key: envVars.cloudinary.api_key,
    api_secret: envVars.cloudinary.api_secret
});

export const cloudinaryUpload = cloudinary