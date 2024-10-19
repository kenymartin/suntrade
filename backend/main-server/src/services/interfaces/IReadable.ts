interface IReadable<T> {
  /**
   *
   * @param id The id to find the entity
   * @returns {Promise<T>} A promise of the entity that was found
   */
  result: {};
  getById(id: string): Promise<T>;
  /**
   * @returns {Promise<T[]>} A promise of an array of the entity
   */
  getAll(): Promise<T[]>;
  /**
   *
   * @param data The type of T to be mutated
   */
  update(data: T): Promise<T>;

  delete(id: string): Promise<string>;
}

export default IReadable;
