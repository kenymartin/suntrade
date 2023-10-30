import express from "express";
import contactController from "../controllers/contactController.js";
import Joi from "joi";

const contactRoute = express.Router();

contactRoute.get("/filter", contactController.getWithFilter);
contactRoute.post( "/register", validateScheme, contactController.register);

contactRoute.get("/", contactController.getContacts);
contactRoute.get("/:id", contactController.getContact);

contactRoute.patch("/:id", contactController.updateContact);

function validateScheme(req, res, next) {
  const { contact} = req.body.data;
  const schema = Joi.object({
    contact: {
      firstname: Joi.string().min(3).required(),
      lastname: Joi.string().min(3).required(),
      stateid: Joi.string(),
      contactTypeId: Joi.number().required(),
      user: {
        username: Joi.string().min(7).required(),
        password: Joi.string().min(8).required(),
        roles:Joi.array().items({
          roleId:Joi.number().required()
        }),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }) // Updated email validation
          .required(),
      },
      address:Joi.array().items({
        addressTypeId: Joi.number().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        zipcode: Joi.string().required(),
        country:Joi.string().required()
      }),
      phone:Joi.array().items({
        phoneTypeId: Joi.number().required(),
        phone: Joi.string().required()
      }),
      company:Joi.array().items({
        companyName:Joi.string().required(),
        website:Joi.string().uri().required()
      })
    }});
  const { error } = schema.validate({contact});
  if (error) {
    return res.status(400).json({ error: error.details[0].message.replace('/',' ') });
  } else {
    next();
  }

}

export default contactRoute;
