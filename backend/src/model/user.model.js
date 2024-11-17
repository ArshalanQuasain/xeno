import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        google_id: {
            type: String,
            required: true,
            unique: true, // Ensures the google_id is unique
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures the email is unique
        },
        profile_picture: {
            type: String,
            default: '', // Default value in case no profile picture is provided
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

export const User = mongoose.model("User", userSchema);
