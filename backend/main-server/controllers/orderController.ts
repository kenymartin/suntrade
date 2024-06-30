import {Request, Response} from "express";
import OrderService from "../services/orderService.js";
const service = new OrderService()

export const getOrder = async  (req:Request, res:Response):Promise<void> => {
  try {
    const Id = parseInt(req.params.id);
    const order = await service.getById(Id);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting order" });
  }
}
export const getOrders = async (req:Request, res:Response):Promise<void>=>{
    try {
        const orders = await service.getAll();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:"Error getting orders" });
    }
}
export const createOrder =async (req:Request,res:Response):Promise<void>=>{
    try {
        const {data} =req.body;
        const order =service.create(data)
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Error creating order"})
    }
}
export const deleteOrder = async (req:Request, res:Response):Promise<void>=>{
    try {
        const Id =parseInt(req.params.id)
        const orderId = service.delete(Id)
        res.status(2001).json(orderId)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Error deleting order"})
    }
}

export default{
    getOrder,
    getOrders,
    createOrder,
    deleteOrder
}
