"use client"
import ResultCarCard from '@/components/shared/ResultCarCard';
import VehicleActionButtons from '@/components/shared/VehicleActionButtons';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import PhoneNumber from '@/src/entities/user/ui/PhoneNumber';
import {
  VehicleAnyOnCard,
  VehicleOnCard,
} from '@/src/entities/vehicle';
import DetailsTable from '@/src/entities/vehicle/ui/details';
import { OptionalCarousel } from '@/src/entities/vehicle/ui/VehicleImage';
import { useMediaQuery } from 'usehooks-ts';
interface VehicleResultProps {
  carDetails: VehicleOnCard;
  imageFileNames: string[];
}

// avoid hydration error by not placing crousel prev,next buttons inside drawer which is also a button
export default function VehicleResult(props: VehicleResultProps) {
  const {
    make,
    type,
    year,
    price,
    fuel,
    bodyStyle,
    gear,
    drivetrain,
    model,
    id,
    description,
  } = props.carDetails;
  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (isDesktop) {
    return <div className="relative">
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute w-full h-full"></div>
      </DialogTrigger>
    
        <DialogContent className="overflow-y-auto h-2/3">
            <DialogHeader className="p-0">
              <DialogTitle>
                {make} {model}
              </DialogTitle>
              <DialogClose />
              <OptionalCarousel
                imageFileNames={props.imageFileNames}
                imageOptions={{ fill: true }}
              />
            </DialogHeader>
            <Card className="p-2 space-y-1 my-2">
              <CardHeader>
                <CardTitle className="text-md">
                  Seller&apos;s description
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className=" text-foreground">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
            <DetailsTable vehicleDetails={props.carDetails} />

            <DialogFooter className="flex flex-row justify-between w-full">
              <PhoneNumber
                phone_number={props.carDetails.phone_number}
                className="z-10"
              />
              <VehicleActionButtons carDetails={props.carDetails} />
            </DialogFooter>
        </DialogContent>
    </Dialog>
    <ResultCarCard
      imageFileNames={props.imageFileNames}
      carDetails={props.carDetails}
    />
  </div>
  }
    
  return (
    <div className="relative">
      <Drawer>
        <DrawerTrigger asChild>
          <div className="absolute w-full h-full"></div>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay className="fixed inset-0 bg-black/40" />
          <DrawerContent className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
            <div className="max-w-md w-full mx-auto flex flex-col overflow-auto rounded-t-[10px]">
              <DrawerHeader className="p-0">
                <DrawerTitle>
                  {make} {model}
                </DrawerTitle>
                <DrawerClose />
                <OptionalCarousel
                  imageFileNames={props.imageFileNames}
                  imageOptions={{ fill: true }}
                />
              </DrawerHeader>
              <Card className="p-2 space-y-1 my-2">
                <CardHeader>
                  <CardTitle className="text-md">
                    Seller&apos;s description
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription className=" text-foreground">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
              <DetailsTable vehicleDetails={props.carDetails} />

              <DrawerFooter className="flex flex-row justify-between w-full">
                <PhoneNumber
                  phone_number={props.carDetails.phone_number}
                  className="z-10"
                />
                <VehicleActionButtons carDetails={props.carDetails} />
              </DrawerFooter>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
      <ResultCarCard
        imageFileNames={props.imageFileNames}
        carDetails={props.carDetails}
      />
    </div>
  );
}
