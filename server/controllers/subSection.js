const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
const Course = require("../models/Course");

exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, description } = req.body;
        const video = req.files?.videoFile;
            // console.log(111111);
        // Validation
        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                missingFields: {
                    sectionId: !sectionId,
                    title: !title,
                    description: !description,
                    video: !video
                }
            });
        }

        // Upload video to Cloudinary
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME || "CourseVideos"
        );
        // console.log(2222);
        // Create new subsection
        // console.log("uploadDetails.duration",uploadDetails.duration);
        const newSubSection = await SubSection.create({
            title,
            timeDuration: `00:${Math.round(uploadDetails.duration)}` || "0:00",
            description,
            videoUrl: uploadDetails.secure_url,
        });

        // console.log(33333);


        // Update section with new subsection reference
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: newSubSection._id } },
            { new: true }
        ).populate("subSection").exec();

        // Find the course containing this section
        // console.log(44444);

        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            data: updatedSection
        });

    } catch (error) {
        console.error("Error creating subsection:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create subsection",
            error: error.message,
        });
    }
};

exports.updateSubSection = async (req, res) => {
    try {
        //data input

        const { title, subSectionId, videoUrl, sectionId, description } = req.body;

    //    console.log(title)

        //data validation
        if (!title || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "missing Properties",
            });
        }
        //update data
        const subSection = await SubSection.findById(subSectionId)

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        if (title !== undefined) {
            subSection.title = title
        }

        if (description !== undefined) {
            subSection.description = description
        }

        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save()


        const updatedSection = await Section.findById(sectionId).populate("subSection")

        //return response;

        return res.status(200).json({
            success: true,
            message: "SubSection Updated successfully.",
            data: updatedSection
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to update Subsection, please try again",
            error: error.message,
        });
    }
}



exports.deleteSubSection = async (req, res) => {
    try {
        //get id
        const { subSectionId, sectionId } = req.body;
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )

        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

        if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSection")
  
        return res.status(200).json({
            success: true,
            data:updatedSection,
            message: "Sub-section Deleted successfully.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to Delete Sub-section, please try again",
            error: error.message,
        });
    }
}