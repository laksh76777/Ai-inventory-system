import React, { useState, useEffect } from 'react';
import type { BusinessDataHook, Supplier } from '../types';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { PlusCircleIcon, TrashIcon, SuppliersIcon } from './icons/Icons';
import { useTranslation } from '../hooks/useTranslation';

const Suppliers: React.FC<BusinessDataHook> = ({ suppliers, addSupplier, updateSupplier, deleteSupplier }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openAddModal = () => {
    setEditingSupplier(null);
    setIsModalOpen(true);
  };
  
  const openEditModal = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };
  
  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone.includes(searchTerm)
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Manage Suppliers</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Keep track of your business suppliers and contacts.</p>
        </div>
        <Button onClick={openAddModal}>
          <PlusCircleIcon className="mr-2" />
          Add New Supplier
        </Button>
      </div>

      <div className="mb-6">
        <input 
          type="text"
          placeholder="Search by name, contact, phone, or email..."
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
                <th className="px-6 py-4 font-semibold tracking-wider">Supplier Name</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Contact Person</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Phone</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Email</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr key={supplier.id} className={`transition-colors border-b border-slate-200/80 dark:border-slate-800 ${index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-900/50'} hover:bg-slate-100 dark:hover:bg-slate-800`}>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">{supplier.name}</td>
                  <td className="px-6 py-4">{supplier.contactPerson}</td>
                  <td className="px-6 py-4">{supplier.phone}</td>
                  <td className="px-6 py-4">{supplier.email}</td>
                  <td className="px-6 py-4 flex items-center justify-end gap-2">
                    <button onClick={() => openEditModal(supplier)} className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => deleteSupplier(supplier.id)} className="text-slate-500 hover:text-rose-500 transition p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-rose-500/10">
                        <TrashIcon className="w-4 h-4"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSuppliers.length === 0 && (
            <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                <SuppliersIcon className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <p>No suppliers found. Click "Add New Supplier" to get started.</p>
            </div>
          )}
        </div>
      </div>
      
      {isModalOpen && (
        <SupplierFormModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          addSupplier={addSupplier}
          updateSupplier={updateSupplier}
          supplier={editingSupplier}
        />
      )}
    </div>
  );
};

// Sub-component for the Add/Edit Supplier form inside the modal
const SupplierFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => { success: boolean, error?: string };
  updateSupplier: (supplier: Supplier) => { success: boolean, error?: string };
  supplier: Supplier | null;
}> = ({ isOpen, onClose, addSupplier, updateSupplier, supplier }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Omit<Supplier, 'id'>>({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        contactPerson: supplier.contactPerson,
        phone: supplier.phone,
        email: supplier.email,
      });
    } else {
      setFormData({ name: '', contactPerson: '', phone: '', email: '' });
    }
  }, [supplier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supplier) {
      updateSupplier({ ...supplier, ...formData });
    } else {
      addSupplier(formData);
    }
    onClose();
  };
  
  const formInputStyle = "mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={supplier ? 'Edit Supplier' : 'Add New Supplier'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Supplier Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={formInputStyle} required />
        </div>
        <div>
          <label htmlFor="contactPerson" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Contact Person</label>
          <input type="text" name="contactPerson" id="contactPerson" value={formData.contactPerson} onChange={handleChange} className={formInputStyle} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={formInputStyle} required />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={formInputStyle} required />
            </div>
        </div>
        
        <div className="pt-4 flex justify-end gap-4">
          <Button type="button" variant="secondary" onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="submit">{supplier ? t('common.save_changes') : 'Add Supplier'}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default Suppliers;