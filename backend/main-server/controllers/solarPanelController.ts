import {Request, Response} from "express";
import {SolarPanelService} from "../services/solarPanelService.js"

const service = new SolarPanelService()

/**
 * Creates a new solar panel.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the solar panel is created.
 */
export const createSolarPanel =async (req:Request, res:Response):Promise<void> => {
try {
  const {data} = req.body
  const solarPanel = await service.create(data)
  res.status(201).json(solarPanel)
} catch (error) {
  console.error(error)
  res.status(500).json({ error: "Error trying to create the Solar Panel" })
}
}

export const getSolarPanel = async (req:Request, res:Response):Promise<void> => {
  try {
    const Id = parseInt(req.params.id);
    const solarPanel = await service.getById(Id);
    res.status(201).json(solarPanel);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "An error ocurred while trying to fecth the solar panel",
      });
  }
}
export const getSolarPanels = async ( _req: Request, res: Response ): Promise<void> => {
  try {
    const solarPanels = await service.getAll();
    res.status(201).json(solarPanels);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "An error ocurred while trying to  fecth the solar panels",
      });
  }
};
export const updateSolarPanel = async ( req: Request, res: Response): Promise<void> => {
    try {
      const { data } = req.body;
      data.id = parseInt(req.params.id);
      const solarPanel = await service.update(data);
      res.status(201).json(solarPanel);
    } catch (error) {
      console.log(error); 
      res
        .status(500)
        .json({
          error: "An error ocurred while trying to update the solarPanel",
        });
    }
}
export const deleteSolarPanel = async ( req: Request, res: Response): Promise<void> => {
  try {
    const Id = parseInt(req.params.id);
    const solarPanelId = await service.delete(Id);
    res.status(200).json(solarPanelId);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error while trying to delete the solar panel" });
  }
}

export default{
  getSolarPanel,
  getSolarPanels,
  updateSolarPanel,
  deleteSolarPanel
}

