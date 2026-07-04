import express from "express";
import { UpdateUserAdress } from "../controller/userController/AddresUpdate.controller.js";
import { getMyOrder, getMyOrderForkitchen, PlaceOrder } from "../controller/orderController/order.controller.js";
const UserRoutes = express.Router();
UserRoutes.post("/Update-user-address", UpdateUserAdress);
UserRoutes.post("/Place-order-cloude-Kitchen", PlaceOrder);
UserRoutes.get("/get-MyOrder/:id", getMyOrder);
UserRoutes.get("/get-MyOrder-kitchen/:id", getMyOrderForkitchen);
export default UserRoutes;
//# sourceMappingURL=UserRoute.js.map