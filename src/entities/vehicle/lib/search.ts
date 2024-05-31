import { VehicleType } from "../../../shared/model/params";
import { CarType } from "../model/car";
import { typePropertyName } from "../model/vehicle";

export function searchModels(
  search: string,
  sortedModelsWithHeadings:
    | Record<string, string[]>
    | Partial<Record<string, string[]>>
) {
  if (!search) return sortedModelsWithHeadings;
  const filtered = Object.entries(sortedModelsWithHeadings).reduce(
    (acc, [letter, models]) => {
      const filteredModels = models?.filter((model) =>
        model.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredModels?.length) {
        acc[letter] = filteredModels;
      }
      return acc;
    },
    {}
  );
  return filtered;
}

export function searchTypes(
  search: string,
  types: CarType[],
  currentTypePropertyName: string
): CarType[] {
  if (!search) return types;
  return types.filter((type) =>
    type[currentTypePropertyName].toLowerCase().includes(search.toLowerCase())
  );
}
