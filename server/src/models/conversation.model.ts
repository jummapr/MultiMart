require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IConversation extends Document {
    groupId: string;
    members: any[];
    lastMessage: string;
    lastMessageId: string;
}

const conversationSchema: Schema<IConversation> = new mongoose.Schema(
    {
        groupId: {
            type: String,
            required: true,
        },
        // @ts-ignore
        members: {
            type: Array,
        },
        lastMessage: {
            type: String,
        },
        lastMessageId: {
            type: String,
        }
    },
    { timestamps: true }
);

const Conversation: Model<IConversation> = mongoose.model("conversation", conversationSchema);

export default Conversation;
