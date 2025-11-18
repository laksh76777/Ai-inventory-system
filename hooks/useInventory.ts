import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// FIX: Replaced deprecated `Product` and `InventoryHook` with `AnyProduct` and `BusinessDataHook`.
// FIX: Added Supplier to import list.
import type { AnyProduct, Sale, SaleItem, BusinessDataHook, Supplier } from '../types';

// FIX: Added `type: 'grocery'` to all products to conform to the `GroceryProduct` type.
const getInitialProducts = (): AnyProduct[] => [
  { id: 'prod-1', type: 'grocery', name: 'Organic Milk', category: 'Dairy', price: 60, stock: 50, lowStockThreshold: 10, expiryDate: '2024-09-15', barcode: '8901234567890' },
  { id: 'prod-2', type: 'grocery', name: 'Brown Bread', category: 'Bakery', price: 45, stock: 30, lowStockThreshold: 12, expiryDate: '2024-08-28', barcode: '8902345678901' },
  { id: 'prod-3', type: 'grocery', name: 'Cheddar Cheese', category: 'Dairy', price: 250, stock: 20, lowStockThreshold: 5, expiryDate: '2024-11-20', barcode: '8903456789012' },
  { id: 'prod-4', type: 'grocery', name: 'Fresh Apples', category: 'Produce', price: 150, stock: 100, lowStockThreshold: 20, expiryDate: '2024-09-05', barcode: '8904567890123' },
  { id: 'prod-5', type: 'grocery', name: 'Instant Noodles', category: 'Pantry', price: 25, stock: 80, lowStockThreshold: 25, expiryDate: '2025-07-01', barcode: '8905678901234' },
  { id: 'prod-6', type: 'grocery', name: 'Coca-Cola (Can)', category: 'Beverages', price: 40, stock: 120, lowStockThreshold: 30, expiryDate: '2025-12-31', barcode: '8906789012345' },
  { id: 'prod-7', type: 'grocery', name: 'Lays Chips', category: 'Snacks', price: 15, stock: 15, lowStockThreshold: 10, expiryDate: '2025-06-30', barcode: '8907890123456' },
  { id: 'prod-8', type: 'grocery', name: 'Basmati Rice (1kg)', category: 'Grains', price: 120, stock: 40, lowStockThreshold: 15, expiryDate: '2026-01-01', barcode: '8908901234567' },
];

const getInitialSales = (userId: string): Sale[] => {
    // Generate some sales for the last 7 days
    const sales: Sale[] = [];
    const taxRate = 5; // Assume 5% tax for demo sales
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dailySalesCount = Math.floor(Math.random() * 5) + 2; // 2 to 6 sales per day
        for (let j = 0; j < dailySalesCount; j++) {
            const items: SaleItem[] = [{ productId: 'prod-1', name: 'Organic Milk', quantity: Math.floor(Math.random() * 2) + 1, price: 60 }, { productId: 'prod-2', name: 'Brown Bread', quantity: 1, price: 45 }];
            const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
            const taxAmount = subtotal * (taxRate / 100);
            const total = subtotal + taxAmount;
            sales.push({ id: uuidv4(), date: date.toISOString(), items, subtotal, taxAmount, total, userId });
        }
    }
    return sales;
};

// FIX: Added seed data for suppliers.
const getInitialSuppliers = (): Supplier[] => [
    { id: 'sup-1', name: 'Global Foods Inc.', contactPerson: 'Anil Sharma', phone: '9876543210', email: 'anil@globalfoods.com' },
    { id: 'sup-2', name: 'Daily Dairy Supplies', contactPerson: 'Priya Singh', phone: '9876543211', email: 'priya@dailydairy.com' }
];

const getKaggleGroceryData = (userId: string): { products: AnyProduct[], sales: Sale[] } => {
    // 1. Define Products
    // FIX: Added `type: 'grocery'` to all products to conform to the `GroceryProduct` type.
    const products: AnyProduct[] = [
        // Produce (20 items)
        { id: 'kg-prod-1', type: 'grocery', name: 'Banana', category: 'Produce', price: 50, stock: 200, lowStockThreshold: 30, expiryDate: '2024-09-10', barcode: '990000000001' },
        { id: 'kg-prod-2', type: 'grocery', name: 'Apple - Royal Gala', category: 'Produce', price: 180, stock: 150, lowStockThreshold: 25, expiryDate: '2024-09-20', barcode: '990000000002' },
        { id: 'kg-prod-3', type: 'grocery', name: 'Onion (1kg)', category: 'Produce', price: 40, stock: 500, lowStockThreshold: 100, expiryDate: '2024-10-15', barcode: '990000000003' },
        { id: 'kg-prod-4', type: 'grocery', name: 'Potato (1kg)', category: 'Produce', price: 35, stock: 600, lowStockThreshold: 100, expiryDate: '2024-10-20', barcode: '990000000004' },
        { id: 'kg-prod-5', type: 'grocery', name: 'Tomato (1kg)', category: 'Produce', price: 60, stock: 300, lowStockThreshold: 50, expiryDate: '2024-09-12', barcode: '990000000005' },
        { id: 'kg-prod-6', type: 'grocery', name: 'Carrot (500g)', category: 'Produce', price: 45, stock: 100, lowStockThreshold: 20, expiryDate: '2024-09-18', barcode: '990000000006' },
        { id: 'kg-prod-21', type: 'grocery', name: 'Ginger (100g)', category: 'Produce', price: 25, stock: 150, lowStockThreshold: 30, expiryDate: '2024-10-01', barcode: '990000000021' },
        { id: 'kg-prod-22', type: 'grocery', name: 'Garlic (100g)', category: 'Produce', price: 30, stock: 180, lowStockThreshold: 40, expiryDate: '2024-10-05', barcode: '990000000022' },
        { id: 'kg-prod-23', type: 'grocery', name: 'Spinach (Bunch)', category: 'Produce', price: 20, stock: 80, lowStockThreshold: 15, expiryDate: '2024-09-09', barcode: '990000000023' },
        { id: 'kg-prod-24', type: 'grocery', name: 'Cucumber (500g)', category: 'Produce', price: 30, stock: 120, lowStockThreshold: 25, expiryDate: '2024-09-14', barcode: '990000000024' },
        { id: 'kg-prod-25', type: 'grocery', name: 'Cauliflower (1pc)', category: 'Produce', price: 40, stock: 70, lowStockThreshold: 15, expiryDate: '2024-09-16', barcode: '990000000025' },
        { id: 'kg-prod-26', type: 'grocery', name: 'Capsicum - Green (250g)', category: 'Produce', price: 35, stock: 90, lowStockThreshold: 20, expiryDate: '2024-09-22', barcode: '990000000026' },
        { id: 'kg-prod-27', type: 'grocery', name: 'Lemon (4pcs)', category: 'Produce', price: 20, stock: 250, lowStockThreshold: 50, expiryDate: '2024-09-30', barcode: '990000000027' },
        { id: 'kg-prod-28', type: 'grocery', name: 'Coriander (Bunch)', category: 'Produce', price: 15, stock: 100, lowStockThreshold: 20, expiryDate: '2024-09-11', barcode: '990000000028' },
        { id: 'kg-prod-29', type: 'grocery', name: 'Watermelon (1pc)', category: 'Produce', price: 90, stock: 40, lowStockThreshold: 10, expiryDate: '2024-09-25', barcode: '990000000029' },
        { id: 'kg-prod-30', type: 'grocery', name: 'Pomegranate (1pc)', category: 'Produce', price: 120, stock: 60, lowStockThreshold: 15, expiryDate: '2024-10-10', barcode: '990000000030' },
        { id: 'kg-prod-101', type: 'grocery', name: 'Green Chilli (100g)', category: 'Produce', price: 15, stock: 200, lowStockThreshold: 40, expiryDate: '2024-09-15', barcode: '990000000101' },
        { id: 'kg-prod-102', type: 'grocery', name: 'Mint Leaves (Bunch)', category: 'Produce', price: 10, stock: 150, lowStockThreshold: 30, expiryDate: '2024-09-10', barcode: '990000000102' },


        // Dairy & Eggs (10 items)
        { id: 'kg-prod-7', type: 'grocery', name: 'Amul Toned Milk (1L)', category: 'Dairy', price: 66, stock: 150, lowStockThreshold: 30, expiryDate: '2024-09-08', barcode: '990000000007' },
        { id: 'kg-prod-8', type: 'grocery', name: 'Amul Butter (100g)', category: 'Dairy', price: 55, stock: 200, lowStockThreshold: 40, expiryDate: '2025-03-01', barcode: '990000000008' },
        { id: 'kg-prod-9', type: 'grocery', name: 'Eggs (Dozen)', category: 'Dairy', price: 80, stock: 100, lowStockThreshold: 20, expiryDate: '2024-09-25', barcode: '990000000009' },
        { id: 'kg-prod-10', type: 'grocery', name: 'Britannia Cheese Slices', category: 'Dairy', price: 140, stock: 80, lowStockThreshold: 15, expiryDate: '2024-12-10', barcode: '990000000010' },
        { id: 'kg-prod-31', type: 'grocery', name: 'Nestle Dahi (400g)', category: 'Dairy', price: 70, stock: 90, lowStockThreshold: 20, expiryDate: '2024-09-18', barcode: '990000000031' },
        { id: 'kg-prod-32', type: 'grocery', name: 'Amul Paneer (200g)', category: 'Dairy', price: 95, stock: 110, lowStockThreshold: 25, expiryDate: '2024-11-01', barcode: '990000000032' },
        { id: 'kg-prod-33', type: 'grocery', name: 'Go Cheese Spread (200g)', category: 'Dairy', price: 120, stock: 75, lowStockThreshold: 15, expiryDate: '2025-02-15', barcode: '990000000033' },
        { id: 'kg-prod-34', type: 'grocery', name: 'Mother Dairy Lassi (200ml)', category: 'Dairy', price: 25, stock: 200, lowStockThreshold: 50, expiryDate: '2024-09-15', barcode: '990000000034' },
        { id: 'kg-prod-35', type: 'grocery', name: 'Epigamia Greek Yogurt - Strawberry (90g)', category: 'Dairy', price: 45, stock: 100, lowStockThreshold: 20, expiryDate: '2024-10-02', barcode: '990000000035' },
        { id: 'kg-prod-103', type: 'grocery', name: 'Amul Gold Milk (1L)', category: 'Dairy', price: 70, stock: 180, lowStockThreshold: 35, expiryDate: '2024-09-09', barcode: '990000000103' },
        { id: 'kg-prod-104', type: 'grocery', name: 'Nestle Milkmaid (400g)', category: 'Dairy', price: 145, stock: 90, lowStockThreshold: 20, expiryDate: '2025-07-01', barcode: '990000000104' },
        
        // Pantry Staples (15 items)
        { id: 'kg-prod-12', type: 'grocery', name: 'Tata Salt (1kg)', category: 'Pantry', price: 28, stock: 300, lowStockThreshold: 50, expiryDate: '2026-08-01', barcode: '990000000012' },
        { id: 'kg-prod-13', type: 'grocery', name: 'Fortune Sunflower Oil (1L)', category: 'Pantry', price: 155, stock: 120, lowStockThreshold: 25, expiryDate: '2025-06-20', barcode: '990000000013' },
        { id: 'kg-prod-36', type: 'grocery', name: 'Saffola Gold Refined Oil (1L)', category: 'Pantry', price: 175, stock: 110, lowStockThreshold: 20, expiryDate: '2025-07-10', barcode: '990000000036' },
        { id: 'kg-prod-37', type: 'grocery', name: 'Sugar (1kg)', category: 'Pantry', price: 45, stock: 400, lowStockThreshold: 80, expiryDate: '2026-01-01', barcode: '990000000037' },
        { id: 'kg-prod-38', type: 'grocery', name: 'Maggi 2-Minute Noodles (4-pack)', category: 'Pantry', price: 56, stock: 350, lowStockThreshold: 70, expiryDate: '2025-05-01', barcode: '990000000038' },
        { id: 'kg-prod-39', type: 'grocery', name: 'Kissan Tomato Ketchup (950g)', category: 'Pantry', price: 130, stock: 150, lowStockThreshold: 30, expiryDate: '2025-04-15', barcode: '990000000039' },
        { id: 'kg-prod-40', type: 'grocery', name: 'Chings Schezwan Chutney (250g)', category: 'Pantry', price: 85, stock: 100, lowStockThreshold: 20, expiryDate: '2025-03-20', barcode: '990000000040' },
        { id: 'kg-prod-41', type: 'grocery', name: 'Organic Tattva Poha (500g)', category: 'Pantry', price: 60, stock: 90, lowStockThreshold: 18, expiryDate: '2025-02-01', barcode: '990000000041' },
        { id: 'kg-prod-42', type: 'grocery', name: 'Tata Sampann Besan (500g)', category: 'Pantry', price: 75, stock: 130, lowStockThreshold: 25, expiryDate: '2025-01-10', barcode: '990000000042' },
        { id: 'kg-prod-43', type: 'grocery', name: 'Dabur Honey (500g)', category: 'Pantry', price: 210, stock: 80, lowStockThreshold: 15, expiryDate: '2026-06-01', barcode: '990000000043' },
        { id: 'kg-prod-44', type: 'grocery', name: 'Kissan Mixed Fruit Jam (700g)', category: 'Pantry', price: 190, stock: 100, lowStockThreshold: 20, expiryDate: '2025-08-20', barcode: '990000000044' },
        { id: 'kg-prod-45', type: 'grocery', name: 'Veeba Mayonnaise (275g)', category: 'Pantry', price: 99, stock: 120, lowStockThreshold: 25, expiryDate: '2025-01-25', barcode: '990000000045' },
        { id: 'kg-prod-48', type: 'grocery', name: 'Borges Olive Oil (1L)', category: 'Pantry', price: 950, stock: 30, lowStockThreshold: 5, expiryDate: '2025-11-15', barcode: '990000000048' },
        { id: 'kg-prod-50', type: 'grocery', name: 'Idhayam Sesame Oil (500ml)', category: 'Pantry', price: 180, stock: 50, lowStockThreshold: 10, expiryDate: '2025-09-01', barcode: '990000000050' },
        { id: 'kg-prod-105', type: 'grocery', name: 'Jaggery (500g)', category: 'Pantry', price: 65, stock: 150, lowStockThreshold: 30, expiryDate: '2025-10-01', barcode: '990000000105' },

        // Grains & Cereals (10 items)
        { id: 'kg-prod-11', type: 'grocery', name: 'Aashirvaad Atta (5kg)', category: 'Grains', price: 250, stock: 100, lowStockThreshold: 20, expiryDate: '2025-01-15', barcode: '990000000011' },
        { id: 'kg-prod-14', type: 'grocery', name: 'Toor Dal (1kg)', category: 'Grains', price: 160, stock: 150, lowStockThreshold: 30, expiryDate: '2025-07-01', barcode: '990000000014' },
        { id: 'kg-prod-15', type: 'grocery', name: 'India Gate Basmati Rice (1kg)', category: 'Grains', price: 140, stock: 90, lowStockThreshold: 20, expiryDate: '2026-01-01', barcode: '990000000015' },
        { id: 'kg-prod-46', type: 'grocery', name: 'Kellogg\'s Corn Flakes (875g)', category: 'Grains', price: 340, stock: 70, lowStockThreshold: 15, expiryDate: '2025-06-10', barcode: '990000000046' },
        { id: 'kg-prod-47', type: 'grocery', name: 'Quaker Oats (1kg)', category: 'Grains', price: 199, stock: 100, lowStockThreshold: 20, expiryDate: '2025-07-22', barcode: '990000000047' },
        { id: 'kg-prod-51', type: 'grocery', name: 'Moong Dal (1kg)', category: 'Grains', price: 150, stock: 140, lowStockThreshold: 28, expiryDate: '2025-08-01', barcode: '990000000051' },
        { id: 'kg-prod-52', type: 'grocery', name: 'Chana Dal (1kg)', category: 'Grains', price: 130, stock: 160, lowStockThreshold: 30, expiryDate: '2025-08-05', barcode: '990000000052' },
        { id: 'kg-prod-53', type: 'grocery', name: 'Urad Dal (1kg)', category: 'Grains', price: 170, stock: 120, lowStockThreshold: 25, expiryDate: '2025-07-15', barcode: '990000000053' },
        { id: 'kg-prod-54', type: 'grocery', name: 'Rajma (500g)', category: 'Grains', price: 80, stock: 100, lowStockThreshold: 20, expiryDate: '2025-09-10', barcode: '990000000054' },
        { id: 'kg-prod-57', type: 'grocery', name: 'Fortune Chakki Fresh Atta (10kg)', category: 'Grains', price: 480, stock: 60, lowStockThreshold: 10, expiryDate: '2024-12-20', barcode: '990000000057' },
        { id: 'kg-prod-106', type: 'grocery', name: 'Sona Masoori Rice (5kg)', category: 'Grains', price: 350, stock: 80, lowStockThreshold: 15, expiryDate: '2026-03-01', barcode: '990000000106' },
        { id: 'kg-prod-107', type: 'grocery', name: 'Kabuli Chana (1kg)', category: 'Grains', price: 140, stock: 110, lowStockThreshold: 22, expiryDate: '2025-11-01', barcode: '990000000107' },
        { id: 'kg-prod-108', type: 'grocery', name: 'Groundnut (500g)', category: 'Grains', price: 90, stock: 130, lowStockThreshold: 25, expiryDate: '2025-04-01', barcode: '990000000108' },
        { id: 'kg-prod-109', type: 'grocery', name: 'Rava / Sooji (500g)', category: 'Grains', price: 40, stock: 200, lowStockThreshold: 40, expiryDate: '2025-03-15', barcode: '990000000109' },


        // Snacks (10 items)
        { id: 'kg-prod-16', type: 'grocery', name: 'Lays - Magic Masala', category: 'Snacks', price: 20, stock: 400, lowStockThreshold: 80, expiryDate: '2025-02-15', barcode: '990000000016' },
        { id: 'kg-prod-17', type: 'grocery', name: 'Parle-G Biscuit', category: 'Snacks', price: 10, stock: 800, lowStockThreshold: 150, expiryDate: '2025-04-01', barcode: '990000000017' },
        { id: 'kg-prod-18', type: 'grocery', name: 'Cadbury Dairy Milk', category: 'Snacks', price: 40, stock: 300, lowStockThreshold: 50, expiryDate: '2025-05-10', barcode: '990000000018' },
        { id: 'kg-prod-61', type: 'grocery', name: 'Britannia Good Day Cashew Cookies', category: 'Snacks', price: 35, stock: 250, lowStockThreshold: 50, expiryDate: '2025-03-01', barcode: '990000000061' },
        { id: 'kg-prod-62', type: 'grocery', name: 'Sunfeast Dark Fantasy Choco Fills', category: 'Snacks', price: 45, stock: 180, lowStockThreshold: 35, expiryDate: '2025-06-01', barcode: '990000000062' },
        { id: 'kg-prod-63', type: 'grocery', name: 'Bingo! Mad Angles', category: 'Snacks', price: 20, stock: 300, lowStockThreshold: 60, expiryDate: '2025-01-20', barcode: '990000000063' },
        { id: 'kg-prod-64', type: 'grocery', name: 'Haldiram\'s Aloo Bhujia (200g)', category: 'Snacks', price: 55, stock: 200, lowStockThreshold: 40, expiryDate: '2025-04-10', barcode: '990000000064' },
        { id: 'kg-prod-65', type: 'grocery', name: 'Kurkure Masala Munch', category: 'Snacks', price: 10, stock: 500, lowStockThreshold: 100, expiryDate: '2025-02-25', barcode: '990000000065' },
        { id: 'kg-prod-66', type: 'grocery', name: 'Oreo Chocolate Creme Biscuit', category: 'Snacks', price: 30, stock: 220, lowStockThreshold: 45, expiryDate: '2025-07-01', barcode: '990000000066' },
        { id: 'kg-prod-67', type: 'grocery', name: 'Nestle KitKat (4-finger)', category: 'Snacks', price: 30, stock: 280, lowStockThreshold: 50, expiryDate: '2025-05-15', barcode: '990000000067' },
        { id: 'kg-prod-110', type: 'grocery', name: 'Britannia Marie Gold', category: 'Snacks', price: 30, stock: 300, lowStockThreshold: 60, expiryDate: '2025-06-15', barcode: '990000000110' },
        { id: 'kg-prod-111', type: 'grocery', name: 'Monaco Salted Biscuit', category: 'Snacks', price: 10, stock: 400, lowStockThreshold: 80, expiryDate: '2025-05-20', barcode: '990000000111' },
        { id: 'kg-prod-112', type: 'grocery', name: 'Lotte Choco Pie', category: 'Snacks', price: 120, stock: 100, lowStockThreshold: 20, expiryDate: '2025-08-01', barcode: '990000000112' },


        // Beverages (5 items)
        { id: 'kg-prod-19', type: 'grocery', name: 'Coca-Cola (750ml)', category: 'Beverages', price: 40, stock: 250, lowStockThreshold: 50, expiryDate: '2025-03-20', barcode: '990000000019' },
        { id: 'kg-prod-20', type: 'grocery', name: 'Bru Instant Coffee (50g)', category: 'Beverages', price: 150, stock: 100, lowStockThreshold: 20, expiryDate: '2025-08-01', barcode: '990000000020' },
        { id: 'kg-prod-71', type: 'grocery', name: 'Tropicana 100% Orange Juice (1L)', category: 'Beverages', price: 140, stock: 80, lowStockThreshold: 15, expiryDate: '2025-01-01', barcode: '990000000071' },
        { id: 'kg-prod-72', type: 'grocery', name: 'Real Fruit Juice - Mixed Fruit (1L)', category: 'Beverages', price: 125, stock: 90, lowStockThreshold: 20, expiryDate: '2025-02-10', barcode: '990000000072' },
        { id: 'kg-prod-73', type: 'grocery', name: 'Tata Tea Gold (500g)', category: 'Beverages', price: 280, stock: 100, lowStockThreshold: 20, expiryDate: '2025-09-01', barcode: '990000000073' },
        { id: 'kg-prod-113', type: 'grocery', name: 'Red Label Tea (500g)', category: 'Beverages', price: 260, stock: 120, lowStockThreshold: 25, expiryDate: '2025-10-01', barcode: '990000000113' },
        { id: 'kg-prod-114', type: 'grocery', name: 'Taj Mahal Tea (250g)', category: 'Beverages', price: 180, stock: 90, lowStockThreshold: 18, expiryDate: '2025-11-01', barcode: '990000000114' },
        { id: 'kg-prod-115', type: 'grocery', name: 'Nescafe Classic Coffee (100g)', category: 'Beverages', price: 320, stock: 70, lowStockThreshold: 15, expiryDate: '2026-02-01', barcode: '990000000115' },

        // Spices & Masalas (10 items)
        { id: 'kg-prod-76', type: 'grocery', name: 'Everest Turmeric Powder (100g)', category: 'Spices', price: 35, stock: 200, lowStockThreshold: 40, expiryDate: '2025-10-01', barcode: '990000000076' },
        { id: 'kg-prod-77', type: 'grocery', name: 'Everest Chilli Powder (100g)', category: 'Spices', price: 45, stock: 180, lowStockThreshold: 35, expiryDate: '2025-10-01', barcode: '990000000077' },
        { id: 'kg-prod-78', type: 'grocery', name: 'Everest Garam Masala (100g)', category: 'Spices', price: 75, stock: 150, lowStockThreshold: 30, expiryDate: '2025-09-15', barcode: '990000000078' },
        { id: 'kg-prod-79', type: 'grocery', name: 'Tata Sampann Coriander Powder (200g)', category: 'Spices', price: 60, stock: 160, lowStockThreshold: 30, expiryDate: '2025-08-20', barcode: '990000000079' },
        { id: 'kg-prod-80', type: 'grocery', name: 'MDH Chana Masala (100g)', category: 'Spices', price: 70, stock: 120, lowStockThreshold: 25, expiryDate: '2025-07-25', barcode: '990000000080' },
        { id: 'kg-prod-81', type: 'grocery', name: 'Catch Jeera Powder (100g)', category: 'Spices', price: 65, stock: 130, lowStockThreshold: 25, expiryDate: '2025-11-01', barcode: '990000000081' },
        { id: 'kg-prod-82', type: 'grocery', name: 'Aachi Chicken Masala (50g)', category: 'Spices', price: 30, stock: 100, lowStockThreshold: 20, expiryDate: '2025-06-10', barcode: '990000000082' },
        { id: 'kg-prod-83', type: 'grocery', name: 'Whole Black Pepper (50g)', category: 'Spices', price: 90, stock: 80, lowStockThreshold: 15, expiryDate: '2026-03-01', barcode: '990000000083' },
        { id: 'kg-prod-84', type: 'grocery', name: 'Cumin Seeds (100g)', category: 'Spices', price: 50, stock: 150, lowStockThreshold: 30, expiryDate: '2026-02-01', barcode: '990000000084' },
        { id: 'kg-prod-85', type: 'grocery', name: 'Cardamom (25g)', category: 'Spices', price: 120, stock: 60, lowStockThreshold: 10, expiryDate: '2026-05-01', barcode: '990000000085' },
        { id: 'kg-prod-116', type: 'grocery', name: 'MDH Pav Bhaji Masala (100g)', category: 'Spices', price: 65, stock: 110, lowStockThreshold: 20, expiryDate: '2025-08-15', barcode: '990000000116' },
        { id: 'kg-prod-117', type: 'grocery', name: 'Catch Turmeric Powder (200g)', category: 'Spices', price: 55, stock: 190, lowStockThreshold: 38, expiryDate: '2025-12-01', barcode: '990000000117' },
        { id: 'kg-prod-118', type: 'grocery', name: 'Coriander Seeds (100g)', category: 'Spices', price: 40, stock: 140, lowStockThreshold: 28, expiryDate: '2026-04-01', barcode: '990000000118' },
        { id: 'kg-prod-119', type: 'grocery', name: 'Mustard Seeds (100g)', category: 'Spices', price: 30, stock: 160, lowStockThreshold: 32, expiryDate: '2026-03-01', barcode: '990000000119' },
        
        // Personal Care (10 items)
        { id: 'kg-prod-86', type: 'grocery', name: 'Lifebuoy Soap Bar (Pack of 4)', category: 'Personal Care', price: 120, stock: 100, lowStockThreshold: 20, expiryDate: '2026-01-01', barcode: '990000000086' },
        { id: 'kg-prod-87', type: 'grocery', name: 'Dove Shampoo (180ml)', category: 'Personal Care', price: 199, stock: 80, lowStockThreshold: 15, expiryDate: '2026-04-01', barcode: '990000000087' },
        { id: 'kg-prod-88', type: 'grocery', name: 'Colgate MaxFresh Toothpaste (150g)', category: 'Personal Care', price: 95, stock: 150, lowStockThreshold: 30, expiryDate: '2026-06-01', barcode: '990000000088' },
        { id: 'kg-prod-89', type: 'grocery', name: 'Pepsodent Germicheck Toothpaste (150g)', category: 'Personal Care', price: 85, stock: 140, lowStockThreshold: 25, expiryDate: '2026-05-01', barcode: '990000000089' },
        { id: 'kg-prod-90', type: 'grocery', name: 'Dettol Antiseptic Liquid (250ml)', category: 'Personal Care', price: 150, stock: 90, lowStockThreshold: 18, expiryDate: '2026-07-01', barcode: '990000000090' },
        { id: 'kg-prod-91', type: 'grocery', name: 'Nivea Body Lotion (400ml)', category: 'Personal Care', price: 350, stock: 70, lowStockThreshold: 10, expiryDate: '2026-08-01', barcode: '990000000091' },
        { id: 'kg-prod-92', type: 'grocery', name: 'Head & Shoulders Shampoo (180ml)', category: 'Personal Care', price: 180, stock: 75, lowStockThreshold: 15, expiryDate: '2026-03-01', barcode: '990000000092' },
        { id: 'kg-prod-93', type: 'grocery', name: 'Gillette Mach3 Razor', category: 'Personal Care', price: 130, stock: 60, lowStockThreshold: 10, expiryDate: '2028-01-01', barcode: '990000000093' },
        { id: 'kg-prod-94', type: 'grocery', name: 'Parachute Coconut Oil (500ml)', category: 'Personal Care', price: 210, stock: 110, lowStockThreshold: 20, expiryDate: '2025-12-01', barcode: '990000000094' },
        { id: 'kg-prod-95', type: 'grocery', name: 'Pears Pure & Gentle Soap', category: 'Personal Care', price: 45, stock: 200, lowStockThreshold: 40, expiryDate: '2026-02-01', barcode: '990000000095' },
        
        // Household Cleaners (5 items)
        { id: 'kg-prod-96', type: 'grocery', name: 'Vim Dishwash Liquid (500ml)', category: 'Household', price: 99, stock: 120, lowStockThreshold: 25, expiryDate: '2025-11-01', barcode: '990000000096' },
        { id: 'kg-prod-97', type: 'grocery', name: 'Surf Excel Detergent Powder (1kg)', category: 'Household', price: 150, stock: 100, lowStockThreshold: 20, expiryDate: '2025-10-01', barcode: '990000000097' },
        { id: 'kg-prod-98', type: 'grocery', name: 'Lizol Floor Cleaner (975ml)', category: 'Household', price: 180, stock: 90, lowStockThreshold: 18, expiryDate: '2025-09-01', barcode: '990000000098' },
        { id: 'kg-prod-99', type: 'grocery', name: 'Harpic Toilet Cleaner (500ml)', category: 'Household', price: 90, stock: 130, lowStockThreshold: 25, expiryDate: '2025-12-01', barcode: '990000000099' },
        { id: 'kg-prod-100', type: 'grocery', name: 'Good Knight Gold Flash Refill', category: 'Household', price: 75, stock: 150, lowStockThreshold: 30, expiryDate: '2026-01-01', barcode: '990000000100' },
        { id: 'kg-prod-120', type: 'grocery', name: 'Ariel Matic Detergent (1kg)', category: 'Household', price: 250, stock: 80, lowStockThreshold: 16, expiryDate: '2025-11-15', barcode: '990000000120' },
        { id: 'kg-prod-121', type: 'grocery', name: 'Colin Glass Cleaner (500ml)', category: 'Household', price: 95, stock: 100, lowStockThreshold: 20, expiryDate: '2026-01-20', barcode: '990000000121' },

    ];
    
    // 2. Generate Sales data for 1 year. The number of transactions is moderated to avoid localStorage quota issues.
    const sales: Sale[] = [];
    const taxRate = 5; // 5%
    const now = new Date();

    for (let day = 365; day >= 0; day--) { // Generate data for the last year
        const date = new Date(now);
        date.setDate(now.getDate() - day);
        
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        // Moderated transaction volume to prevent quota errors
        const baseTransactions = 3;
        const randomTransactions = Math.floor(Math.random() * 5); // 0-4
        const weekendBonus = isWeekend ? Math.floor(Math.random() * 8) + 2 : 0; // 2-10 on weekends
        const dailyTransactions = baseTransactions + randomTransactions + weekendBonus;

        for (let t = 0; t < dailyTransactions; t++) {
            const numItemsInSale = Math.floor(Math.random() * 4) + 1; // 1 to 4 items per sale
            const items: SaleItem[] = [];
            const productIndexes = new Set<number>();

            for (let i = 0; i < numItemsInSale; i++) {
                let productIndex;
                do {
                    productIndex = Math.floor(Math.random() * products.length);
                } while (productIndexes.has(productIndex));
                productIndexes.add(productIndex);

                const product = products[productIndex];
                const quantity = Math.floor(Math.random() * 3) + 1; // 1 to 3 quantity
                items.push({
                    productId: product.id,
                    name: product.name,
                    quantity: quantity,
                    price: product.price,
                });
            }
            
            const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const taxAmount = subtotal * (taxRate / 100);
            const total = subtotal + taxAmount;
            
            // Randomize time of day
            date.setHours(Math.floor(Math.random() * 12) + 9); // 9 AM to 9 PM
            date.setMinutes(Math.floor(Math.random() * 60));

            sales.push({
                id: uuidv4(),
                date: date.toISOString(),
                items,
                subtotal,
                taxAmount,
                total,
                userId
            });
        }
    }
    
    return { products, sales };
};


// FIX: Replaced `InventoryHook` with `BusinessDataHook`
const useInventory = (userId: string | null): BusinessDataHook => {
  // FIX: Replaced `Product` with `AnyProduct`
  const [products, setProducts] = useState<AnyProduct[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  // FIX: Added state for suppliers.
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [revenueResetTimestamp, setRevenueResetTimestamp] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    };

    try {
      const savedProducts = localStorage.getItem(`products_${userId}`);
      const savedSales = localStorage.getItem(`sales_${userId}`);
      // FIX: Load suppliers from localStorage.
      const savedSuppliers = localStorage.getItem(`suppliers_${userId}`);
      const savedTimestamp = localStorage.getItem(`revenueResetTimestamp_${userId}`);
      
      // SPECIAL CASE FOR KAGGLE USER: Seed data if it doesn't exist
      if (userId === 'user-kaggle' && !savedProducts && !savedSales) {
          const { products: kaggleProducts, sales: kaggleSales } = getKaggleGroceryData(userId);
          setProducts(kaggleProducts);
          setSales(kaggleSales);
          // FIX: Add seed suppliers for Kaggle user.
          setSuppliers([
              { id: 'sup-kg1', name: 'BigBasket Wholesale', contactPerson: 'Rajesh Gupta', phone: '8001234567', email: 'rajesh@bb-wholesale.com' },
              { id: 'sup-kg2', name: 'Farm Fresh Produce', contactPerson: 'Meena Kumari', phone: '8007654321', email: 'meena@farmfresh.com' }
          ]);
      } else {
        // EXISTING LOGIC FOR ALL OTHER USERS
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          // Seed initial data only for the primary demo user ('user-1').
          if (userId === 'user-1') {
              setProducts(getInitialProducts());
          } else {
              setProducts([]);
          }
        }

        if (savedSales) {
          setSales(JSON.parse(savedSales));
        } else {
          // Seed initial sales only for the primary demo user ('user-1').
          if (userId === 'user-1') {
              setSales(getInitialSales(userId));
          } else {
              setSales([]);
          }
        }
        
        // FIX: Load or seed suppliers.
        if (savedSuppliers) {
          setSuppliers(JSON.parse(savedSuppliers));
        } else {
          if (userId === 'user-1') {
            setSuppliers(getInitialSuppliers());
          } else {
            setSuppliers([]);
          }
        }
      }
      
      if (savedTimestamp) {
        setRevenueResetTimestamp(savedTimestamp);
      } else {
        setRevenueResetTimestamp(null);
      }
    } catch (error) {
        console.error("Failed to load inventory from localStorage", error);
        // Fallback to initial state if localStorage is corrupt.
        if (userId === 'user-1') {
            setProducts(getInitialProducts());
            setSales(getInitialSales(userId));
            // FIX: Add suppliers to fallback.
            setSuppliers(getInitialSuppliers());
        } else if (userId === 'user-kaggle') {
             const { products: kaggleProducts, sales: kaggleSales } = getKaggleGroceryData(userId);
             setProducts(kaggleProducts);
             setSales(kaggleSales);
             // FIX: Add suppliers to fallback.
             setSuppliers([
                { id: 'sup-kg1', name: 'BigBasket Wholesale', contactPerson: 'Rajesh Gupta', phone: '8001234567', email: 'rajesh@bb-wholesale.com' },
                { id: 'sup-kg2', name: 'Farm Fresh Produce', contactPerson: 'Meena Kumari', phone: '8007654321', email: 'meena@farmfresh.com' }
             ]);
        } else {
            setProducts([]);
            setSales([]);
            // FIX: Add suppliers to fallback.
            setSuppliers([]);
        }
        setRevenueResetTimestamp(null);
    } finally {
        setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId || loading) return;
    try {
      localStorage.setItem(`products_${userId}`, JSON.stringify(products));
    } catch (error) {
        console.error("Failed to save products to localStorage", error);
    }
  }, [products, userId, loading]);
  
  useEffect(() => {
    if (!userId || loading) return;
    try {
      localStorage.setItem(`sales_${userId}`, JSON.stringify(sales));
    } catch (error) {
        console.error("Failed to save sales to localStorage", error);
    }
  }, [sales, userId, loading]);

  // FIX: Add useEffect to save suppliers.
  useEffect(() => {
    if (!userId || loading) return;
    try {
      localStorage.setItem(`suppliers_${userId}`, JSON.stringify(suppliers));
    } catch (error) {
        console.error("Failed to save suppliers to localStorage", error);
    }
  }, [suppliers, userId, loading]);

  const addProduct = (productData: Omit<AnyProduct, 'id'>): { success: boolean; error?: string } => {
    const trimmedName = productData.name.trim();
    const trimmedBarcode = productData.barcode.trim();

    if (products.some(p => p.name.toLowerCase() === trimmedName.toLowerCase())) {
        return { success: false, error: 'product_name_exists' };
    }
    if (products.some(p => p.barcode === trimmedBarcode)) {
        return { success: false, error: 'barcode_exists' };
    }

    // FIX: Cast object to AnyProduct to resolve discriminated union type issue.
    const newProduct = { ...productData, name: trimmedName, barcode: trimmedBarcode, id: uuidv4() } as AnyProduct;
    setProducts(prev => [...prev, newProduct]);
    return { success: true };
  };

  const updateProduct = (updatedProduct: AnyProduct): { success: boolean; error?: string } => {
    const trimmedName = updatedProduct.name.trim();
    const trimmedBarcode = updatedProduct.barcode.trim();

    if (products.some(p => p.id !== updatedProduct.id && p.name.toLowerCase() === trimmedName.toLowerCase())) {
        return { success: false, error: 'product_name_exists' };
    }
    if (products.some(p => p.id !== updatedProduct.id && p.barcode === trimmedBarcode)) {
        return { success: false, error: 'barcode_exists' };
    }
    
    const finalProduct = { ...updatedProduct, name: trimmedName, barcode: trimmedBarcode };
    setProducts(prev => prev.map(p => p.id === finalProduct.id ? finalProduct : p));
    return { success: true };
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addSale = (
    items: SaleItem[], 
    subtotal: number, 
    taxAmount: number, 
    total: number, 
    discount?: { value: number; type: 'percentage' | 'fixed'; amount: number }
  ): Sale => {
    if (!userId) {
      throw new Error("User not logged in");
    }
    
    // Final validation check before processing the sale
    const insufficientStockItems: string[] = [];
    items.forEach(saleItem => {
        const product = products.find(p => p.id === saleItem.productId);
        if (!product || product.stock < saleItem.quantity) {
            insufficientStockItems.push(product?.name || saleItem.name);
        }
    });

    if (insufficientStockItems.length > 0) {
        throw new Error(`Sale cannot be completed. Insufficient stock for: ${insufficientStockItems.join(', ')}`);
    }

    // Create new sale record
    const newSale: Sale = {
      id: uuidv4(),
      date: new Date().toISOString(),
      items,
      subtotal,
      taxAmount,
      total,
      userId,
      discountAmount: discount?.amount,
      discountType: discount?.type,
      discountValue: discount?.value,
    };
    setSales(prev => [...prev, newSale]);

    // Update product stock
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      items.forEach(saleItem => {
        const productIndex = updatedProducts.findIndex(p => p.id === saleItem.productId);
        if (productIndex !== -1) {
          // Clamp stock at 0 to prevent negative inventory.
          updatedProducts[productIndex].stock = Math.max(0, updatedProducts[productIndex].stock - saleItem.quantity);
        }
      });
      return updatedProducts;
    });

    return newSale;
  };
  
  const resetDashboardRevenue = () => {
    if (userId) {
        const now = new Date().toISOString();
        setRevenueResetTimestamp(now);
        try {
            localStorage.setItem(`revenueResetTimestamp_${userId}`, now);
        } catch (error) {
            console.error("Failed to save revenue reset timestamp", error);
        }
    }
  };
  
  const clearSalesData = () => {
    setSales([]);
    setRevenueResetTimestamp(null);
    if (userId) {
      try {
        localStorage.removeItem(`sales_${userId}`);
        localStorage.removeItem(`revenueResetTimestamp_${userId}`);
      } catch (error) {
        console.error("Failed to clear sales data from localStorage", error);
      }
    }
  };
  
  // FIX: Implement supplier management functions.
  const addSupplier = (supplierData: Omit<Supplier, 'id'>): { success: boolean, error?: string } => {
    const newSupplier: Supplier = { ...supplierData, id: uuidv4() };
    setSuppliers(prev => [...prev, newSupplier]);
    return { success: true };
  };

  const updateSupplier = (updatedSupplier: Supplier): { success: boolean, error?: string } => {
    setSuppliers(prev => prev.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
    return { success: true };
  };

  const deleteSupplier = (supplierId: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== supplierId));
  };
  
  // FIX: Return suppliers and their management functions to conform to the BusinessDataHook type.
  return { products, sales, suppliers, addProduct, updateProduct, deleteProduct, addSale, clearSalesData, resetDashboardRevenue, revenueResetTimestamp, addSupplier, updateSupplier, deleteSupplier };
};

export default useInventory;
