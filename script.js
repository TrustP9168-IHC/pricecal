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

// Parse percentage string (e.g., "12.84% + 199" -> { percent: 12.84, fixed: 199 })
function parseFeeString(str) {
    let percent = 0;
    let fixed = 0;
    
    if (!str) return { percent, fixed };
    
    const parts = str.split('+');
    if (parts.length > 0) {
        percent = parseFloat(parts[0].replace('%', '').trim()) || 0;
    }
    if (parts.length > 1) {
        fixed = parseFloat(parts[1].trim()) || 0;
    }
    
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
        // Try to keep previous selection if it exists in new platform
        if (Array.from(select.options).some(opt => opt.value === prevValue)) {
            select.value = prevValue;
        }
    });
    
    calculateAll();
}

// Add new item row
function addItem() {
    const clone = itemRowTemplate.content.cloneNode(true);
    const row = clone.querySelector('.item-row');
    
    // Set up category dropdown
    const select = row.querySelector('.item-category');
    select.innerHTML = getCategoryOptions(platformSelect.value);
    
    // Event listeners
    row.querySelector('.btn-remove').addEventListener('click', () => {
        row.remove();
        calculateAll();
    });
    
    row.querySelector('.item-price').addEventListener('input', calculateAll);
    row.querySelector('.item-category').addEventListener('change', calculateAll);
    row.querySelector('.item-name').addEventListener('input', calculateAll);
    
    itemsContainer.appendChild(row);
    calculateAll();
}

// Calculate prices and update summary
function calculateAll() {
    const platform = platformSelect.value;
    const baseFeePercent = baseFees[platform];
    const platformName = platformSelect.options[platformSelect.selectedIndex].text.split(' ')[0];
    
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
            
            // Logic change: If category is "COMPUTER SET", ignore baseFeePercent.
            const isComputerSet = category === "COMPUTER SET";
            const totalPercent = isComputerSet ? catPercent : (baseFeePercent + catPercent);
            
            const markupAmount = (priceInput * totalPercent) / 100;
            // Round up to nearest integer (Math.ceil)
            finalPrice = Math.ceil(priceInput + markupAmount + catFixed);
            
            // Format string:
            // Item Name
            // ฿[Price] + [TotalPercent]% [+ Fixed if > 0]
            // = [FinalPrice].-
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
        // Add total at the end
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

// Event Listeners
platformSelect.addEventListener('change', updateAllCategories);
addItemBtn.addEventListener('click', addItem);

// Initialize with one item
addItem();
