// Platform base fees
const baseFees = {
    shopee: 7.49,
    lazada: 1.07,
    tiktok: 3.21
};

// Raw category data from CSV
const categoryData = {
    "shopee": {
        "COMPUTER SET": "15.10%",
        "CPU": "14.03%",
        "MAINBOARD": "14.03%",
        "GRAPHIC CARD": "14.03%",
        "RAM": "14.03%",
        "HARDDISK / SSD / M.2": "14.57%",
        "EXTERNAL HDD/ FLASH DRIVE": "14.57%",
        "M.2 ENCLOSURE": "14.57%",
        "LIQUID COOLER": "14.03%",
        "CPU FAN": "14.03%",
        "CASE FAN": "14.03%",
        "SILICONE": "14.03%",
        "POWER SUPPLY": "14.03%",
        "UPS": "14.03%",
        "VGA HOLDER": "14.03%",
        "PCI CABLE / EXTENDER RISER CABLE": "14.03%",
        "SLEEVED CABLE": "14.03%",
        "SOUND CARD": "14.03%",
        "NOTEBOOK": "10.82%",
        "ALL IN ONE": "10.82%",
        "MONITOR": "14.57%",
        "TABLET": "18.31%",
        "CONSOLE GAME": "18.31%",
        "SMART WATCH": "22.06%",
        "SPEAKER": "24.20%",
        "WEBCAM": "22.06%",
        "IP CAMERA": "24.73%",
        "STREAM DECK": "24.20%",
        "CAPTURE CARD": "24.20%",
        "ADAPTER / CONVERTER": "24.73%",
        "USB HUB": "24.20%",
        "LAN CABLE": "18.85%",
        "AUDIO & VIDEO CABLE": "24.73%",
        "MONITOR ARM": "24.20%",
        "NETWORK (ROUTER /WIFI)": "18.85%",
        "EXTENSION SOCKET": "24.20%",
        "SOFTWARE": "24.73%",
        "COOLING PAD": "24.20%",
        "KEYBOARD & NUMPAD": "21.52%",
        "KEYCAP & SWITCH": "21.52%",
        "MOUSE": "21.52%",
        "MOUSE PAD": "24.20%",
        "MOUSE SKIN": "21.52%",
        "COMBO SET": "21.52%",
        "HEADSET (IN EAR / FULL SIZE)": "24.20%",
        "HEADSET STAND": "24.73%",
        "MICROPHONE": "24.73%",
        "GAME CONTROLLER & JOYSTICK": "24.20%",
        "GAMING CHAIR & GAMING DESK": "24.73%",
        "CLOTHES": "25.80%",
        "FILM": "24.73%"
    },
    "lazada": {
        "COMPUTER SET": "14.98%",
        "CPU": "14.98%",
        "MAINBOARD": "14.98%",
        "GRAPHIC CARD": "14.98%",
        "RAM": "14.98%",
        "HARDDISK / SSD / M.2": "14.98%",
        "EXTERNAL HDD/ FLASH DRIVE": "17.12%",
        "M.2 ENCLOSURE": "17.12%",
        "LIQUID COOLER": "20.87%",
        "CPU FAN": "20.87%",
        "CASE FAN": "20.87%",
        "SILICONE": "20.87%",
        "POWER SUPPLY": "14.98%",
        "UPS": "21.40%",
        "VGA HOLDER": "14.98%",
        "PCI CABLE / SLEEVED CABLE": "21.40%",
        "SOUND CARD": "14.98%",
        "NOTEBOOK": "14.98%",
        "ALL IN ONE": "14.98%",
        "MONITOR": "14.98%",
        "TABLET": "14.98%",
        "HANDHELD GAMING": "14.98%",
        "SMART WATCH": "19.26%",
        "KEYBOARD / NUMPAD": "21.40%",
        "KEYCAP / SWITCH": "21.40%",
        "MOUSE": "21.40%",
        "MOUSE PAD": "21.40%",
        "MOUSE SKIN": "21.40%",
        "COMBO SET": "21.40%",
        "HEADSET (FULL SIZE)": "21.40%",
        "HEADSET (IN EAR)": "21.40%",
        "HEADSET STAND": "21.94%",
        "MICROPHONE": "21.94%",
        "GAME CONTROLLER / JOYSTICK": "21.40%",
        "GAMING CHAIR & GAMING DESK": "21.94%",
        "CLOTHES": "23.01%",
        "FILM": "21.94%",
        "SPEAKER": "21.40%",
        "SPEAKER (PORTABLE):": "21.40%",
        "WEBCAM": "21.40%",
        "STREAM DECK": "21.94%",
        "CAPTURE CARD": "21.94%",
        "USB HUB": "21.94%",
        "ADAPTER / CONVERTER": "17.12%",
        "CABLE (LAN)": "21.40%",
        "CABLE (AUDIO/CHARGER)": "21.94%",
        "MONITOR CABLE": "17.13%",
        "MONITOR ARM": "21.40%",
        "NETWORK (ROUTER /WIFI)": "21.40%",
        "EXTENSION SOCKET": "21.40%",
        "SOFTWARE": "21.94%"
    },
    "tiktok": {
        "COMPUTER SET": "12.84% + 199",
        "CPU": "16.59%",
        "MAINBOARD": "16.59%",
        "GRAPHIC CARD": "16.59%",
        "RAM": "16.59%",
        "HARDDISK & SSD & M.2": "16.59%",
        "M.2 ENCLOSURE": "16.59%",
        "LIQUID COOLER": "16.59%",
        "CPU FAN": "16.59%",
        "CASE FAN": "16.59%",
        "POWER SUPPLY": "16.59%",
        "UPS": "16.59%",
        "VGA HOLDER": "16.59%",
        "NOTEBOOK": "9.63% + 199",
        "MONITOR": "16.59%",
        "CONSOLE GAME": "9.63% + 199",
        "ALL IN ONE": "9.63% + 199",
        "TABLET": "12.84% + 199",
        "SMART WATCH": "11.77% + 199",
        "KEYBOARD": "18.73%",
        "KEYCAP&SWITCH": "18.73%",
        "MOUSE": "18.73%",
        "MOUSE PAD": "18.73%",
        "COMBO SET": "18.73%",
        "HEADSET": "18.73%",
        "MICROPHONE": "18.73%",
        "GAME CONTROLLER": "16.59%",
        "BOOK": "19.80%",
        "CLOTHES": "20.87%",
        "FILM": "18.73%",
        "SPEAKER": "18.73%",
        "NETWORK (ROUTER, USB WIFI)": "18.73%",
        "LAN CABLE": "18.73%",
        "AUDIO & VIDEO CABLE": "18.73%",
        "STEAM DECK": "18.73%",
        "ADAPTER / CONVERTER": "18.73%",
        "USB HUB": "18.73%",
        "WEB CAM": "18.73%",
        "MONITOR ARM": "18.73%",
        "SOFTWARE": "18.73%",
        "EXTENSION SOCKET": "19.80%"
    }
};

// Inline SVG Placeholder for products that don't load their preview image
// NOTE: This must be a string literal (not a variable reference) when used inside innerHTML onerror attributes
const PLACEHOLDER_SVG_URI = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%23888" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>');
// Hardcoded data URI for use inside innerHTML (onerror cannot access JS variables)
const IMG_ERROR_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http%3A//www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E";

// Generic category matching map to easily resolve platform specific categories
const categoryMapping = {
    CPU: ["CPU"],
    MAINBOARD: ["MAINBOARD"],
    GRAPHIC_CARD: ["GRAPHIC CARD"],
    RAM: ["RAM"],
    STORAGE: ["HARDDISK / SSD / M.2", "HARDDISK & SSD & M.2"],
    LIQUID_COOLER: ["LIQUID COOLER"],
    CPU_FAN: ["CPU FAN"],
    CASE_FAN: ["CASE FAN"],
    SILICONE: ["SILICONE"],
    POWER_SUPPLY: ["POWER SUPPLY"],
    UPS: ["UPS"],
    VGA_HOLDER: ["VGA HOLDER"],
    PCI_CABLE: ["PCI CABLE / EXTENDER RISER CABLE", "PCI CABLE / SLEEVED CABLE", "CABLE (LAN)"],
    SLEEVED_CABLE: ["SLEEVED CABLE", "PCI CABLE / SLEEVED CABLE"],
    NOTEBOOK: ["NOTEBOOK"],
    MONITOR: ["MONITOR"],
    KEYBOARD: ["KEYBOARD & NUMPAD", "KEYBOARD / NUMPAD", "KEYBOARD"],
    KEYCAP_SWITCH: ["KEYCAP & SWITCH", "KEYCAP / SWITCH", "KEYCAP&SWITCH"],
    MOUSE: ["MOUSE"],
    MOUSE_PAD: ["MOUSE PAD"],
    MOUSE_SKIN: ["MOUSE SKIN"],
    HEADSET: ["HEADSET (IN EAR / FULL SIZE)", "HEADSET (FULL SIZE)", "HEADSET (IN EAR)", "HEADSET"],
    MICROPHONE: ["MICROPHONE"],
    SPEAKER: ["SPEAKER", "SPEAKER (PORTABLE):"],
    WEBCAM: ["WEBCAM", "WEB CAM"],
    COMPUTER_SET: ["COMPUTER SET"]
};

// DOM Elements
const platformSelect = document.getElementById('platformSelect');
const itemsContainer = document.getElementById('itemsContainer');
const addItemBtn = document.getElementById('addItemBtn');
const itemRowTemplate = document.getElementById('itemRowTemplate');
const summaryBox = document.getElementById('summaryBox');
const summaryContent = document.getElementById('summaryContent');
const toast = document.getElementById('toast');

// Parse percentage string
function parseFeeString(str) {
    let percent = 0;
    let fixed = 0;
    if (!str) return { percent, fixed };
    const parts = str.split('+');
    if (parts.length > 0) percent = parseFloat(parts[0].replace('%', '').trim()) || 0;
    if (parts.length > 1) fixed = parseFloat(parts[1].trim()) || 0;
    return { percent, fixed };
}

// Generate category options HTML
function getCategoryOptions(platform) {
    const categories = categoryData[platform] || {};
    let options = '';
    for (const [catName, feeStr] of Object.entries(categories)) {
        options += `<option value="${catName}">${catName} (${feeStr})</option>`;
    }
    return options;
}

// Update all dropdowns when platform changes
function updateAllCategories() {
    const platform = platformSelect.value;
    const optionsHTML = getCategoryOptions(platform);
    const selects = itemsContainer.querySelectorAll('.item-category');
    selects.forEach(select => {
        const prevValue = select.value;
        select.innerHTML = optionsHTML;
        if (Array.from(select.options).some(opt => opt.value === prevValue)) {
            select.value = prevValue;
        }
    });
    calculateAll();
}

// Detect generic category from product name
function getGenericCategoryKey(name) {
    const lower = name.toLowerCase();
    
    // 1. Check for COMPUTER SET explicitly first
    if (lower.includes('computer set') || lower.includes('คอมเซ็ต') || lower.includes('คอมเซต') || lower.includes('คอมประกอบ') || lower.includes('ชุดประกอบ') || lower.includes('เครื่องประกอบ') || lower.includes('จัดสเปก') || lower.includes('comset')) return 'COMPUTER_SET';
    
    // 2. Comset detection heuristics (many slashes = full PC spec, or month-year prefix like JUN26)
    if (name.split('/').length >= 3 || /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\d{2}\b/i.test(name)) return 'COMPUTER_SET';
    
    // Ordered from specific to general keywords
    if (lower.includes('mouse pad') || lower.includes('แผ่นรองเมาส์')) return 'MOUSE_PAD';
    if (lower.includes('mouse skin')) return 'MOUSE_SKIN';
    if (lower.includes('mouse') || lower.includes('เมาส์')) return 'MOUSE';
    
    if (lower.includes('keycap') || lower.includes('switch') || lower.includes('คีย์แคป') || lower.includes('สวิตช์')) return 'KEYCAP_SWITCH';
    if (lower.includes('keyboard') || lower.includes('คีย์บอร์ด')) return 'KEYBOARD';
    
    if (lower.includes('headset') || lower.includes('headphone') || lower.includes('หูฟัง')) return 'HEADSET';
    if (lower.includes('speaker') || lower.includes('ลำโพง')) return 'SPEAKER';
    if (lower.includes('microphone') || lower.includes('ไมโครโฟน') || lower.includes('ไมค์')) return 'MICROPHONE';
    if (lower.includes('webcam') || lower.includes('web cam') || lower.includes('กล้องเว็บแคม')) return 'WEBCAM';
    
    if (lower.includes('liquid cooler') || lower.includes('ชุดน้ำ')) return 'LIQUID_COOLER';
    if (lower.includes('cpu fan') || lower.includes('ซิงค์พัดลม') || lower.includes('พัดลมซีพียู')) return 'CPU_FAN';
    if (lower.includes('case fan') || lower.includes('พัดลมเคส')) return 'CASE_FAN';
    if (lower.includes('silicone') || lower.includes('ซิลิโคน')) return 'SILICONE';
    
    if (lower.includes('extender riser') || lower.includes('pci cable') || lower.includes('สายพีซีไอ')) return 'PCI_CABLE';
    if (lower.includes('sleeved cable') || lower.includes('สายถัก')) return 'SLEEVED_CABLE';
    if (lower.includes('vga holder') || lower.includes('ค้ำการ์ดจอ')) return 'VGA_HOLDER';
    
    if (lower.includes('ups') || lower.includes('เครื่องสำรองไฟ')) return 'UPS';
    if (lower.includes('power supply') || lower.includes('psu') || lower.includes('พาวเวอร์ซัพพลาย') || lower.includes('850w') || lower.includes('750w') || lower.includes('650w') || lower.includes('1000w')) return 'POWER_SUPPLY';
    
    if (lower.includes('mainboard') || lower.includes('เมนบอร์ด') || lower.includes('motherboard') || /b650|b760|h610|a620|z790|x670/i.test(lower)) return 'MAINBOARD';
    if (lower.includes('cpu') || lower.includes('ซีพียู') || /core i\d|ryzen|intel/i.test(lower)) return 'CPU';
    if (lower.includes('vga') || lower.includes('graphic card') || lower.includes('การ์ดจอ') || /rtx|rx \d{3,4}|radeon/i.test(lower)) return 'GRAPHIC_CARD';
    if (lower.includes('ram') || lower.includes('แรม') || /ddr4|ddr5/i.test(lower)) return 'RAM';
    if (lower.includes('ssd') || lower.includes('m.2') || lower.includes('nvme') || lower.includes('sata') || lower.includes('harddisk') || lower.includes('hdd') || lower.includes('เอสเอสดี')) return 'STORAGE';
    
    if (lower.includes('notebook') || lower.includes('โน้ตบุ๊ก') || lower.includes('โน๊ตบุ๊ค') || lower.includes('laptop')) return 'NOTEBOOK';
    if (lower.includes('monitor') || lower.includes('จอคอม') || lower.includes('จอมอนิเตอร์') || lower.includes('display') || lower.includes('144hz') || lower.includes('165hz') || lower.includes('240hz')) return 'MONITOR';
    if (lower.includes('computer set') || lower.includes('คอมเซ็ต') || lower.includes('เครื่องประกอบ') || lower.includes('จัดสเปก') || lower.includes('comset')) return 'COMPUTER_SET';
    
    return null;
}

// Auto select category dropdown based on product name
function autoSelectCategory(productName, categorySelect) {
    if (!productName || !categorySelect) return;
    const key = getGenericCategoryKey(productName);
    if (!key) return;
    
    const possibleValues = categoryMapping[key] || [];
    const foundValue = possibleValues.find(val => 
        Array.from(categorySelect.options).some(opt => opt.value === val)
    );
    
    if (foundValue) {
        categorySelect.value = foundValue;
    } else {
        // Fallback to COMPUTER SET if nothing else fits
        if (Array.from(categorySelect.options).some(opt => opt.value === "COMPUTER SET")) {
            categorySelect.value = "COMPUTER SET";
        }
    }
}

// Add new item row
function addItem() {
    const clone = itemRowTemplate.content.cloneNode(true);
    const row = clone.querySelector('.item-row');
    
    const select = row.querySelector('.item-category');
    select.innerHTML = getCategoryOptions(platformSelect.value);
    
    const nameInput = row.querySelector('.item-name');
    const priceInput = row.querySelector('.item-price');
    const dropdown = row.querySelector('.autocomplete-dropdown');
    
    let debounceTimer;
    
    nameInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        calculateAll();
        clearTimeout(debounceTimer);
        
        if (query.length < 2) {
            dropdown.classList.add('hidden');
            return;
        }
        
        dropdown.classList.remove('hidden');
        dropdown.innerHTML = '<li class="ac-loading"><span class="spinner"></span> กำลังค้นหาข้อมูลจากหน้าร้านออนไลน์...</li>';
        
        debounceTimer = setTimeout(() => {
            searchIhavecpu(query, dropdown, nameInput, priceInput);
        }, 600);
    });

    // Auto-select category when user finishes typing or pastes name and moves away
    nameInput.addEventListener('blur', () => {
        setTimeout(() => {
            autoSelectCategory(nameInput.value, select);
            calculateAll();
        }, 200); // Small delay to allow dropdown item clicks to resolve first
    });
    
    document.addEventListener('click', (e) => {
        if (!nameInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
    
    row.querySelector('.btn-remove').addEventListener('click', () => {
        row.remove();
        calculateAll();
    });
    
    priceInput.addEventListener('input', calculateAll);
    select.addEventListener('change', calculateAll);
    
    itemsContainer.appendChild(row);
    calculateAll();
}

// Mock Database (Fallback when backend proxy is not running)
const localProducts = [
    { name: "CPU (ซีพียู) INTEL 1700 CORE I5-12400F 2.5GHz 6C 12T (TRAY) (3Y)", price: 4390, image: "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products149504_800.jpg" },
    { name: "CPU (ซีพียู) INTEL 1700 CORE I5-13400F 2.5GHz 10C 16T", price: 6290, image: "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products149504_800.jpg" },
    { name: "VGA (การ์ดจอ) ASUS DUAL GEFORCE RTX 4060 TI OC EDITION - 8GB GDDR6", price: 15990, image: "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products149504_800.jpg" },
    { name: "VGA (การ์ดจอ) GIGABYTE GEFORCE RTX 4070 SUPER WINDFORCE OC - 12GB GDDR6X", price: 25490, image: "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products149504_800.jpg" },
    { name: "MAINBOARD (เมนบอร์ด) 1700 ASUS PRIME H610M-K D4", price: 2490, image: "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products149504_800.jpg" },
    { name: "RAM (แรมพีซี) DDR4/3200 CORSAIR VENGEANCE LPX (16GBx2)", price: 2590, image: "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products149504_800.jpg" },
    { name: "SSD (เอสเอสดี) M.2 PCIE 4.0 WD BLACK SN850X 1TB", price: 3690, image: "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products149504_800.jpg" }
];

// Fetch data through local proxy backend
async function searchIhavecpu(query, dropdown, nameInput, priceInput) {
    try {
        const q = query.toLowerCase();
        // Pointing to the new nocpu backend endpoint which serves the fast cached Excel data
        const targetUrl = `http://127.0.0.1:5000/api/nocpu/search?query=${encodeURIComponent(query)}`;
        
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error('Backend Server Error');
        
        const products = await response.json();
        if (products.error || products.length === 0) throw new Error('No products online');
        
        renderResults(products, q, dropdown, nameInput, priceInput, false);
        
    } catch (error) {
        console.warn('Proxy backend fetch failed, falling back to local database:', error.message);
        
        const mockResults = localProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
        if (mockResults.length > 0) {
            renderResults(mockResults, query.toLowerCase(), dropdown, nameInput, priceInput, true);
        } else {
            dropdown.innerHTML = `
                <li class="ac-error">
                    <strong>ไม่พบข้อมูลสินค้า</strong><br>
                    <small>ท่านสามารถพิมพ์ชื่อและกรอกราคาต้นทุนได้เองโดยตรง</small>
                </li>`;
        }
    }
}

// Render search preview items in dropdown
function renderResults(products, query, dropdown, nameInput, priceInput, isFallback) {
    products.forEach(p => {
        const nameLower = p.name.toLowerCase();
        let score = 0;
        if (nameLower === query) score += 100;
        else if (nameLower.startsWith(query)) score += 50;
        else if (nameLower.includes(query)) score += 10;
        const lengthDiff = Math.abs(nameLower.length - query.length);
        score -= (lengthDiff * 0.1); 
        p.score = score;
    });
    
    products.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, 'th'));
    const results = products.slice(0, 10);
    
    let html = '';
    if (isFallback) {
        html += `<li class="ac-notice-banner">⚠️ แสดงรายการแนะนำด่วน (ออฟไลน์)</li>`;
    }
    
    results.forEach((item) => {
        // Use a hardcoded data URI string in onerror because innerHTML strings cannot reference JS scope variables
        // referrerpolicy="no-referrer" prevents AWS S3 / Cloudflare hotlink protection from rejecting image loads
        const imgSrc = item.image || IMG_ERROR_FALLBACK;
        html += `
            <li class="autocomplete-item mock-item" data-price="${item.price}" data-name="${item.name.replace(/"/g, '&quot;')}" title="${item.name.replace(/"/g, '&quot;')} - ฿${item.price.toLocaleString('th-TH')}">
                <img
                    src="${imgSrc}"
                    alt="preview"
                    class="ac-image"
                    referrerpolicy="no-referrer"
                    crossorigin="anonymous"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23888\' stroke-width=\'1.5\'%3E%3Crect x=\'3\' y=\'3\' width=\'18\' height=\'18\' rx=\'2\'/%3E%3Ccircle cx=\'8.5\' cy=\'8.5\' r=\'1.5\'/%3E%3Cpolyline points=\'21 15 16 10 5 21\'/%3E%3C/svg%3E';this.style.padding='8px';this.style.background='%23222';"
                >
                <div class="ac-info">
                    <span class="ac-name">${item.name}</span>
                    <span class="ac-price">฿${item.price.toLocaleString('th-TH')}</span>
                </div>
            </li>
        `;
    });
    
    dropdown.innerHTML = html;
    
    dropdown.querySelectorAll('.mock-item').forEach(item => {
        item.addEventListener('click', () => {
            const chosenName = item.getAttribute('data-name');
            nameInput.value = chosenName;
            priceInput.value = item.getAttribute('data-price');
            
            const row = nameInput.closest('.item-row');
            if (row) {
                const categorySelect = row.querySelector('.item-category');
                autoSelectCategory(chosenName, categorySelect);
            }
            
            dropdown.classList.add('hidden');
            calculateAll();
        });
    });
}

// Calculate prices and update summary
function calculateAll() {
    const platform = platformSelect.value;
    const baseFeePercent = baseFees[platform];
    const rows = itemsContainer.querySelectorAll('.item-row');
    let summaryText = '';
    let totalAll = 0;
    let hasItems = false;
    
    rows.forEach(row => {
        const nameInput = row.querySelector('.item-name').value || 'สินค้าไม่มีชื่อ';
        const priceInput = parseFloat(row.querySelector('.item-price').value) || 0;
        const category = row.querySelector('.item-category').value;
        const resultSpan = row.querySelector('.calculated-price');
        
        let finalPrice = 0;
        if (priceInput > 0 && category) {
            hasItems = true;
            const feeStr = categoryData[platform][category];
            const { percent: catPercent, fixed: catFixed } = parseFeeString(feeStr);
            
            const isComputerSet = category === "COMPUTER SET";
            const totalPercent = isComputerSet ? catPercent : (baseFeePercent + catPercent);
            
            const markupAmount = (priceInput * totalPercent) / 100;
            finalPrice = Math.ceil(priceInput + markupAmount + catFixed);
            
            const priceFormatted = `฿${priceInput.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            const percentStr = `${totalPercent.toFixed(2)}%`;
            const fixedStr = catFixed > 0 ? ` + ${catFixed}` : '';
            
            summaryText += `${nameInput}\n${priceFormatted} + ${percentStr}${fixedStr}\n= ${finalPrice.toLocaleString('th-TH')} .-\n\n`;
            
        } else if (priceInput > 0) {
            hasItems = true;
            finalPrice = Math.ceil(priceInput);
            const priceFormatted = `฿${priceInput.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            summaryText += `${nameInput}\n${priceFormatted}\n= ${finalPrice.toLocaleString('th-TH')} .-\n\n`;
        }
        
        resultSpan.textContent = finalPrice.toLocaleString('th-TH');
        totalAll += finalPrice;
    });
    
    if (!hasItems) {
        summaryText = `ไม่มีรายการสินค้า\n`;
    } else {
        summaryText += `Total = ${totalAll.toLocaleString('th-TH')} .-`;
    }
    
    summaryContent.textContent = summaryText;
}

// Copy to clipboard
summaryBox.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(summaryContent.textContent);
        showToast();
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
});

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

platformSelect.addEventListener('change', updateAllCategories);
addItemBtn.addEventListener('click', addItem);

// Initialize with one item
addItem();
