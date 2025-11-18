import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { AnyProduct, Sale, SaleItem, BusinessDataHook, Supplier } from '../types';
import { useAuth } from './useAuth';
import { getGrocerySeedData } from '../data/grocerySeed';
import { getElectronicsSeedData } from '../data/electronicsSeed';
import { getPharmacySeedData } from '../data/pharmacySeed';
import { getHardwareSeedData } from '../data/hardwareSeed';

const useBusinessData = (): BusinessDataHook => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id || null;

  const [products, setProducts] = useState<AnyProduct[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [revenueResetTimestamp, setRevenueResetTimestamp] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const savedProducts = localStorage.getItem(`products_${userId}`);
      const savedSales = localStorage.getItem(`sales_${userId}`);
      const savedSuppliers = localStorage.getItem(`suppliers_${userId}`);
      const savedTimestamp = localStorage.getItem(`revenueResetTimestamp_${userId}`);
      
      if (savedProducts && savedSales && savedSuppliers) {
        setProducts(JSON.parse(savedProducts));
        setSales(JSON.parse(savedSales));
        setSuppliers(JSON.parse(savedSuppliers));
      } else {
        // No data found, check if it's a demo user that needs seeding
        let seedData: { products: AnyProduct[], sales: Sale[], suppliers: Supplier[] } | null = null;
        
        switch (currentUser.email) {
          case 'laksh@gmail.com':
            seedData = getGrocerySeedData(userId);
            break;
          case 'laksh1@gmail.com':
            seedData = getElectronicsSeedData(userId);
            break;
          case 'laksh2@gmail.com':
            seedData = getPharmacySeedData(userId);
            break;
          case 'laksh3@gmail.com':
            seedData = getHardwareSeedData(userId);
            break;
          default:
            // This is a new user, start with a blank slate
            setProducts([]);
            setSales([]);
            setSuppliers([]);
        }

        if (seedData) {
          setProducts(seedData.products);
          setSales(seedData.sales);
          setSuppliers(seedData.suppliers);
        }
      }

      setRevenueResetTimestamp(savedTimestamp ? savedTimestamp : null);
      
    } catch (error) {
        console.error("Failed to load data from localStorage", error);
        // Fallback to empty state on any error
        setProducts([]);
        setSales([]);
        setSuppliers([]);
        setRevenueResetTimestamp(null);
    } finally {
        setLoading(false);
    }
  }, [userId, currentUser]);

  // --- Data Persistence Effects ---
  useEffect(() => {
    if (!userId || loading) return;
    try { localStorage.setItem(`products_${userId}`, JSON.stringify(products)); } 
    catch (error) { console.error("Failed to save products to localStorage", error); }
  }, [products, userId, loading]);
  
  useEffect(() => {
    if (!userId || loading) return;
    try { localStorage.setItem(`sales_${userId}`, JSON.stringify(sales)); } 
    catch (error) { console.error("Failed to save sales to localStorage", error); }
  }, [sales, userId, loading]);

  useEffect(() => {
    if (!userId || loading) return;
    try { localStorage.setItem(`suppliers_${userId}`, JSON.stringify(suppliers)); } 
    catch (error) { console.error("Failed to save suppliers to localStorage", error); }
  }, [suppliers, userId, loading]);

  // --- CRUD Functions ---
  const addProduct = (productData: Omit<AnyProduct, 'id'>): { success: boolean; error?: string } => {
    const trimmedBarcode = productData.barcode?.trim();
    if (products.some(p => p.barcode === trimmedBarcode)) {
        return { success: false, error: 'barcode_exists' };
    }
    // FIX: Cast to AnyProduct to resolve discriminated union type issue when spreading.
    const newProduct: AnyProduct = { ...productData, id: uuidv4() } as AnyProduct;
    setProducts(prev => [...prev, newProduct]);
    return { success: true };
  };

  const updateProduct = (updatedProduct: AnyProduct): { success: boolean; error?: string } => {
    const trimmedBarcode = updatedProduct.barcode?.trim();
    if (products.some(p => p.id !== updatedProduct.id && p.barcode === trimmedBarcode)) {
        return { success: false, error: 'barcode_exists' };
    }
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    return { success: true };
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };
  
  const addSale = (items: SaleItem[], subtotal: number, taxAmount: number, total: number, discount?: { value: number; type: 'percentage' | 'fixed'; amount: number }): Sale => {
    if (!userId) throw new Error("User not logged in");
    
    // ... stock validation ...
    const newSale: Sale = { id: uuidv4(), date: new Date().toISOString(), items, subtotal, taxAmount, total, userId, discountAmount: discount?.amount, discountType: discount?.type, discountValue: discount?.value };
    setSales(prev => [...prev, newSale]);

    setProducts(prevProducts => prevProducts.map(p => {
        const itemInSale = items.find(item => item.productId === p.id);
        if (itemInSale) return { ...p, stock: Math.max(0, p.stock - itemInSale.quantity) };
        return p;
    }));
    return newSale;
  };
  
  const resetDashboardRevenue = () => {
    if (userId) {
        const now = new Date().toISOString();
        setRevenueResetTimestamp(now);
        localStorage.setItem(`revenueResetTimestamp_${userId}`, now);
    }
  };
  
  const clearSalesData = () => {
    setSales([]);
    setRevenueResetTimestamp(null);
    if (userId) {
        localStorage.removeItem(`sales_${userId}`);
        localStorage.removeItem(`revenueResetTimestamp_${userId}`);
    }
  };

  const addSupplier = (supplierData: Omit<Supplier, 'id'>) => {
    setSuppliers(prev => [...prev, { ...supplierData, id: uuidv4() }]);
    return { success: true };
  };

  const updateSupplier = (updatedSupplier: Supplier) => {
    setSuppliers(prev => prev.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
    return { success: true };
  };

  const deleteSupplier = (supplierId: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== supplierId));
  };

  return { products, sales, suppliers, addProduct, updateProduct, deleteProduct, addSale, clearSalesData, resetDashboardRevenue, revenueResetTimestamp, addSupplier, updateSupplier, deleteSupplier };
};

export default useBusinessData;