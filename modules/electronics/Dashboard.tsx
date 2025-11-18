import React from 'react';
import type { BusinessDataHook, ElectronicsProduct } from '../../types';
import Card from '../../components/ui/Card';
import { 
    ElectronicsProductsIcon, ElectronicsRevenueIcon, ElectronicsValueIcon, 
    ElectronicsWarrantyIcon
} from '../../components/icons/Icons';
import LanguageSwitcher from '../../components/LanguageSwitcher';

interface DashboardProps extends BusinessDataHook {}

const Dashboard: React.FC<DashboardProps> = ({ products, sales, suppliers }) => {
  const electronicsProducts = products.filter(p => p.type === 'electronics') as ElectronicsProduct[];

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalInventoryValue = electronicsProducts.reduce((sum, p) => sum + p.price * p.stock, 0);
  const itemsUnderWarranty = electronicsProducts.filter(p => p.warrantyPeriod > 0).length;

  const modelSales: { [key: string]: number } = {};
  sales.forEach(sale => {
    sale.items.forEach(item => {
      const product = electronicsProducts.find(p => p.id === item.productId);
      if (product) {
        modelSales[product.modelNumber] = (modelSales[product.modelNumber] || 0) + item.quantity;
      }
    });
  });

  const topSellingModels = Object.entries(modelSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([model, quantity]) => ({ model, quantity }));

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Electronics Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Key metrics for your electronics store.</p>
        </div>
        <LanguageSwitcher />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Models" value={electronicsProducts.length.toString()} description="Different products in stock" icon={<ElectronicsProductsIcon />} />
        <Card title="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} description="From all completed sales" icon={<ElectronicsRevenueIcon />} />
        <Card title="Inventory Value" value={`₹${totalInventoryValue.toLocaleString('en-IN')}`} description="Total value of current stock" icon={<ElectronicsValueIcon />} />
        <Card title="Under Warranty" value={itemsUnderWarranty.toString()} description="Stocked items with warranty" icon={<ElectronicsWarrantyIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 p-5 border-b">Top Selling Models</h2>
          <div className="p-3">
            {topSellingModels.length === 0 ? (
              <div className="text-center py-8"><p className="text-slate-500">No sales data yet.</p></div>
            ) : (
              <ul className="space-y-1 max-h-80 overflow-y-auto p-2">
                {topSellingModels.map((item, index) => (
                  <li key={item.model} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
                    <div>
                      <span className="font-bold text-primary-500 mr-3">#{index + 1}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{item.model}</span>
                    </div>
                    <p className="font-bold text-lg">{item.quantity} <span className="text-sm font-normal text-slate-500">units sold</span></p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 p-5 border-b">Top Suppliers</h2>
          <div className="p-3">
             {suppliers.length === 0 ? (
              <div className="text-center py-8"><p className="text-slate-500">No suppliers added yet.</p></div>
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
