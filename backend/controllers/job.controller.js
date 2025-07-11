import { Job } from "../models/job.model.js";
export const postJob = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.id", req.id);
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = req.body;

    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel || // <-- yeh line theek karni thi
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel, // <-- yeh bhi theek ab
      position,
      company: companyId,
      created_by: userId,
    });
    return res
      .status(201)
      .json({ message: "Job posted successfully", success: true, job });
  } catch (error) {
    console.error("Error posting job:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const keywords = req.query.keywords || "";
    const query = {
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Jobs retrieved successfully", success: true, jobs });
  } catch (error) {
    console.error("Error retrieving jobs:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
// student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};
// admin kitne job create ki hain abhi tak
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
