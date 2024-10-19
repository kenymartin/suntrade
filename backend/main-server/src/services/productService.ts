import { Prisma, PrismaClient, Product } from "@prisma/client";
import ICrud from "./interfaces/ICrud";
import { ResultError, pushElement } from "../../../utils/utils.js";
import config from "../../../config.js";

const prisma = new PrismaClient();
/**
 * A service class that implements the ICrud interface for managing SolarPanel objects.
 */
export class ProductService implements ICrud<Product> {
  result: any;
  /**
   * Creates a new solar panel record in the database.
   * @param {any} data - The data object containing the solar panel details.
   * @returns {Promise<Product>} - A promise that resolves to the created solar panel object.
   * @throws {ResultError} - If there is an error creating the solar panel record.
   */
  async create(data: any): Promise<Product> {
    try {
      const { solarPanel } = data;
   
      this.result = await prisma.product.create({
        data: {
          description: solarPanel.description,
          typeId: solarPanel.typeId,
          createdBy: config.currentUser.userId,
          imageUrl: solarPanel.imageUrl,
          //components: { createMany: { data: components } },
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
   * @returns {Promise<Product>} - A promise that resolves to the retrieved solar panel.
   * @throws {ResultError} - If there was an error retrieving the solar panel.
   */
  async getById(id: number): Promise<Product> {
    try {
      this.result = await prisma.product.findUnique({
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
   * @returns {Promise<Product[]>} - A promise that resolves to an array of SolarPanel objects.
   * @throws {ResultError} - If there was an error retrieving the solar panels from the database.
   */
  async getAll(): Promise<Product[]> {
    try {
      this.result = await prisma.product.findMany();
    } catch (error) {
      console.log(error);
      ResultError.TriedGetMany("SolarPanel");
    }
    return this.result;
  }
  /**
   * Updates a solar panel record in the database with the provided data.
   * @param {Product} data - The updated solar panel data.
   * @returns {Promise<Product>} - A promise that resolves to the updated solar panel record.
   * @throws {ResultError} - If there is an error updating the solar panel record.
   */
  async update(data: Product): Promise<Product> {
    try {
      console.log("===========>", data);
      this.result = await prisma.product.update({
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
      this.result = prisma.product.delete({ where: { id: id } });
    } catch (error) {
      console.log(error);
      ResultError.TriedDeleteOne("SolarPanel");
    }
    return this.result;
  }
}
