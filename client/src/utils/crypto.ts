import CryptoJS from "crypto-js";

const FRONTEND_SECRET_KEY = "frontend_secret_123";

export const encryptFrontend = (data: object): string => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    FRONTEND_SECRET_KEY
  ).toString();
};

export const decryptFrontend = (encryptedData: string): any => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, FRONTEND_SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};