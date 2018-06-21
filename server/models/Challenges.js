const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChallengesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  thinking: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  kyus: {
    type: Schema.Types.ObjectId,
    ref: "Kyus"
  }
}, { timestamps: true })

module.exports = mongoose.model("Challenges", ChallengesSchema)