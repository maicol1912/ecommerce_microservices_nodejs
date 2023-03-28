import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'prod'){
    const configFile = `./.env.${process.env.NODE_ENV}`
    dotenv.config({path:configFile})
}

export const configDb = {
    PORT:process.env.PORT,
    DB_URL: process.env.MONGODB_URI, 
    APP_SECRET: process.env.APP_SECRET
} 