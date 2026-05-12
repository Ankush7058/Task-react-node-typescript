import CryptoJS from "crypto-js";

const BACKEND_SECRET_KEY = process.env.BACKEND_SECRET_KEY || "backend_secret_123";

export const encryptBackend = (data: string): string => {
  return CryptoJS.AES.encrypt(data, BACKEND_SECRET_KEY).toString();
};

export const decryptBackend = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, BACKEND_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};