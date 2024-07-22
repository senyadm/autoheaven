import { VehicleKey } from '@/src/entities/vehicle';

export const vehicleDetailsToOmit: Set<VehicleKey> = new Set(['id', 'imageurl', 'phone_number', 'description', 'type_id', 'make_id', 'created_at', 'vehicle_number', 'seller_id']);
