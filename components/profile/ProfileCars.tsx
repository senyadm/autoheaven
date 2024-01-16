import { ResultCarCardInterface } from "@/interfaces/ResultCarCard";
import React, { useContext, useEffect } from "react";
import ResultCarCard from "../shared/ResultCarCard";
import { fetchUserCars } from "../../app/GlobalRedux/profile/userSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../app/GlobalRedux/store";
import { useAppStore } from "../../app/GlobalRedux/useStore";
import { LoadingContext } from "../context/LoadingProvider";
import LoadingSpinner from "../shared/LoadingSpinner";

const volkswagenCar4: ResultCarCardInterface = {
  title: "Volkswagen Golf VII Lim. GTI Performance Airride Dynaudio",
  price: 21500,
  releaseYear: 2014,
  mileage: 10000,
  fuelType: "petrol",
  drivetrain: "fwd",
  bodyStyle: "sedan",
  gear: "automatic",
  accidentFree: true,
  imageURL: "/img/cars/Preview.png",
  id: 1,
  isTop: true,
};
const volkswagenCar2: ResultCarCardInterface = {
  title: "Volkswagen Golf VII Lim. GTI Performance Airride Dynaudio",
  price: 21500,
  releaseYear: 2014,
  mileage: 10000,
  fuelType: "petrol",
  drivetrain: "fwd",
  bodyStyle: "sedan",
  gear: "automatic",
  accidentFree: true,
  imageURL: "/img/cars/volkswagen2.png",
  id: 2,
  isTop: true,
};
const volkswagenCar3: ResultCarCardInterface = {
  title: "Volkswagen Golf VII Lim. GTI Performance Airride Dynaudio",
  price: 21500,
  releaseYear: 2014,
  mileage: 10000,
  fuelType: "petrol",
  drivetrain: "fwd",
  bodyStyle: "sedan",
  gear: "automatic",
  accidentFree: false,
  imageURL: "/img/cars/volkswagen3.png",
  id: 3,
  isTop: true,
};

const ProfileCars = () => {
  const [userCars, dispatch] = useAppStore((state) => state.user.cars);
  const [wishlist] = useAppStore((state) => state.user.wishlist);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchUserCars());
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch, setIsLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner className="w-[25%] h-[25%]" strokeWidth={1} />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      {userCars.map((car) => (
        <ResultCarCard
          {...car}
          pageDisplayed="profileCars"
          isFavorite={wishlist.includes(car.id)}
          key={car.id}
        />
      ))}
    </div>
  );
};

export default ProfileCars;
