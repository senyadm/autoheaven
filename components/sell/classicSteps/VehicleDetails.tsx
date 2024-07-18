import { useAppStore } from "@/app/GlobalRedux/useStore";
import { SketchPicker } from "react-color";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { useEffect, useMemo, useState } from "react";
import {
  CarDetails,
  createCar,
  editCar,
  setDetails,
  uploadImages,
} from "@/app/GlobalRedux/CreateCar/CreateCarSlice";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import { Separator } from "@/components/ui/separator";
import "react-phone-number-input/style.css";
import { Textarea } from "@/components/ui/textarea";
import SvgIcon from "@/components/SvgIcon";
import { SellClassicTranslations } from "@/types";
import { getFiles } from "../../../src/features/upload-files";
import { toast } from "sonner";
import { useAppSelector } from "@/app/GlobalRedux/store";
const defaultCarDetails = {
  type: "",
  body_type: "",
  color: "",
  year: new Date().getFullYear(),
  mileage: 0,
  gearbox: "",
  price: 0,
  description: "",
  fuel_consumption: "",
  horse_power: "",
  cubic_capacity: "",
  country_origin: "",
  interior_color: "",
  phone: "",
  vehicle_id: 0,
  title: "",
  fueltype: "",
  accidentfree: false,
  imageurl: "",
  drivetrain: "",
  istop: false,
};

interface VehicleDetailsProps {
  onNext: (mode?: string) => void;
  onPrevious: () => void;
  action?: "create" | "edit";
}

const VehicleDetails = ({
  onNext,
  onPrevious,
  action = "create",
}: {
  onPrevious: () => void;
  onNext: (mode?: string) => void;
  dict: SellClassicTranslations | null;
}) => {
  const [store, dispatch] = useAppStore((state) => state?.createCarProgress);
  const [fileError, setFileError] = React.useState("");
  const [value, setValue] = useState<string | undefined>("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const {dict, params} = useAppSelector(state => state.pageData)
  const [hidden, setHidden] = React.useState(false),
    toggle = () => setHidden(!hidden);

  const areDetailsValid = () => {
    return store.details.year && store.details.description;
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files, errorMessage } = getFiles(event);
    if (!errorMessage && files) {
      setSelectedFiles(files);
    }

    if (errorMessage) {
      setFileError(errorMessage);
      event.target.value = "";
    } else {
      setFileError("");
    }
  };

  const handleSubmit = () => {
    if (!areDetailsValid()) return;
    if (!store) return;
    if (action === "create" && !selectedFiles) return;
      // const prev = { ...store };

      // const newStore: any = {
      //   ...store,
      //   details: newDetails,
      // };
      toast("Loading data. Please wait.");
      async function createFn(){
        if (!selectedFiles) throw new Error("No files selected for upload");
        return await createCar(store, selectedFiles);
      }
      async function editFn(){
        if(!params?.productId) throw new Error("No listing id provided for editing");
        return await editCar(params.productId, store, selectedFiles)
      }
    const submitFunction = action === "create" ? createFn : editFn;
    submitFunction()
      .then((res) => {
        toast("Your car listing has been processed.");

        uploadImages(res?.data?.id, store.carType, selectedFiles)
          .then((res) => {
            toast("Images uploaded successfully.");
            onNext("final");
          })
          .catch((err) => {
            toast("An error has happened while uploading images.");
            console.error(err);
          });
      })
      .catch((err) => {
        toast("An error has happened.");

        console.error(err);
      });
  };

  const checkIfEmpty = () => {
    if (
      !store.details.description ||
      !store.details.mileage ||
      !store.details.price
    )
      return true;

    return false;
  };
  function changeDetails(keyValuePair: Partial<CarDetails>) {
     dispatch(setDetails({...store.details, ...keyValuePair}))
  }
  const {price, accidentfree,description, mileage} = store.details

  return (
    <Card className="w-full mx-auto bg-white border-none shadow-none">
      <CardContent className="border shadow-md rounded w-full p-8 space-y-6">
        {/* <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-md text-foreground" htmlFor="title">
              {"Title"}
            </Label>
            <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
          </div>
          <Input
            className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
            type="text"
            id="title"
            name="title"
            value={detailsData.title}
            onChange={(e) =>
              setDetailsData({
                ...detailsData,
                title: e.target.value,
              })
            }
          />
        </div> */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-md text-foreground" htmlFor="filter2">
              {`${dict?.price || "Price"} €`}
            </Label>
            <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
          </div>
          <Input
            className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
            type="number"
            min={0}
            id="price"
            name="price"
            value={price}
            onChange={(e) =>
              changeDetails({price: parseInt(e.target.value)})
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-md text-foreground" htmlFor="filter2">
              {dict?.mileage || "Mileage"}
            </Label>
            <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
          </div>
          <Input
            className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
            type="number"
            min={0}
            id="mileage"
            name="mileage"
            value={mileage}
            onChange={(e) =>
              changeDetails({
                mileage: parseInt(e.target.value),
              })
            }
          />
        </div>
        {/* <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-md text-foreground" htmlFor="filter2">
              {dict?.phone || "Phone"}
            </Label>
            <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
          </div>
          <div className="flex justify-between flex-1 w-full">
            <PhoneInput
              className="w-full border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
              international
              defaultCountry="CZ"
              value={value}
              onChange={setValue}
              style={{ paddingLeft: "10px" }}
            />
          </div>
        </div> */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-md text-foreground" htmlFor="filter2">
              {dict?.description || "Description"}
            </Label>
            <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
          </div>
          <Textarea
            className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
            maxLength={500}
            id="desc"
            name="desc"
            placeholder="Tell something nice about your car"
            value={description}
            onChange={(e)=>changeDetails({description: e.target.value })
            }
          />
          <div className="flex justify-end bottom-2 right-3 text-xs text-muted-foreground">
            {`${description.length}/500`}
          </div>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <Label className="text-md text-foreground">
            {dict?.accidentFree || "Accident Free"}
          </Label>
          <Checkbox
            id="accidentfree"
            name="accidentfree"
            checked={accidentfree || false}
            onClick={() =>
              changeDetails({
                accidentfree: !accidentfree,
              })
            }
            className="col-span-2"
          />
        </div>
        <Separator />
        <div className="grid w-full items-center gap-5">
          <Label className="text-md text-foreground" htmlFor="picture">
            {dict?.pictures || "Pictures"}
          </Label>
          <div className="grid grid-cols-1 gap-4">
            {" "}
            {fileError && (
              <div className="text-red-500 text-sm">{fileError}</div>
            )}
            <Input
              className={fileError ? "border-red-500" : "border-input"}
              id="picture"
              multiple
              onChange={handleFileSelection}
              accept="image/png, image/jpeg"
              type="file"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onPrevious} className="mt-4">
          {dict?.previous || "Previous"}
        </Button>
        <Button
          disabled={checkIfEmpty()}
          onClick={handleSubmit}
          className="mt-4"
        >
          {action === "create" ? (dict?.create || "Create ad") : ("Confirm changes")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleDetails;
