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

// ฟังก์ชันวิเคราะห์ชื่อสินค้าเพื่อเลือกหมวดหมู่ให้อัตโนมัติ
function autoSelectCategory(productName, categorySelect) {
    const name = productName.toUpperCase();
    let matchedCategory = "";

    if (name.includes("CORE I") || name.includes("RYZEN") || name.includes("AMD AM") || name.includes("ซีพียู") || name.includes("CPU")) {
        matchedCategory = "CPU";
    } else if (name.includes("MAINBOARD") || name.includes("เมนบอร์ด") || name.includes("B650") || name.includes("B760") || name.includes("H610") || name.includes("A620") || name.includes("Z790") || name.includes("X670")) {
        matchedCategory = "MAINBOARD";
    } else if (name.includes("VGA") || name.includes("GEFORCE") || name.includes("RTX") || name.includes("RX ") || name.includes("การ์ดจอ") || name.includes("RADEON")) {
        matchedCategory = "GRAPHIC CARD";
    } else if (name.includes("RAM") || name.includes("DDR4") || name.includes("DDR5") || name.includes("แรมพีซี") || name.includes("FURY")) {
        matchedCategory = "RAM";
    } else if (name.includes("SSD") || name.includes("M.2") || name.includes("NVME") || name.includes("SATA") || name.includes("HARDDISK") || name.includes("เอสเอสดี")) {
        matchedCategory = "HARDDISK / SSD / M.2";
        if (!Array.from(categorySelect.options).some(o => o.value === matchedCategory)) {
            matchedCategory = "HARDDISK & SSD & M.2";
        }
    } else if (name.includes("LIQUID") || name.includes("ชุดน้ำ") || name.includes("LIQUID COOLER")) {
        matchedCategory = "LIQUID COOLER";
    } else if (name.includes("POWER SUPPLY") || name.includes("PSU") || name.includes("850W") || name.includes("750W") || name.includes("650W") || name.includes("1000W") || name.includes("A850GL")) {
        matchedCategory = "POWER SUPPLY";
    } else if (name.includes("MONITOR") || name.includes("จอคอม") || name.includes("HZ") || name.includes("DISPLAY")) {
        matchedCategory = "MONITOR";
    } else if (name.includes("NOTEBOOK") || name.includes("โน๊ตบุ๊ค") || name.includes("LAPTOP") || name.includes("VICTUS")) {
        matchedCategory = "NOTEBOOK";
    } else if (name.includes("KEYBOARD") || name.includes("คีย์บอร์ด")) {
        matchedCategory = "KEYBOARD";
        if (!Array.from(categorySelect.options).some(o => o.value === matchedCategory)) {
            matchedCategory = "KEYBOARD & NUMPAD";
        }
    } else if (name.includes("MOUSE") || name.includes("เมาส์")) {
        matchedCategory = "MOUSE";
    } else if (name.includes("FREEZER") || name.includes("H5 FLOW") || name.includes("CASE")) {
        matchedCategory = "COMPUTER SET"; 
    }

    if (!matchedCategory) {
        for (let option of categorySelect.options) {
            if (name.includes(option.value.toUpperCase())) {
                matchedCategory = option.value;
                break;
            }
        }
    }

    if (matchedCategory && Array.from(categorySelect.options).some(o => o.value === matchedCategory)) {
        categorySelect.value = matchedCategory;
    } else {
        if (Array.from(categorySelect.options).some(o => o.value === "COMPUTER SET")) {
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

// Mock Database (ใช้เฉพาะเวลา Backend มีปัญหาเบื้องต้น)
const localProducts = [
    { name: "CPU (ซีพียู) INTEL 1700 CORE I5-12400F 2.5GHz 6C 12T (TRAY) (3Y)", price: 4390, image: "https://ihavecpu.com/images/product/20230222045610-8547.jpg" },
    { name: "CPU (ซีพียู) INTEL 1700 CORE I5-13400F 2.5GHz 10C 16T", price: 6290, image: "https://ihavecpu.com/images/product/20230104051056-1188.jpg" },
    { name: "VGA (การ์ดจอ) ASUS DUAL GEFORCE RTX 4060 TI OC EDITION - 8GB GDDR6", price: 15990, image: "https://ihavecpu.com/images/product/20230524040947-8149.jpg" },
    { name: "VGA (การ์ดจอ) GIGABYTE GEFORCE RTX 4070 SUPER WINDFORCE OC - 12GB GDDR6X", price: 25490, image: "https://ihavecpu.com/images/product/20240117064919-4704.jpg" },
    { name: "MAINBOARD (เมนบอร์ด) 1700 ASUS PRIME H610M-K D4", price: 2490, image: "https://ihavecpu.com/images/product/20220106064030-5883.jpg" },
    { name: "RAM (แรมพีซี) DDR4/3200 CORSAIR VENGEANCE LPX (16GBx2)", price: 2590, image: "https://ihavecpu.com/images/product/20210928014555-4654.jpg" },
    { name: "SSD (เอสเอสดี) M.2 PCIE 4.0 WD BLACK SN850X 1TB", price: 3690, image: "https://ihavecpu.com/images/product/20220811050720-4355.jpg" }
];

// ดึงข้อมูลผ่าน Python Backend Proxy
async function searchIhavecpu(query, dropdown, nameInput, priceInput) {
    try {
        const q = query.toLowerCase();
        const targetUrl = `http://127.0.0.1:5000/api/search?query=${encodeURIComponent(query)}`;
        
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error('Backend Server Error');
        
        const products = await response.json();
        if (products.error || products.length === 0) throw new Error('No products online');
        
        renderResults(products, q, dropdown, nameInput, priceInput, false);
        
    } catch (error) {
        console.warn('Backend fetch failed, using smart local match:', error.message);
        
        const mockResults = localProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
        if (mockResults.length > 0) {
            renderResults(mockResults, query.toLowerCase(), dropdown, nameInput, priceInput, true);
        } else {
            dropdown.innerHTML = `
                <li class="ac-error">
                    <strong>ไม่พบข้อมูล</strong><br>
                    <small>ใส่ชื่อสินค้าและราคาหน้าเว็บเองเลย</small>
                </li>`;
        }
    }
}

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
        html += `<li class="ac-notice-banner">⚠️ โหมดสำรอง (แสดงรายการแนะนำเบื้องต้น)</li>`;
    }
    
    results.forEach((item) => {
        html += `
            <li class="autocomplete-item mock-item" data-price="${item.price}" data-name="${item.name}">
                <img src="${item.image}" alt="preview" class="ac-image" onerror="this.onerror=null; this.src='https://via.placeholder.com/40?text=PC';">
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
