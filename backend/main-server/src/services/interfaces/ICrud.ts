/**
 * inteface for creating CRUD operations
 */
interface ICrud<T> {
  /**
   * property with the returned value.
   */
  result:T;
  /**
   * operation to get an entity by its id
   * @param id the name of the property
   * @returns {Promise<T>} promise of the property value
   */
  getById(id: any): Promise<T>;
  /**
   * operation to get an array of entities
   * @returns {Promise<T[]>} promise of the property value
   */
  getAll(): Promise<T[]>;
  /**
   * operation to update a new entity
   * @param data The type of T to be mutated
   */
  update(data: T): Promise<T>;
  /**
   * operation to create a new entity
   * @param data The type of T to be created
   */
  create(data: T): Promise<T>;
  /**
   * operation to delete an entity
   * @param id
   */
  delete(id: any): Promise<number>;
}
export default ICrud;
