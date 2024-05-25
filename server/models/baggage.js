const { Schema, model } = require("mongoose");

const baggageSchema = new Schema(
  {
    name: {
      type: {},
      required: [true, "Name is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    value: {
      type: Number,
      required: [true, "Type is required"],
    },
    units: {
      type: String,
      required: [true, "Units is required"],
    },
    baggage_number_id: {
      type: Number,
      default: 1,
    },
    creator_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
    },
    restored: {
      type: Boolean,
    },
    history: {
      created: {
        date: { type: Date, default: Date.now },
        by_id: { type: Schema.Types.ObjectId, ref: "user" },
      },
      deleted: {
        date: { type: Date },
        by_id: { type: Schema.Types.ObjectId, ref: "user" },
      },
      restored: {
        date: { type: Date },
        by_id: { type: Schema.Types.ObjectId, ref: "user" },
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const Baggage = model("baggage", baggageSchema);

module.exports = Baggage;


