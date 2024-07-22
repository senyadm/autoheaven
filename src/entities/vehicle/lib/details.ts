import { VehicleAny, VehicleAnyOnCard, VehicleOnCard } from '@/src/entities/vehicle/model/vehicle';
import { a } from '@react-spring/web';

type UserFriendlyVehicleDetails = Record<keyof VehicleAnyOnCard, string | number | boolean | null>;

const propsInfo = [{
    props: ["price"],
    pre: "€ ",
    post: ""
},
    {
        props: ["consumption_summer", "consumption_winter", "consumption_highway"],
        pre: "",
        post: " l/100km"
    },
    {
        props: ["mileage"],
        pre: "",
        post: " km"
    }
]
const booleanProps = ["accidentfree", "istop"];

const transmission = {
    auto: "Automatic",
    manual: "Manual"
}

export function getUserFriendlyVehicleDetails(vehicle: VehicleAnyOnCard): UserFriendlyVehicleDetails { 
    const userFriendlyVehicle: UserFriendlyVehicleDetails = {...vehicle};
    userFriendlyVehicle.price = vehicle.price + " €";
    for (const { props, pre, post } of propsInfo) {
        for(const prop of props) {
            if (vehicle[prop]) userFriendlyVehicle[prop] = pre + vehicle[prop] + post;
        }
    }
    if (typeof vehicle.accidentfree === "boolean") userFriendlyVehicle.accidentfree = vehicle.accidentfree ? "Yes" : "No";
    if (vehicle.drivetrain) userFriendlyVehicle.drivetrain = transmission[vehicle.drivetrain];
    return userFriendlyVehicle;
}
