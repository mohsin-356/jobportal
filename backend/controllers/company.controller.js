import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }
    const existingCompany = await Company.findOne({ name: companyName });
    if (existingCompany) {
      return res
        .status(400)
        .json({ message: "Company already exists", success: false });
    }
    const company = await Company.create({ name: companyName, userId: req.id });
    return res.status(201).json({
      message: "Company registered successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error registering company:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies || companies.length === 0) {
      return res
        .status(404)
        .json({ message: "No companies found", success: false });
    }
    return res.status(200).json({
      message: "Companies retrieved successfully",
      success: true,
      companies,
    });
  } catch (error) {
    console.error("Error retrieving companies:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    if (!companyId) {
      return res
        .status(400)
        .json({ message: "Company ID is required", success: false });
    }
    const company = await Company.findOne({_id:companyId});
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({
      message: "Company retrieved successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error retrieving company by ID:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
// export const updateCompany = async (req, res) => {
//   const { name, description, website, location } = req.body;
//   const file = req.file;

//     const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//         const logo = cloudResponse.secure_url;
//   try {
//     const companyId = req.params.id;
//     if (!companyId) {
//       return res
//         .status(400)
//         .json({ message: "Company ID is required", success: false });
//     }
//     const updateFields = { name, description, website, location,logo };

//     const updatedCompany = await Company.findByIdAndUpdate(
//       companyId,
//       updateFields,
//       { new: true, runValidators: true }
//     );
//     if (!updatedCompany) {
//       return res
//         .status(404)
//         .json({ message: "Company not found", success: false });
//     }
//     return res.status(200).json({
//       message: "Company updated successfully",
//       success: true,
//       company: updatedCompany,
//     });
//   } catch (error) {
//     console.error("Error updating company:", error);
//     return res
//       .status(500)
//       .json({ message: "Internal server error", success: false });
//   }
// };

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}