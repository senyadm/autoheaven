"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import VehicleTypeSelection from '@/components/sell/classicSteps/VehicleTypeSelection';
import BrandSelection from '@/components/sell/classicSteps/BrandSelection';
import VehicleDetails from '@/components/sell/classicSteps/VehicleDetails';
import ModelSelection from '@/components/sell/classicSteps/ModelSelection';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface VehicleCreateParams {
    vehicleType: string;
    brand: string;
    model: string;
    year: number;
}

const steps = ['vehicleType', 'brand', 'model', 'details'];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<VehicleCreateParams>({} as VehicleCreateParams);
  const router = useRouter();

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
  <Card className="w-full max-w-4xl mx-auto mb-32 bg-white border-none shadow-none mt-4">
    <CardContent>
      <Label className="text-sm mb-4 text-primary block text-center">Getting started</Label>
      <Progress value={progress} className="h-4 w-full" />
      {currentStep === 0 && <VehicleTypeSelection onNext={nextStep} />}
      {currentStep === 1 && <BrandSelection onNext={nextStep} onPrevious={previousStep} />}
      {currentStep === 2 && <ModelSelection onNext={nextStep} onPrevious={previousStep} />}
      {currentStep === 3 && <VehicleDetails onPrevious={previousStep} />}
    </CardContent>
  </Card>
</div>
  );
};

export default MultiStepForm;

