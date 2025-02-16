import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from "../../models/usersModel.js";
import transporter from "../../config/nodemailer.js";

export const register = async function (req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "missing required fields" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User Alrady exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedpassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // NOTE: SENDING THE WELCOM EMAIL
    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to our website!",
      text: `Hello ${name}, Thank you for registering with us. your account has been created with email id ${email}`,
    };

    await transporter.sendMail(emailOptions);
    res.json({ success: true });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const login = async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email And password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found, Please register first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "the password you entered is incorrect",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const logout = async function (req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const sendOtpCode = async function (req, res) {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      res.json({ success: false, message: "user Already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Welcome to our website!",
      text: `Hello your OTP IS ${otp} verify your account with this otp number`,
    };
    await transporter.sendMail(emailOptions);

    res.json({ success: true, message: "verification opt sent successfull" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const verifyOtp = async function (req, res) {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({ success: false, message: "missing required details" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp == "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid Otp" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Otp code expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.json({ success: true, message: "User verified successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};

export const isAuthenticated = async function (req, res) {
  try {
    return res.json({ success: true, message: "User is authenticated" });
  } catch (error) {
    return res.json({ success: false, message: "user need to authenticate" });
  }
};

// NOTE: SEND PASSWORD TO REST OTP
export const resetOtp = async function (req, res) {
  // email part
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "email is required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "user not found with this email address",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password rest otp",
      text: `To reset your password use this password ${otp}`,
    };
    await transporter.sendMail(emailOptions);
    return res.json({
      success: true,
      message: "otp reset code sent successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};

//NOTE: RESET USER PASSWORD
export const resetPassword = async function (req, res) {
  const { email, otp, newpassword } = req.body;
  if (!email || !otp || !newpassword) {
    return res.json({ success: false, message: "missing required fields" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "there is no user with this email address",
      });
    }

    if (user.resetotp === "" || user.resetOtp !== otp) {
      console.log(user.resetOtp, otp);
      return res.json({
        success: false,
        message: "invalid otp to reset",
      });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "the otp period is expired" });
    }

    const hashedpassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedpassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();
    return res.json({
      success: true,
      message: "password updated successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};
