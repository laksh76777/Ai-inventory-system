import React from 'react';
import type { BusinessDataHook, PharmacyProduct } from '../../types';
import Card from '../../components/ui/Card';
import { 
    WarningIcon, CheckCircleIcon, PharmacyProductsIcon, PharmacyRevenueIcon, 
    PharmacyBatchIcon, PharmacyPrescriptionIcon, SuppliersIcon
} from '../../components/icons/Icons';
import { useTranslation } from '../../hooks/useTranslation';
import LanguageSwitcher from '../../components/LanguageSwitcher';

interface DashboardProps extends BusinessDataHook {}

const Dashboard: React.FC<DashboardProps> = ({ products, sales, suppliers }) => {
  const { t } = useTranslation();
  const pharmacyProducts = products.filter(p => p.type === 'pharmacy') as PharmacyProduct[];

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const prescriptionItemsCount = pharmacyProducts.filter(p => p.requiresPrescription).length;
  
  const expiringBatches = pharmacyProducts
    .filter(p => getDaysUntilExpiry(p.expiryDate) <= 60) // Expiring in next 60 days
    .sort((a, b) => getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate));

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Pharmacy Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Overview of your pharmacy operations.</p>
        </div>
        <LanguageSwitcher />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Medicines" value={pharmacyProducts.length.toString()} description="Different medicines in stock" icon={<PharmacyProductsIcon />} />
        <Card title="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} description="From all completed sales" icon={<PharmacyRevenueIcon />} />
        <Card title="Scheduled Drugs" value={prescriptionItemsCount.toString()} description="Items requiring prescription" isWarning={prescriptionItemsCount > 0} icon={<PharmacyPrescriptionIcon />} />
        <Card title="Expiring Batches" value={expiringBatches.length.toString()} description="Batches expiring in 60 days" isWarning={expiringBatches.length > 0} icon={<PharmacyBatchIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 p-5 border-b flex items-center"><WarningIcon className="mr-3 text-rose-500" /> Near Expiry Batches</h2>
          <div className="p-3">
            {expiringBatches.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircleIcon className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400">No batches expiring soon.</p>
              </div>
            ) : (
              <ul className="space-y-1 max-h-80 overflow-y-auto p-2">
                {expiringBatches.map((p) => (
                  <li key={p.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Batch: {p.batchNumber}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-rose-500 font-bold text-sm">{getDaysUntilExpiry(p.expiryDate)} days left</p>
                        <p className="text-xs text-slate-400">Expires: {new Date(p.expiryDate).toLocaleDateString('en-IN')}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 p-5 border-b flex items-center"><SuppliersIcon className="mr-3 text-sky-500" /> Top Suppliers</h2>
          <div className="p-3">
             {suppliers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500 dark:text-slate-400">No suppliers added yet.</p>
              </div>
            ) : (
                <ul className="space-y-1 max-h-80 overflow-y-auto p-2">
                {suppliers.slice(0, 5).map((s) => (
                    <li key={s.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white">{s.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{s.contactPerson}</p>
                        </div>
                        <a href={`tel:${s.phone}`} className="text-sm text-primary-500 font-semibold">{s.phone}</a>
                    </li>
                ))}
                </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
