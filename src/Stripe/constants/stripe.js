const PAYMENT_SERVER_URL = process.env.NODE_ENV === "production" ? "http://localhost:8100" : "http://myapidomain.com";

export default PAYMENT_SERVER_URL;
