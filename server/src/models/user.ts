import mongoose from "mongoose";

const avatarRegex =
  /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]*)?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (value: string) => avatarRegex.test(value),
      message: "La URL del avatar no es válida",
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
