const { getAllRoles } = require("../models/roleModel");
 
const getRoles = async (req, res) => {
  try {
    const roles = await getAllRoles();

    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    console.error("Get Roles Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch roles",
    });
  }
};

module.exports = {
  getRoles,
};