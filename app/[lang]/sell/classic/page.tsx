"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import VehicleTypeSelection from '@/components/sell/classicSteps/VehicleTypeSelection';
import BrandSelection from '@/components/sell/classicSteps/BrandSelection';
import VehicleDetails from '@/components/sell/classicSteps/VehicleDetails';
import ModelSelection from '@/components/sell/classicSteps/ModelSelection';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import  VehicleModification  from '@/components/sell/classicSteps/Modifications';
import { getlocales } from '@/app/actions';
import { Locale } from '@/i18n.config';
import { SellClassicTranslations } from '@/types';
interface VehicleCreateParams {
    vehicleType: string;
    brand: string;
    model: string;
    year: number;
}

const steps = ['vehicleType', 'brand', 'model', 'modifications', 'details'];

const MultiStepForm = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<VehicleCreateParams>({} as VehicleCreateParams);
  const [dict, setDict] = useState<SellClassicTranslations | null>(null)
  useEffect(() => {
    async function fetchData() {
      try {
        const { sell: { classic } } = await getlocales(lang)
        setDict(classic)
      } catch (error) {
        console.error('Error fetching tools data:', error)
      }
    }

    if (!dict) {
      fetchData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
        console.log(formData);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
<div className="flex flex-col justify-end items-stretch px-4 py-6 bg-background">
  <Card className="w-full max-w-2xl mx-auto mb-32 bg-white border-none shadow-none mt-4">
    <CardContent>
      <Label className="text-lg mb-4 text-primary block text-center">{!currentStep ? dict?.title || 'Get Started' : currentStep === 1 ? dict?.brand || 'Brand' : currentStep === 2 ? dict?.model || 'Model' : currentStep === 2 ? dict?.mod || 'Modification' : dict?.details || 'Details'}</Label>
      <Progress value={progress} className="h-4 w-full" />
      {currentStep === 0 && <VehicleTypeSelection onNext={nextStep} dict={dict}/>}
      {currentStep === 1 && <BrandSelection onNext={nextStep} onPrevious={previousStep} dict={dict}/>}
      {currentStep === 2 && <ModelSelection onNext={nextStep} onPrevious={previousStep} dict={dict}/>}
      {currentStep === 3 && <VehicleModification onNext={nextStep} onPrevious={previousStep} dict={dict}/>}
      {currentStep === 4 && <VehicleDetails onNext={nextStep} onPrevious={previousStep} dict={dict}/>}
    </CardContent>
  </Card>
</div>
  );
};

export default MultiStepForm;

