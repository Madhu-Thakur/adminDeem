const db = require("../config/db");

// Create Announcement
const createAnnouncement = async (type, announce, role, status) => {
  const [result] = await db.query(
    `INSERT INTO announcement (type, announce, role, status)
     VALUES (?, ?, ?, ?)`,
    [type, announce, role, status],
  );

  return result.insertId;
};

// Get All Announcements
const getAllAnnouncements = async () => {
  const [rows] = await db.query(
    `SELECT id, type, announce, role, status
     FROM announcement
     ORDER BY id DESC`,
  );

  return rows;
};

// Get Announcement By ID
const getAnnouncementById = async (id) => {
  const [rows] = await db.query(
    `SELECT id, type, announce, role, status
     FROM announcement
     WHERE id = ?`,
    [id],
  );

  return rows[0];
};

// Update Announcement
const updateAnnouncement = async (
  id,
  type,
  announce,
  role,
  status,
) => {
  const [result] = await db.query(
    `UPDATE announcement
     SET type = ?, announce = ?, role = ?, status = ?
     WHERE id = ?`,
    [type, announce, role, status, id],
  );

  return result;
};

// Delete Announcement
const deleteAnnouncement = async (id) => {
  const [result] = await db.query(
    `DELETE FROM announcement
     WHERE id = ?`,
    [id],
  );

  return result;
};

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
};