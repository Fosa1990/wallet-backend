const { Schema } = require('mongoose');
// const bcrypt = require('bcryptjs');
const { regexName, regexEmail } = require('../../helpers/regex');
const { USER_LIMIT } = require('../../helpers/constants');

const validateName = name => regexName.test(name);
const validateEmail = email => regexEmail.test(email);

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: USER_LIMIT.NAME.MIN,
      maxlength: USER_LIMIT.NAME.MAX,
      required: [true, 'Name is required'],
      validate: [validateName, 'Please fill a valid name'],
      match: [regexName, 'Please fill a valid name'],
    },
    email: {
      type: String,
      index: true,
      trim: true,
      lowercase: true,
      minlength: USER_LIMIT.EMAIL.MIN,
      maxlength: USER_LIMIT.EMAIL.MAX,
      required: [true, 'Email is required'],
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [regexEmail, 'Please fill a valid email address'],
      unique: true,
    },
    password: {
      type: String,
      minlength: USER_LIMIT.PASSWORD.MIN,
      maxlength: USER_LIMIT.PASSWORD.MAX,
      required: [
        true,
        'Password is required and must be at least 6 characters long',
      ],
    },
    avatarURL: {
      type: String,
      required: [false, "Avatar isn't required"],
      default: null,
    },
    token: {
      type: String,
      required: [false, "Token isn't required"],
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = { userSchema };
