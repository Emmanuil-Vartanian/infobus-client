const { Schema, model } = require("mongoose");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const carrierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    contact_emails: [{ type: String, lowercase: true, match: emailRegexp }],
    creator_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    consolidator_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    consolidator_name: String,
    carrier_number_id: {
      type: Number,
      default: 1,
    },
    manager_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    manager_c: String,
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
        by_id: {type: Schema.Types.ObjectId, ref: "user",}
      },
      deleted: {
        date: { type: Date },
        by_id: {type: Schema.Types.ObjectId, ref: "user",}
      },
      restored: {
        date: { type: Date },
        by_id: {type: Schema.Types.ObjectId, ref: "user",}
      },
    }
  },
  { versionKey: false, timestamps: true }
);

const Carrier = model("carrier", carrierSchema);

module.exports = Carrier;
