const { Schema, model } = require("mongoose");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const agencySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    short_name: {
      type: String,
      required: [true, "Short name is required"],
    },
    street: {
      type: String,
      required: [true, "Street is required"],
    },
    postal_code: {
      type: String,
      required: [true, "Zip code is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    tax: {
      type: String,
      required: [true, "Tax number is required"],
    },
    enterprise_status: {
      type: String,
      required: [true, "Enterprise status is required"],
    },
    enterprise_owner: {
      type: String,
      required: [true, "Enterprise owner is required"],
    },
    contact_tel: {
      type: String,
      required: [true, "Phone is required"],
    },
    contact_fax: {
      type: String,
      required: [true, "Fax is required"],
    },
    contact_email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: emailRegexp,
    },
    commission: {
      type: [],
      default: [],
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
    agency_number_id: {
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

const Agency = model("agency", agencySchema);

module.exports = Agency ;