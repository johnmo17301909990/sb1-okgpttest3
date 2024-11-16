export interface FoilCriteria {
  foilArea: string;
  foilPattern: string;
  surfaceTreatment: string;
  processOrder: string;
  color?: string;
  application?: string;
  requiresUV: boolean;
}

export interface SelectedFoil {
  companyCode: string;
  supplierCode: string;
  series: string;
  category: string;
  usage: string;
  mainApplication: string;
  suitableSize: string;
  tension: string;
  uvCompatible: boolean;
  color: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  orderDate: string;
  deliveryDate: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  items: POItem[];
  totalAmount: number;
  foilArea: string;
  foilPattern: string;
  surfaceTreatment: string;
  processOrder: string;
  wearResistance: string;
  tensionRequirement: string;
  application: string;
  specialRequirements: string[];
}

export interface POItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  companyCode: string;
  supplierCode: string;
  foilSeries: string;
}