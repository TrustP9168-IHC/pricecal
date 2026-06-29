// Platform base fees
const baseFees = {
    shopee: 7.49,
    lazada: 1.07,
    tiktok: 3.21
};

// Dynamic category data from CSV
let categoryData = {
    "shopee": {},
    "lazada": {},
    "tiktok": {}
};

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
        console.warn('Proxy backend fetch failed:', error.message);
        dropdown.innerHTML = `
            <li class="ac-error">
                <strong>ไม่พบข้อมูลสินค้า</strong><br>
                <small>กรุณาตรวจสอบว่าเปิดโปรแกรม Server ไว้หรือไม่</small>
            </li>`;
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

let diyItem = null; // { name: string, price: number }

document.getElementById('fetchDiyBtn').addEventListener('click', async () => {
    const urlInput = document.getElementById('diyUrl').value.trim();
    const resultDiv = document.getElementById('diyResult');
    if (!urlInput) {
        resultDiv.innerHTML = '<span style="color:red;">กรุณาใส่ลิงก์</span>';
        return;
    }
    
    resultDiv.innerHTML = 'กำลังดึงข้อมูล...';
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/diy/price?url=${encodeURIComponent(urlInput)}`);
        const data = await response.json();
        
        if (response.ok && data.price) {
            diyItem = {
                name: urlInput.replace(/^https?:\/\/(www\.)?/, ''), // simplify url
                price: parseFloat(data.price)
            };
            resultDiv.innerHTML = `<span style="color:green; font-weight: 500;">ดึงราคาสำเร็จ: ฿${diyItem.price.toLocaleString('th-TH')}</span> <button id="removeDiyBtn" class="btn" style="padding: 2px 8px; font-size: 0.8em; margin-left: 10px; background: #ffebee; color: #d32f2f; border-radius: 4px;">ลบ</button>`;
            
            document.getElementById('removeDiyBtn').addEventListener('click', () => {
                diyItem = null;
                document.getElementById('diyUrl').value = '';
                resultDiv.innerHTML = '';
                calculateAll();
            });
            calculateAll();
        } else {
            resultDiv.innerHTML = `<span style="color:red;">ไม่สามารถดึงราคาได้: ${data.error || 'Unknown error'}</span>`;
            diyItem = null;
            calculateAll();
        }
    } catch (e) {
        resultDiv.innerHTML = `<span style="color:red;">ข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์</span>`;
        diyItem = null;
        calculateAll();
    }
});

// Calculate prices and update summary
function calculateAll() {
    const platform = platformSelect.value;
    const baseFeePercent = baseFees[platform];
    const rows = itemsContainer.querySelectorAll('.item-row');
    let summaryText = '';
    let totalAll = 0;
    let hasItems = false;
    
    // Process DIY Item first
    if (diyItem) {
        hasItems = true;
        const feeStr = categoryData[platform]["COMPUTER SET"] || "0%";
        const { percent: catPercent, fixed: catFixed } = parseFeeString(feeStr);
        
        const markupAmount = (diyItem.price * catPercent) / 100;
        const finalPrice = Math.ceil(diyItem.price + markupAmount + catFixed);
        
        const priceFormatted = `฿${diyItem.price.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        const percentStr = `${catPercent.toFixed(2)}%`;
        const fixedStr = catFixed > 0 ? ` + ${catFixed}` : '';
        
        summaryText += `${diyItem.name}\n${priceFormatted} + ${percentStr}${fixedStr}\n= ${finalPrice.toLocaleString('th-TH')} .-\n\n`;
        totalAll += finalPrice;
    }
    
    // Process standard items
    rows.forEach(row => {
        const nameInput = row.querySelector('.item-name').value || 'สินค้าไม่มีชื่อ';
        const priceInput = parseFloat(row.querySelector('.item-price').value) || 0;
        const category = row.querySelector('.item-category').value;
        const resultSpan = row.querySelector('.calculated-price');
        
        let finalPrice = 0;
        if (priceInput > 0 && category) {
            hasItems = true;
            const feeStr = categoryData[platform][category] || "0%";
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

async function loadCategoryData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/fees');
        if (response.ok) {
            const data = await response.json();
            // Assign fetched data if it has shopee, lazada, tiktok keys
            if (data.shopee && data.lazada && data.tiktok) {
                categoryData = data;
                updateAllCategories();
            }
        }
    } catch (e) {
        console.error("Failed to load dynamic fees:", e);
    }
}

// Initialize with one item and fetch remote fee data
addItem();
loadCategoryData();
