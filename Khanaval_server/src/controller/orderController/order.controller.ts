import { type Request, type Response } from "express";
import mongoose from "mongoose";
import { Orders } from "../../model/Order.js";
import { user } from "../../model/mongo.js";
import { CloudKitchen } from "../../model/MessAsCloude.js";
import { KitchenMenu } from "../../model/KicthenMenu.js";
import { senderror, sendReponse } from "../../utils/Response.js";

type OrderProductInput = {
    productId: string;
    count: number;
};

export const PlaceOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.CloudeUser?.id;

        if (!userId) {
            return senderror(res, 401, "User not authenticated");
        }

        const {
            KitchenId,
            paymentMode,
            productList,
            AddressToDelivedProduct,
        } = req.body;

        if (!KitchenId || !paymentMode || !Array.isArray(productList) || productList.length === 0) {
            return senderror(res, 400, "Kitchen, payment mode, and product list are required");
        }

        if (!AddressToDelivedProduct) {
            return senderror(res, 400, "Delivery address is required");
        }

        const currentUser = await user.findById(userId);
        if (!currentUser) {
            return senderror(res, 404, "User not found");
        }

        const kitchen = await CloudKitchen.findById(KitchenId);
        if (!kitchen) {
            return senderror(res, 404, "Cloud kitchen not found");
        }

        const normalizedProductList = productList.reduce<OrderProductInput[]>(
            (acc, item: { productId?: string; count?: number }) => {
                const productId = typeof item.productId === "string" ? item.productId : "";
                const count = Number(item.count || 0);

                if (!productId || count <= 0) {
                    return acc;
                }

                acc.push({
                    productId,
                    count,
                });

                return acc;
            },
            [],
        );

        if (normalizedProductList.length === 0) {
            return senderror(res, 400, "Please add at least one valid menu item");
        }

        const productIds = normalizedProductList.map((item) => item.productId);
        const menuItems = await KitchenMenu.find({
            _id: { $in: productIds },
            KitchenId,
        });

        if (menuItems.length !== normalizedProductList.length) {
            return senderror(res, 400, "Some menu items are invalid for this kitchen");
        }

        const menuMap = new Map(menuItems.map((item) => [String(item._id), item]));

        const totalPrice = normalizedProductList.reduce(
            (sum: number, item) => {
                const menuItem = menuMap.get(String(item.productId));
                if (!menuItem) {
                    return sum;
                }
                return sum + Number(menuItem.productprice || 0) * item.count;
            },
            0,
        );

        const allItemText = normalizedProductList
            .map((item) => {
                const menuItem = menuMap.get(String(item.productId));
                return `${menuItem?.productName || "Item"} x${item.count}`;
            })
            .join(", ");

        const placedOrder = await Orders.create({
            userId,
            KitchenId,
            totalPrice,
            paymentMode,
            OrderStatus: "Pending",
            AllIteam: allItemText,
            productList: normalizedProductList.map((item) => ({
                productId: new mongoose.Types.ObjectId(item.productId),
                count: item.count,
            })),
            AddressToDelivedProduct,
        });

        return sendReponse(res, 201, "OrderPlace Successfull", placedOrder);
    } catch (error) {
        console.log(error);
        return senderror(res, 500, "internal Server Error");
    }
}
