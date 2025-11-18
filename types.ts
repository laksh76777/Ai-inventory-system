// Base interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  shopName: string;
  shopLogo?: string;
  shopAddress: string;
  phoneNumber?: string;
  gstNumber?: string;
  taxRate: number; // as a percentage, e.g., 18 for 18%
  businessCategory: 'grocery' | 'pharmacy' | 'electronics' | 'hardware' | 'other';
  themePreference: 'vibrant' | 'professional';
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
}

// Base Product interface with common fields
interface BaseProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  barcode: string;
}

// Category-specific product interfaces
export interface GroceryProduct extends BaseProduct {
  type: 'grocery';
  expiryDate: string;
}

export interface PharmacyProduct extends BaseProduct {
  type: 'pharmacy';
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  requiresPrescription: boolean;
}

export interface ElectronicsProduct extends BaseProduct {
  type: 'electronics';
  modelNumber: string;
  serialNumber: string; // Could be an array for multiple items of the same product
  warrantyPeriod: number; // in months
}

export interface HardwareProduct extends BaseProduct {
    type: 'hardware';
    brand: string;
    sku: string;
    dimensions?: string; // e.g., "10x5x2 cm"
    material?: string;
}

// A union type for any product
export type AnyProduct = GroceryProduct | PharmacyProduct | ElectronicsProduct | HardwareProduct;

export interface SaleItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  date: string; // ISO 8601 format
  items: SaleItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  userId: string;
  discountAmount?: number;
  discountType?: 'percentage' | 'fixed';
  discountValue?: number;
}

export type View = 'dashboard' | 'products' | 'pos' | 'reports' | 'settings' | 'ai_chatbot' | 'suppliers';

export interface BusinessDataHook {
  products: AnyProduct[];
  sales: Sale[];
  suppliers: Supplier[];
  addProduct: (product: Omit<AnyProduct, 'id'>) => { success: boolean; error?: string };
  updateProduct: (product: AnyProduct) => { success: boolean; error?: string };
  deleteProduct: (productId: string) => void;
  addSale: (
    items: SaleItem[], 
    subtotal: number, 
    taxAmount: number, 
    total: number, 
    discount?: { value: number; type: 'percentage' | 'fixed'; amount: number }
  ) => Sale;
  clearSalesData: () => void;
  resetDashboardRevenue: () => void;
  revenueResetTimestamp: string | null;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => { success: boolean, error?: string };
  updateSupplier: (supplier: Supplier) => { success: boolean, error?: string };
  deleteSupplier: (supplierId: string) => void;
}

export type ThemeMode = 'light' | 'dark' | 'system';