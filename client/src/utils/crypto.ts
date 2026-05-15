import CryptoJS from "crypto-js";

const FRONTEND_SECRET_KEY = "frontend_secret_123";

export const encryptFrontend = (data: string): string => {
  return CryptoJS.AES.encrypt(data, FRONTEND_SECRET_KEY).toString();
};

export const decryptFrontend = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, FRONTEND_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const encryptStudentFields = (student: any) => ({
  fullName: encryptFrontend(student.fullName),
  email: encryptFrontend(student.email),
  phoneNumber: encryptFrontend(student.phoneNumber || ""),
  dateOfBirth: encryptFrontend(student.dateOfBirth || ""),
  gender: encryptFrontend(student.gender || ""),
  address: encryptFrontend(student.address || ""),
  courseEnrolled: encryptFrontend(student.courseEnrolled || ""),
  password: encryptFrontend(student.password),
});

export const decryptStudentFields = (student: any) => ({
  _id: student._id,
  fullName: decryptFrontend(student.fullName),
  email: decryptFrontend(student.email),
  phoneNumber: decryptFrontend(student.phoneNumber || ""),
  dateOfBirth: decryptFrontend(student.dateOfBirth || ""),
  gender: decryptFrontend(student.gender || ""),
  address: decryptFrontend(student.address || ""),
  courseEnrolled: decryptFrontend(student.courseEnrolled || ""),
  password: decryptFrontend(student.password),
});