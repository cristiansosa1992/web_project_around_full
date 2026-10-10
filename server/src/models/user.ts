import mongoose from "mongoose";

const avatarRegex =
  /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]*)?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
  },

  about: {
    type: String,
    default: "Explorador",
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/web-lat/avatar.jpg",
    validate: {
      validator: (value: string) => avatarRegex.test(value),
      message: "La URL del avatar no es válida",
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
