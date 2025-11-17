import React, { useState, useEffect } from 'react';
import type { BusinessDataHook, ElectronicsProduct, AnyProduct } from '../../types';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { PlusCircleIcon, TrashIcon } from '../../components/icons/Icons';
import { useTranslation } from '../../hooks/useTranslation';

const Products: React.FC<BusinessDataHook> = ({ products, addProduct, updateProduct, deleteProduct }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ElectronicsProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const electronicsProducts = products.filter(p => p.type === 'electronics') as ElectronicsProduct[];

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };
  
  const openEditModal = (product: ElectronicsProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };
  
  const filteredProducts = electronicsProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.modelNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Manage Electronics</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your electronics inventory, including model and serial numbers.</p>
            </div>
            <Button onClick={openAddModal}><PlusCircleIcon className="mr-2" />Add New Product</Button>
        </div>

        <div className="mb-6">
            <input type="text" placeholder="Search by name, model, or serial..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg p-3 border rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500" />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-300">
                <tr>
                    <th className="px-6 py-4 font-semibold">Product Name</th>
                    <th className="px-6 py-4 font-semibold">Model No.</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Stock</th>
                    <th className="px-6 py-4 font-semibold">Warranty</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.map((p, i) => (
                    <tr key={p.id} className={`border-b ${i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-900/50'} hover:bg-slate-100 dark:hover:bg-slate-800`}>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{p.name}</td>
                    <td className="px-6 py-4 font-mono">{p.modelNumber}</td>
                    <td className="px-6 py-4">₹{p.price.toFixed(2)}</td>
                    <td className={`px-6 py-4 font-bold ${p.stock <= p.lowStockThreshold ? 'text-rose-500' : ''}`}>{p.stock}</td>
                    <td className="px-6 py-4">{p.warrantyPeriod} months</td>
                    <td className="px-6 py-4 flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(p)} className="font-medium text-primary-600 dark:text-primary-400 hover:underline">Edit</button>
                        <button onClick={() => deleteProduct(p.id)} className="text-slate-500 hover:text-rose-500 p-1.5"><TrashIcon className="w-4 h-4"/></button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {filteredProducts.length === 0 && <p className="p-10 text-center">No electronics found.</p>}
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
  product: ElectronicsProduct | null;
}> = ({ isOpen, onClose, addProduct, updateProduct, product }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Omit<ElectronicsProduct, 'id' | 'type'>>({
    name: '', category: 'General', price: 0, stock: 0, lowStockThreshold: 10, barcode: '',
    modelNumber: '', serialNumber: '', warrantyPeriod: 0
  });

  useEffect(() => {
    if (product) setFormData({ ...product });
    else setFormData({ name: '', category: 'General', price: 0, stock: 0, lowStockThreshold: 10, barcode: '', modelNumber: '', serialNumber: '', warrantyPeriod: 12 });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? Math.max(0, parseInt(value) || 0) : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Omit<ElectronicsProduct, 'id'> = { ...formData, type: 'electronics' };
    const result = product ? updateProduct({ ...product, ...productData }) : addProduct(productData);
    if (result.success) onClose();
  };
  
  const formInputStyle = "mt-1 w-full p-2 border rounded-lg bg-white dark:bg-slate-800";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product ? 'Edit Electronic Product' : 'Add New Electronic Product'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className={formInputStyle} required />
        <div className="grid grid-cols-2 gap-4">
            <input name="modelNumber" placeholder="Model Number" value={formData.modelNumber} onChange={handleChange} className={formInputStyle} required />
            <input name="serialNumber" placeholder="Serial Number" value={formData.serialNumber} onChange={handleChange} className={formInputStyle} />
        </div>
        <input name="barcode" placeholder="Barcode" value={formData.barcode} onChange={handleChange} className={formInputStyle} required />
        <div className="grid grid-cols-2 gap-4">
            <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange} className={formInputStyle} required />
            <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className={formInputStyle} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <input type="number" name="lowStockThreshold" placeholder="Low Stock Threshold" value={formData.lowStockThreshold} onChange={handleChange} className={formInputStyle} required />
            <input type="number" name="warrantyPeriod" placeholder="Warranty (Months)" value={formData.warrantyPeriod} onChange={handleChange} className={formInputStyle} />
        </div>
        <div className="pt-4 flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={onClose}>{t('common.cancel')}</Button>
            <Button type="submit">{product ? t('common.save_changes') : 'Add Product'}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default Products;
