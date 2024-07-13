import { VehicleType } from "../../../shared/model/params";
import { CarType } from "../model/car";
import { Make, typePropertyName } from "../model/vehicle";

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

export function findMakeById(makes: Make[], id: string) {
  return makes.find((make) => make.id === id)?.make_name;
}
export function findIdByMakeName(
  makes: Make[] | null,
  name: string | undefined
) {
  if (!makes) return null;
  return makes.find((make) => make.make_name === name)?.id;
}
