import User from "../models/User.model.js";
import Note from "../models/Notes.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import successResponse from "../utils/successResponse.js";

// @desc Get all users
// @route Get /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    throw new ApiError(400, "No users to show");
  }

  return successResponse(res, { data: users });
});

// @desc create a users
// @route Post /users
// @access Private
const createUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    throw new ApiError(400, "All fields are required");
  }

  // check is user exits or not
  const existUser = await User.findOne({ username }).lean().exec();
  if (existUser) {
    throw new ApiError(409, "Username already exist");
  }

  const newUser = User.create({ username, password, roles });

  if (!newUser) {
    throw new ApiError(400, "Invalid user data");
  }
  return successResponse(res, { message: `new user ${username} created` });
});

// @desc update a users
// @route Patch /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  // Validate request body
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user exists
  /**
   * @type {import('mongoose').Document & { username: string; roles: string[]; active: boolean; password?: string }}
   */
  const user = await User.findById(id).exec();
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check duplicate username (excluding current user)
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate._id.toString() !== id) {
    throw new ApiError(409, "Username already exists");
  }

  // Update user fields
  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();

  return successResponse(res, { message: `${updatedUser.username} updated` });
});

// @desc delete a users
// @route Delete /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    throw new ApiError(400, "User Id required");
  }

  /**
   * @type {import('mongoose').Document & { username: string; roles: string[]; active: boolean; password?: string }}
   */
  const user = await User.findById(id).exec();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Don't delete user if even a single note is assigned to him
  const note = await Note.findOne({ user: id }).lean().exec();

  if (note) {
    throw new ApiError(400, "User has assigned notes");
  }

  await user.deleteOne();

  return successResponse(res, { message: `${user.username} User deleted` });
});

export { getAllUsers, createUser, updateUser, deleteUser };
