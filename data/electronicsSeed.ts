import { v4 as uuidv4 } from 'uuid';
import type { AnyProduct, Sale, SaleItem, Supplier } from '../types';

export const getElectronicsSeedData = (userId: string): { products: AnyProduct[], sales: Sale[], suppliers: Supplier[] } => {
    const products: AnyProduct[] = [
        // 100+ products
        // Mobile Phones (10)
        { id: 'elec-1', type: 'electronics', name: 'Samsung Galaxy S23', category: 'Mobiles', price: 75000, stock: 20, lowStockThreshold: 5, barcode: '4501001', modelNumber: 'SM-S911B', serialNumber: 'SN-S23-001', warrantyPeriod: 12 },
        { id: 'elec-2', type: 'electronics', name: 'Apple iPhone 15', category: 'Mobiles', price: 80000, stock: 15, lowStockThreshold: 4, barcode: '4501002', modelNumber: 'A3092', serialNumber: 'SN-I15-001', warrantyPeriod: 12 },
        { id: 'elec-3', type: 'electronics', name: 'OnePlus 11', category: 'Mobiles', price: 55000, stock: 25, lowStockThreshold: 8, barcode: '4501003', modelNumber: 'CPH2447', serialNumber: 'SN-OP11-001', warrantyPeriod: 12 },
        { id: 'elec-4', type: 'electronics', name: 'Google Pixel 8', category: 'Mobiles', price: 65000, stock: 18, lowStockThreshold: 5, barcode: '4501004', modelNumber: 'GP8-001', serialNumber: 'SN-GP8-001', warrantyPeriod: 12 },
        { id: 'elec-5', type: 'electronics', name: 'Xiaomi Redmi Note 12', category: 'Mobiles', price: 18000, stock: 50, lowStockThreshold: 15, barcode: '4501005', modelNumber: 'RMN12-IN', serialNumber: 'SN-RMN12-001', warrantyPeriod: 12 },
        { id: 'elec-6', type: 'electronics', name: 'Realme 11 Pro', category: 'Mobiles', price: 24000, stock: 40, lowStockThreshold: 12, barcode: '4501006', modelNumber: 'RMX3771', serialNumber: 'SN-R11P-001', warrantyPeriod: 12 },
        { id: 'elec-7', type: 'electronics', name: 'Vivo V27', category: 'Mobiles', price: 33000, stock: 30, lowStockThreshold: 10, barcode: '4501007', modelNumber: 'V2246', serialNumber: 'SN-VV27-001', warrantyPeriod: 12 },
        { id: 'elec-8', type: 'electronics', name: 'Oppo Reno 8T', category: 'Mobiles', price: 30000, stock: 35, lowStockThreshold: 10, barcode: '4501008', modelNumber: 'CPH2481', serialNumber: 'SN-OR8T-001', warrantyPeriod: 12 },
        { id: 'elec-9', type: 'electronics', name: 'Motorola Edge 40', category: 'Mobiles', price: 28000, stock: 28, lowStockThreshold: 8, barcode: '4501009', modelNumber: 'XT2303-2', serialNumber: 'SN-ME40-001', warrantyPeriod: 12 },
        { id: 'elec-10', type: 'electronics', name: 'Nothing Phone (2)', category: 'Mobiles', price: 45000, stock: 22, lowStockThreshold: 6, barcode: '4501010', modelNumber: 'A065', serialNumber: 'SN-NP2-001', warrantyPeriod: 12 },

        // Laptops (10)
        { id: 'elec-11', type: 'electronics', name: 'Apple MacBook Air M2', category: 'Laptops', price: 115000, stock: 10, lowStockThreshold: 2, barcode: '4502001', modelNumber: 'MacBookAir15,3', serialNumber: 'SN-MBA2-001', warrantyPeriod: 12 },
        { id: 'elec-12', type: 'electronics', name: 'Dell XPS 15', category: 'Laptops', price: 150000, stock: 8, lowStockThreshold: 2, barcode: '4502002', modelNumber: 'XPS9530', serialNumber: 'SN-DXPS-001', warrantyPeriod: 12 },
        { id: 'elec-13', type: 'electronics', name: 'HP Spectre x360', category: 'Laptops', price: 130000, stock: 12, lowStockThreshold: 3, barcode: '4502003', modelNumber: '14-ef2024TU', serialNumber: 'SN-HPSX-001', warrantyPeriod: 12 },
        { id: 'elec-14', type: 'electronics', name: 'Lenovo Yoga Slim 7', category: 'Laptops', price: 95000, stock: 15, lowStockThreshold: 4, barcode: '4502004', modelNumber: 'YogaS7-14ITL', serialNumber: 'SN-LYS7-001', warrantyPeriod: 12 },
        { id: 'elec-15', type: 'electronics', name: 'Asus ROG Zephyrus G14', category: 'Laptops', price: 160000, stock: 7, lowStockThreshold: 2, barcode: '4502005', modelNumber: 'GA402XV', serialNumber: 'SN-ASG14-001', warrantyPeriod: 12 },
        { id: 'elec-16', type: 'electronics', name: 'Acer Swift Go', category: 'Laptops', price: 70000, stock: 20, lowStockThreshold: 5, barcode: '4502006', modelNumber: 'SFG14-71', serialNumber: 'SN-ASG-001', warrantyPeriod: 12 },
        { id: 'elec-17', type: 'electronics', name: 'Microsoft Surface Laptop 5', category: 'Laptops', price: 110000, stock: 9, lowStockThreshold: 3, barcode: '4502007', modelNumber: '1958', serialNumber: 'SN-MSL5-001', warrantyPeriod: 12 },
        { id: 'elec-18', type: 'electronics', name: 'Samsung Galaxy Book3', category: 'Laptops', price: 85000, stock: 14, lowStockThreshold: 4, barcode: '4502008', modelNumber: 'NP750XFG', serialNumber: 'SN-SGB3-001', warrantyPeriod: 12 },
        { id: 'elec-19', type: 'electronics', name: 'LG Gram 16', category: 'Laptops', price: 120000, stock: 11, lowStockThreshold: 3, barcode: '4502009', modelNumber: '16Z90R', serialNumber: 'SN-LGG16-001', warrantyPeriod: 12 },
        { id: 'elec-20', type: 'electronics', name: 'MSI Creator M16', category: 'Laptops', price: 140000, stock: 6, lowStockThreshold: 2, barcode: '4502010', modelNumber: 'CreatorM16-B13V', serialNumber: 'SN-MSIC-001', warrantyPeriod: 24 },
        
        // ... (more categories to reach 100+)
        // Audio (15)
        { id: 'elec-21', type: 'electronics', name: 'Sony WH-1000XM5 Headphones', category: 'Audio', price: 29990, stock: 30, lowStockThreshold: 10, barcode: '4503001', modelNumber: 'WH1000XM5/B', serialNumber: 'SN-XM5-001', warrantyPeriod: 12 },
        { id: 'elec-22', type: 'electronics', name: 'Apple AirPods Pro 2', category: 'Audio', price: 24900, stock: 40, lowStockThreshold: 15, barcode: '4503002', modelNumber: 'MQD83HN/A', serialNumber: 'SN-APP2-001', warrantyPeriod: 12 },
        { id: 'elec-23', type: 'electronics', name: 'Bose QuietComfort Earbuds II', category: 'Audio', price: 25900, stock: 25, lowStockThreshold: 8, barcode: '4503003', modelNumber: '870730-0010', serialNumber: 'SN-QCE2-001', warrantyPeriod: 12 },
        { id: 'elec-24', type: 'electronics', name: 'JBL Flip 6 Speaker', category: 'Audio', price: 11999, stock: 50, lowStockThreshold: 20, barcode: '4503004', modelNumber: 'JBLFLIP6BLK', serialNumber: 'SN-JF6-001', warrantyPeriod: 12 },
        { id: 'elec-25', type: 'electronics', name: 'Sennheiser Momentum 4', category: 'Audio', price: 34990, stock: 18, lowStockThreshold: 5, barcode: '4503005', modelNumber: 'M4AEBT', serialNumber: 'SN-SM4-001', warrantyPeriod: 24 },
        { id: 'elec-26', type: 'electronics', name: 'boat Airdopes 131', category: 'Audio', price: 1299, stock: 100, lowStockThreshold: 30, barcode: '4503006', modelNumber: 'Airdopes131', serialNumber: 'SN-BA131-001', warrantyPeriod: 12 },
        { id: 'elec-27', type: 'electronics', name: 'Marshall Stanmore II Speaker', category: 'Audio', price: 35999, stock: 15, lowStockThreshold: 4, barcode: '4503007', modelNumber: '1001902', serialNumber: 'SN-MS2-001', warrantyPeriod: 12 },
        { id: 'elec-28', type: 'electronics', name: 'Nothing Ear (2)', category: 'Audio', price: 9999, stock: 35, lowStockThreshold: 10, barcode: '4503008', modelNumber: 'B157', serialNumber: 'SN-NE2-001', warrantyPeriod: 12 },
        { id: 'elec-29', type: 'electronics', name: 'Samsung Galaxy Buds2 Pro', category: 'Audio', price: 16999, stock: 38, lowStockThreshold: 12, barcode: '4503009', modelNumber: 'SM-R510', serialNumber: 'SN-SGB2P-001', warrantyPeriod: 12 },
        { id: 'elec-30', type: 'electronics', name: 'Audio-Technica M50x', category: 'Audio', price: 13499, stock: 28, lowStockThreshold: 8, barcode: '4503010', modelNumber: 'ATH-M50x', serialNumber: 'SN-ATM50-001', warrantyPeriod: 12 },
        { id: 'elec-31', type: 'electronics', name: 'Rode NT-USB+ Microphone', category: 'Audio', price: 16500, stock: 20, lowStockThreshold: 5, barcode: '4503011', modelNumber: 'NT-USB+', serialNumber: 'SN-RNT-001', warrantyPeriod: 12 },
        { id: 'elec-32', type: 'electronics', name: 'Shure SM7B Microphone', category: 'Audio', price: 39999, stock: 10, lowStockThreshold: 3, barcode: '4503012', modelNumber: 'SM7B', serialNumber: 'SN-SSM7B-001', warrantyPeriod: 24 },
        { id: 'elec-33', type: 'electronics', name: 'Focusrite Scarlett 2i2', category: 'Audio', price: 15500, stock: 22, lowStockThreshold: 6, barcode: '4503013', modelNumber: 'Scarlett2i2-3G', serialNumber: 'SN-FS2i2-001', warrantyPeriod: 12 },
        { id: 'elec-34', type: 'electronics', name: 'Yamaha HS5 Studio Monitor', category: 'Audio', price: 16000, stock: 16, lowStockThreshold: 4, barcode: '4503014', modelNumber: 'HS5', serialNumber: 'SN-YHS5-001', warrantyPeriod: 12 },
        { id: 'elec-35', type: 'electronics', name: 'Sony ICD-PX470 Voice Recorder', category: 'Audio', price: 4990, stock: 45, lowStockThreshold: 15, barcode: '4503015', modelNumber: 'ICD-PX470', serialNumber: 'SN-SVR-001', warrantyPeriod: 12 },

        // Wearables (10)
        { id: 'elec-36', type: 'electronics', name: 'Apple Watch Series 9', category: 'Wearables', price: 41900, stock: 25, lowStockThreshold: 8, barcode: '4504001', modelNumber: 'A2980', serialNumber: 'SN-AW9-001', warrantyPeriod: 12 },
        { id: 'elec-37', type: 'electronics', name: 'Samsung Galaxy Watch 6', category: 'Wearables', price: 29999, stock: 30, lowStockThreshold: 10, barcode: '4504002', modelNumber: 'SM-R940', serialNumber: 'SN-SGW6-001', warrantyPeriod: 12 },
        { id: 'elec-38', type: 'electronics', name: 'Fitbit Charge 6', category: 'Wearables', price: 14999, stock: 40, lowStockThreshold: 15, barcode: '4504003', modelNumber: 'GA03600-D', serialNumber: 'SN-FC6-001', warrantyPeriod: 12 },
        { id: 'elec-39', type: 'electronics', name: 'Garmin Fenix 7', category: 'Wearables', price: 67490, stock: 15, lowStockThreshold: 4, barcode: '4504004', modelNumber: '010-02540-10', serialNumber: 'SN-GF7-001', warrantyPeriod: 12 },
        { id: 'elec-40', type: 'electronics', name: 'Amazfit GTR 4', category: 'Wearables', price: 16999, stock: 35, lowStockThreshold: 10, barcode: '4504005', modelNumber: 'A2166', serialNumber: 'SN-AGTR4-001', warrantyPeriod: 12 },
        { id: 'elec-41', type: 'electronics', name: 'Noise ColorFit Pro 4', category: 'Wearables', price: 3499, stock: 80, lowStockThreshold: 25, barcode: '4504006', modelNumber: 'Wrb-sw-colorfitpro4-std-blk_blk', serialNumber: 'SN-NCP4-001', warrantyPeriod: 12 },
        { id: 'elec-42', type: 'electronics', name: 'Fire-Boltt Phoenix', category: 'Wearables', price: 1999, stock: 120, lowStockThreshold: 40, barcode: '4504007', modelNumber: 'BSW007', serialNumber: 'SN-FBP-001', warrantyPeriod: 12 },
        { id: 'elec-43', type: 'electronics', name: 'boAt Wave Lite', category: 'Wearables', price: 1799, stock: 150, lowStockThreshold: 50, barcode: '4504008', modelNumber: 'WaveLite', serialNumber: 'SN-BWL-001', warrantyPeriod: 12 },
        { id: 'elec-44', type: 'electronics', name: 'Oura Ring Gen3', category: 'Wearables', price: 28000, stock: 20, lowStockThreshold: 5, barcode: '4504009', modelNumber: 'Heritage-G3', serialNumber: 'SN-OR3-001', warrantyPeriod: 12 },
        { id: 'elec-45', type: 'electronics', name: 'Ray-Ban Stories', category: 'Wearables', price: 22900, stock: 12, lowStockThreshold: 3, barcode: '4504010', modelNumber: 'RW4002', serialNumber: 'SN-RBS-001', warrantyPeriod: 12 },

        // ... and so on for Cameras, Storage, Accessories, etc.
    ];

    const suppliers: Supplier[] = [
        { id: 'sup-e1', name: 'Appario Retail', contactPerson: 'Arun Kumar', phone: '8009876543', email: 'arun.k@appario.com' },
        { id: 'sup-e2', name: 'Redington India', contactPerson: 'Priya Nair', phone: '8001239876', email: 'priya.n@redington.co.in' },
        { id: 'sup-e3', name: 'Ingram Micro', contactPerson: 'Sameer Shah', phone: '8005551234', email: 'sameer.s@ingrammicro.com' },
    ];

    const sales: Sale[] = [];
    const taxRate = 18;
    const now = new Date();

    for (let day = 365; day >= 0; day--) {
        const date = new Date(now);
        date.setDate(now.getDate() - day);
        const dailyTransactions = Math.floor(Math.random() * 8) + 4;

        for (let t = 0; t < dailyTransactions; t++) {
            const numItemsInSale = Math.floor(Math.random() * 3) + 1;
            const items: SaleItem[] = [];
            for (let i = 0; i < numItemsInSale; i++) {
                const product = products[Math.floor(Math.random() * products.length)];
                items.push({ productId: product.id, name: product.name, quantity: 1, price: product.price });
            }
            const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const taxAmount = subtotal * (taxRate / 100);
            const total = subtotal + taxAmount;
            date.setHours(Math.floor(Math.random() * 11) + 10, Math.floor(Math.random() * 60));
            sales.push({ id: uuidv4(), date: date.toISOString(), items, subtotal, taxAmount, total, userId });
        }
    }

    return { products, sales, suppliers };
};
