const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../models/announcementModel");

// Add Announcement
const addAnnouncement = async (req, res) => {
  try {
    const { type, announce, role, status } = req.body;

    if (!type || !announce || !role) {
      return res.status(400).json({
        success: false,
        message: "Type, announce and role are required",
      });
    }

    const announcementId = await createAnnouncement(
      type,
      announce,
      role,
      status ?? 1,
    );

    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      id: announcementId,
    });
  } catch (error) {
    console.error("Add Announcement Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create announcement",
    });
  }
};

// Get All Announcements
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await getAllAnnouncements();

    res.status(200).json({
      success: true,
      data: announcements,
    });
  } catch (error) {
    console.error("Get Announcements Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch announcements",
    });
  }
};

// Get Announcement By ID
const getAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await getAnnouncementById(id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    console.error("Get Announcement Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch announcement",
    });
  }
};

// Update Announcement
const editAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, announce, role, status } = req.body;

    if (!type || !announce || !role) {
      return res.status(400).json({
        success: false,
        message: "Type, announce and role are required",
      });
    }

    const existingAnnouncement = await getAnnouncementById(id);

    if (!existingAnnouncement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    await updateAnnouncement(
      id,
      type,
      announce,
      role,
      status ?? existingAnnouncement.status,
    );

    res.status(200).json({
      success: true,
      message: "Announcement updated successfully",
    });
  } catch (error) {
    console.error("Update Announcement Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update announcement",
    });
  }
};

// Delete Announcement
const removeAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAnnouncement = await getAnnouncementById(id);

    if (!existingAnnouncement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    await deleteAnnouncement(id);

    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.error("Delete Announcement Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete announcement",
    });
  }
};

module.exports = {
  addAnnouncement,
  getAnnouncements,
  getAnnouncement,
  editAnnouncement,
  removeAnnouncement,
};