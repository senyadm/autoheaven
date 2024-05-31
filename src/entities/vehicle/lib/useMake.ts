"use client";
import { useAppSelector } from "../../../../app/GlobalRedux/store";
import { VehicleType } from "../../../shared/model/params";

export function useMake() {
  const createCarProgress = useAppSelector((state) => state?.createCarProgress);
  let isMakeChosen = false;
  if (createCarProgress.carType === VehicleType.Car && createCarProgress.make) {
    isMakeChosen = true;
  }
  if (
    createCarProgress.carType !== VehicleType.Car &&
    createCarProgress.make_id
  ) {
    isMakeChosen = true;
  }
  return { isMakeChosen };
}
