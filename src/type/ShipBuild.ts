import Label from './Label';

export interface ShipBuild {
  id: number;
  buildCost: number|null;
  buildTime: number|null;
  mineCost: number|null;
  planetaryResourceCost: number|null;
  blueprintCost: number|null;
  groupId: number|null;
  techLevel: number|null;
  label: Label
}

export default ShipBuild;
