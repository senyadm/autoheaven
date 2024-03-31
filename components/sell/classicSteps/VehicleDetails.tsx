import { useAppStore } from '@/app/GlobalRedux/useStore';
import { SketchPicker } from 'react-color';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React, { useEffect, useMemo, useState } from 'react'
import { CarDetails, createCar, uploadImage } from '@/app/GlobalRedux/CreateCar/CreateCarSlice';
import { Input } from '@/components/ui/input';
import PhoneInput from 'react-phone-number-input'
import { Separator } from '@/components/ui/separator';
import 'react-phone-number-input/style.css'
import { Textarea } from '@/components/ui/textarea';
import SvgIcon from '@/components/SvgIcon';
import { SellClassicTranslations } from '@/types';

const defaultCarDetails = {
  type: '',
  body_type: '',
  color: '',
  year: new Date().getFullYear(),
  mileage: 0,
  gearbox: '',
  price: 0,
  description: '',
  fuel_consumption: '',
  horsepower: '',
  cubic_capacity: '',
  country_origin: '',
  interior_color: '',
  phone: '',
  vehicle_id: 0,
  title: '',
  fueltype: '',
  accidentfree: false,
  imageurl: '',
  drivetrain: '',
  istop: false
};


const VehicleDetails = ({ onNext, onPrevious, dict }: {onPrevious: () => void, onNext: (mode?: string) => void, dict: SellClassicTranslations | null}) => {
  const [store] = useAppStore(
    (state) => state?.createCarProgress
  );
  const [fileError, setFileError] = React.useState("");
  const [value, setValue] = useState<string | undefined>("")
  const [detailsData, setDetailsData] = useState<CarDetails>(defaultCarDetails);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const [hidden, setHidden] = React.useState(false),
  toggle = () => setHidden(!hidden);

  const areDetailsValid = () => {
    return  detailsData.year && detailsData.description;

  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    let errorMessage = "";
  
    if (files && files.length > 5) {
      errorMessage = "You can only upload up to 5 images.";
    } else if (files) {
      for (const file of files) {
        if (!["image/png", "image/jpeg", "image/gif"].includes(file.type)) {
          errorMessage = `The file type of ${file.name} is not allowed.`;
          break;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          errorMessage = `The file ${file.name} is too large.`;
          break;
        }
      }
    }
    if (!errorMessage && event.target.files) {
      setSelectedFiles(event.target.files);
    }

    if (errorMessage) {
      setFileError(errorMessage);
      event.target.value = '';
    } else {
      setFileError("");
    }
  };
  
const handleCreateCar = () => {
if (!areDetailsValid()) return;
  if (!store || !selectedFiles) return;
  const prev = {...store};

  const newDetails = {
    ...prev.details,
    phone: value || '',
    price: detailsData.price,
    mileage: detailsData.mileage,
    description: detailsData.description,
    accidentfree: detailsData.accidentfree
  };
  
  const newStore: any = {
    ...store,
    details: newDetails
  };

  createCar(newStore, selectedFiles)
  .then((res) => {
    console.log(res)
    uploadImage(res, selectedFiles[0])
    // window.location.href = '/success';
  })
  .catch((err) => {
    console.error(err);
  })
  onNext('final');
}

const checkIfEmpty = () => {
  if (!detailsData.description || !detailsData.mileage || !detailsData.price) return true;

  return false;
}

  return (
<Card className="w-full mx-auto bg-white border-none shadow-none">
  <CardContent className="border shadow-md rounded w-full p-8 space-y-6">
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
              <Label className='text-md text-foreground' htmlFor="filter2">{dict?.price || 'Price'}</Label>
              <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
            </div>
      <Input className='border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1'
        type="number"
        min={0}
        id="price"
        name="price"
        value={detailsData.price}
        onChange={(e) => setDetailsData({...detailsData, price: parseInt(e.target.value)})}
      />
      </div>
      <div className="space-y-2">
    <div className="flex items-center space-x-2">
              <Label className='text-md text-foreground' htmlFor="filter2">{dict?.mileage || 'Mileage'}</Label>
              <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
            </div>
      <Input className='border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1'
        type="number"
        min={0}
        id="mileage"
        name="mileage"
        value={detailsData.mileage}
        onChange={(e) => setDetailsData({...detailsData, mileage: parseInt(e.target.value)})}
      />
      </div>
      <div className="space-y-2">
      <div className="flex items-center space-x-2">
              <Label className='text-md text-foreground' htmlFor="filter2">{dict?.phone || 'Phone'}</Label>
              <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
            </div>
    <div className='flex justify-between flex-1 w-full'>
            <PhoneInput
            className='w-full border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1'
                international
                defaultCountry="CZ"
                value={value}
                onChange={setValue}
                style={{ paddingLeft: '10px' }}
             
            />
  
    </div>
</div>
      <div className="space-y-2">
    <div className="flex items-center space-x-2">
              <Label className='text-md text-foreground' htmlFor="filter2">{dict?.description || 'Description'}</Label>
              <SvgIcon filepath="/icons/car.svg" alt="" width={16} height={16} />
            </div>
      <Textarea className='border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1'
        maxLength={500}
        id="desc"
        name="desc"
        placeholder="Tell something nice about your car"
        value={detailsData.description}
        onChange={(e) => setDetailsData({...detailsData, description: e.target.value})}
      />
      <div className="flex justify-end bottom-2 right-3 text-xs text-muted-foreground">
              {`${detailsData.description.length}/500`}
            </div>
      </div>
      <Separator/>
<div className='flex justify-between items-center'>
      <Label className='text-md text-foreground'>{dict?.accidentFree || 'Accident Free'}</Label>
      <Checkbox
        id="accidentfree"
        name="accidentfree"
        checked={detailsData.accidentfree || false}
        onClick={() => setDetailsData({...detailsData, accidentfree: !detailsData.accidentfree})}
        className="col-span-2"
      />
</div>
<Separator/>
<div className="grid w-full items-center gap-5">
      <Label className='text-md text-foreground' htmlFor="picture">{dict?.pictures || 'Pictures'}</Label>
      <div className="grid grid-cols-1 gap-4">   {fileError && (
        <div className="text-red-500 text-sm">
          {fileError}
        </div>
      )}
      <Input className={fileError ? 'border-red-500' : 'border-input'} id="picture" multiple onChange={handleFileSelection}  accept='image/png, image/jpeg'  type="file" />
      </div>
    </div>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button onClick={onPrevious} className="mt-4">
    {dict?.previous || 'Previous'}
    </Button>
    <Button disabled={checkIfEmpty()} onClick={handleCreateCar} className="mt-4">
       {dict?.create || 'Create ad'}
    </Button>
  </CardFooter>
</Card>
  )
}
export default VehicleDetails