import dotenv from "dotenv"

if (process.env.NODE_ENV != 'prod') {
    dotenv.config({ path: '.env.dev' });
}
else {
    dotenv.config({ path: `.env.prod` });
}

export const PORT= process.env.PORT || '3001'
export const MONGO_DB_URI = process.env.MONGO_DB_URI || ''
export const APP_SECRET= process.env.APP_SECRET || ''
export const EXCHANGE_NAME= process.env.EXCHANGE_NAME || ''
export const MSG_QUEUE_URL= process.env.MSG_QUEUE_URL || ''
export const CUSTOMER_SERVICE= "customer_service" || ''
export const SHOPPING_SERVICE= "shopping_service" || ''