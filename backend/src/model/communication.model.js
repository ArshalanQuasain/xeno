import mongoose, { Schema } from 'mongoose';

const communicationsLogSchema = new Schema(
    {
        campaign_id: {
            type: Schema.Types.ObjectId,
            ref: "Campaign", // Reference the Campaign model
            required: true,
        },
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: "Customer", // Reference the Customer model
            required: true,
        },
        status: {
            type: String,
            enum: ["SENT", "FAILED"], // Restrict to specified values
            required: true,
        },
        sent_at: {
            type: Date,
            default: Date.now, // Default to the current date
        },
    },
    {
        timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
    }
);

export const CommunicationsLog = mongoose.model("CommunicationsLog", communicationsLogSchema);
