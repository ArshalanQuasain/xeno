import mongoose, { Schema } from 'mongoose';

const audienceSegmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        conditions: {
            type: Object,
            required: true, // Store segment conditions as a JSON object
        },
        audience_size: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
    }
);

export const AudienceSegment = mongoose.model("AudienceSegment", audienceSegmentSchema);
