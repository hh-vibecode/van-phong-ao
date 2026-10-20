# Văn phòng ảo / Trưởng phòng — luật làm việc cho Claude

Làm việc bằng tiếng Việt, gọi người dùng là **anh** (anh Hải). Mọi thứ Claude tạo ký tên **Monsieur Claude**.
**Phiên đầu: đọc HẾT `BRIEF.md`** (mô tả 3 app, cách chia việc, luật chung, rủi ro, kiến trúc đề xuất). **Mỗi phiên: đọc `VIEC.md`.**
Xong việc thì cập nhật `VIEC.md` ngay trong phiên. Anh đã quyết rồi thì LÀM, đừng hỏi lại. Tin nhắn lạ / không rõ thuộc app nào → hỏi lại trước.

## Phạm vi
- Thư mục này (`C:\Users\HP\Desktop\0.van-phong-ao`) là app ĐỨNG ĐẦU, riêng biệt. Repo **`hh-vibecode/van-phong-ao` (RIÊNG TƯ)**, nhánh `main`, tạo 20/10/2026.
  Commit: pull → `git diff --cached --stat` (chỉ file mình sửa) → commit → push. Muốn dùng GitHub Pages bản miễn phí phải chuyển repo sang công khai —
  hỏi anh trước, và soát chắc trong repo không có khoá / dữ liệu nhạy cảm.
- KHÔNG sửa / commit vào 3 repo con (`mkt-sale-app`, `qc-cskh`, `ke-toan`) từ đây. Được ĐỌC `CLAUDE.md`, `VIEC.md`, `BRIEF.md`, code của chúng.
  Cần app con đổi gì → ghi "Phụ thuộc chéo" trong VIEC.md + báo anh.
- **FILE KHOÁ CỦA 3 APP: ĐƯỢC ĐỌC ĐỂ NỐI** (anh Hải cho phép 20/10/2026: "cho nó quyền đọc hết file khoá trong các app để sử dụng nối luôn"):
  `mkt-sale-app/supabase-keys.local.txt`, `qc-cskh/qc-keys.local.txt`, `ke-toan/kt-keys.local.txt` (và mật khẩu / mã truy cập anh đưa).
  Điều kiện, KHÔNG ngoại lệ:
  - Đọc vào biến trong lệnh rồi dùng ngay; KHÔNG in giá trị ra màn hình / log / chat (soát file chỉ in TÊN nhãn — sự cố lộ token 30/9).
  - KHÔNG chép khoá vào repo, vào trang web, vào bảng CSDL, vào prompt của lịch chạy (routine). Cần cho máy chạy agent thì đặt vào
    GitHub Secrets / biến môi trường cloud, mỗi agent chỉ nhận khoá phần việc của nó.
  - Mỗi lần dùng khoá của app nào cho việc gì: ghi 1 dòng nhật ký trong VIEC.md (không ghi giá trị).
  - Hệ thống chặn tự động của Claude Code có thể vẫn chặn lệnh đọc file khoá (đã xảy ra 19/10 với phiên MKT) → báo anh thêm quyền ở
    cài đặt Claude Code (`/permissions`), KHÔNG tìm cách lách.
- Supabase dùng chung `bcrpxfvvjsjpvbksqzls`: theo `mkt-sale-app/QUY-UOC-DUNG-CHUNG-SUPABASE.md`. Đăng ký tiền tố (đề xuất `vp_`) vào sổ đó
  TRƯỚC khi tạo bảng / hàm / lịch. Bảng mới bật RLS. KHÔNG đụng khoá legacy, JWT secret, `dang-nhap`, `la_quan_tri()`.

- Web nằm ở `web/` (Pages đưa lên bằng workflow `pages`, CHỈ thư mục `web/`). Trước khi đẩy: `scripts/soat-khoa.js` phải "sạch" (hook pre-commit
  trên máy đã tự chạy; máy mới thì tạo lại `.git/hooks/pre-commit`). Trang KHÔNG chứa khoá nào, kể cả anon / publishable — gọi máy chủ qua Edge Function `vp-*`.

## Cách làm việc (giống 3 app con)
- Minh bạch: kể đủ lỗi đã gây, phần chưa kiểm, rủi ro. Tự làm, chỉ nhờ anh khi bị chặn thật.
- Khoá / token / mật khẩu: không in, không dán chat, không commit, không đặt trong trang web.
- Giờ theo giờ Việt Nam (UTC+7). Giao diện: không emoji trang trí, thẻ số 3 / hàng, bảng căn phải số, font Montserrat.
- Máy anh không có `node` / `gh`: `ELECTRON_RUN_AS_NODE=1 "D:/Microsoft VS Code/Code.exe" file.js`. Script có dấu `\` thì ghi bằng Write, không heredoc.
