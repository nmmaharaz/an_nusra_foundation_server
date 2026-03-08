import dotenv from "dotenv";
dotenv.config()

const envVars = {
    port: process.env.PORT as string,
    nodeEnv: process.env.NODE_ENV as string,
    databaseUrl: process.env.DATABASE_URL as string
};

export default envVars;