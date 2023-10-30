import { Prisma, PrismaClient, SolarPanel } from "@prisma/client";
import ICrud from "./interfaces/ICrud";
import { ResultError, pushElement } from "../shared/utils/utils.js";
import config from "../config.js";
type Tcomponent =
  Prisma.ComponentsBySolarPanelUncheckedCreateWithoutSolarPanelInput;

const prisma = new PrismaClient();
/**
 * A service class that implements the ICrud interface for managing SolarPanel objects.
 */
export class SolarPanelService implements ICrud<SolarPanel> {
  result: any;
  /**
   * Creates a new solar panel record in the database.
   * @param {any} data - The data object containing the solar panel details.
   * @returns {Promise<SolarPanel>} - A promise that resolves to the created solar panel object.
   * @throws {ResultError} - If there is an error creating the solar panel record.
   */
  async create(data: any): Promise<SolarPanel> {
    try {
      const { solarPanel } = data;
      const components: Tcomponent[] = [];
      pushElement(components, solarPanel.components);
      this.result = await prisma.solarPanel.create({
        data: {
          description: solarPanel.description,
          typeId: solarPanel.typeId,
          price: solarPanel.price,    
          createdBy:config.currentUser.userId,
          imageUrl: solarPanel.imageUrl,
          components: { createMany: { data: components } },
        },
      });
    } catch (error) {
      console.log(error);
      ResultError.TriedCreateOne("SolarPanel");
    }
    return this.result;
  }
  /**
   * Retrieves a solar panel by its ID from the database.
   * @param {number} id - The ID of the solar panel to retrieve.
   * @returns {Promise<SolarPanel>} - A promise that resolves to the retrieved solar panel.
   * @throws {ResultError} - If there was an error retrieving the solar panel.
   */
  async getById(id: number): Promise<SolarPanel> {
    try {
      this.result = await prisma.solarPanel.findUnique({
        where: { id: id, isActive: true },
      });
    } catch (error) {
      console.log(error);
      ResultError.TriedGetOne("SolarPanel");
    }
    return this.result;
  }
  /**
   * Retrieves all solar panels from the database.
   * @returns {Promise<SolarPanel[]>} - A promise that resolves to an array of SolarPanel objects.
   * @throws {ResultError} - If there was an error retrieving the solar panels from the database.
   */
  async getAll(): Promise<SolarPanel[]> {
    try {
      this.result = await prisma.solarPanel.findMany();
    } catch (error) {
      console.log(error);
      ResultError.TriedGetMany("SolarPanel");
    }
    return this.result;
  }
  /**
   * Updates a solar panel record in the database with the provided data.
   * @param {SolarPanel} data - The updated solar panel data.
   * @returns {Promise<SolarPanel>} - A promise that resolves to the updated solar panel record.
   * @throws {ResultError} - If there is an error updating the solar panel record.
   */
  async update(data: SolarPanel): Promise<SolarPanel> {
    try {
      console.log("===========>",data);
      this.result = await prisma.solarPanel.update({
        where: { id: data.id },
        data,
      });
    } catch (error) {
      console.log(error);
      ResultError.TriedUpdateOne("SolarPanel");
    }
    return this.result;
  }
  /**
   * Deletes a solar panel record from the database based on the provided ID.
   * @param {number} id - The ID of the solar panel record to delete.
   * @returns {Promise<number>} - The number of records deleted (should always be 1).
   * @throws {ResultError} - If there was an error deleting the record.
   */
  async delete(id: number): Promise<number> {
    try {
      this.result = prisma.solarPanel.delete({ where: { id: id } });
    } catch (error) {
      console.log(error);
      ResultError.TriedDeleteOne("SolarPanel");
    }
    return this.result;
  }
}
