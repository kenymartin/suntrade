
interface IFilter<T> {
  applyFilter(options: any): Promise<T[]>;
}
export default IFilter;
