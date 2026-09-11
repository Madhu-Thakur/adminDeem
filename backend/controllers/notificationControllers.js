const {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
} = require("../models/notificationModel");

// Add Notification
const addNotification = async (req, res) => {
  try {
    const { title, notify, role, status } = req.body;

    if (!title || !notify || !role) {
      return res.status(400).json({
        success: false,
        message: "Title, notify and role are required",
      });
    }

    const notificationId = await createNotification(
      title,
      notify,
      role,
      status ?? 1,
    );

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      id: notificationId,
    });
  } catch (error) {
    console.error("Add Notification Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create notification",
    });
  }
};

// Get All Notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await getAllNotifications();

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

// Get Notification By ID
const getNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await getNotificationById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error("Get Notification Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notification",
    });
  }
};

// Update Notification
const editNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, notify, role, status } = req.body;

    if (!title || !notify || !role) {
      return res.status(400).json({
        success: false,
        message: "Title, notify and role are required",
      });
    }

    const existingNotification = await getNotificationById(id);

    if (!existingNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await updateNotification(
      id,
      title,
      notify,
      role,
      status ?? existingNotification.status,
    );

    res.status(200).json({
      success: true,
      message: "Notification updated successfully",
    });
  } catch (error) {
    console.error("Update Notification Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

// Delete Notification
const removeNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const existingNotification = await getNotificationById(id);

    if (!existingNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await deleteNotification(id);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete Notification Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete notification",
    });
  }
};

module.exports = {
  addNotification,
  getNotifications,
  getNotification,
  editNotification,
  removeNotification,
};