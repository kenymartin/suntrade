import { Response, Request } from "express";
import PhoneService from "../services/PhoneService.js";

const service = new PhoneService();
export const getPhone = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const phone = await service.getById(id);
    res.status(200).json(phone);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getPhones = async (req: Request, res: Response): Promise<void> => {
  try {
    const phones = await service.getAll();
    res.status(200).json(phones);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getPhone,
  getPhones,
}
