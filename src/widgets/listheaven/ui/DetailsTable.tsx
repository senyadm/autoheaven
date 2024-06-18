import { Car } from "../../../entities/vehicle/model/car";

interface DetailsTableProps {
  carDetails: Car;
}
const DetailsTable = ({ carDetails }: DetailsTableProps) => {
  const { mileage, accidentfree, price } = carDetails;
  return (
    <div className="bg-[rgba(255,255,255,0.5)] rounded py-2 px-6">
      <table className="w-full  text-xs " cellPadding={4}>
        <tbody>
          <tr>
            <td className="font-bold">Mileage</td>
            <td className="text-right">{mileage} km</td>
          </tr>
          <tr>
            <td className="font-bold">Incident history</td>
            <td className="text-right">
              {accidentfree ? "No Accidents" : "View"}
            </td>
          </tr>
          <tr>
            <td className="font-bold">Price</td>
            <td className="text-right">{price} $</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailsTable;
