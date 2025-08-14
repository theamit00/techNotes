import mongoose from "mongoose";
const { Schema } = mongoose;
import mongooseSequence from "mongoose-sequence";

// const AutoIncrement = mongooseSequence(mongoose);

const noteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// noteSchema.plugin(AutoIncrement, {})

const Note = mongoose.model("Note", noteSchema);

export default Note