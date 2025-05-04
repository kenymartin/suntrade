import { Request, Response } from "express";
import Contactservice from "../services/Contactservice.js";
// import Contact  from "@shared/model/contact.model.js";
//import Joi from "joi";
const service = new Contactservice();

export const getContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const Id = parseInt(id);
    const result = await service.getById(Id);
    if (!result) {
      res.status(404).json({ error: "Data not found" });
      return;
    }
    res.status(201).json(result);
    console.log(result);
  } catch (error) {
    console.error("Error fetching the contact", error);
    res.status(500).json("An error ocurred while fetching the contact.");
  }
};

export const getContacts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await service.getAll();
    if (!result) {
      res.status(404).json({ error: "Data not found" });
      return;
    }
    res.status(201).json(result);
  } catch (error) {
    console.error("Error fecthing the contacs", error);
    res.status(500).json("An error ocurred while fetching the contacts");
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  debugger;
  let resultMessage = {};
  const test1 = 10;
  const test2 = 2;
  const test3 = test1 + test2;
  console.log(test3);
  try {
    const { data } = req.body.query;
    const result = await service.register(data);
    if (result) {
      res.status(201).json({ Done: true, message: "Contact registration succesfully" });
    }
  } catch (error) {
    console.error("Error creating the register.", error);
    res.status(500).json(resultMessage);
  }
};

export const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data } = req.body;
    data.id = parseInt(req.params["id"]);
    const result = await service.update(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error while updating the contact", error);
    res.status(500).json("An error ocurred while updating the contact");
  }
};

export const getWithFilter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { select, where, orderBy } = req.query;

    const filterOptions = {
      select: select ? select.toString().split(",") : undefined,
      where: where ? JSON.parse(where.toString()) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy.toString()) : undefined,
    };
    const contacts = await service.applyFilter(filterOptions);
    res.json(contacts);
  } catch (error) {
    console.error("Error while getting the contacts", error);
    res.status(500).json({ message: "Failed to get contacts" });
  }
};

export default {
  getContact,
  getContacts,
  register,
  updateContact,
  getWithFilter,
};