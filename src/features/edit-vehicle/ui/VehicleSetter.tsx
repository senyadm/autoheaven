"use client";
import { useEffect, ReactNode } from "react";
import { useAppDispatch } from "../../../../app/GlobalRedux/useStore";
import { setCar } from "../../../../app/GlobalRedux/CreateCar/CreateCarSlice";
import { Vehicle } from "../../../entities/vehicle";

interface VehicleSetterProps {
  car: Vehicle;
  children: ReactNode;
}

const VehicleSetter = ({ car, children }: VehicleSetterProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCar(car));
  }, [car, dispatch]);

  return children;
};

export default VehicleSetter;
