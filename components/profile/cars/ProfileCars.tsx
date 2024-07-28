"use client";

import React, { useEffect } from "react";
import ResultCarCard from "../../shared/ResultCarCard";
import { fetchUserCars } from "../../../src/entities/user/api/userSlice";
import { useAppStore } from '@/app/GlobalRedux/store';
import VehicleResult from '@/src/entities/vehicle/ui/VehicleResult';
import { parseArrayFromString } from '@/src/shared/utils/parse-string';

const ProfileCars = () => {
  const [userCars, dispatch] = useAppStore((state) => state.user.cars);
  const [wishlist] = useAppStore((state) => state.user.wishlist);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserCars());
    };

    fetchData();
  }, [dispatch]);

  if (!userCars || userCars?.length === 0) {
    return <div className='h-full flex justify-center items-center'>Your ad listings will appear here</div>
  }

  return (
    <div className="flex flex-col space-y-3">
      {userCars?.map((car) => (
        <VehicleResult
          key={car.id}
          carDetails={car}
          imageFileNames={parseArrayFromString(car.imageurl)}
        />
      ))}
    </div>
  );
};

export default ProfileCars;
