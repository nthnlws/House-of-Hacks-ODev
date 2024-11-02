import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the Property Document
export interface IProperty extends Document {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  propertyType:
    | "single_family"
    | "multi_family"
    | "condo"
    | "apartment"
    | "townhouse";
  size: {
    squareFeet: number;
    bedrooms: number;
    bathrooms: number;
    floors: number;
  };
  yearBuilt: number;
  materials: {
    roof: string;
    exteriorWalls: string;
    foundation: string;
  };
  heatingSystem: "central" | "furnace" | "heat_pump" | "radiant" | "none";
  coolingSystem: "central" | "window_units" | "heat_pump" | "none";
  plumbing: {
    mainWaterSource: "public" | "well";
    waterHeater: "tank" | "tankless" | "none";
    sewerSystem: "public" | "septic";
  };
  appliances: string[]; // e.g., ["washer", "dryer", "dishwasher", "refrigerator"]
  installedSystems: {
    electricalPanelAmps: number;
    hasGas: boolean;
    securitySystem: boolean;
    sprinklerSystem: boolean;
  };
  landscape: {
    hasLawn: boolean;
    lawnType: "natural" | "artificial" | "none";
    hasPool: boolean;
    hasGarden: boolean;
    treesCount: number;
  };
  ownerContact: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Create the Property Schema
const PropertySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      zipCode: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
    },
    propertyType: {
      type: String,
      enum: [
        "single_family",
        "multi_family",
        "condo",
        "apartment",
        "townhouse",
      ],
      required: true,
    },
    size: {
      squareFeet: { type: Number, required: true, min: 1 },
      bedrooms: { type: Number, required: true, min: 0 },
      bathrooms: { type: Number, required: true, min: 0 },
      floors: { type: Number, required: true, min: 1 },
    },
    yearBuilt: {
      type: Number,
      required: true,
    },
    materials: {
      roof: { type: String, required: true, trim: true },
      exteriorWalls: { type: String, required: true, trim: true },
      foundation: { type: String, required: true, trim: true },
    },
    heatingSystem: {
      type: String,
      enum: ["central", "furnace", "heat_pump", "radiant", "none"],
      required: true,
    },
    coolingSystem: {
      type: String,
      enum: ["central", "window_units", "heat_pump", "none"],
      required: true,
    },
    plumbing: {
      mainWaterSource: {
        type: String,
        enum: ["public", "well"],
        required: true,
      },
      waterHeater: {
        type: String,
        enum: ["tank", "tankless", "none"],
        required: true,
      },
      sewerSystem: {
        type: String,
        enum: ["public", "septic"],
        required: true,
      },
    },
    appliances: {
      type: [String],
      required: true,
    },
    installedSystems: {
      electricalPanelAmps: { type: Number, required: true },
      hasGas: { type: Boolean, required: true },
      securitySystem: { type: Boolean, required: true },
      sprinklerSystem: { type: Boolean, required: true },
    },
    landscape: {
      hasLawn: { type: Boolean, required: true },
      lawnType: {
        type: String,
        enum: ["natural", "artificial", "none"],
        required: true,
      },
      hasPool: { type: Boolean, required: true },
      hasGarden: { type: Boolean, required: true },
      treesCount: { type: Number, required: true, min: 0 },
    },
    ownerContact: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
    },
  },
  {
    timestamps: true, // Automatically create 'createdAt' and 'updatedAt' fields
  }
);

// Create and export the Property model
const Property: Model<IProperty> = mongoose.model<IProperty>(
  "Property",
  PropertySchema
);

export default Property;
