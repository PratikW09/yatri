const User = require('../model/user.js');

// Service: Get User by ID
const getUserByIdService = async (id) => {
  try {
    const user = await User.findById(id).select('-password');
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw error;
  }
};

// Service: Get Current User
const getCurrentUserService = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw error;
  }
};

// Service: Get All Users
const getAllUsersService = async () => {
  try {
    return await User.find().select('-password');
  } catch (error) {
    throw error;
  }
};

// Service: Update User by ID
const updateUserByIdService = async (id, updates) => {
  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw error;
  }
};

// Service: Delete User by ID
const deleteUserByIdService = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("User not found");
    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserByIdService,
  getCurrentUserService,
  getAllUsersService,
  updateUserByIdService,
  deleteUserByIdService,
};
