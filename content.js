console.log("🧩 Extension AdBlock đã được inject!");
console.log("✅ Popup & Ads Blocker khởi chạy...");

// Danh sách các selector quảng cáo cần ẩn
const selectors = [
    '#_preload-ads-1',
    '#_preload-ads-2',
    '#invideo_wrapper',
    '.Adv.ad-center-header',
    '.header-ads-mobile',
    '.pc_catfix_adv',
    '.mobile-catfish-top',
    '.mobile-catfixx',
    '.adsbygoogle',
    'iframe[src*="88"]',
    'iframe[src*="bet"]',
    'iframe[src*="qc"]',
    'div[id*="ads"]',
    'div[class*="ads"]',
    'div[class*="banner"]',
];

// 1. Ẩn phần tử quảng cáo
function hideAds() {
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.setProperty('display', 'none', 'important');
            el.style.setProperty('visibility', 'hidden', 'important');
            el.style.setProperty('pointer-events', 'none', 'important');
            console.log(`🚫 Đã ẩn: ${selector}`);
        });
    });
}

// 2. Chặn popup redirect thông qua hàm gốc
try {
    Object.defineProperty(window, 'createPopupAndRedirect', {
        value: () => console.log('⛔ Đã chặn createPopupAndRedirect'),
        writable: false
    });
} catch (e) {
    console.warn('⚠️ Không thể override createPopupAndRedirect:', e);
}

// 3. Chặn addEventListener chứa quảng cáo popup
const originalAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (type, listener, options) {
    const str = listener?.toString?.() || '';
    if (type === 'click' && str.includes('createPopupAndRedirect')) {
        console.log('🛑 Đã chặn click listener quảng cáo');
        return;
    }
    return originalAddEventListener.call(this, type, listener, options);
};

// 4. Gọi ẩn lần đầu
hideAds();

// 5. Theo dõi DOM để ẩn phần tử được tạo thêm
const observer = new MutationObserver(hideAds);
if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
} else {
    window.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, { childList: true, subtree: true });
    });
}
