import { getCars } from "../../../shared/api";

export async function fetchImageFileNames(
  car_listing_id: number
): Promise<string[]> {
  try {
    const res = await getCars(`/api/cars/images/${car_listing_id}`);
    return res;
  } catch (e) {
    console.error("Error fetching image file names:", e);
    throw e;
  }
}
export async function getIdToFileNameObject(
  carResults
): Promise<Record<number, string[]>> {
  const imageFileNamePromises = carResults.map((carResult) =>
    fetchImageFileNames(carResult.id)
  );
  const imageFileNames = await Promise.allSettled(imageFileNamePromises);
  let idToFileName = {};
  for (let i = 0; i < carResults.length; i++) {
    idToFileName[carResults[i].id] = imageFileNames[i].value;
  }

  return idToFileName;
}
