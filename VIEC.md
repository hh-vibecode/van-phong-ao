# SỔ VIỆC — Văn phòng ảo / Trưởng phòng

> Mở file này đầu mỗi phiên. Xong việc thì xoá khỏi ĐANG NỢ và ghi 1 dòng NHẬT KÝ. Anh đã quyết thì làm, đừng hỏi lại.
> Tạo 20/10/2026 bởi Monsieur Claude (phiên app MKT/Sale).

## 1. ĐANG CHỜ ANH QUYẾT
| # | Việc | Cần anh nói gì |
|---|---|---|
| 1 | **Bật trang web (anh bấm, 2 bước):** repo vẫn RIÊNG TƯ, Pages miễn phí cần công khai. Settings → General → Change visibility → Public; rồi Settings → Pages → Source = **GitHub Actions** → Actions → chạy lại "pages". Hoặc anh thêm quyền ở `/permissions` để em đọc token GitHub trong file khoá và tự bấm (lệnh đọc bị chặn 20/10). Đã soát khoá toàn bộ lịch sử: sạch. Lưu ý: công khai thì BRIEF/VIEC/CLAUDE ai cũng đọc được (giống 3 app con). Link sẽ là https://hh-vibecode.github.io/van-phong-ao/ | bấm / cho quyền |
| 1b | Tiền tố CSDL (đề xuất `vp_`); domain riêng hay dùng link github.io | chốt |
| 2 | Cách kích nhân sự bằng GÓI: (a) lịch Claude trên cloud (như QC đang chấm mỗi giờ) — việc chờ tối đa ~1 lượt lịch; hoặc (b) GitHub Actions + token gói (`claude setup-token`) — chạy ngay khi anh xác nhận. Cả hai ăn chung hạn mức gói với phiên anh đang chat | chọn a / b |
| 3 | Việc nào nhân sự tự làm, việc nào bắt buộc anh bấm duyệt | danh sách |
| 4 | Có thêm nhân sự ngoài 3 app không | có / không |

## 2. ĐANG NỢ
| # | Việc | Ghi chú |
|---|---|---|
| 1 | Viết kế hoạch chi tiết bản chạy thử (bảng `vp_viec`, luồng trạng thái, cách kích agent từng repo, đo usage theo key, ước tính chi phí / tháng) để anh duyệt | xem BRIEF.md mục 5–7. Đề xuất: web gọi Edge Function `vp-*` (không cần khoá trong trang), đăng nhập bằng mã của anh kiểm ở máy chủ |
| 2 | Nối web với dữ liệu thật (đăng nhập, bảng việc, chat) | sau khi anh duyệt kế hoạch + đăng ký tiền tố |

## 2b. PHỤ THUỘC CHÉO
- Đăng ký tiền tố `vp_` / `vp-` vào `mkt-sale-app/QUY-UOC-DUNG-CHUNG-SUPABASE.md` mục 1 — file thuộc repo MKT, phiên này KHÔNG được sửa → nhờ phiên MKT ghi khi anh chốt tiền tố.

## 3. QUY TẮC ĐÃ CHỐT
- Văn phòng ảo là app riêng, đứng đầu; 3 nhân sự = 3 agent ứng với 3 app (MKT/Sale, QC CSKH, Kế toán); usage = "độ mệt" (anh, 20/10/2026).
- Thư mục đặt tên bắt đầu bằng `0.` (anh, 20/10/2026).
- Trưởng phòng ĐƯỢC ĐỌC file khoá của cả 3 app để nối (anh, 20/10/2026) — điều kiện dùng khoá ở CLAUDE.md mục Phạm vi.

- Mã nguồn trên GitHub KHÔNG chứa khoá nào, kể cả khoá anon / publishable (anh, 20/10/2026: "đảm bảo bảo mật không để lộ khoá trên mã nguồn github").
  Chốt chặn: `scripts/soat-khoa.js` chạy trước mỗi commit (hook trên máy) và trong workflow `pages` (có khoá → không đưa web lên).

- **KHÔNG dùng API key Console (trả theo token), CHỈ dùng gói Claude** (anh, 20/10/2026: "t k muốn tốn token api, chỉ dùng gói thôi").
  Thay BRIEF mục 5.4 + mục 6 (dòng "API key riêng" / "Usage API"). "Độ mệt" không đo được theo key → đo bằng số việc / thời gian chạy / % hạn mức gói.

## 4. NHẬT KÝ
- **20/10/2026** — Dựng web khung `web/index.html` v0.1 (sơ đồ văn phòng 2D 4 nhân vật, bảng việc 6 trạng thái, ô chat khoá lại — CHƯA nối dữ liệu, không khoá, `noindex`, CSP chặt) + workflow `.github/workflows/pages.yml` (soát khoá cả lịch sử → chỉ đưa thư mục `web/` lên Pages) + `scripts/soat-khoa.js` (đã thử khoá giả: bắt đúng) + hook pre-commit trên máy + siết `.gitignore`. Trang CHƯA lên vì repo còn riêng tư (xem mục 1 #1).
- **20/10/2026** — Nhật ký khoá: thử đọc token GitHub trong file khoá 3 app (để kiểm gói tài khoản / bật Pages) → hệ thống chặn tự động của Claude Code CHẶN, không đọc được giá trị nào, không lách. Đẩy code bằng git thường (Credential Manager của máy).
- **20/10/2026** — Anh nhắn nhầm luồng ("test xong xoá đi" + ảnh phiếu chi app Kế toán), anh bảo bỏ qua → không làm gì.
- **20/10/2026** — Tạo repo `hh-vibecode/van-phong-ao` (RIÊNG TƯ) theo lời anh "tạo hộ repo", đẩy CLAUDE.md, BRIEF.md, VIEC.md, .gitignore (chặn `*.local.*`).
- **20/10/2026** — Tạo thư mục `0.van-phong-ao` + `CLAUDE.md`, `BRIEF.md` (tóm tắt 3 app, bảng chia việc, luật chung, rủi ro, kiến trúc đề xuất), `VIEC.md`. Anh cho phép trưởng phòng đọc file khoá 3 app để nối (ghi điều kiện an toàn vào CLAUDE.md).
