export interface Model {
  name: string;
  id: number;
}
export interface Make {
  models: Model[];
  id: number;
}
export interface FilterModel extends Model {
  checked: boolean;
  shown: boolean;
}
export interface FilterMake extends Make {
  checked: boolean;
  shown: boolean;
  models: FilterModel[];
  id: number;
}
export type MakeModelById = Record<
  number,
  { name: string; models: Record<number, { name: string }> }
>;
