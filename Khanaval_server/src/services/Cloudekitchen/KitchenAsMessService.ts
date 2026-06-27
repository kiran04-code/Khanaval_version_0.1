import mongoose from "mongoose"
import { KitchenMenu } from "../../model/KicthenMenu.js"
import { ApiError } from "../../utils/Apierror.js"
import { CloudKitchen } from "../../model/MessAsCloude.js"

export class KitchenService {
    static async AddItemToMenu(productName: string, productprice: number, productimage: string,productCategory:string, KicthenId: string) {
        try {
            const CreatedDate = new Date()
            const MenuData = await KitchenMenu.create({
                productName: productName,
                productprice: productprice,
                productimage: productimage,
                productCategory:productCategory,
                KitchenId: KicthenId,
                productCreateAt: CreatedDate,
            })
            await CloudKitchen.findByIdAndUpdate(KicthenId, {
                $push: {
                    MenuId: MenuData._id,
                }
            })
        } catch (error) {
            throw new ApiError(500, "db create error")
        }
    }
}