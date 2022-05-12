const { Schema /*, Types */ } = require('mongoose');

const categoriesSchema = new Schema(
  {
    categoryName: {
      type: String,
      enum: [
        'basic spend',
        'products',
        'car',
        'household products',
        'self care',
        'child care',
        'education',
        'leisure',
        'other spend',
        'regular income',
        'irregular income',
      ],
      required: [true, 'Enter category name'],
    },
    // owner: {
    //   type: Types.ObjectId,
    //   ref: "user",
    // },
  },
  { versionKey: false, timestamps: true },
);

module.exports = categoriesSchema;
