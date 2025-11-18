import React from 'react';
import type { BusinessDataHook, HardwareProduct } from '../../types';
import Card from '../../components/ui/Card';
import { 
    HardwareProductsIcon, ElectronicsRevenueIcon as HardwareRevenueIcon, 
    ElectronicsValueIcon as HardwareValueIcon, HardwareBrandIcon,
} from '../../components/icons/Icons';
import LanguageSwitcher from '../../components/LanguageSwitcher';

interface DashboardProps extends BusinessDataHook {}

const Dashboard: React.FC<DashboardProps> = ({ products, sales, suppliers }) => {
  const hardwareProducts = products.filter(p => p.type === 'hardware') as HardwareProduct[];

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalInventoryValue = hardwareProducts.reduce((sum, p) => sum + p.price * p.stock, 0);

  const brandCounts: { [key: string]: number } = {};
  hardwareProducts.forEach(p => {
    brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
  });

  const topBrands = Object.entries(brandCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  const lowStockProducts = hardwareProducts.filter(p => p.stock <= p.lowStockThreshold);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Hardware Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Key metrics for your hardware store.</p>
        </div>
        <LanguageSwitcher />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total SKUs" value={hardwareProducts.length.toString()} description="Different products in stock" icon={<HardwareProductsIcon />} />
        <Card title="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} description="From all completed sales" icon={<HardwareRevenueIcon />} />
        <Card title="Inventory Value" value={`₹${totalInventoryValue.toLocaleString('en-IN')}`} description="Total value of current stock" icon={<HardwareValueIcon />} />
        <Card title="Top Brands" value={topBrands[0]?.name || 'N/A'} description="Most frequent brand in stock" icon={<HardwareBrandIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 p-5 border-b">Top Brands by SKU Count</h2>
          <div className="p-3">
            {topBrands.length === 0 ? (
              <div className="text-center py-8"><p className="text-slate-500">No products added yet.</p></div>
            ) : (
              <ul className="space-y-1 max-h-80 overflow-y-auto p-2">
                {topBrands.map((item, index) => (
                  <li key={item.name} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
                    <div>
                      <span className="font-bold text-primary-500 mr-3">#{index + 1}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{item.name}</span>
                    </div>
                    <p className="font-bold text-lg">{item.count} <span className="text-sm font-normal text-slate-500">SKUs</span></p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 p-5 border-b">Low Stock Items</h2>
          <div className="p-3">
            {lowStockProducts.length === 0 ? (
                <div className="text-center py-8"><p className="text-slate-500">All items are well-stocked.</p></div>
            ) : (
                <ul className="space-y-1 max-h-80 overflow-y-auto p-2">
                {lowStockProducts.map((p) => (
                    <li key={p.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{p.brand}</p>
                        </div>
                        <p className="font-bold text-lg text-rose-500">{p.stock} <span className="text-sm font-normal text-slate-500">left</span></p>
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