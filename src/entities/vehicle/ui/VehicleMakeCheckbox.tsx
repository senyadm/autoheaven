"use client";
import { Checkbox } from "../../../../components/ui/checkbox";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../app/GlobalRedux/store";
import { setBrand } from "../../../../app/GlobalRedux/CreateCar/CreateCarSlice";
import { VehicleType } from "../../../shared/model/params";

const CarCheckbox = ({ make }: { make: string }) => {
  const chosenMake = useAppSelector((state) => state?.createCarProgress?.make);
  const dispatch = useAppDispatch();
  return (
    <div key={make} className="my-1">
      <Checkbox
        isRounded={true}
        id={`make-${make}`}
        name="make"
        checked={chosenMake === make}
        onClick={() => dispatch(setBrand(make))}
        className="mr-2"
      />
      <label htmlFor={`make-${make}`}>{make}</label>
    </div>
  );
};
interface Make {
  make_name: string;
  id: string;
}
const DefaultCheckbox = ({ make }: { make: Make }) => {
  const chosenMakeId = useAppSelector(
    (state) => state?.createCarProgress?.make_id
  );
  const dispatch = useAppDispatch();
  return (
    <div key={make.make_name} className="my-1">
      <Checkbox
        isRounded={true}
        id={`make-${make.id}`}
        name="make"
        checked={chosenMakeId === make.id}
        onClick={() => dispatch(setBrand(make.id))}
        className="mr-2"
      />
      <label htmlFor={`make-${make.id}`}>{make.make_name}</label>
    </div>
  );
};

const VehicleMakeCheckbox = ({ make }: { make: Make | string }) => {
  const carType = useAppSelector((state) => state?.createCarProgress?.carType);
  return carType === VehicleType.Car ? (
    <CarCheckbox make={make as string} />
  ) : (
    <DefaultCheckbox make={make as Make} />
  );
};
export default VehicleMakeCheckbox;
