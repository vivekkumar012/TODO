import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";

export const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
    // expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)  // 10 days expiry time
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  await userModel.findByIdAndUpdate(userId, { token });
  return token;
};