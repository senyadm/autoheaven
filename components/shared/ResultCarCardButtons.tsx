import React from 'react'
import { Button } from '../ui/button'
import SvgIcon from '../SvgIcon'
import { Heart } from 'lucide-react'

const pageDisplayedToButtons = {
    cars: <>
      <Button className="bg-background text-primary hover:text-primary-foreground p-[0.625rem] mr-2">
                <Heart width={16} height={16} />
              </Button>
              <Button className="bg-primary text-secondary px-2 py-3">
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
    profileCars: <Button>
        Edit
    </Button>,
    profileAds: <>
      <Button className="bg-primary text-background p-[0.625rem] mr-2">
                <Heart width={16} height={16} fill='#fff'/>
              </Button>
              <Button className="bg-primary text-secondary px-2 py-3">
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
}

const ResultCarCardButtons = ({pageDisplayed}: {pageDisplayed: 'cars'}) => {
  return pageDisplayedToButtons[pageDisplayed];
}

export default ResultCarCardButtons