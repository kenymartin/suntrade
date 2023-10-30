import express, { json } from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
} from "../controllers/orderController";
import { canViewOrders } from "../permissions/userPermission";
import OrderService from "../services/orderService";
import { authByUser } from "../midleware/auth";

const orderRoute = express.Router();
const service = new OrderService()
orderRoute.get("/", getOrders);
orderRoute.get("/:id",authByUser,setOrder, authGetOrder);
orderRoute.post("/create", createOrder);
orderRoute.get("/delete", deleteOrder);
const orders = [
  {
    id: 1,
    userId: 1,
    productname: "SolarPanel1",
    price: 200,
    quantity: 2,
  },
  {
    id: 2,
    userId: 2,
    productname: "SolarPanel2",
    price: 150,
    quantity: 3,
  },
];
function setOrder(res, req, next) {
    const orderId = req.params.id;
    req.order = service.getById(orderId);
    if(req.order ===null){
       res.status(404);
       return res.send('Order not found');
    }
    next()
}
function authGetOrder(req, res,next){
if(!canViewOrders(req.user, req.order)){
    res.status(401);
    return res.send('Not Allowed');
}
next();
}

export default orderRoute;
