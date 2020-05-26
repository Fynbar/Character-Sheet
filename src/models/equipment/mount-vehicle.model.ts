import { Item } from './equipment.model';
export interface MountsAndVehicle extends Item {
    vehicleCategory: VehicleCategory;
    desc?: string[];
    speed?: VehicleSpeed;
    capacity?: string;
}
export enum MountsAndVehicleEquipmentCategory {
    MountsAndVehicles = 'Mounts and Vehicles'
}
export enum VehicleCategory {
    MountsAndOtherAnimals = 'Mounts and Other Animals',
    TackHarnessAndDrawnVehicles = 'Tack, Harness, and Drawn Vehicles',
    WaterborneVehicles = 'Waterborne Vehicles'
}
export interface VehicleSpeed {
    quantity: number;
    unit: velocityUnit;
}
export enum velocityUnit {
    FtRound = 'ft/round',
    Mph = 'mph'
}
