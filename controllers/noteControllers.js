import Note from "../models/Notes.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import successResponse from "../utils/successResponse.js";

// @desc Get all notes
// @route Get /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean().exec();

  if (!notes || !notes?.length) {
    throw new ApiError(400, "No notes to show");
  }

  return successResponse(res, { data: notes });
});

// @desc Create a note
// @route Post /notes/new
// @access Private
const createNote = asyncHandler(async (req, res) => {
  const { userId, title, text } = req.body;

  if (!userId || !title || !text) {
    throw new ApiError(400, "All fields are required");
  }

  const newNote = await Note.create({ user: userId, title, text });

  if (!newNote) {
    throw new ApiError(400, "Invalid Note Data");
  }

  return successResponse(res, {
    data: newNote,
    message: "Note created successfully",
  });
});

// @desc update a note
// @route Put /notes/:id/edit
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { user : userId, title, text, completed } = req.body;
  console.log(id)

  if (!id || !userId || !title || !text || typeof completed !== "boolean") {
    throw new ApiError(400, "All fields are required");
  }

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    {
      user: userId,
      title,
      text,
      completed,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedNote) {
    throw new ApiError(404, "Note not found");
  }

  return successResponse(res, {
    data: updatedNote,
    message: "Note updated successfully",
  });
});

// @desc delete a note
// @route Delete /notes/:id/delete
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Id is required");
  }

  const note = await Note.findByIdAndDelete(id);

  if (!note) {
    throw new ApiError(400, "Note not found");
  }

  return successResponse(res, { message: "Note deleted successfully" });
});

export { getAllNotes, createNote, updateNote, deleteNote };
