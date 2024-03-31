import { Make } from "../interfaces/cars/models";

// i.e. models=15-75,13|25-33,44|12-all

export function stringifyModels(makes: Make[]) {
  return makes
    .map((make) => {
      const models = make.models.map((model) => model.id).join("-");
      return `${make.id}-${models}`;
    })
    .join("|");
}

export function parseModels(models: string) {
  const makes = models.split("|");
  return makes.map((make) => {
    const [id, models] = make.split("-");
    return {
      id: Number(id),
      models: models.split("-").map((model) => Number(model)),
    };
  });
}
