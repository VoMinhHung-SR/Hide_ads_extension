# 🧩 AnimeVietsub AdBlock Extension

## 🔰 Mục đích
Tiện ích mở rộng trình duyệt (Chrome Extension) giúp **ẩn quảng cáo tĩnh**, **chặn popup chuyển trang** và **ngăn hành vi click lừa đảo** từ các trang xem phim như `animevietsub.*`.

---

## 🧪 Tính năng chính

- ✅ Tự động ẩn các phần tử quảng cáo (`div`, `iframe`, `banner`, ...)
- ✅ Theo dõi DOM động và ẩn quảng cáo render trễ
- ✅ Chặn popup mở tab mới (`window.open`)
- ✅ Ngăn script như `createPopupAndRedirect()` bị gọi
- ✅ Vô hiệu hóa `addEventListener` nếu chứa hành vi redirect

---

## 📂 Cấu trúc file

```bash
HIDE_ADS_EXTENSION/
├── manifest.json        # Cấu hình chính của extension: (replace matches = ["*://yourDomain1.*/*", "*://yourDomain2.*/*", "..."])
├── content.js           # Logic chặn quảng cáo và popup: (replace selectors = ["selectorYouWantToHide1", "selectorYouWantToHide2", "..."])
