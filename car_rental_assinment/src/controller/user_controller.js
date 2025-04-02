const {
  getUserByIdService,
  getCurrentUserService,
  getAllUsersService,
  updateUserByIdService,
  deleteUserByIdService,
} = require('../service/user_service.js');
const { Response, errorResponse } = require('../utils/responseHandler.js');

// Controller: Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    Response(res, 200, "User fetched successfully", user);
  } catch (error) {
    errorResponse(res, 404, error.message);
  }
};

// Controller: Get Current User
const getCurrentUser = async (req, res) => {
  try {
    
    const user = await getCurrentUserService(req.user.userId);
    Response(res, 200, "Current user fetched successfully", user);
  } catch (error) {
    errorResponse(res, 404, error.message);
  }
};

// Controller: Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    Response(res, 200, "Users fetched successfully", users);
  } catch (error) {
    errorResponse(res, 500, "Error fetching all users", error);
  }
};

// Controller: Update User by ID
const updateUserById = async (req, res) => {
  try {
    const user = await updateUserByIdService(req.params.id, req.body);
    Response(res, 200, "User updated successfully", user);
  } catch (error) {
    errorResponse(res, 404, error.message);
  }
};

// Controller: Delete User by ID
const deleteUserById = async (req, res) => {
  try {
    await deleteUserByIdService(req.params.id);
    Response(res, 200, "User deleted successfully");
  } catch (error) {
    errorResponse(res, 404, error.message);
  }
};

module.exports = {
  getUserById,
  getCurrentUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
};
