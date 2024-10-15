const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
});
const Purchase = mongoose.model("Purchase", purchaseSchema); // collection name - purchases

module.exports = { Purchase };
