import mongoose from "mongoose";

const calculatorAnalyticsSchema = new mongoose.Schema(
  {
    billRange: {
      type: String,
      enum: ["0-2000","2000-5000","5000-10000","10000-20000","20000+"],
      required: true
    },

    propertyType: {
      type: String,
      enum: ["residential", "commercial"],
      required: true
    },

    roofAreaProvided: {
      type: Boolean,
      required: true
    },

    estimatedKW: {
      type: Number,
      required: true
    },

    source: {
      type: String,
      enum: ["web"],
      default: "web"
    }
  },
  {
    timestamps: true // automatically adds createdAt & updatedAt
  }
);

const CalculatorAnalyticsModel = mongoose.model(
  "calculator_analytics",
  calculatorAnalyticsSchema
);

export default CalculatorAnalyticsModel;

/*
You’re building analytics for:

% users who know their roof area
% who don't
Residential vs Commercial trends
Bill ranges

You are building business intelligence, not storing unnecessary data.
*/

/*
Your schema is safe because:

No phone

No name

No address

No IP tracking

No exact bill value

No roof size value (only boolean)

No session tracking

This is anonymous analytics.

Very good.
*/