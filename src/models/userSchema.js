const { Schema } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { regexName, regexEmail } = require('../helpers/regex');
const { USER_LIMIT } = require('../helpers/constants');

const validateName = name => regexName.test(name);
const validateEmail = email => regexEmail.test(email);

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: [
        USER_LIMIT.NAME.MIN,
        `must be at least ${USER_LIMIT.NAME.MIN} characters long`,
      ],
      maxlength: [
        USER_LIMIT.NAME.MAX,
        `must be at most ${USER_LIMIT.NAME.MAX} characters long`,
      ],
      required: [true, 'Name is required'],
      validate: [validateName, 'Please fill a valid name'],
      match: [regexName, 'Please fill a valid name'],
    },
    email: {
      type: String,
      index: true,
      trim: true,
      lowercase: true,
      minlength: [
        USER_LIMIT.EMAIL.MIN,
        `must be at least ${USER_LIMIT.EMAIL.MIN} characters long`,
      ],
      maxlength: [
        USER_LIMIT.EMAIL.MAX,
        `must be at most ${USER_LIMIT.EMAIL.MAX} characters long`,
      ],
      required: [true, 'Email is required'],
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [regexEmail, 'Please fill a valid email address'],
      unique: true,
    },
    password: {
      type: String,
      minlength: [
        USER_LIMIT.PASSWORD.MIN,
        `must be at least ${USER_LIMIT.PASSWORD.MIN} characters long`,
      ],
      maxlength: [
        USER_LIMIT.PASSWORD.MAX,
        `must be at most ${USER_LIMIT.PASSWORD.MAX} characters long`,
      ],
      required: [true, 'Password is required'],
    },
    confirmPassword: {
      type: String,
      minlength: [
        USER_LIMIT.PASSWORD.MIN,
        `must be at least ${USER_LIMIT.PASSWORD.MIN} characters long`,
      ],
      maxlength: [
        USER_LIMIT.PASSWORD.MAX,
        ` must be at most ${USER_LIMIT.PASSWORD.MAX} characters long`,
      ],
      required: [false, "Confirm Password isn't required"],
    },
    balance: {
      type: Number,
      required: [true, 'Balance is required'],
      default: 0,
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
    isInBase: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.setHashPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setToken = function () {
  const { SECRET_KEY } = process.env;
  this.token = jwt.sign({ id: this._id }, SECRET_KEY, { expiresIn: '1h' });
};

userSchema.methods.verifyUser = function (updateVerification) {
  this.isVerified = updateVerification;
};

userSchema.methods.verifyToken = function (updateToken) {
  this.verificationToken = updateToken;
};

userSchema.methods.setAvatar = function () {
  this.avatarURL = gravatar.url(this.email, { s: '250' }, true);
};

userSchema.methods.setToBase = function (updateIsInBase) {
  this.isInBase = updateIsInBase;
};

module.exports = userSchema;
