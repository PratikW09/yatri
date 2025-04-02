const authService = require('../service/auth_service.js');
const { Response, errorResponse } = require('../utils/responseHandler.js');

const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const response = await authService.registerUser(name, email, mobile, password);
    res.cookie('jwt_token', response.token, response.cookieOptions);
    return Response(res, response.status, "User registered successfully", response.data);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await authService.loginUser(email, password);
    res.cookie('jwt_token', response.token, response.cookieOptions);
    return Response(res, response.status, "User logged in successfully", response.data);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('jwt_token', authService.getCookieOptions());
    return Response(res, 200, "Logout successful");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await authService.sendOtp(email);
    return Response(res, 200, "OTP sent successfully", response.data);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const response = await authService.verifyOtp(email, otp);
    res.cookie('jwt_token', response.token, response.cookieOptions);
    return Response(res, 200, "OTP verified successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = { registerUser, loginUser, logoutUser, sendOtp, verifyOtp };
