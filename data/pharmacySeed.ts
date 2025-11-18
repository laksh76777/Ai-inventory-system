import { v4 as uuidv4 } from 'uuid';
import type { AnyProduct, Sale, SaleItem, Supplier } from '../types';

export const getPharmacySeedData = (userId: string): { products: AnyProduct[], sales: Sale[], suppliers: Supplier[] } => {
    const products: AnyProduct[] = [
        // 100+ products
        // Pain Relief (10)
        { id: 'pharm-1', type: 'pharmacy', name: 'Crocin Pain Relief', category: 'Painkiller', price: 30, stock: 200, lowStockThreshold: 50, barcode: '8901122334455', manufacturer: 'GSK', batchNumber: 'C1234', expiryDate: '2025-10-31', requiresPrescription: false },
        { id: 'pharm-2', type: 'pharmacy', name: 'Combiflam', category: 'Painkiller', price: 40, stock: 150, lowStockThreshold: 40, barcode: '8902233445567', manufacturer: 'Sanofi', batchNumber: 'CF567', expiryDate: '2026-01-31', requiresPrescription: false },
        { id: 'pharm-3', type: 'pharmacy', name: 'Volini Pain Relief Gel', category: 'Topical', price: 130, stock: 100, lowStockThreshold: 20, barcode: '8903344556678', manufacturer: 'Sun Pharma', batchNumber: 'VG890', expiryDate: '2025-12-31', requiresPrescription: false },
        { id: 'pharm-4', type: 'pharmacy', name: 'Moov Pain Relief Cream', category: 'Topical', price: 125, stock: 110, lowStockThreshold: 25, barcode: '8904455667789', manufacturer: 'Reckitt', batchNumber: 'MV112', expiryDate: '2026-02-28', requiresPrescription: false },
        { id: 'pharm-5', type: 'pharmacy', name: 'Sumo Tablet', category: 'Painkiller', price: 25, stock: 180, lowStockThreshold: 45, barcode: '8905566778890', manufacturer: 'Alkem', batchNumber: 'SM345', expiryDate: '2025-09-30', requiresPrescription: true },
        { id: 'pharm-6', type: 'pharmacy', name: 'Dolo 650', category: 'Fever', price: 30, stock: 300, lowStockThreshold: 75, barcode: '8906677889901', manufacturer: 'Micro Labs', batchNumber: 'DL650', expiryDate: '2026-04-30', requiresPrescription: false },
        { id: 'pharm-7', type: 'pharmacy', name: 'Disprin Regular Effervescent', category: 'Painkiller', price: 11, stock: 250, lowStockThreshold: 60, barcode: '8907788990012', manufacturer: 'Reckitt', batchNumber: 'DS789', expiryDate: '2025-11-30', requiresPrescription: false },
        { id: 'pharm-8', type: 'pharmacy', name: 'Saridon Headache Relief', category: 'Painkiller', price: 35, stock: 220, lowStockThreshold: 50, barcode: '8908899001123', manufacturer: 'Bayer', batchNumber: 'SR012', expiryDate: '2026-03-31', requiresPrescription: false },
        { id: 'pharm-9', type: 'pharmacy', name: 'Voveran Gel', category: 'Topical', price: 150, stock: 90, lowStockThreshold: 15, barcode: '8909900112234', manufacturer: 'Novartis', batchNumber: 'VV345', expiryDate: '2025-08-31', requiresPrescription: true },
        { id: 'pharm-10', type: 'pharmacy', name: 'Nise Tablet', category: 'Painkiller', price: 50, stock: 120, lowStockThreshold: 30, barcode: '8900011223345', manufacturer: 'Dr. Reddy\'s', batchNumber: 'NS678', expiryDate: '2026-05-31', requiresPrescription: true },

        // Antibiotics (5)
        { id: 'pharm-11', type: 'pharmacy', name: 'Azithromycin 500mg', category: 'Antibiotic', price: 120, stock: 80, lowStockThreshold: 20, barcode: '8901122334466', manufacturer: 'Cipla', batchNumber: 'AZ567', expiryDate: '2026-05-31', requiresPrescription: true },
        { id: 'pharm-12', type: 'pharmacy', name: 'Amoxicillin 500mg', category: 'Antibiotic', price: 90, stock: 100, lowStockThreshold: 25, barcode: '8902233445577', manufacturer: 'Mankind', batchNumber: 'AMX890', expiryDate: '2025-07-31', requiresPrescription: true },
        { id: 'pharm-13', type: 'pharmacy', name: 'Augmentin 625 Duo', category: 'Antibiotic', price: 220, stock: 60, lowStockThreshold: 15, barcode: '8903344556688', manufacturer: 'GSK', batchNumber: 'AGD123', expiryDate: '2026-06-30', requiresPrescription: true },
        { id: 'pharm-14', type: 'pharmacy', name: 'Ofloxacin 200mg', category: 'Antibiotic', price: 75, stock: 90, lowStockThreshold: 20, barcode: '8904455667799', manufacturer: 'Zydus Cadila', batchNumber: 'OFX456', expiryDate: '2025-10-31', requiresPrescription: true },
        { id: 'pharm-15', type: 'pharmacy', name: 'Ciplox 500', category: 'Antibiotic', price: 55, stock: 110, lowStockThreshold: 30, barcode: '8905566778800', manufacturer: 'Cipla', batchNumber: 'CPX789', expiryDate: '2026-01-31', requiresPrescription: true },

        // Cold & Cough (10)
        { id: 'pharm-16', type: 'pharmacy', name: 'Vicks Vaporub', category: 'Cold Relief', price: 45, stock: 250, lowStockThreshold: 50, barcode: '8906677889912', manufacturer: 'P&G', batchNumber: 'VV111', expiryDate: '2026-08-31', requiresPrescription: false },
        { id: 'pharm-17', type: 'pharmacy', name: 'Strepsils', category: 'Sore Throat', price: 30, stock: 300, lowStockThreshold: 60, barcode: '8907788990023', manufacturer: 'Reckitt', batchNumber: 'ST222', expiryDate: '2025-12-31', requiresPrescription: false },
        { id: 'pharm-18', type: 'pharmacy', name: 'Benadryl Cough Syrup', category: 'Cough', price: 110, stock: 120, lowStockThreshold: 30, barcode: '8908899001134', manufacturer: 'J&J', batchNumber: 'BN333', expiryDate: '2026-02-28', requiresPrescription: false },
        { id: 'pharm-19', type: 'pharmacy', name: 'Cheston Cold', category: 'Cold Relief', price: 42, stock: 180, lowStockThreshold: 40, barcode: '8909900112245', manufacturer: 'Cipla', batchNumber: 'CC444', expiryDate: '2025-09-30', requiresPrescription: false },
        { id: 'pharm-20', type: 'pharmacy', name: 'Sinarest Tablet', category: 'Cold Relief', price: 50, stock: 200, lowStockThreshold: 50, barcode: '8900011223356', manufacturer: 'Centaur', batchNumber: 'SN555', expiryDate: '2026-07-31', requiresPrescription: false },
        { id: 'pharm-21', type: 'pharmacy', name: 'Otrivin Nasal Spray', category: 'Cold Relief', price: 95, stock: 100, lowStockThreshold: 20, barcode: '8901122334477', manufacturer: 'GSK', batchNumber: 'OT666', expiryDate: '2025-11-30', requiresPrescription: false },
        { id: 'pharm-22', type: 'pharmacy', name: 'Honitus Cough Syrup', category: 'Cough', price: 90, stock: 130, lowStockThreshold: 30, barcode: '8902233445588', manufacturer: 'Dabur', batchNumber: 'HN777', expiryDate: '2026-04-30', requiresPrescription: false },
        { id: 'pharm-23', type: 'pharmacy', name: 'Vicks Inhaler', category: 'Cold Relief', price: 60, stock: 400, lowStockThreshold: 80, barcode: '8903344556699', manufacturer: 'P&G', batchNumber: 'VI888', expiryDate: '2026-09-30', requiresPrescription: false },
        { id: 'pharm-24', type: 'pharmacy', name: 'Cofsils Lozenges', category: 'Sore Throat', price: 25, stock: 350, lowStockThreshold: 70, barcode: '8904455667700', manufacturer: 'Cipla', batchNumber: 'CS999', expiryDate: '2025-10-31', requiresPrescription: false },
        { id: 'pharm-25', type: 'pharmacy', name: 'Alex Cough Syrup', category: 'Cough', price: 100, stock: 110, lowStockThreshold: 25, barcode: '8905566778811', manufacturer: 'Glenmark', batchNumber: 'AL000', expiryDate: '2026-01-31', requiresPrescription: true },
        
        // ... (more categories and products to reach 100+)
        // Digestive Health (10)
        { id: 'pharm-26', type: 'pharmacy', name: 'Digene Acidity & Gas Relief', category: 'Digestive', price: 20, stock: 250, lowStockThreshold: 50, barcode: '900111', manufacturer: 'Abbott', batchNumber: 'DG1', expiryDate: '2026-01-31', requiresPrescription: false },
        { id: 'pharm-27', type: 'pharmacy', name: 'Eno Fruit Salt', category: 'Digestive', price: 55, stock: 300, lowStockThreshold: 60, barcode: '900112', manufacturer: 'GSK', batchNumber: 'EN2', expiryDate: '2025-11-30', requiresPrescription: false },
        { id: 'pharm-28', type: 'pharmacy', name: 'Pudin Hara Pearls', category: 'Digestive', price: 25, stock: 200, lowStockThreshold: 40, barcode: '900113', manufacturer: 'Dabur', batchNumber: 'PH3', expiryDate: '2026-03-31', requiresPrescription: false },
        { id: 'pharm-29', type: 'pharmacy', name: 'Gelusil MPS', category: 'Digestive', price: 90, stock: 150, lowStockThreshold: 30, barcode: '900114', manufacturer: 'Pfizer', batchNumber: 'GL4', expiryDate: '2025-09-30', requiresPrescription: false },
        { id: 'pharm-30', type: 'pharmacy', name: 'Ondem MD 4', category: 'Nausea', price: 52, stock: 100, lowStockThreshold: 20, barcode: '900115', manufacturer: 'Alkem', batchNumber: 'ON5', expiryDate: '2026-04-30', requiresPrescription: true },
        { id: 'pharm-31', type: 'pharmacy', name: 'Eldoper', category: 'Diarrhea', price: 28, stock: 120, lowStockThreshold: 25, barcode: '900116', manufacturer: 'Micro Labs', batchNumber: 'EL6', expiryDate: '2025-08-31', requiresPrescription: false },
        { id: 'pharm-32', type: 'pharmacy', name: 'Isabgol (Psyllium Husk)', category: 'Digestive', price: 150, stock: 90, lowStockThreshold: 15, barcode: '900117', manufacturer: 'Telephone', batchNumber: 'IS7', expiryDate: '2026-05-31', requiresPrescription: false },
        { id: 'pharm-33', type: 'pharmacy', name: 'Pantocid DSR', category: 'Acidity', price: 190, stock: 110, lowStockThreshold: 20, barcode: '900118', manufacturer: 'Sun Pharma', batchNumber: 'PN8', expiryDate: '2026-06-30', requiresPrescription: true },
        { id: 'pharm-34', type: 'pharmacy', name: 'Himalaya Gasex', category: 'Digestive', price: 130, stock: 140, lowStockThreshold: 30, barcode: '900119', manufacturer: 'Himalaya', batchNumber: 'GA9', expiryDate: '2025-12-31', requiresPrescription: false },
        { id: 'pharm-35', type: 'pharmacy', name: 'Cremaffin Plus', category: 'Digestive', price: 100, stock: 80, lowStockThreshold: 15, barcode: '900120', manufacturer: 'Abbott', batchNumber: 'CR0', expiryDate: '2026-02-28', requiresPrescription: false },

        // First Aid (10)
        { id: 'pharm-36', type: 'pharmacy', name: 'Dettol Antiseptic Liquid', category: 'First Aid', price: 85, stock: 150, lowStockThreshold: 30, barcode: '900121', manufacturer: 'Reckitt', batchNumber: 'DT1', expiryDate: '2027-01-31', requiresPrescription: false },
        { id: 'pharm-37', type: 'pharmacy', name: 'Band-Aid', category: 'First Aid', price: 40, stock: 400, lowStockThreshold: 80, barcode: '900122', manufacturer: 'J&J', batchNumber: 'BA2', expiryDate: '2027-03-31', requiresPrescription: false },
        { id: 'pharm-38', type: 'pharmacy', name: 'Savlon Antiseptic Liquid', category: 'First Aid', price: 75, stock: 130, lowStockThreshold: 25, barcode: '900123', manufacturer: 'ITC', batchNumber: 'SV3', expiryDate: '2026-11-30', requiresPrescription: false },
        { id: 'pharm-39', type: 'pharmacy', name: 'Betadine Ointment', category: 'First Aid', price: 115, stock: 100, lowStockThreshold: 20, barcode: '900124', manufacturer: 'Win-Medicare', batchNumber: 'BT4', expiryDate: '2025-10-31', requiresPrescription: false },
        { id: 'pharm-40', type: 'pharmacy', name: 'Soframycin Skin Cream', category: 'First Aid', price: 50, stock: 120, lowStockThreshold: 25, barcode: '900125', manufacturer: 'Sanofi', batchNumber: 'SF5', expiryDate: '2026-08-31', requiresPrescription: false },
        { id: 'pharm-41', type: 'pharmacy', name: 'Cotton Roll (100g)', category: 'First Aid', price: 60, stock: 200, lowStockThreshold: 40, barcode: '900126', manufacturer: 'Generic', batchNumber: 'CT6', expiryDate: '2028-01-31', requiresPrescription: false },
        { id: 'pharm-42', type: 'pharmacy', name: 'Gauze Bandage', category: 'First Aid', price: 30, stock: 180, lowStockThreshold: 35, barcode: '900127', manufacturer: 'Generic', batchNumber: 'GZ7', expiryDate: '2028-02-28', requiresPrescription: false },
        { id: 'pharm-43', type: 'pharmacy', name: 'Hansaplast', category: 'First Aid', price: 35, stock: 350, lowStockThreshold: 70, barcode: '900128', manufacturer: 'Beiersdorf', batchNumber: 'HN8', expiryDate: '2027-04-30', requiresPrescription: false },
        { id: 'pharm-44', type: 'pharmacy', name: 'Burnol Cream', category: 'First Aid', price: 55, stock: 90, lowStockThreshold: 15, barcode: '900129', manufacturer: 'Dr. Morepen', batchNumber: 'BR9', expiryDate: '2026-07-31', requiresPrescription: false },
        { id: 'pharm-45', type: 'pharmacy', name: 'Surgical Spirit', category: 'First Aid', price: 45, stock: 110, lowStockThreshold: 20, barcode: '900130', manufacturer: 'Generic', batchNumber: 'SS0', expiryDate: '2027-05-31', requiresPrescription: false },

        // Vitamins & Supplements (10)
        { id: 'pharm-46', type: 'pharmacy', name: 'Revital H', category: 'Vitamins', price: 310, stock: 80, lowStockThreshold: 15, barcode: '900131', manufacturer: 'Sun Pharma', batchNumber: 'RV1', expiryDate: '2026-09-30', requiresPrescription: false },
        { id: 'pharm-47', type: 'pharmacy', name: 'Limcee Vitamin C', category: 'Vitamins', price: 23, stock: 300, lowStockThreshold: 60, barcode: '900132', manufacturer: 'Abbott', batchNumber: 'LM2', expiryDate: '2025-12-31', requiresPrescription: false },
        { id: 'pharm-48', type: 'pharmacy', name: 'Neurobion Forte', category: 'Vitamins', price: 35, stock: 250, lowStockThreshold: 50, barcode: '900133', manufacturer: 'Merck', batchNumber: 'NB3', expiryDate: '2026-10-31', requiresPrescription: false },
        { id: 'pharm-49', type: 'pharmacy', name: 'Shelcal 500', category: 'Vitamins', price: 110, stock: 150, lowStockThreshold: 30, barcode: '900134', manufacturer: 'Torrent', batchNumber: 'SH4', expiryDate: '2026-02-28', requiresPrescription: false },
        { id: 'pharm-50', type: 'pharmacy', name: 'Evion 400 (Vitamin E)', category: 'Vitamins', price: 34, stock: 200, lowStockThreshold: 40, barcode: '900135', manufacturer: 'Merck', batchNumber: 'EV5', expiryDate: '2026-04-30', requiresPrescription: false },
        { id: 'pharm-51', type: 'pharmacy', name: 'Zincovit Tablet', category: 'Vitamins', price: 105, stock: 180, lowStockThreshold: 35, barcode: '900136', manufacturer: 'Apex', batchNumber: 'ZN6', expiryDate: '2026-08-31', requiresPrescription: false },
        { id: 'pharm-52', type: 'pharmacy', name: 'Seven Seas Cod Liver Oil', category: 'Supplements', price: 350, stock: 70, lowStockThreshold: 10, barcode: '900137', manufacturer: 'P&G', batchNumber: 'SS7', expiryDate: '2025-11-30', requiresPrescription: false },
        { id: 'pharm-53', type: 'pharmacy', name: 'Ensure Diabetes Care', category: 'Supplements', price: 600, stock: 50, lowStockThreshold: 10, barcode: '900138', manufacturer: 'Abbott', batchNumber: 'EN8', expiryDate: '2025-10-31', requiresPrescription: false },
        { id: 'pharm-54', type: 'pharmacy', name: 'Protinex', category: 'Supplements', price: 550, stock: 60, lowStockThreshold: 12, barcode: '900139', manufacturer: 'Danone', batchNumber: 'PR9', expiryDate: '2026-01-31', requiresPrescription: false },
        { id: 'pharm-55', type: 'pharmacy', name: 'Himalaya Ashvagandha', category: 'Supplements', price: 165, stock: 120, lowStockThreshold: 25, barcode: '900140', manufacturer: 'Himalaya', batchNumber: 'AS0', expiryDate: '2026-07-31', requiresPrescription: false },

        // Personal Care (10)
        { id: 'pharm-56', type: 'pharmacy', name: 'Himalaya Neem Face Wash', category: 'Skincare', price: 150, stock: 100, lowStockThreshold: 20, barcode: '900141', manufacturer: 'Himalaya', batchNumber: 'NF1', expiryDate: '2026-06-30', requiresPrescription: false },
        { id: 'pharm-57', type: 'pharmacy', name: 'Sebamed Baby Lotion', category: 'Baby Care', price: 650, stock: 40, lowStockThreshold: 8, barcode: '900142', manufacturer: 'Sebamed', batchNumber: 'SB2', expiryDate: '2025-09-30', requiresPrescription: false },
        { id: 'pharm-58', type: 'pharmacy', name: 'Cetaphil Cleanser', category: 'Skincare', price: 313, stock: 60, lowStockThreshold: 10, barcode: '900143', manufacturer: 'Galderma', batchNumber: 'CT3', expiryDate: '2026-03-31', requiresPrescription: false },
        { id: 'pharm-59', type: 'pharmacy', name: 'Stayfree Secure XL', category: 'Feminine Hygiene', price: 70, stock: 150, lowStockThreshold: 30, barcode: '900144', manufacturer: 'J&J', batchNumber: 'SF4', expiryDate: '2027-02-28', requiresPrescription: false },
        { id: 'pharm-60', type: 'pharmacy', name: 'Whisper Ultra Clean XL+', category: 'Feminine Hygiene', price: 85, stock: 140, lowStockThreshold: 28, barcode: '900145', manufacturer: 'P&G', batchNumber: 'WH5', expiryDate: '2027-04-30', requiresPrescription: false },
        { id: 'pharm-61', type: 'pharmacy', name: 'Durex Condoms', category: 'Personal Care', price: 120, stock: 100, lowStockThreshold: 20, barcode: '900146', manufacturer: 'Reckitt', batchNumber: 'DR6', expiryDate: '2027-05-31', requiresPrescription: false },
        { id: 'pharm-62', type: 'pharmacy', name: 'i-pill', category: 'Contraceptive', price: 110, stock: 50, lowStockThreshold: 10, barcode: '900147', manufacturer: 'Piramal', batchNumber: 'IP7', expiryDate: '2026-08-31', requiresPrescription: false },
        { id: 'pharm-63', type: 'pharmacy', name: 'Prega News', category: 'Testing Kit', price: 55, stock: 80, lowStockThreshold: 15, barcode: '900148', manufacturer: 'Mankind', batchNumber: 'PR8', expiryDate: '2026-10-31', requiresPrescription: false },
        { id: 'pharm-64', type: 'pharmacy', name: 'Accu-Chek Active Strips', category: 'Medical Device', price: 950, stock: 30, lowStockThreshold: 5, barcode: '900149', manufacturer: 'Roche', batchNumber: 'AC9', expiryDate: '2025-11-30', requiresPrescription: false },
        { id: 'pharm-65', type: 'pharmacy', name: 'Dr. Morepen BP Monitor', category: 'Medical Device', price: 1500, stock: 20, lowStockThreshold: 4, barcode: '900150', manufacturer: 'Dr. Morepen', batchNumber: 'BP0', expiryDate: '2030-01-31', requiresPrescription: false },
    ];

    const suppliers: Supplier[] = [
        { id: 'sup-p1', name: 'PharmaSupply Co.', contactPerson: 'Anjali Mehta', phone: '9123456780', email: 'anjali@pharmasupply.com' },
        { id: 'sup-p2', name: 'Med-Distributors Inc.', contactPerson: 'Vikram Singh', phone: '9123456781', email: 'vikram@meddist.com' },
        { id: 'sup-p3', name: 'Cipla Logistics', contactPerson: 'Ravi Verma', phone: '9123456782', email: 'ravi.v@cipla.com' },
        { id: 'sup-p4', name: 'GSK India Supply', contactPerson: 'Sunita Rao', phone: '9123456783', email: 's.rao@gsk.co.in' }
    ];

    const sales: Sale[] = [];
    const taxRate = 12;
    const now = new Date();

    for (let day = 365; day >= 0; day--) {
        const date = new Date(now);
        date.setDate(now.getDate() - day);
        const dailyTransactions = Math.floor(Math.random() * 15) + 10;

        for (let t = 0; t < dailyTransactions; t++) {
            const numItemsInSale = Math.floor(Math.random() * 4) + 1;
            const items: SaleItem[] = [];
            for (let i = 0; i < numItemsInSale; i++) {
                const product = products[Math.floor(Math.random() * products.length)];
                items.push({ productId: product.id, name: product.name, quantity: 1, price: product.price });
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
