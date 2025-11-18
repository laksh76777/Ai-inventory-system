import React, { useState, useEffect } from 'react';
import type { BusinessDataHook, PharmacyProduct, AnyProduct } from '../../types';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { PlusCircleIcon, TrashIcon, BarcodeIcon } from '../../components/icons/Icons';
import { useTranslation } from '../../hooks/useTranslation';

const Products: React.FC<BusinessDataHook> = ({ products, addProduct, updateProduct, deleteProduct }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<PharmacyProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const pharmacyProducts = products.filter(p => p.type === 'pharmacy') as PharmacyProduct[];

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };
  
  const openEditModal = (product: PharmacyProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };
  
  const filteredProducts = pharmacyProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Manage Medicines</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your pharmacy inventory, including batch numbers and manufacturers.</p>
            </div>
            <Button onClick={openAddModal}><PlusCircleIcon className="mr-2" />Add New Medicine</Button>
        </div>

        <div className="mb-6">
            <input type="text" placeholder="Search by name, manufacturer, or batch..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg p-3 border rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500" />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-300">
                <tr>
                    <th className="px-6 py-4 font-semibold">Medicine Name</th>
                    <th className="px-6 py-4 font-semibold">Manufacturer</th>
                    <th className="px-6 py-4 font-semibold">Batch No.</th>
                    <th className="px-6 py-4 font-semibold">Stock</th>
                    <th className="px-6 py-4 font-semibold">Expiry</th>
                    <th className="px-6 py-4 font-semibold text-center">Rx Req.</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.map((p, i) => (
                    <tr key={p.id} className={`border-b ${i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-900/50'} hover:bg-slate-100 dark:hover:bg-slate-800`}>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{p.name}</td>
                    <td className="px-6 py-4">{p.manufacturer}</td>
                    <td className="px-6 py-4 font-mono">{p.batchNumber}</td>
                    <td className={`px-6 py-4 font-bold ${p.stock <= p.lowStockThreshold ? 'text-rose-500' : ''}`}>{p.stock}</td>
                    <td className="px-6 py-4">{new Date(p.expiryDate).toLocaleDateString('en-IN')}</td>
                    <td className="px-6 py-4 text-center">{p.requiresPrescription ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(p)} className="font-medium text-primary-600 dark:text-primary-400 hover:underline">Edit</button>
                        <button onClick={() => deleteProduct(p.id)} className="text-slate-500 hover:text-rose-500 p-1.5"><TrashIcon className="w-4 h-4"/></button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {filteredProducts.length === 0 && <p className="p-10 text-center">No medicines found.</p>}
            </div>
        </div>
        
        {isModalOpen && (
            <ProductFormModal isOpen={isModalOpen} onClose={closeModal} addProduct={addProduct} updateProduct={updateProduct} product={editingProduct} />
        )}
    </div>
  );
};

const ProductFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  addProduct: (product: Omit<AnyProduct, 'id'>) => { success: boolean; error?: string };
  updateProduct: (product: AnyProduct) => { success: boolean; error?: string };
  product: PharmacyProduct | null;
}> = ({ isOpen, onClose, addProduct, updateProduct, product }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Omit<PharmacyProduct, 'id' | 'type'>>({
      name: '', category: '', price: 0, stock: 0, lowStockThreshold: 10, barcode: '', 
      manufacturer: '', batchNumber: '', expiryDate: '', requiresPrescription: false
  });

  useEffect(() => {
    if (product) setFormData({ ...product });
    else setFormData({ name: '', category: 'General', price: 0, stock: 0, lowStockThreshold: 10, barcode: '', manufacturer: '', batchNumber: '', expiryDate: '', requiresPrescription: false });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({...prev, [name]: checked}));
    } else {
        const finalValue = type === 'number' ? Math.max(0, parseFloat(value) || 0) : value;
        setFormData(prev => ({...prev, [name]: finalValue}));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Omit<PharmacyProduct, 'id'> = { ...formData, type: 'pharmacy' };
    const result = product ? updateProduct({ ...product, ...productData }) : addProduct(productData);
    if (result.success) onClose();
  };
  
  const formInputStyle = "mt-1 w-full p-2 border rounded-lg bg-white dark:bg-slate-800";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product ? 'Edit Medicine' : 'Add New Medicine'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Medicine Name" value={formData.name} onChange={handleChange} className={formInputStyle} required />
        <div className="grid grid-cols-2 gap-4">
            <input name="manufacturer" placeholder="Manufacturer" value={formData.manufacturer} onChange={handleChange} className={formInputStyle} required />
            <input name="batchNumber" placeholder="Batch Number" value={formData.batchNumber} onChange={handleChange} className={formInputStyle} required />
        </div>
        <input name="barcode" placeholder="Barcode" value={formData.barcode} onChange={handleChange} className={formInputStyle} required />
        <div className="grid grid-cols-2 gap-4">
            <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange} className={formInputStyle} required />
            <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className={formInputStyle} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <input type="number" name="lowStockThreshold" placeholder="Low Stock Threshold" value={formData.lowStockThreshold} onChange={handleChange} className={formInputStyle} required />
            <div>
                <label className="text-sm">Expiry Date</label>
                <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className={formInputStyle} required />
            </div>
        </div>
        <div className="flex items-center gap-2">
            <input type="checkbox" name="requiresPrescription" id="rx-check" checked={formData.requiresPrescription} onChange={handleChange} className="h-4 w-4 rounded" />
            <label htmlFor="rx-check">Requires Prescription</label>
        </div>
        <div className="pt-4 flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={onClose}>{t('common.cancel')}</Button>
            <Button type="submit">{product ? t('common.save_changes') : 'Add Medicine'}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default Products;
