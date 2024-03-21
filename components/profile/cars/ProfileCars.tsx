"use client";

import React, { useEffect } from "react";
import ResultCarCard from "../../shared/ResultCarCard";
import { fetchUserCars } from "../../../app/GlobalRedux/profile/userSlice";
import { useAppStore } from "../../../app/GlobalRedux/useStore";

const ProfileCars = () => {
  const [userCars, dispatch] = useAppStore((state) => state.user.cars);
  const [wishlist] = useAppStore((state) => state.user.wishlist);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserCars());
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-3">
      {userCars?.map((car) => (
        <ResultCarCard
          carDetails={car}
          pageDisplayed="profileCars"
          key={car.id}
        />
      ))}
    </div>
  );
};

export default ProfileCars;
