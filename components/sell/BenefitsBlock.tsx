import { BadgeCheck, Zap } from 'lucide-react';
import React from 'react'
import { Card, CardContent } from '../ui/card';
import StarRating from './StarRating';

const Benefits = [
  {
    title: "Some Benefit",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis sodales gravida. Lorem ipsum dolor sit amet, consectetur adipiscing",
    classic: 3,
    direct: 5,
  },
  {
    title: "Some Benefit",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis sodales gravida. Lorem ipsum dolor sit amet, consectetur adipiscing",
    classic: 3,
    direct: 5,
  },
  {
    title: "Some Benefit",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis sodales gravida. Lorem ipsum dolor sit amet, consectetur adipiscing",
    classic: 1,
    direct: 4,
  },
  {
    title: "Some Benefit",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis sodales gravida. Lorem ipsum dolor sit amet, consectetur adipiscing",
    classic: 2,
    direct: 5,
  },
];
const iconDimensions = {
  width: "32",
  height: "32",
};
const BenefitsBlock = () => {
  return (
    <Card className="w-[1008px] mt-8 h-min bg-primary-foreground border border-primary text-primary-foreground p-3">
      <CardContent className="p-0">
        <table className="text-2xl font-semibold border-separate border-spacing-x-6 border-spacing-y-9">
          <thead className="text-primary">
            <tr>
              <th></th>
              {
              [{
                element: 
                <BadgeCheck
                  {...iconDimensions}
                  key="badge_check"
                />,
                title: "Classic"
              },
               { 
                element: <Zap {...iconDimensions} key="zap" />,
                title: "Direct" 
              }
              ].map((icon) => (
                <th key={icon.element.key + "th"}>
                  <div className="flex justify-center items-center space-x-2">
                    {icon.element}
                    <div>{icon.title}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Benefits.map((benefit, index) => (
              <tr key={index}>
                <td>
                  <div className="flex flex-col">
                    <div className="text-foreground">
                      {
                        //semibold 24
                      }
                      {benefit.title}
                    </div>
                    <div className="text-muted-foreground text-base font-normal">
                      {benefit.content}
                    </div>
                  </div>
                </td>
                <td>
                  <StarRating rating={benefit.classic} />
                </td>
                <td>
                  <StarRating rating={benefit.direct} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div></div>
      </CardContent>
    </Card>
  );
}

export default BenefitsBlock