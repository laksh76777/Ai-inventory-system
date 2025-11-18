import React, { useState, useEffect } from 'react';
// FIX: Replaced `InventoryHook` and `Product` with `BusinessDataHook`, `AnyProduct`, and `GroceryProduct`.
import type { BusinessDataHook, AnyProduct, GroceryProduct } from '../types';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { PlusCircleIcon, TrashIcon, BarcodeIcon } from './icons/Icons';
import { useTranslation } from '../hooks/useTranslation';

// FIX: Replaced `InventoryHook` with `BusinessDataHook`
const Products: React.FC<BusinessDataHook> = ({ products, addProduct, updateProduct, deleteProduct }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // FIX: Replaced `Product` with `AnyProduct`
  const [editingProduct, setEditingProduct] = useState<AnyProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };
  
  // FIX: Replaced `Product` with `AnyProduct`
  const openEditModal = (product: AnyProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };
  
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.barcode.includes(searchTerm)
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{t('products.title')}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">View, add, and manage your product inventory.</p>
        </div>
        <Button onClick={openAddModal}>
          <PlusCircleIcon className="mr-2" />
          {t('products.add_button')}
        </Button>
      </div>

      <div className="mb-6">
        <input 
          type="text"
          placeholder={t('products.search_placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg p-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-slate-200/80 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-300">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">{t('products.table.name')}</th>
                <th className="px-6 py-4 font-semibold tracking-wider">{t('products.table.category')}</th>
                <th className="px-6 py-4 font-semibold tracking-wider">{t('products.table.price')}</th>
                <th className="px-6 py-4 font-semibold tracking-wider">{t('products.table.stock')}</th>
                <th className="px-6 py-4 font-semibold tracking-wider">{t('products.table.barcode')}</th>
                <th className="px-6 py-4 font-semibold tracking-wider">{t('products.table.expiry')}</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">{t('products.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className={`transition-colors border-b border-slate-200/80 dark:border-slate-800 ${index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-900/50'} hover:bg-slate-100 dark:hover:bg-slate-800`}>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {product.stock <= product.lowStockThreshold && (
                        <span 
                          className="w-2.5 h-2.5 bg-rose-500 rounded-full flex-shrink-0"
                          title={t('dashboard.low_stock_alerts')}
                        ></span>
                      )}
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">₹{product.price.toFixed(2)}</td>
                  <td className={`px-6 py-4 font-bold ${product.stock <= product.lowStockThreshold ? 'text-rose-500' : 'text-slate-700 dark:text-slate-200'}`}>
                    {Math.max(0, product.stock)}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-400">{product.barcode}</td>
                  {/* FIX: Safely access `expiryDate` with a type guard. */}
                  <td className="px-6 py-4">{'expiryDate' in product && product.expiryDate ? new Date(product.expiryDate).toLocaleDateString('en-IN') : 'N/A'}</td>
                  <td className="px-6 py-4 flex items-center justify-end gap-2">
                    <button onClick={() => openEditModal(product)} className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
                      {t('products.edit_button')}
                    </button>
                    <button onClick={() => deleteProduct(product.id)} className="text-slate-500 hover:text-rose-500 transition p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-rose-500/10">
                        <TrashIcon className="w-4 h-4"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <p className="p-10 text-center text-slate-500 dark:text-slate-400">{t('products.no_products_found')}</p>
          )}
        </div>
      </div>
      
      {isModalOpen && (
        <ProductFormModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          addProduct={addProduct}
          updateProduct={updateProduct}
          product={editingProduct}
        />
      )}
    </div>
  );
};

// Sub-component for the Add/Edit Product form inside the modal
const ProductFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  // FIX: Replaced `Product` with `AnyProduct` to match hook type
  addProduct: (product: Omit<AnyProduct, 'id'>) => { success: boolean; error?: string };
  updateProduct: (product: AnyProduct) => { success: boolean; error?: string };
  product: AnyProduct | null;
}> = ({ isOpen, onClose, addProduct, updateProduct, product }) => {
  const { t } = useTranslation();
  // FIX: The form is for grocery products, so we explicitly type the state for it.
  const [formData, setFormData] = useState<Omit<GroceryProduct, 'id' | 'type'>>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    lowStockThreshold: 10,
    expiryDate: '',
    barcode: '',
  });
  const [barcodeError, setBarcodeError] = useState('');
  const [formError, setFormError] = useState('');

  const categories = [
    'Grocery', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 
    'Produce', 'Pantry', 'Grains', 'Electronics', 'Clothes', 
    'Stationery', 'Household', 'Personal Care', 'Spices'
  ];

  useEffect(() => {
    // FIX: Safely populate form data only if the product being edited is a grocery-type product.
    if (product && 'expiryDate' in product) {
      const p = product as GroceryProduct;
      setFormData({
        name: p.name || '',
        category: p.category || '',
        price: p.price || 0,
        stock: p ? Math.max(0, p.stock) : 0,
        lowStockThreshold: p.lowStockThreshold || 10,
        expiryDate: p.expiryDate || '',
        barcode: p.barcode || '',
      });
    } else {
      // Reset form if adding a new product or if an incompatible product type is passed.
      setFormData({ name: '', category: '', price: 0, stock: 0, lowStockThreshold: 10, expiryDate: '', barcode: '' });
    }
    setBarcodeError('');
    setFormError('');
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormError(''); // Clear server-side validation error on any input change
    
    if (name === 'barcode') {
        const numericValue = value.replace(/[^0-9]/g, '');
        if (numericValue.length <= 13) {
            setFormData(prev => ({ ...prev, [name]: numericValue }));
            if (numericValue.length > 0 && (numericValue.length < 8)) {
                setBarcodeError(t('products.form.barcode_length_error'));
            } else {
                setBarcodeError('');
            }
        }
    } else {
        const isNumberInput = type === 'number';
        let finalValue: string | number = value;
        if (isNumberInput) {
            const parsedValue = parseFloat(value);
            if (['price', 'stock', 'lowStockThreshold'].includes(name)) {
                // Use Math.max to ensure value is not negative
                finalValue = Math.max(0, isNaN(parsedValue) ? 0 : parsedValue);
            } else {
                finalValue = isNaN(parsedValue) ? 0 : parsedValue;
            }
        }
        setFormData(prev => ({
          ...prev,
          [name]: finalValue,
        }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.barcode.length > 0 && (formData.barcode.length < 8 || formData.barcode.length > 13)) {
        setBarcodeError(t('products.form.barcode_length_error'));
        return;
    }

    // FIX: Construct a valid `GroceryProduct` object to send to the hook.
    const productData: Omit<GroceryProduct, 'id'> = {
        type: 'grocery',
        ...formData,
        name: formData.name.trim(),
        barcode: formData.barcode.trim(),
    };

    let result;
    if (product) { // Editing existing product
        result = updateProduct({ ...productData, id: product.id });
    } else { // Adding new product
        result = addProduct(productData);
    }
    
    if (result.success) {
        onClose();
    } else if (result.error) {
        setFormError(t(`products.form.${result.error}`));
    }
  };
  
  const formInputStyle = "mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product ? t('products.modal.edit_title') : t('products.modal.add_title')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('products.form.name')}</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={formInputStyle} required />
        </div>
        
        <div>
            <label htmlFor="barcode" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('products.form.barcode')}</label>
            <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BarcodeIcon className="w-5 h-5 text-slate-400" />
                </span>
                <input 
                    type="text" 
                    name="barcode" 
                    id="barcode" 
                    value={formData.barcode} 
                    onChange={handleChange} 
                    className={`${formInputStyle} pl-10 ${barcodeError ? 'border-red-500 focus:ring-red-500/50' : ''}`} 
                    required 
                />
            </div>
            {barcodeError && <p className="text-red-500 text-xs mt-1">{barcodeError}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('products.form.category')}</label>
          <select name="category" id="category" value={formData.category} onChange={handleChange} className={formInputStyle} required>
            <option value="" disabled>{t('products.categories.select')}</option>
            {categories.sort().map(cat => (
                <option key={cat} value={cat}>{t(`products.categories.${cat.toLowerCase().replace(' ', '_')}`)}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('products.form.price')}</label>
            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className={formInputStyle} min="0" step="0.01" required />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('products.form.stock')}</label>
            <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className={formInputStyle} min="0" required />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
              <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('products.form.low_stock_threshold')}</label>
              <input type="number" name="lowStockThreshold" id="lowStockThreshold" value={formData.lowStockThreshold} onChange={handleChange} className={formInputStyle} min="0" required />
          </div>
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('products.form.expiry')}</label>
            <input type="date" name="expiryDate" id="expiryDate" value={formData.expiryDate} onChange={handleChange} className={formInputStyle} required />
          </div>
        </div>
        
        {formError && <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">{formError}</p>}

        <div className="pt-4 flex justify-end gap-4">
          <Button type="button" variant="secondary" onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="submit">{product ? t('common.save_changes') : t('common.add_product')}</Button>
        </div>
      </form>
    </Modal>
  );
};


export default Products;