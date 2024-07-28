'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  AT,
  BE,
  BG,
  CH,
  CY,
  CZ,
  DE,
  DK,
  EE,
  ES,
  FI,
  FR,
  GR,
  HR,
  HU,
  IE,
  IS,
  IT,
  LI,
  LT,
  LU,
  LV,
  MT,
  NL,
  NO,
  PL,
  PT,
  RO,
  SE,
  SI,
  SK,
  UA,
} from 'country-flag-icons/react/3x2';
import { MapPin } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  euCountries,
  euCountriesCities,
} from '@/src/entities/location/model/countries-cities';
import { useAppSelector } from '@/app/GlobalRedux/store';
import {
  getCityLS,
  getCountryLS,
  getLocationShortText,
  getNewLocationURL,
  setLocationLS,
  setLocation,
  setCountry,
  getLocationLS,
} from '@/src/entities/location';
import { RootState } from '@/app/GlobalRedux/store';
import { pageNamesWithoutLocation } from '@/src/entities/location';
import { useAppStore } from '@/app/GlobalRedux/store';
import { useIsMounted, useLocalStorage } from 'usehooks-ts';
const flagComponents: Record<string, any> = {
  AT: AT,
  BE: BE,
  BG: BG,
  CY: CY,
  CZ: CZ,
  DE: DE,
  DK: DK,
  EE: EE,
  ES: ES,
  FI: FI,
  FR: FR,
  GR: GR,
  HR: HR,
  HU: HU,
  IE: IE,
  IT: IT,
  LT: LT,
  LU: LU,
  LV: LV,
  MT: MT,
  NL: NL,
  PL: PL,
  PT: PT,
  RO: RO,
  SE: SE,
  SI: SI,
  SK: SK,
  IS: IS,
  LI: LI,
  NO: NO,
  CH: CH,
  UA: UA,
};

const locationAllButtons = [
  {
    name: 'All countries',
    code: 'all',
  },
  {
    name: 'All cities',
    code: 'all',
  },
];

interface LocationSelectProps {}

export default function LocationSelect({}: LocationSelectProps) {
  const dict = useAppSelector((state: RootState) => state.pageData.dict);
  const menu = dict?.navbar;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [regionModalOpen, setRegionModalOpen] = useState(false);
  const toggleRegionModal = () => setRegionModalOpen(!regionModalOpen);
  const [location, dispatch] = useAppStore((state) => state.location);
  const isMounted = useIsMounted()

  const [modalState, setModalState] = useState('country');
  const [cityList, setCityList] = useState<string[]>([]);
  const handleCountrySelect = (countryCode: string) => {
    const isAll = locationAllButtons[0].code === countryCode;
    if (isAll) {
      setLocationAndRedirect('all', 'all');
      setRegionModalOpen(false);
      return;
    }
    const countryNameFromCode =
      euCountries.find((country) => country.code === countryCode)?.name ||
      'all';
    dispatch(setCountry(countryNameFromCode));
    setCityList(euCountriesCities[countryCode]);
    setModalState('city');
  };
  const handleCitySelect = (cityName: string) => {
    if (!location.country) return;
    if (locationAllButtons[1].name === cityName) {
      setLocationAndRedirect(location.country, locationAllButtons[1].code);
    } else {
      setLocationAndRedirect(location.country, cityName);
    }
    setModalState('none');
    toggleRegionModal();
  };

  function setLocationAndRedirect(country: string, city: string) {
    dispatch(setLocation({ country, city }));
    setLocationLS({ country, city });
    if (
      pageNamesWithoutLocation.some((pageName) => pathname.includes(pageName))
    )
      return;
    const url = getNewLocationURL(
      pathname,
      searchParams?.toString(),
      city,
      country
    );
    router.replace(url);
  }
  const handleClose = () => {
    setRegionModalOpen(!regionModalOpen);
  };
  const fetchLocation = async (attempt = 1) => {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ip = ipData.ip;

      const locationResponse = await fetch(`https://ip-api.com/json/${ip}`);
      const locationData = await locationResponse.json();
      setLocationAndRedirect(locationData.country, locationData.city);
    } catch (error) {
      console.error(`Attempt ${attempt}: Failed to fetch location`, error);
      if (attempt < 5) {
        setTimeout(() => fetchLocation(attempt + 1), 2000);
      } else {
        throw new Error('Failed to obtain location after 10 attempts');
      }
    }
  };

  useEffect(() => {
    if (!getCountryLS() || !getCityLS()) {
      setRegionModalOpen(true);
      fetchLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const locationText = useMemo(
    () => getLocationShortText(location.country, location.city),
    [location]
  );
  return (
    <Dialog open={regionModalOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button
          onClick={toggleRegionModal}
          className="w-full p-2 items-center space-x-3 border-none shadow-none"
        >
          <MapPin width={16} height={16} />
          
          {// we get location from local storage so no render on server
            isMounted() && <Label
            className="text-foreground text-l"
          >
            
            {locationText}
          </Label>}
        </Button>
      </DialogTrigger>
      {modalState === 'country' ? (
        <DialogContent className="overflow-y-auto">
          <DialogTitle className="flex justify-between items-center p-4">
            <Label className="text-lg font-bold">{menu?.country}</Label>
            <Label className="md:hidden me-4 md:me-0 text-foreground text-l">
              Current location - {location.city}
            </Label>
          </DialogTitle>
          <div className="grid grid-cols-2 h-[500px] pb-5 md:h-full md:grid-cols-3 gap-4">
            {[...euCountries, locationAllButtons[0]].map((country) => {
              const isAll = locationAllButtons[0].name === country.name;
              const FlagIcon = isAll || flagComponents[country.code];

              return (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country.code)}
                  className="flex items-center space-x-2 pl-4 p-1 border rounded hover:bg-gray-100"
                >
                  {isAll || <FlagIcon className="w-5 h-auto" />}
                  <span>{country.name}</span>
                </button>
              );
            })}
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="overflow-y-auto max-h-[80vh]">
          <DialogTitle className="flex justify-between items-center p-4">
            <Label className="text-lg font-bold">{menu?.city}</Label>
            <Button
              onClick={() => setModalState('country')}
              className="p-2 border rounded me-4 md:me-0"
            >
              {menu?.country_select}
            </Button>
          </DialogTitle>
          <div className="grid grid-cols-3 gap-4">
            {[...cityList, locationAllButtons[1].name]?.map((city) => (
              <button
                key={city + 'button'}
                onClick={() => handleCitySelect(city)}
                className="p-2 border rounded hover:bg-gray-100"
              >
                {city}
              </button>
            ))}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
