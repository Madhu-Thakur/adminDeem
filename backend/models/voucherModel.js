const db = require("../config/db");

const createVoucher = async (voucherData) => {
  const {
    voucher_type,
    transaction_number,
    transaction_date,
    transaction_type,
    invoice_id,
    customer_id,
    amount,
    cgst,
    sgst,
    igst,
    narration,
  } = voucherData;

  const [result] = await db.execute(
    `
      INSERT INTO vouchers
      (
        voucher_type,
        transaction_number,
        transaction_date,
        transaction_type,
        invoice_id,
        customer_id,
        amount,
        cgst,
        sgst,
        igst,
        narration
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      voucher_type,
      transaction_number || "",
      transaction_date,
      transaction_type,
      invoice_id || null,
      customer_id || null,
      Number(amount) || 0,
      Number(cgst) || 0,
      Number(sgst) || 0,
      Number(igst) || 0,
      narration || null,
    ],
  );

  return result.insertId;
};

const getAllVouchers = async () => {
  const [rows] = await db.execute(
    `
      SELECT
        v.id,
        v.voucher_type,
        v.serial_number,
        v.transaction_number,
        v.transaction_date,
        v.transaction_type,
        v.invoice_id,
        v.customer_id,
        v.amount,
        v.cgst,
        v.sgst,
        v.igst,
        v.narration,
        v.created_at,
        v.updated_at,
        c.customer_name,
        i.invoice_number,
        i.invoice_date
      FROM vouchers v
      LEFT JOIN customers c
        ON c.id = v.customer_id
      LEFT JOIN invoices i
        ON i.id = v.invoice_id
      ORDER BY v.id DESC
    `,
  );

  return rows;
};

const getAvailableSaleInvoices = async () => {
  const [rows] = await db.execute(
    `
      SELECT
        i.id,
        i.invoice_number,
        i.customer_id,
        c.customer_name,
        i.grand_total,
        i.cgst,
        i.sgst,
        i.igst
      FROM invoices i
      JOIN customers c ON c.id = i.customer_id
      LEFT JOIN vouchers v
        ON v.invoice_id = i.id
        AND v.voucher_type = 'Sale'
      WHERE v.id IS NULL
      ORDER BY i.invoice_date DESC, i.id DESC
    `,
  );

  return rows;
};

module.exports = {
  createVoucher,
  getAllVouchers,
  getAvailableSaleInvoices,
};
