 const db = require("../config/db");

const createCustomer = async (customerData) => {
  const {
    customer_name,
    company_name,
    phone,
    email,
    status,
  } = customerData;

  const [result] = await db.execute(
    `
      INSERT INTO customers
      (
        customer_name,
        company_name,
        phone,
        email,
        status
      )
      VALUES (?, ?, ?, ?, ?)
    `,
    [
      customer_name,
      company_name || null,
      phone || null,
      email || null,
      Number(status ?? 1),
    ],
  );

  return result.insertId;
};

// Get All Customers
const getAllCustomers = async () => {
  const [rows] = await db.execute(
    `
      SELECT
        id,
        customer_name,
        company_name,
        email,
        phone,
        status,
        created_at
      FROM customers
      ORDER BY id DESC
    `,
  );

  return rows;
};

// Get Customer By ID
const getCustomerById = async (id) => {
  const [rows] = await db.execute(
    `
      SELECT
        id,
        customer_name,
        company_name,
        email,
        phone,
        status,
        created_at
      FROM customers
      WHERE id = ?
    `,
    [id],
  );

  return rows[0];
};

// Update Customer
const updateCustomer = async (id, customerData) => {
  const {
    customer_name,
    company_name,
    phone,
    email,
    status,
  } = customerData;

  const [result] = await db.execute(
    `
      UPDATE customers
      SET
        customer_name = ?,
        company_name = ?,
        phone = ?,
        email = ?,
        status = ?
      WHERE id = ?
    `,
    [
      customer_name,
      company_name || null,
      phone || null,
      email || null,
      Number(status ?? 1),
      id,
    ],
  );

  return result;
};

// Delete Customer
const deleteCustomer = async (id) => {
  const [result] = await db.execute(
    `
      DELETE FROM customers
      WHERE id = ?
    `,
    [id],
  );

  return result;
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
