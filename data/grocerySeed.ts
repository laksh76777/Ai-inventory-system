import { v4 as uuidv4 } from 'uuid';
import type { AnyProduct, Sale, SaleItem, Supplier } from '../types';

export const getGrocerySeedData = (userId: string): { products: AnyProduct[], sales: Sale[], suppliers: Supplier[] } => {
    const products: AnyProduct[] = [
        // 120+ products
        // Produce
        { id: 'groc-prod-1', type: 'grocery', name: 'Banana', category: 'Produce', price: 50, stock: 200, lowStockThreshold: 30, expiryDate: '2024-09-10', barcode: '990000000001' },
        { id: 'groc-prod-2', type: 'grocery', name: 'Apple - Royal Gala', category: 'Produce', price: 180, stock: 150, lowStockThreshold: 25, expiryDate: '2024-09-20', barcode: '990000000002' },
        { id: 'groc-prod-3', type: 'grocery', name: 'Onion (1kg)', category: 'Produce', price: 40, stock: 500, lowStockThreshold: 100, expiryDate: '2024-10-15', barcode: '990000000003' },
        { id: 'groc-prod-4', type: 'grocery', name: 'Potato (1kg)', category: 'Produce', price: 35, stock: 600, lowStockThreshold: 100, expiryDate: '2024-10-20', barcode: '990000000004' },
        { id: 'groc-prod-5', type: 'grocery', name: 'Tomato (1kg)', category: 'Produce', price: 60, stock: 300, lowStockThreshold: 50, expiryDate: '2024-09-12', barcode: '990000000005' },
        { id: 'groc-prod-6', type: 'grocery', name: 'Carrot (500g)', category: 'Produce', price: 45, stock: 100, lowStockThreshold: 20, expiryDate: '2024-09-18', barcode: '990000000006' },
        { id: 'groc-prod-21', type: 'grocery', name: 'Ginger (100g)', category: 'Produce', price: 25, stock: 150, lowStockThreshold: 30, expiryDate: '2024-10-01', barcode: '990000000021' },
        { id: 'groc-prod-22', type: 'grocery', name: 'Garlic (100g)', category: 'Produce', price: 30, stock: 180, lowStockThreshold: 40, expiryDate: '2024-10-05', barcode: '990000000022' },
        { id: 'groc-prod-23', type: 'grocery', name: 'Spinach (Bunch)', category: 'Produce', price: 20, stock: 80, lowStockThreshold: 15, expiryDate: '2024-09-09', barcode: '990000000023' },
        { id: 'groc-prod-24', type: 'grocery', name: 'Cucumber (500g)', category: 'Produce', price: 30, stock: 120, lowStockThreshold: 25, expiryDate: '2024-09-14', barcode: '990000000024' },
        { id: 'groc-prod-25', type: 'grocery', name: 'Cauliflower (1pc)', category: 'Produce', price: 40, stock: 70, lowStockThreshold: 15, expiryDate: '2024-09-16', barcode: '990000000025' },
        { id: 'groc-prod-26', type: 'grocery', name: 'Capsicum - Green (250g)', category: 'Produce', price: 35, stock: 90, lowStockThreshold: 20, expiryDate: '2024-09-22', barcode: '990000000026' },
        { id: 'groc-prod-27', type: 'grocery', name: 'Lemon (4pcs)', category: 'Produce', price: 20, stock: 250, lowStockThreshold: 50, expiryDate: '2024-09-30', barcode: '990000000027' },
        { id: 'groc-prod-28', type: 'grocery', name: 'Coriander (Bunch)', category: 'Produce', price: 15, stock: 100, lowStockThreshold: 20, expiryDate: '2024-09-11', barcode: '990000000028' },
        { id: 'groc-prod-29', type: 'grocery', name: 'Watermelon (1pc)', category: 'Produce', price: 90, stock: 40, lowStockThreshold: 10, expiryDate: '2024-09-25', barcode: '990000000029' },
        { id: 'groc-prod-30', type: 'grocery', name: 'Pomegranate (1pc)', category: 'Produce', price: 120, stock: 60, lowStockThreshold: 15, expiryDate: '2024-10-10', barcode: '990000000030' },
        { id: 'groc-prod-101', type: 'grocery', name: 'Green Chilli (100g)', category: 'Produce', price: 15, stock: 200, lowStockThreshold: 40, expiryDate: '2024-09-15', barcode: '990000000101' },
        { id: 'groc-prod-102', type: 'grocery', name: 'Mint Leaves (Bunch)', category: 'Produce', price: 10, stock: 150, lowStockThreshold: 30, expiryDate: '2024-09-10', barcode: '990000000102' },

        // Dairy & Eggs
        { id: 'groc-prod-7', type: 'grocery', name: 'Amul Toned Milk (1L)', category: 'Dairy', price: 66, stock: 150, lowStockThreshold: 30, expiryDate: '2024-09-08', barcode: '990000000007' },
        { id: 'groc-prod-8', type: 'grocery', name: 'Amul Butter (100g)', category: 'Dairy', price: 55, stock: 200, lowStockThreshold: 40, expiryDate: '2025-03-01', barcode: '990000000008' },
        { id: 'groc-prod-9', type: 'grocery', name: 'Eggs (Dozen)', category: 'Dairy', price: 80, stock: 100, lowStockThreshold: 20, expiryDate: '2024-09-25', barcode: '990000000009' },
        { id: 'groc-prod-10', type: 'grocery', name: 'Britannia Cheese Slices', category: 'Dairy', price: 140, stock: 80, lowStockThreshold: 15, expiryDate: '2024-12-10', barcode: '990000000010' },
        { id: 'groc-prod-31', type: 'grocery', name: 'Nestle Dahi (400g)', category: 'Dairy', price: 70, stock: 90, lowStockThreshold: 20, expiryDate: '2024-09-18', barcode: '990000000031' },
        { id: 'groc-prod-32', type: 'grocery', name: 'Amul Paneer (200g)', category: 'Dairy', price: 95, stock: 110, lowStockThreshold: 25, expiryDate: '2024-11-01', barcode: '990000000032' },
        { id: 'groc-prod-33', type: 'grocery', name: 'Go Cheese Spread (200g)', category: 'Dairy', price: 120, stock: 75, lowStockThreshold: 15, expiryDate: '2025-02-15', barcode: '990000000033' },
        { id: 'groc-prod-34', type: 'grocery', name: 'Mother Dairy Lassi (200ml)', category: 'Dairy', price: 25, stock: 200, lowStockThreshold: 50, expiryDate: '2024-09-15', barcode: '990000000034' },
        { id: 'groc-prod-35', type: 'grocery', name: 'Epigamia Greek Yogurt - Strawberry (90g)', category: 'Dairy', price: 45, stock: 100, lowStockThreshold: 20, expiryDate: '2024-10-02', barcode: '990000000035' },
        { id: 'groc-prod-103', type: 'grocery', name: 'Amul Gold Milk (1L)', category: 'Dairy', price: 70, stock: 180, lowStockThreshold: 35, expiryDate: '2024-09-09', barcode: '990000000103' },
        { id: 'groc-prod-104', type: 'grocery', name: 'Nestle Milkmaid (400g)', category: 'Dairy', price: 145, stock: 90, lowStockThreshold: 20, expiryDate: '2025-07-01', barcode: '990000000104' },
        
        // Pantry Staples
        { id: 'groc-prod-12', type: 'grocery', name: 'Tata Salt (1kg)', category: 'Pantry', price: 28, stock: 300, lowStockThreshold: 50, expiryDate: '2026-08-01', barcode: '990000000012' },
        { id: 'groc-prod-13', type: 'grocery', name: 'Fortune Sunflower Oil (1L)', category: 'Pantry', price: 155, stock: 120, lowStockThreshold: 25, expiryDate: '2025-06-20', barcode: '990000000013' },
        { id: 'groc-prod-36', type: 'grocery', name: 'Saffola Gold Refined Oil (1L)', category: 'Pantry', price: 175, stock: 110, lowStockThreshold: 20, expiryDate: '2025-07-10', barcode: '990000000036' },
        { id: 'groc-prod-37', type: 'grocery', name: 'Sugar (1kg)', category: 'Pantry', price: 45, stock: 400, lowStockThreshold: 80, expiryDate: '2026-01-01', barcode: '990000000037' },
        { id: 'groc-prod-38', type: 'grocery', name: 'Maggi 2-Minute Noodles (4-pack)', category: 'Pantry', price: 56, stock: 350, lowStockThreshold: 70, expiryDate: '2025-05-01', barcode: '990000000038' },
        { id: 'groc-prod-39', type: 'grocery', name: 'Kissan Tomato Ketchup (950g)', category: 'Pantry', price: 130, stock: 150, lowStockThreshold: 30, expiryDate: '2025-04-15', barcode: '990000000039' },
        { id: 'groc-prod-40', type: 'grocery', name: 'Chings Schezwan Chutney (250g)', category: 'Pantry', price: 85, stock: 100, lowStockThreshold: 20, expiryDate: '2025-03-20', barcode: '990000000040' },
        { id: 'groc-prod-41', type: 'grocery', name: 'Organic Tattva Poha (500g)', category: 'Pantry', price: 60, stock: 90, lowStockThreshold: 18, expiryDate: '2025-02-01', barcode: '990000000041' },
        { id: 'groc-prod-42', type: 'grocery', name: 'Tata Sampann Besan (500g)', category: 'Pantry', price: 75, stock: 130, lowStockThreshold: 25, expiryDate: '2025-01-10', barcode: '990000000042' },
        { id: 'groc-prod-43', type: 'grocery', name: 'Dabur Honey (500g)', category: 'Pantry', price: 210, stock: 80, lowStockThreshold: 15, expiryDate: '2026-06-01', barcode: '990000000043' },
        { id: 'groc-prod-44', type: 'grocery', name: 'Kissan Mixed Fruit Jam (700g)', category: 'Pantry', price: 190, stock: 100, lowStockThreshold: 20, expiryDate: '2025-08-20', barcode: '990000000044' },
        { id: 'groc-prod-45', type: 'grocery', name: 'Veeba Mayonnaise (275g)', category: 'Pantry', price: 99, stock: 120, lowStockThreshold: 25, expiryDate: '2025-01-25', barcode: '990000000045' },
        { id: 'groc-prod-48', type: 'grocery', name: 'Borges Olive Oil (1L)', category: 'Pantry', price: 950, stock: 30, lowStockThreshold: 5, expiryDate: '2025-11-15', barcode: '990000000048' },
        { id: 'groc-prod-50', type: 'grocery', name: 'Idhayam Sesame Oil (500ml)', category: 'Pantry', price: 180, stock: 50, lowStockThreshold: 10, expiryDate: '2025-09-01', barcode: '990000000050' },
        { id: 'groc-prod-105', type: 'grocery', name: 'Jaggery (500g)', category: 'Pantry', price: 65, stock: 150, lowStockThreshold: 30, expiryDate: '2025-10-01', barcode: '990000000105' },

        // Grains & Cereals
        { id: 'groc-prod-11', type: 'grocery', name: 'Aashirvaad Atta (5kg)', category: 'Grains', price: 250, stock: 100, lowStockThreshold: 20, expiryDate: '2025-01-15', barcode: '990000000011' },
        { id: 'groc-prod-14', type: 'grocery', name: 'Toor Dal (1kg)', category: 'Grains', price: 160, stock: 150, lowStockThreshold: 30, expiryDate: '2025-07-01', barcode: '990000000014' },
        { id: 'groc-prod-15', type: 'grocery', name: 'India Gate Basmati Rice (1kg)', category: 'Grains', price: 140, stock: 90, lowStockThreshold: 20, expiryDate: '2026-01-01', barcode: '990000000015' },
        { id: 'groc-prod-46', type: 'grocery', name: 'Kellogg\'s Corn Flakes (875g)', category: 'Grains', price: 340, stock: 70, lowStockThreshold: 15, expiryDate: '2025-06-10', barcode: '990000000046' },
        { id: 'groc-prod-47', type: 'grocery', name: 'Quaker Oats (1kg)', category: 'Grains', price: 199, stock: 100, lowStockThreshold: 20, expiryDate: '2025-07-22', barcode: '990000000047' },
        { id: 'groc-prod-51', type: 'grocery', name: 'Moong Dal (1kg)', category: 'Grains', price: 150, stock: 140, lowStockThreshold: 28, expiryDate: '2025-08-01', barcode: '990000000051' },
        { id: 'groc-prod-52', type: 'grocery', name: 'Chana Dal (1kg)', category: 'Grains', price: 130, stock: 160, lowStockThreshold: 30, expiryDate: '2025-08-05', barcode: '990000000052' },
        { id: 'groc-prod-53', type: 'grocery', name: 'Urad Dal (1kg)', category: 'Grains', price: 170, stock: 120, lowStockThreshold: 25, expiryDate: '2025-07-15', barcode: '990000000053' },
        { id: 'groc-prod-54', type: 'grocery', name: 'Rajma (500g)', category: 'Grains', price: 80, stock: 100, lowStockThreshold: 20, expiryDate: '2025-09-10', barcode: '990000000054' },
        { id: 'groc-prod-57', type: 'grocery', name: 'Fortune Chakki Fresh Atta (10kg)', category: 'Grains', price: 480, stock: 60, lowStockThreshold: 10, expiryDate: '2024-12-20', barcode: '990000000057' },
        { id: 'groc-prod-106', type: 'grocery', name: 'Sona Masoori Rice (5kg)', category: 'Grains', price: 350, stock: 80, lowStockThreshold: 15, expiryDate: '2026-03-01', barcode: '990000000106' },
        { id: 'groc-prod-107', type: 'grocery', name: 'Kabuli Chana (1kg)', category: 'Grains', price: 140, stock: 110, lowStockThreshold: 22, expiryDate: '2025-11-01', barcode: '990000000107' },
        { id: 'groc-prod-108', type: 'grocery', name: 'Groundnut (500g)', category: 'Grains', price: 90, stock: 130, lowStockThreshold: 25, expiryDate: '2025-04-01', barcode: '990000000108' },
        { id: 'groc-prod-109', type: 'grocery', name: 'Rava / Sooji (500g)', category: 'Grains', price: 40, stock: 200, lowStockThreshold: 40, expiryDate: '2025-03-15', barcode: '990000000109' },

        // Snacks
        { id: 'groc-prod-16', type: 'grocery', name: 'Lays - Magic Masala', category: 'Snacks', price: 20, stock: 400, lowStockThreshold: 80, expiryDate: '2025-02-15', barcode: '990000000016' },
        { id: 'groc-prod-17', type: 'grocery', name: 'Parle-G Biscuit', category: 'Snacks', price: 10, stock: 800, lowStockThreshold: 150, expiryDate: '2025-04-01', barcode: '990000000017' },
        { id: 'groc-prod-18', type: 'grocery', name: 'Cadbury Dairy Milk', category: 'Snacks', price: 40, stock: 300, lowStockThreshold: 50, expiryDate: '2025-05-10', barcode: '990000000018' },
        { id: 'groc-prod-61', type: 'grocery', name: 'Britannia Good Day Cashew Cookies', category: 'Snacks', price: 35, stock: 250, lowStockThreshold: 50, expiryDate: '2025-03-01', barcode: '990000000061' },
        { id: 'groc-prod-62', type: 'grocery', name: 'Sunfeast Dark Fantasy Choco Fills', category: 'Snacks', price: 45, stock: 180, lowStockThreshold: 35, expiryDate: '2025-06-01', barcode: '990000000062' },
        { id: 'groc-prod-63', type: 'grocery', name: 'Bingo! Mad Angles', category: 'Snacks', price: 20, stock: 300, lowStockThreshold: 60, expiryDate: '2025-01-20', barcode: '990000000063' },
        { id: 'groc-prod-64', type: 'grocery', name: 'Haldiram\'s Aloo Bhujia (200g)', category: 'Snacks', price: 55, stock: 200, lowStockThreshold: 40, expiryDate: '2025-04-10', barcode: '990000000064' },
        { id: 'groc-prod-65', type: 'grocery', name: 'Kurkure Masala Munch', category: 'Snacks', price: 10, stock: 500, lowStockThreshold: 100, expiryDate: '2025-02-25', barcode: '990000000065' },
        { id: 'groc-prod-66', type: 'grocery', name: 'Oreo Chocolate Creme Biscuit', category: 'Snacks', price: 30, stock: 220, lowStockThreshold: 45, expiryDate: '2025-07-01', barcode: '990000000066' },
        { id: 'groc-prod-67', type: 'grocery', name: 'Nestle KitKat (4-finger)', category: 'Snacks', price: 30, stock: 280, lowStockThreshold: 50, expiryDate: '2025-05-15', barcode: '990000000067' },
        { id: 'groc-prod-110', type: 'grocery', name: 'Britannia Marie Gold', category: 'Snacks', price: 30, stock: 300, lowStockThreshold: 60, expiryDate: '2025-06-15', barcode: '990000000110' },
        { id: 'groc-prod-111', type: 'grocery', name: 'Monaco Salted Biscuit', category: 'Snacks', price: 10, stock: 400, lowStockThreshold: 80, expiryDate: '2025-05-20', barcode: '990000000111' },
        { id: 'groc-prod-112', type: 'grocery', name: 'Lotte Choco Pie', category: 'Snacks', price: 120, stock: 100, lowStockThreshold: 20, expiryDate: '2025-08-01', barcode: '990000000112' },

        // Beverages
        { id: 'groc-prod-19', type: 'grocery', name: 'Coca-Cola (750ml)', category: 'Beverages', price: 40, stock: 250, lowStockThreshold: 50, expiryDate: '2025-03-20', barcode: '990000000019' },
        { id: 'groc-prod-20', type: 'grocery', name: 'Bru Instant Coffee (50g)', category: 'Beverages', price: 150, stock: 100, lowStockThreshold: 20, expiryDate: '2025-08-01', barcode: '990000000020' },
        { id: 'groc-prod-71', type: 'grocery', name: 'Tropicana 100% Orange Juice (1L)', category: 'Beverages', price: 140, stock: 80, lowStockThreshold: 15, expiryDate: '2025-01-01', barcode: '990000000071' },
        { id: 'groc-prod-72', type: 'grocery', name: 'Real Fruit Juice - Mixed Fruit (1L)', category: 'Beverages', price: 125, stock: 90, lowStockThreshold: 20, expiryDate: '2025-02-10', barcode: '990000000072' },
        { id: 'groc-prod-73', type: 'grocery', name: 'Tata Tea Gold (500g)', category: 'Beverages', price: 280, stock: 100, lowStockThreshold: 20, expiryDate: '2025-09-01', barcode: '990000000073' },
        { id: 'groc-prod-113', type: 'grocery', name: 'Red Label Tea (500g)', category: 'Beverages', price: 260, stock: 120, lowStockThreshold: 25, expiryDate: '2025-10-01', barcode: '990000000113' },
        { id: 'groc-prod-114', type: 'grocery', name: 'Taj Mahal Tea (250g)', category: 'Beverages', price: 180, stock: 90, lowStockThreshold: 18, expiryDate: '2025-11-01', barcode: '990000000114' },
        { id: 'groc-prod-115', type: 'grocery', name: 'Nescafe Classic Coffee (100g)', category: 'Beverages', price: 320, stock: 70, lowStockThreshold: 15, expiryDate: '2026-02-01', barcode: '990000000115' },

        // Spices & Masalas
        { id: 'groc-prod-76', type: 'grocery', name: 'Everest Turmeric Powder (100g)', category: 'Spices', price: 35, stock: 200, lowStockThreshold: 40, expiryDate: '2025-10-01', barcode: '990000000076' },
        { id: 'groc-prod-77', type: 'grocery', name: 'Everest Chilli Powder (100g)', category: 'Spices', price: 45, stock: 180, lowStockThreshold: 35, expiryDate: '2025-10-01', barcode: '990000000077' },
        { id: 'groc-prod-78', type: 'grocery', name: 'Everest Garam Masala (100g)', category: 'Spices', price: 75, stock: 150, lowStockThreshold: 30, expiryDate: '2025-09-15', barcode: '990000000078' },
        { id: 'groc-prod-79', type: 'grocery', name: 'Tata Sampann Coriander Powder (200g)', category: 'Spices', price: 60, stock: 160, lowStockThreshold: 30, expiryDate: '2025-08-20', barcode: '990000000079' },
        { id: 'groc-prod-80', type: 'grocery', name: 'MDH Chana Masala (100g)', category: 'Spices', price: 70, stock: 120, lowStockThreshold: 25, expiryDate: '2025-07-25', barcode: '990000000080' },
        { id: 'groc-prod-81', type: 'grocery', name: 'Catch Jeera Powder (100g)', category: 'Spices', price: 65, stock: 130, lowStockThreshold: 25, expiryDate: '2025-11-01', barcode: '990000000081' },
        { id: 'groc-prod-82', type: 'grocery', name: 'Aachi Chicken Masala (50g)', category: 'Spices', price: 30, stock: 100, lowStockThreshold: 20, expiryDate: '2025-06-10', barcode: '990000000082' },
        { id: 'groc-prod-83', type: 'grocery', name: 'Whole Black Pepper (50g)', category: 'Spices', price: 90, stock: 80, lowStockThreshold: 15, expiryDate: '2026-03-01', barcode: '990000000083' },
        { id: 'groc-prod-84', type: 'grocery', name: 'Cumin Seeds (100g)', category: 'Spices', price: 50, stock: 150, lowStockThreshold: 30, expiryDate: '2026-02-01', barcode: '990000000084' },
        { id: 'groc-prod-85', type: 'grocery', name: 'Cardamom (25g)', category: 'Spices', price: 120, stock: 60, lowStockThreshold: 10, expiryDate: '2026-05-01', barcode: '990000000085' },
        { id: 'groc-prod-116', type: 'grocery', name: 'MDH Pav Bhaji Masala (100g)', category: 'Spices', price: 65, stock: 110, lowStockThreshold: 20, expiryDate: '2025-08-15', barcode: '990000000116' },
        { id: 'groc-prod-117', type: 'grocery', name: 'Catch Turmeric Powder (200g)', category: 'Spices', price: 55, stock: 190, lowStockThreshold: 38, expiryDate: '2025-12-01', barcode: '990000000117' },
        { id: 'groc-prod-118', type: 'grocery', name: 'Coriander Seeds (100g)', category: 'Spices', price: 40, stock: 140, lowStockThreshold: 28, expiryDate: '2026-04-01', barcode: '990000000118' },
        { id: 'groc-prod-119', type: 'grocery', name: 'Mustard Seeds (100g)', category: 'Spices', price: 30, stock: 160, lowStockThreshold: 32, expiryDate: '2026-03-01', barcode: '990000000119' },
        
        // Personal Care
        { id: 'groc-prod-86', type: 'grocery', name: 'Lifebuoy Soap Bar (Pack of 4)', category: 'Personal Care', price: 120, stock: 100, lowStockThreshold: 20, expiryDate: '2026-01-01', barcode: '990000000086' },
        { id: 'groc-prod-87', type: 'grocery', name: 'Dove Shampoo (180ml)', category: 'Personal Care', price: 199, stock: 80, lowStockThreshold: 15, expiryDate: '2026-04-01', barcode: '990000000087' },
        { id: 'groc-prod-88', type: 'grocery', name: 'Colgate MaxFresh Toothpaste (150g)', category: 'Personal Care', price: 95, stock: 150, lowStockThreshold: 30, expiryDate: '2026-06-01', barcode: '990000000088' },
        { id: 'groc-prod-89', type: 'grocery', name: 'Pepsodent Germicheck Toothpaste (150g)', category: 'Personal Care', price: 85, stock: 140, lowStockThreshold: 25, expiryDate: '2026-05-01', barcode: '990000000089' },
        { id: 'groc-prod-90', type: 'grocery', name: 'Dettol Antiseptic Liquid (250ml)', category: 'Personal Care', price: 150, stock: 90, lowStockThreshold: 18, expiryDate: '2026-07-01', barcode: '990000000090' },
        { id: 'groc-prod-91', type: 'grocery', name: 'Nivea Body Lotion (400ml)', category: 'Personal Care', price: 350, stock: 70, lowStockThreshold: 10, expiryDate: '2026-08-01', barcode: '990000000091' },
        { id: 'groc-prod-92', type: 'grocery', name: 'Head & Shoulders Shampoo (180ml)', category: 'Personal Care', price: 180, stock: 75, lowStockThreshold: 15, expiryDate: '2026-03-01', barcode: '990000000092' },
        { id: 'groc-prod-93', type: 'grocery', name: 'Gillette Mach3 Razor', category: 'Personal Care', price: 130, stock: 60, lowStockThreshold: 10, expiryDate: '2028-01-01', barcode: '990000000093' },
        { id: 'groc-prod-94', type: 'grocery', name: 'Parachute Coconut Oil (500ml)', category: 'Personal Care', price: 210, stock: 110, lowStockThreshold: 20, expiryDate: '2025-12-01', barcode: '990000000094' },
        { id: 'groc-prod-95', type: 'grocery', name: 'Pears Pure & Gentle Soap', category: 'Personal Care', price: 45, stock: 200, lowStockThreshold: 40, expiryDate: '2026-02-01', barcode: '990000000095' },
        
        // Household Cleaners
        { id: 'groc-prod-96', type: 'grocery', name: 'Vim Dishwash Liquid (500ml)', category: 'Household', price: 99, stock: 120, lowStockThreshold: 25, expiryDate: '2025-11-01', barcode: '990000000096' },
        { id: 'groc-prod-97', type: 'grocery', name: 'Surf Excel Detergent Powder (1kg)', category: 'Household', price: 150, stock: 100, lowStockThreshold: 20, expiryDate: '2025-10-01', barcode: '990000000097' },
        { id: 'groc-prod-98', type: 'grocery', name: 'Lizol Floor Cleaner (975ml)', category: 'Household', price: 180, stock: 90, lowStockThreshold: 18, expiryDate: '2025-09-01', barcode: '990000000098' },
        { id: 'groc-prod-99', type: 'grocery', name: 'Harpic Toilet Cleaner (500ml)', category: 'Household', price: 90, stock: 130, lowStockThreshold: 25, expiryDate: '2025-12-01', barcode: '990000000099' },
        { id: 'groc-prod-100', type: 'grocery', name: 'Good Knight Gold Flash Refill', category: 'Household', price: 75, stock: 150, lowStockThreshold: 30, expiryDate: '2026-01-01', barcode: '990000000100' },
        { id: 'groc-prod-120', type: 'grocery', name: 'Ariel Matic Detergent (1kg)', category: 'Household', price: 250, stock: 80, lowStockThreshold: 16, expiryDate: '2025-11-15', barcode: '990000000120' },
        { id: 'groc-prod-121', type: 'grocery', name: 'Colin Glass Cleaner (500ml)', category: 'Household', price: 95, stock: 100, lowStockThreshold: 20, expiryDate: '2026-01-20', barcode: '990000000121' },
    ];
    
    const suppliers: Supplier[] = [
        { id: 'sup-kg1', name: 'BigBasket Wholesale', contactPerson: 'Rajesh Gupta', phone: '8001234567', email: 'rajesh@bb-wholesale.com' },
        { id: 'sup-kg2', name: 'Farm Fresh Produce', contactPerson: 'Meena Kumari', phone: '8007654321', email: 'meena@farmfresh.com' },
        { id: 'sup-kg3', name: 'ITC Distributors', contactPerson: 'Anand Sharma', phone: '8001112222', email: 'anand.s@itc.com'},
        { id: 'sup-kg4', name: 'HUL Supply Chain', contactPerson: 'Priya Singh', phone: '8003334444', email: 'priya.s@hul.co.in'}
    ];
    
    // Generate Sales data for 1 year
    const sales: Sale[] = [];
    const taxRate = 5; // 5%
    const now = new Date();

    // Key festival periods (Month is 0-indexed)
    const festivalPeriods = {
        diwali: { month: 10, peak: 1, duration: 15 }, // Diwali in Nov
        dussehra: { month: 9, peak: 12, duration: 10 },
        ganeshChaturthi: { month: 8, peak: 7, duration: 10 },
        christmas: { month: 11, peak: 25, duration: 10 }
    };

    for (let day = 365; day >= 0; day--) {
        const date = new Date(now);
        date.setDate(now.getDate() - day);
        
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        let transactionMultiplier = 1;
        // Check for festival season
        for (const festival in festivalPeriods) {
            const { month, peak, duration } = festivalPeriods[festival as keyof typeof festivalPeriods];
            if (date.getMonth() === month && date.getDate() >= peak - (duration / 2) && date.getDate() <= peak + (duration / 2)) {
                transactionMultiplier = 2.5; // 150% increase during festivals
                break;
            }
        }

        const baseTransactions = 5;
        const randomTransactions = Math.floor(Math.random() * 8); // 0-7
        const weekendBonus = isWeekend ? Math.floor(Math.random() * 10) + 5 : 0; // 5-15 on weekends
        const dailyTransactions = Math.floor((baseTransactions + randomTransactions + weekendBonus) * transactionMultiplier);

        for (let t = 0; t < dailyTransactions; t++) {
            const numItemsInSale = Math.floor(Math.random() * 5) + 1; // 1 to 5 items
            const items: SaleItem[] = [];
            const productIndexes = new Set<number>();

            for (let i = 0; i < numItemsInSale; i++) {
                let productIndex;
                do {
                    productIndex = Math.floor(Math.random() * products.length);
                } while (productIndexes.has(productIndex));
                productIndexes.add(productIndex);

                const product = products[productIndex];
                const quantity = Math.floor(Math.random() * 3) + 1;
                items.push({ productId: product.id, name: product.name, quantity, price: product.price });
            }
            
            const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const taxAmount = subtotal * (taxRate / 100);
            const total = subtotal + taxAmount;
            
            date.setHours(Math.floor(Math.random() * 12) + 9, Math.floor(Math.random() * 60));

            sales.push({ id: uuidv4(), date: date.toISOString(), items, subtotal, taxAmount, total, userId });
        }
    }
    
    return { products, sales, suppliers };
};
