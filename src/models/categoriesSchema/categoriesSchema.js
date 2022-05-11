const { Schema } = require('mongoose');

const categoriesSchema = new Schema(
  {
    categoryName: {
      type: String,
      enum: [
        'products',
        'car',
        'family',
        'childcare',
        'household',
        'education',
        'other',
        'income',
      ],
      required: [true, 'Enter category name'],
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = { categoriesSchema };
