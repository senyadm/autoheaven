import { clientCars, getCars, getNormalizedParams } from "../../../shared/api";
import { getCarModelsById } from "../../../shared/api/cars";
import {
  FilterParams,
  MakeModelById,
  parseModels,
} from "../../../shared/model";

export async function getCarResults(searchParams: FilterParams) {
  const models: Record<string, Make> = await getCars("/api/car_models");
  const carModelsById = getCarModelsById(models);
  const normalizedParams = getNormalizedParams(searchParams);
  const parsedModels = Object.entries(
    parseModels(searchParams.models, carModelsById)
  ).reduce((acc, [makeName, models]) => {
    acc[makeName] = models.map((model) => model.name);
    return acc;
  }, {});
  normalizedParams.makeModels = JSON.stringify(parsedModels);
  delete normalizedParams.models;

  const topVehicles = {
      title: "Top offers",
      data: [] as Car[],
    },
    nonTopVehicles = {
      title: "Main offers",
      data: [] as Car[],
    };

  const type = normalizedParams.type;
  // Right Now no idea what the types are
  // Cars, cars, car all give zero results, wtf
  delete normalizedParams.type;
  try {
    // TODO optimize such that next page does not fetch the same data
    const carResults: Record<number, Car[]> = (
      await clientCars.get("api/cars/fetch", {
        params: normalizedParams,
      })
    )?.data;
    const pageCount = Object.keys(carResults).length;
    // if page is greater or equal (starts with 0) than pageCount, return first page
    const currentPage =
      normalizedParams.page >= pageCount ? 0 : normalizedParams.page;
    const carResultsForPage = carResults[currentPage];
    const offerCount = Object.values(carResults).reduce(
      (acc, curr) => acc + curr.length,
      0
    );
    for (const carResult of carResultsForPage) {
      if (carResult.istop) {
        topVehicles.data.push(carResult);
      } else {
        nonTopVehicles.data.push(carResult);
      }
    }
    return { models, topVehicles, nonTopVehicles, offerCount, pageCount };
  } catch (e) {
    console.error("🚀 ~ getCarResults ~ e", e);
    return { models, topVehicles, nonTopVehicles, offerCount: 0, pageCount: 0 };
  }
}
