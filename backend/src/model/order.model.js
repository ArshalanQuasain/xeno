import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
    {
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: "Customer", // Reference the Customer model
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        order_date: {
            type: Date,
            default: Date.now, // Defaults to the current date
        },
    },
    {
        timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
    }
);

export const Order = mongoose.model("Order", orderSchema);
