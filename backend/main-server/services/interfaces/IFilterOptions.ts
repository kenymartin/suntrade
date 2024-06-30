interface IFilterOptions<T> {
  select?: Array<keyof T>;
  where?: Partial<T>;
}
export default IFilterOptions;
