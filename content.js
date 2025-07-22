(function () {
    'use strict';
    const hostname = location.hostname;

    // Kiểm tra domain dạng animevietsub.[bất kỳ]
    if (!/^([a-zA-Z0-9\-]+\.)?animevietsub\.[a-z0-9\-]+$/.test(hostname)) {
        // Không phải domain animevietsub → thoát
        return;
    }

    console.log("✅ AdBlock đã được inject trên:", hostname);
    console.log("🧩 AdBlock đã được inject!");
    console.log("✅ Popup & Ads Blocker khởi chạy...");

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

    // Chặn hàm popup nếu tồn tại
    try {
        Object.defineProperty(window, 'createPopupAndRedirect', {
            value: () => console.log('⛔ Đã chặn createPopupAndRedirect'),
            writable: false
        });
    } catch (e) {
        console.warn('⚠️ Không thể override createPopupAndRedirect:', e);
    }

    // Chặn addEventListener độc hại
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, listener, options) {
        const str = listener?.toString?.() || '';
        if (type === 'click' && str.includes('createPopupAndRedirect')) {
            console.log('🛑 Đã chặn click listener quảng cáo');
            return;
        }
        return originalAddEventListener.call(this, type, listener, options);
    };

    // Ẩn ngay khi script chạy
    hideAds();

    // Theo dõi DOM động
    const observer = new MutationObserver(hideAds);
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }
})();