import dotenv from "dotenv";
dotenv.config()

const envVars = {
    port: process.env.PORT as string,
    nodeEnv: process.env.NODE_ENV as string,
    databaseUrl: process.env.DATABASE_URL as string,
    cloudinary: {
        cloud_name: process.env.CLOUD_NAME as string,
        api_key: process.env.API_KEY as string,
        api_secret: process.env.API_SECRET as string,
    }
};

export default envVars;