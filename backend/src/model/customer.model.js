import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures email is unique across the collection
        },
        phone: {
            type: String,
            required: true,
        },
        total_spending: {
            type: Number,
            required: true,
        },
        visits: {
            type: Number,
            required: true,
        },
        last_visit_date: {
            type: Date,
            default: Date.now, // Defaults to the current date
        },
    },
    {
        timestamps: true, // Automatically manages `createdAt` and `updatedAt` fields
    }
);

export const Customer = mongoose.model("Customer", customerSchema);
