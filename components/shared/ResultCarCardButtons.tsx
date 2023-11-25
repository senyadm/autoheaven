import React from 'react'
import { Button } from '../ui/button'
import SvgIcon from '../SvgIcon'
import { Heart } from 'lucide-react'

type PageDisplayed = 'cars' | 'profileCars' | 'profileAds';

interface ResultCarCardButtonsProps {
  pageDisplayed: PageDisplayed;
  onButtonClick: (buttonType: string) => void;
  isWish?: boolean;
}


const ResultCarCardButtons: React.FC<ResultCarCardButtonsProps> = ({pageDisplayed, onButtonClick, isWish = false}) => {
  const pageDisplayedToButtons = {
    cars: <>
      <Button className={` text-primary hover:text-primary-foreground p-[0.625rem] mr-2
      ${isWish ? 'bg-red' : 'bg-background'}`} onClick={() => onButtonClick('like')}>
        <Heart width={16} height={16} />
      </Button>
      <Button className="bg-primary text-secondary px-2 py-3" onClick={() => onButtonClick('contact')}>
        <SvgIcon
          filepath="/icons/cars/envelope-closed.svg"
          width={16}
          height={16}
          alt=""
          className="invert mr-2"
        />
        Contact
      </Button>
    </>,
    profileCars: <Button onClick={() => onButtonClick('edit')}>
      Edit
    </Button>,
    profileAds: <>
      <Button className="bg-primary text-background p-[0.625rem] mr-2" onClick={() => onButtonClick('like')}>
        <Heart width={16} height={16} fill='#fff'/>
      </Button>
      <Button className="bg-primary text-secondary px-2 py-3" onClick={() => onButtonClick('contact')}>
        <SvgIcon
          filepath="/icons/cars/envelope-closed.svg"
          width={16}
          height={16}
          alt=""
          className="invert mr-2"
        />
        Contact
      </Button>
    </>,
  };
  return pageDisplayedToButtons[pageDisplayed];
}

export default ResultCarCardButtons