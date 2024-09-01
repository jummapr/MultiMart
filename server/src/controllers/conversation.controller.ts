import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Request, Response } from "express";
import Conversation from "../models/conversation.model";
import {redis} from "../utils/redis";

// create coupon code

export const createConversation = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const {groupId,userId,sellerId} = req.body;
        console.log(req.body);

        const cachedValue = await redis.get(`conversation:${groupId}`);

        if (cachedValue) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        "Conversation fetched from cache.",
                        JSON.parse(cachedValue)
                    )
                );
        }

        const isConversationExist = await Conversation.findOne({groupId});

        if(isConversationExist){
           return res.status(200).json(new ApiResponse(200, "",isConversationExist));
        }

        const conversation = await Conversation.create({
            groupId,
            members: [userId,sellerId],
        });

        await redis.set(`conversation:${groupId}`, JSON.stringify(conversation),'EX', 86400);

        res
            .status(201)
            .json(new ApiResponse(200, "True", conversation));
    }
);
