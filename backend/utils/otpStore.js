const otpStore = new Map();

const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes

const saveOTP = (key, otp) => {
  otpStore.set(key, {
    otp,
    expiresAt: Date.now() + OTP_EXPIRY,
  });
};

const verifyOTP = (key, otp) => {
  const data = otpStore.get(key);

  if (!data) {
    return {
      success: false,
      reason: "otp_not_found",
    };
  }

  if (Date.now() > data.expiresAt) {
    otpStore.delete(key);

    return {
      success: false,
      reason: "otp_expired",
    };
  }

  if (data.otp !== otp) {
    return {
      success: false,
      reason: "invalid_otp",
    };
  }

  otpStore.delete(key);

  return {
    success: true,
  };
};

module.exports = {
  saveOTP,
  verifyOTP,
};