import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log("Registering user:", req.body);
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    let userExists = await User.findOne({ email });
    if (!userExists) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, userExists.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    //check if user is admin or user
    if (role !== userExists.role) {
      return res.status(403).json({ message: "Access denied", success: false });
    }
    const tokenData = {
      userId: userExists._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    //update user last login time
    userExists = {
      _id: userExists._id,
      fullname: userExists.fullname,
      email: userExists.email,
      phoneNumber: userExists.phoneNumber,
      role: userExists.role,
      profile: userExists.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        sameSite: "strict", // Helps prevent CSRF attacks
      })
      .json({ message: "login successful", success: true });
  } catch (error) {
    console.error("Errzor during login:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;
    const skillsArray = skills?.split(",").map((skill) => skill.trim()) || [];
    const updateFields = {
      fullname,
      email,
      phoneNumber,
      "profile.bio": bio,
      "profile.skills": skillsArray,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: updatedUser._id,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        profile: updatedUser.profile,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
//obselete code for updateProfile, kept for reference
// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     if (!fullname || !email || !phoneNumber || !bio || !skills)
//     {
//       return res.status(400).json({ message: "All fields are required", success: false });
//     }
//     //cloudinary upload logic would be here

//     const skillsArray = skills.split(",").map(skill => skill.trim());
//     const userId= req.id; // Assuming userId is set in the request by middleware
//     let userExists = await User.findById(userId);
//     if (!userExists)
//     {
//       return res.status(404).json({ message: "User not found", success: false });
//     }
//     //updating data
//     userExists.fullname = fullname;
//     userExists.email = email;
//     userExists.phoneNumber = phoneNumber;
//     userExists.profile.bio = bio;
//     userExists.profile.skills = skillsArray;
//     //resume comes here later
//     await userExists.save();
//     return res.status(200).json({
//       message: "Profile updated successfully",
//       success: true,
//       user: {
//         _id: userExists._id,
//         fullname: userExists.fullname,
//         email: userExists.email,
//         phoneNumber: userExists.phoneNumber,
//         profile: userExists.profile,
//       },
//     });

//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return res.status(500).json({ message: "Internal server error", success: false });
//   }
// };
