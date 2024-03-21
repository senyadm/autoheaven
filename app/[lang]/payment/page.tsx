'use client'
import PaymentConfirm from '@/components/profile/cars/PaymentConfirm'
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Loading from '../profile/loading';

const PAYMENT_OPTIONS = [
    {
        price: '0.99€',
        label: '1 Day',
        code: 'days'
    },
    {
        price: '1.99€',
        label: '1 Week',
        code: 'week'
    },
    {
        price: '3.99€',
        label: '1 Month',
        code: 'month'
    }
    
]
const amountInCents = {
    days: 99,
    week: 199,
    month: 399,
    null: 0
}

const Payment = () => {
  const [option, setOption] = useState<'days' | 'week' | 'month'>('days');
  const [hoveredIcon, setHoveredIcon] = useState(-1);
  const [loading, setLoading] = useState(true);
  const toggleLoading = () => setLoading(!loading);
 const amount = amountInCents[option];
    console.log(amount)
  return (
    <Card className="flex justify-center flex-col mx-auto bg-white border-none shadow-none h-full">
    <CardHeader>
      <CardTitle className='text-center text-foreground'>
        Choose an Option
      </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center border shadow-md border-rounded">
    <div className="w-[300px]">
    <div className="flex flex-row justify-center align-items-center justify-between mb-5">
          {PAYMENT_OPTIONS.map((item, index) => (
             <div key={item.price} className="flex flex-col items-center w-[75px]">
                         <Label className="text-sm mb-1 font-bold">
                {item.label}
         </Label>
             <button
                onClick={() => {
                    setOption(item.code as any);
                    if (option !== item.code) toggleLoading();
                }}
                onMouseEnter={() => setHoveredIcon(index)}
                onMouseLeave={() => setHoveredIcon(-1)} className={`
                border border-border
                flex items-center justify-center rounded-md px-2 w-[80px] py-1.5 text-sm transition-transform duration-300
                ${hoveredIcon === index ? "bg-secondary" : "bg-background"}
                ${
                    option === item.code
                      ? "border-2 border-primary"
                      : "border border-border"
                  } 
                `}>
                <span>{item.price}</span>
         </button>
         </div> 
          ))

        }
        </div>
        <div className="block bottom 10 mt-10">

                    <PaymentConfirm loading={loading} toggleLoading={toggleLoading} amount={amount}/>

    
    </div>
    </div>
    </CardContent>
  </Card>
  )
}

export default Payment