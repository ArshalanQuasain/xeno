import mongoose, { Schema } from 'mongoose';

const campaignSchema = new Schema(
    {
        segment_id: {
            type: Schema.Types.ObjectId,
            ref: "AudienceSegment", // Reference the AudienceSegment model
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
    }
);

export const Campaign = mongoose.model("Campaign", campaignSchema);
