"use client";
import { useEffect, ReactNode } from "react";
import { setCar } from "../../../../app/GlobalRedux/CreateCar/CreateCarSlice";
import { Vehicle } from "../../../entities/vehicle";
import { setParams } from "@/src/shared/model/page-data";
import { useAppDispatch } from '@/app/GlobalRedux/store';

interface VehicleSetterProps {
  car: Vehicle;
  children: ReactNode;
  params: any;
}

const VehicleSetter = ({ car, children, params }: VehicleSetterProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCar(car));
    dispatch(setParams(params))
  }, [car, dispatch, params]);

  return children;
};

export default VehicleSetter;
