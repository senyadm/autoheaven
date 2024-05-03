import { Filter } from "../../components/landing/types";
import {
  FilterMake,
  FilterModel,
  Make,
  MakeModelById,
  Model,
} from "../../interfaces/cars/models";

export function getInitialMakes(carModels: Record<string, Make>) {
  return Object.entries(carModels).reduce((acc, [makeName, make]) => {
    acc[makeName] = {
      id: make.id,
      checked: false,
      shown: false,
      models: make.models.map((m) => ({
        ...m,
        checked: false,
        shown: false,
      })),
    };
    return acc;
  }, {} as Record<string, FilterMake>);
}

// i.e. models=15-75,13|25-33,44|12-all

export function stringifyModels(
  makes: Record<string, Model[]>,
  carModels
): string {
  return Object.entries(makes)
    .map(([makeName, selectedModels]) => {
      if (selectedModels.length === 0) return "";
      const makeId = carModels[makeName].id;
      // no models checked will result in make not being included
      // all models has id -1
      if (selectedModels.find((model) => model.id === -1) !== undefined)
        return `${makeId}-all`;
      const models = selectedModels.map((model) => model.id).join(",");
      return `${makeId}-${models}`;
    })
    .filter((m) => m !== "")
    .join("|");
}

export function parseModels(
  modelsParams: string,
  carModelsById: MakeModelById
): Record<string, Model[]> {
  console.log("🚀 ~ modelsParams:", modelsParams);
  // console.log("🚀 ~ carModelsById:", carModelsById);
  if (!modelsParams) return {};
  const makes = modelsParams.split("|");
  return makes.reduce((acc, make: string) => {
    const [makeId, modelIds] = make.split("-");
    // console.log("🚀 ~ returnmakes.reduce ~ makeId:", carModelsById);
    if (modelIds === "all") {
      return {
        ...acc,
        [carModelsById[makeId].name]: [{ id: -1, name: "All models" }],
      };
    }
    const models = modelIds.split(",").map((modelId) => ({
      id: Number(modelId),
      name: carModelsById[makeId].models[modelId].name,
    }));
    return {
      ...acc,
      [carModelsById[makeId].name]: models,
    };
  }, {} as Record<string, Model[]>);
}
