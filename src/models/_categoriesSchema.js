// const { Schema, Types } = require("mongoose");

// const categoriesSchema = new Schema(
//   {
//     categoryName: {
//       type: String,
//       lowercase: true,
//       enum: [
//         "basic spend",
//         "products",
//         "car",
//         "household products",
//         "self care",
//         "child care",
//         "education",
//         "leisure",
//         "other spend",
//         "regular income",
//         "irregular income",
//       ],
//       required: [true, "Category is required"],
//     },
//     sum: {
//       type: Number,
//       default: 5000,
//       required: [true, "Balance is required"],
//     },
//     owner: {
//       type: Types.ObjectId,
//       ref: "user",
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

// module.exports = categoriesSchema;
