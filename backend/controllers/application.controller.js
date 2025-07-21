import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    console.log("actual request:", req.body);
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job ID is required", success: false });
    }
    //check if user has already applied for this job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }
    // check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    // create application
    const application = await Application.create({
      job: jobId,
      applicant: userId,
    });
    // add application to job
    job.applications.push(application._id);
    await job.save();
    return res.status(201).json({
      message: "Application submitted successfully",
      success: true,
      application,
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required", success: false });
    }
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        $options: {
          sort: { createdAt: -1 },
        },
        populate: {
          path: "company",
          $options: {
            sort: { createdAt: -1 },
          },
        },
      });
    if (!applications) {
      return res.status(404).json({
        message: "No applications found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Applied jobs retrieved successfully",
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job ID is required", success: false });
    }
    // Check if job exists
    const job = await Job.findById(jobId).populate({
      path: "applications",
      $options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({
      message: "Applicants retrieved successfully",
      success: true,
      applicants: job.applications,
    });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res
        .status(400)
        .json({ message: "Invalid status", success: false });
    }
    const applicationId = req.params.id;
    if (!applicationId) {
      return res
        .status(400)
        .json({ message: "Application ID is required", success: false });
    }
    // Check if application exists
    const application = await Application.findById(applicationId);
    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found", success: false });
    }
    // Update application status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Application status updated successfully",
      success: true,
      application,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
