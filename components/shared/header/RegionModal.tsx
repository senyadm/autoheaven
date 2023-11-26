import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { euCountries } from './countries';

export const CountrySelectDialog = ({ show, toggleRegionModal }: {show: boolean, toggleRegionModal: () => void}) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  return (
    <Dialog open={show}>
      <DialogTrigger asChild>
        <button>Select Country</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Choose a Country</DialogTitle>
        <ul>
          {euCountries.map((country) => (
            <li key={country.code}>
              <button onClick={() => setSelectedCountry(country.name)}>
                {country.name}
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
