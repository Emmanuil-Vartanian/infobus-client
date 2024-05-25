
const { Schema, model } = require("mongoose");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Too few eggs"],
      minlength: [16, "Too much eggs"],
    },
    role: {
      type: String,
      enum: [
        "superadmin",
        "consolidator",
        "chief",
        "dispatcher",
        "carrier_manager",
        "agency_manager",
        "user",
      ],
      default: "user",
    },
    agency_id: {
      type: Schema.Types.ObjectId,
      ref: "agency",
    },
    agency_name: String,
    carrier_id: {
      type: Schema.Types.ObjectId,
      ref: "carriers",
    },
    carrier_name: String,
    permissions: {
      type: [],
      default: ["user"],
    },
    token: {
      type: String,
      default: null,
    },
    user_data: {
      type: {},
    },
    creator_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    consolidator_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    consolidator_name: String,
    user_number_id: {
      type: Number,
      default: 1,
    },
    user_c: String,
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

const User = model("user", userSchema);

module.exports = User;
