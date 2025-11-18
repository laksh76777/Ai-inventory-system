import { v4 as uuidv4 } from 'uuid';
import type { AnyProduct, Sale, SaleItem, Supplier } from '../types';

export const getHardwareSeedData = (userId: string): { products: AnyProduct[], sales: Sale[], suppliers: Supplier[] } => {
    const products: AnyProduct[] = [
        // Hand Tools (10)
        { id: 'hw-1', type: 'hardware', name: 'Stanley Claw Hammer', category: 'Hand Tools', price: 850, stock: 40, lowStockThreshold: 10, barcode: '5501001', brand: 'Stanley', sku: 'ST-HM-01' },
        { id: 'hw-2', type: 'hardware', name: 'Taparia Screwdriver Set', category: 'Hand Tools', price: 600, stock: 50, lowStockThreshold: 15, barcode: '5501002', brand: 'Taparia', sku: 'TP-SD-8P' },
        { id: 'hw-3', type: 'hardware', name: 'Adjustable Wrench 10-inch', category: 'Hand Tools', price: 700, stock: 35, lowStockThreshold: 8, barcode: '5501003', brand: 'Generic', sku: 'AW-10' },
        { id: 'hw-4', type: 'hardware', name: 'Pliers Combination 8-inch', category: 'Hand Tools', price: 450, stock: 60, lowStockThreshold: 20, barcode: '5501004', brand: 'Taparia', sku: 'TP-PL-08' },
        { id: 'hw-5', type: 'hardware', name: 'Measuring Tape 5m', category: 'Hand Tools', price: 300, stock: 80, lowStockThreshold: 25, barcode: '5501005', brand: 'Freemans', sku: 'FM-MT-5M' },
        { id: 'hw-6', type: 'hardware', name: 'Utility Knife', category: 'Hand Tools', price: 250, stock: 70, lowStockThreshold: 20, barcode: '5501006', brand: 'Stanley', sku: 'ST-UK-01' },
        { id: 'hw-7', type: 'hardware', name: 'Hacksaw Frame with Blade', category: 'Hand Tools', price: 400, stock: 45, lowStockThreshold: 10, barcode: '5501007', brand: 'Generic', sku: 'HSF-12' },
        { id: 'hw-8', type: 'hardware', name: 'Allen Key Set (9 pieces)', category: 'Hand Tools', price: 350, stock: 55, lowStockThreshold: 15, barcode: '5501008', brand: 'Generic', sku: 'AK-S9' },
        { id: 'hw-9', type: 'hardware', name: 'Wood Chisel 1-inch', category: 'Hand Tools', price: 280, stock: 30, lowStockThreshold: 8, barcode: '5501009', brand: 'Generic', sku: 'WC-1' },
        { id: 'hw-10', type: 'hardware', name: 'Spirit Level 12-inch', category: 'Hand Tools', price: 550, stock: 25, lowStockThreshold: 5, barcode: '5501010', brand: 'Stanley', sku: 'ST-SL-12' },

        // Power Tools (10)
        { id: 'hw-11', type: 'hardware', name: 'Bosch Cordless Drill', category: 'Power Tools', price: 6500, stock: 15, lowStockThreshold: 4, barcode: '5502001', brand: 'Bosch', sku: 'B-CD-18V' },
        { id: 'hw-12', type: 'hardware', name: 'DeWalt Angle Grinder', category: 'Power Tools', price: 4800, stock: 20, lowStockThreshold: 5, barcode: '5502002', brand: 'DeWalt', sku: 'DW-AG-4' },
        { id: 'hw-13', type: 'hardware', name: 'Makita Circular Saw', category: 'Power Tools', price: 9500, stock: 10, lowStockThreshold: 3, barcode: '5502003', brand: 'Makita', sku: 'MK-CS-7' },
        { id: 'hw-14', type: 'hardware', name: 'Black+Decker Jigsaw', category: 'Power Tools', price: 3500, stock: 18, lowStockThreshold: 5, barcode: '5502004', brand: 'Black+Decker', sku: 'BD-JS-01' },
        { id: 'hw-15', type: 'hardware', name: 'Rotary Hammer Drill', category: 'Power Tools', price: 7200, stock: 12, lowStockThreshold: 3, barcode: '5502005', brand: 'Bosch', sku: 'B-RH-26' },
        { id: 'hw-16', type: 'hardware', name: 'Orbital Sander', category: 'Power Tools', price: 2800, stock: 22, lowStockThreshold: 6, barcode: '5502006', brand: 'Generic', sku: 'OS-5' },
        { id: 'hw-17', type: 'hardware', name: 'Heat Gun 2000W', category: 'Power Tools', price: 1800, stock: 30, lowStockThreshold: 8, barcode: '5502007', brand: 'Generic', sku: 'HG-2000' },
        { id: 'hw-18', type: 'hardware', name: 'Electric Blower', category: 'Power Tools', price: 2500, stock: 25, lowStockThreshold: 7, barcode: '5502008', brand: 'Generic', sku: 'EB-600' },
        { id: 'hw-19', type: 'hardware', name: 'Bench Grinder 6-inch', category: 'Power Tools', price: 5500, stock: 8, lowStockThreshold: 2, barcode: '5502009', brand: 'Generic', sku: 'BG-6' },
        { id: 'hw-20', type: 'hardware', name: 'Impact Wrench Cordless', category: 'Power Tools', price: 8800, stock: 10, lowStockThreshold: 3, barcode: '5502010', brand: 'DeWalt', sku: 'DW-IW-12' },
        
        // Fasteners (10)
        { id: 'hw-21', type: 'hardware', name: 'Steel Nails 1-inch (1kg)', category: 'Fasteners', price: 150, stock: 100, lowStockThreshold: 20, barcode: '5503001', brand: 'Generic', sku: 'FN-SN-1KG1' },
        { id: 'hw-22', type: 'hardware', name: 'Wood Screws Assorted (200 pc)', category: 'Fasteners', price: 350, stock: 80, lowStockThreshold: 15, barcode: '5503002', brand: 'Generic', sku: 'FN-WS-200' },
        { id: 'hw-23', type: 'hardware', name: 'Wall Plugs (100 pc)', category: 'Fasteners', price: 120, stock: 150, lowStockThreshold: 30, barcode: '5503003', brand: 'Generic', sku: 'FN-WP-100' },
        { id: 'hw-24', type: 'hardware', name: 'Nuts & Bolts Assorted Pack', category: 'Fasteners', price: 400, stock: 60, lowStockThreshold: 10, barcode: '5503004', brand: 'Generic', sku: 'FN-NB-A' },
        { id: 'hw-25', type: 'hardware', name: 'Drywall Screws (500 pc)', category: 'Fasteners', price: 450, stock: 70, lowStockThreshold: 15, barcode: '5503005', brand: 'Generic', sku: 'FN-DS-500' },
        { id: 'hw-26', type: 'hardware', name: 'Steel Nails 3-inch (1kg)', category: 'Fasteners', price: 140, stock: 120, lowStockThreshold: 20, barcode: '5503006', brand: 'Generic', sku: 'FN-SN-1KG3' },
        { id: 'hw-27', type: 'hardware', name: 'Chipboard Screws 1.5-inch (200pc)', category: 'Fasteners', price: 280, stock: 80, lowStockThreshold: 15, barcode: '5503007', brand: 'Generic', sku: 'FN-CS-1.5' },
        { id: 'hw-28', type: 'hardware', name: 'Hex Bolts M8x50 (50 pc)', category: 'Fasteners', price: 500, stock: 50, lowStockThreshold: 10, barcode: '5503008', brand: 'Generic', sku: 'FN-HB-M8' },
        { id: 'hw-29', type: 'hardware', name: 'Washers Assorted Pack', category: 'Fasteners', price: 200, stock: 100, lowStockThreshold: 25, barcode: '5503009', brand: 'Generic', sku: 'FN-WSH-A' },
        { id: 'hw-30', type: 'hardware', name: 'Rivets Assorted Pack', category: 'Fasteners', price: 320, stock: 60, lowStockThreshold: 15, barcode: '5503010', brand: 'Generic', sku: 'FN-RV-A' },

        // Plumbing (5)
        { id: 'hw-31', type: 'hardware', name: 'PVC Pipe 1-inch (10ft)', category: 'Plumbing', price: 250, stock: 80, lowStockThreshold: 20, barcode: '5504001', brand: 'Supreme', sku: 'PL-PVC-1' },
        { id: 'hw-32', type: 'hardware', name: 'Teflon Tape (10 pack)', category: 'Plumbing', price: 100, stock: 200, lowStockThreshold: 50, barcode: '5504002', brand: 'Generic', sku: 'PL-TT-10' },
        { id: 'hw-33', type: 'hardware', name: 'Ball Valve 1/2-inch Brass', category: 'Plumbing', price: 350, stock: 60, lowStockThreshold: 15, barcode: '5504003', brand: 'Zoloto', sku: 'PL-BV-05' },
        { id: 'hw-34', type: 'hardware', name: 'PVC Solvent Cement 100ml', category: 'Plumbing', price: 80, stock: 120, lowStockThreshold: 30, barcode: '5504004', brand: 'Generic', sku: 'PL-SC-100' },
        { id: 'hw-35', type: 'hardware', name: 'Kitchen Sink Faucet', category: 'Plumbing', price: 1800, stock: 20, lowStockThreshold: 5, barcode: '5504005', brand: 'Jaquar', sku: 'PL-FA-K1' },

        // Electrical (5)
        { id: 'hw-36', type: 'hardware', name: 'Havells Wire 1.5 sq mm (90m)', category: 'Electrical', price: 1600, stock: 30, lowStockThreshold: 8, barcode: '5505001', brand: 'Havells', sku: 'EL-W-1.5' },
        { id: 'hw-37', type: 'hardware', name: 'Anchor Switch (10 pack)', category: 'Electrical', price: 500, stock: 90, lowStockThreshold: 20, barcode: '5505002', brand: 'Anchor', sku: 'EL-SW-10' },
        { id: 'hw-38', type: 'hardware', name: 'Electrical Tape (5 pack)', category: 'Electrical', price: 150, stock: 150, lowStockThreshold: 40, barcode: '5505003', brand: 'Generic', sku: 'EL-TP-5' },
        { id: 'hw-39', type: 'hardware', name: 'MCB 16A Single Pole', category: 'Electrical', price: 250, stock: 70, lowStockThreshold: 15, barcode: '5505004', brand: 'Havells', sku: 'EL-MCB-16' },
        { id: 'hw-40', type: 'hardware', name: 'LED Bulb 9W', category: 'Electrical', price: 120, stock: 200, lowStockThreshold: 50, barcode: '5505005', brand: 'Philips', sku: 'EL-LB-9W' },
        
        // Paint & Supplies (5)
        { id: 'hw-41', type: 'hardware', name: 'Asian Paints Emulsion (1L)', category: 'Paint', price: 600, stock: 40, lowStockThreshold: 10, barcode: '5506001', brand: 'Asian Paints', sku: 'PA-EM-1L' },
        { id: 'hw-42', type: 'hardware', name: 'Paint Brush Set (5 pieces)', category: 'Paint', price: 300, stock: 80, lowStockThreshold: 20, barcode: '5506002', brand: 'Generic', sku: 'PA-BS-5' },
        { id: 'hw-43', type: 'hardware', name: 'Paint Roller 9-inch', category: 'Paint', price: 250, stock: 70, lowStockThreshold: 15, barcode: '5506003', brand: 'Generic', sku: 'PA-RL-9' },
        { id: 'hw-44', type: 'hardware', name: 'Masking Tape 1-inch', category: 'Paint', price: 80, stock: 100, lowStockThreshold: 25, barcode: '5506004', brand: '3M', sku: 'PA-MT-1' },
        { id: 'hw-45', type: 'hardware', name: 'Turpentine Oil 500ml', category: 'Paint', price: 180, stock: 50, lowStockThreshold: 10, barcode: '5506005', brand: 'Generic', sku: 'PA-TO-500' },

        // Safety Gear (5)
        { id: 'hw-46', type: 'hardware', name: 'Safety Helmet', category: 'Safety', price: 450, stock: 60, lowStockThreshold: 15, barcode: '5507001', brand: 'Karam', sku: 'SG-SH-01' },
        { id: 'hw-47', type: 'hardware', name: 'Safety Goggles', category: 'Safety', price: 200, stock: 90, lowStockThreshold: 25, barcode: '5507002', brand: '3M', sku: 'SG-SG-01' },
        { id: 'hw-48', type: 'hardware', name: 'Work Gloves (Pair)', category: 'Safety', price: 150, stock: 120, lowStockThreshold: 30, barcode: '5507003', brand: 'Generic', sku: 'SG-WG-01' },
        { id: 'hw-49', type: 'hardware', name: '3M Dust Mask N95', category: 'Safety', price: 120, stock: 100, lowStockThreshold: 20, barcode: '5507004', brand: '3M', sku: 'SG-DM-N95' },
        { id: 'hw-50', type: 'hardware', name: 'Safety Shoes', category: 'Safety', price: 1500, stock: 30, lowStockThreshold: 8, barcode: '5507005', brand: 'Karam', sku: 'SG-SS-01' },
    ];

    const suppliers: Supplier[] = [
        { id: 'sup-h1', name: 'National Hardware Supply', contactPerson: 'Rajesh Patel', phone: '9876543210', email: 'rajesh@nationalhardware.com' },
        { id: 'sup-h2', name: 'Bosch Power Tools India', contactPerson: 'Priya Sharma', phone: '9876543211', email: 'priya.s@bosch.com' },
        { id: 'sup-h3', name: 'Jaquar Fittings Dist.', contactPerson: 'Amit Verma', phone: '9876543212', email: 'amit.v@jaquardist.com' },
        { id: 'sup-h4', name: 'Local Paints & Chemicals', contactPerson: 'Suresh Kumar', phone: '9876543213', email: 'suresh@localpaints.com' },
    ];

    const sales: Sale[] = [];
    const taxRate = 18;
    const now = new Date();

    for (let day = 365; day >= 0; day--) {
        const date = new Date(now);
        date.setDate(now.getDate() - day);
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        let transactionMultiplier = 1;
        // Pre-monsoon/Diwali home improvement spikes
        if ((date.getMonth() >= 4 && date.getMonth() <= 5) || (date.getMonth() >= 9 && date.getMonth() <= 10)) {
            transactionMultiplier = 1.5;
        }

        const baseTransactions = 4;
        const randomTransactions = Math.floor(Math.random() * 6);
        const weekendBonus = isWeekend ? Math.floor(Math.random() * 8) + 3 : 0;
        const dailyTransactions = Math.floor((baseTransactions + randomTransactions + weekendBonus) * transactionMultiplier);

        for (let t = 0; t < dailyTransactions; t++) {
            const numItemsInSale = Math.floor(Math.random() * 4) + 1;
            const items: SaleItem[] = [];
            for (let i = 0; i < numItemsInSale; i++) {
                const product = products[Math.floor(Math.random() * products.length)];
                const quantity = Math.floor(Math.random() * 2) + 1;
                items.push({ productId: product.id, name: product.name, quantity, price: product.price });
            }
            
            const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const taxAmount = subtotal * (taxRate / 100);
            const total = subtotal + taxAmount;
            
            date.setHours(Math.floor(Math.random() * 10) + 9, Math.floor(Math.random() * 60));
            sales.push({ id: uuidv4(), date: date.toISOString(), items, subtotal, taxAmount, total, userId });
        }
    }

    return { products, sales, suppliers };
};