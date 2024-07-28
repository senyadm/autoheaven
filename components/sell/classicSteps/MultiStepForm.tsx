"use client";

import { Progress } from "@/components/ui/progress";
import VehicleTypeSelection from "@/components/sell/classicSteps/VehicleTypeSelection";
import VehicleDetails from "@/components/sell/classicSteps/VehicleDetails";
import ModelSelection from "@/components/sell/classicSteps/ModelSelection";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import VehicleModification from "@/components/sell/classicSteps/Modifications";
import { SellClassicTranslations } from "@/types";
import VehicleSpecs from "@/components/sell/classicSteps/VehicleSpecs";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/GlobalRedux/store";
import { VehicleType } from "../../../src/shared/model/params";
import BodyTypeSelection from "./BodyTypeSelection";
import MakeSelection from "@/components/sell/classicSteps/MakeSelection";
import { useRouter } from "next/navigation";
import { get } from "http";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { fetchVehicleUIData } from "../../../src/entities/vehicle";

interface VehicleCreateParams {
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
}

enum Step {
  VehicleTypeSelection,
  BrandSelection,
  ModelSelection,
  BodyTypeSelection,
  ModificationSelection,
  SpecsSelection,
  DetailsSelection,
  Success,
}
function getSteps(carType: VehicleType) {
  return carType === VehicleType.Car
    ? [
        Step.VehicleTypeSelection,
        Step.BrandSelection,
        Step.ModelSelection,
        Step.BodyTypeSelection,
        Step.ModificationSelection,
        Step.SpecsSelection,
        Step.DetailsSelection,
        Step.Success,
      ]
    : [
        Step.VehicleTypeSelection,
        Step.BrandSelection,
        Step.BodyTypeSelection,
        Step.ModificationSelection,
        Step.SpecsSelection,
        Step.DetailsSelection,
        Step.Success,
      ];
}

interface MultiStepFormProps {
  action?: "create" | "edit";
}

const MultiStepForm = ({ action = "create" }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [staticVehicleData, setStaticVehicleData] = useState<any>(null);
  const carType = useAppSelector((state) => state.createCarProgress.carType);
  const dict = useAppSelector((state) => state.pageData.dict?.sell?.classic);
  useEffect(() => {
    async function fn() {
      const d = await fetchVehicleUIData(carType as VehicleType);
      setStaticVehicleData(d);
    }
    fn();
  }, [carType]);
  if (!staticVehicleData) return null;
  const steps = getSteps(carType);
  const maxSteps = steps.length;
  const nextStep = () => {
    if (currentStep < maxSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / (maxSteps - 1)) * 100;
  function getComponent(step) {
    switch (step) {
      case Step.VehicleTypeSelection:
        return {
          title: "Get Started",
          content: (
            <VehicleTypeSelection
              key="VehicleTypeSection"
              onNext={nextStep}
              dict={dict}
            />
          ),
        };
      case Step.BrandSelection:
        return {
          title: dict?.brand || "Brand",
          content: (
            <MakeSelection
              key="MakeSelection"
              onNext={nextStep}
              onPrevious={previousStep}
              dict={dict}
              staticVehicleData={staticVehicleData}
            />
          ),
        };
      case Step.ModelSelection:
        return {
          title: dict?.model || "Model",
          content: (
            <ModelSelection
              key="ModelSection"
              onNext={nextStep}
              onPrevious={previousStep}
              dict={dict}
              staticVehicleData={staticVehicleData}
            />
          ),
        };
      case Step.BodyTypeSelection:
        return {
          title: "Vehicle Body Type",
          content: (
            <BodyTypeSelection
              key="BodyTypeSection"
              onNext={nextStep}
              onPrevious={previousStep}
              dict={dict}
              types={staticVehicleData.types}
            />
          ),
        };
      case Step.ModificationSelection:
        return {
          title: dict?.mod || "Modification",
          content: (
            <VehicleModification
              key="ModificationSection"
              onNext={nextStep}
              onPrevious={previousStep}
              dict={dict}
            />
          ),
        };
      case Step.SpecsSelection:
        return {
          title: "Specification",
          content: (
            <VehicleSpecs
              key="SpecsSection"
              onNext={nextStep}
              onPrevious={previousStep}
              dict={dict}
            />
          ),
        };
      case Step.DetailsSelection:
        return {
          title: dict?.details || "Details",
          content: (
            <VehicleDetails
              key="DetailsSection"
              onNext={nextStep}
              onPrevious={previousStep}
              dict={dict}
              action={action}
            />
          ),
        };
      case Step.Success:
        return {
          title: "Your ad has been successfully created",
          content: (
            <div>
              <h1>Success! </h1>
            </div>
          ),
        };
      default:
        return {
          title: "Get Started",
          content: (
            <VehicleTypeSelection
              key="VehicleTypeSection"
              onNext={nextStep}
              dict={dict}
            />
          ),
        };
    }
  }
  const currentComponent = getComponent(steps[currentStep]);
  return (
    <div className="flex flex-col justify-end items-stretch px-4 md:py-6 bg-background">
      <Card className="w-full max-w-2xl mx-auto mb-32 bg-white border-none shadow-none mt-4">
        <CardContent>
          <Label className="text-lg mb-4 text-primary block text-center">
            {currentComponent.title}
          </Label>
          <Progress value={progress} className="h-4 w-full md:mb-0 mb-4" />

          {currentComponent.content}
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepForm;
