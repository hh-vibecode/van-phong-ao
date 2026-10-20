# SỔ VIỆC — Văn phòng ảo / Giám đốc Mr.Mon

> Mở file này đầu mỗi phiên. Xong việc thì xoá khỏi ĐANG NỢ và ghi 1 dòng NHẬT KÝ. Anh đã quyết thì làm, đừng hỏi lại.
> Tạo 20/10/2026 bởi Monsieur Claude (phiên app MKT/Sale).

## 1. ĐANG CHỜ ANH QUYẾT
| # | Việc | Cần anh nói gì |
|---|---|---|
| 1 | Tiền tố CSDL (đề xuất `vp_`); domain riêng hay dùng link github.io | chốt |
| 2 | Cách kích nhân sự bằng GÓI: (a) lịch Claude trên cloud (như QC đang chấm mỗi giờ) — việc chờ tối đa ~1 lượt lịch; hoặc (b) GitHub Actions + token gói (`claude setup-token`) — chạy ngay khi anh xác nhận. Cả hai ăn chung hạn mức gói với phiên anh đang chat | chọn a / b |
| 3 | Việc nào nhân sự tự làm, việc nào bắt buộc anh bấm duyệt | danh sách |
| 4 | Tester: kiểm thử cả 3 app (mở trang live, chạy bộ kiểm có sẵn của từng app, báo lỗi về nhân sự phụ trách — KHÔNG tự sửa code app) — đúng ý anh chưa? Tester đang chạy ở đâu (phiên nào / repo nào)? | xác nhận |

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
- Claude ở app này là **Giám đốc, tên Mr.Mon**, ký Mr.Mon. Dưới quyền: 3 nhân sự 3 app + 1 **Tester** (anh, 20/10/2026).
- Repo `van-phong-ao` CÔNG KHAI để chạy Pages (anh, 20/10/2026: "m tự public đi", "t cho phép"). Web: https://hh-vibecode.github.io/van-phong-ao/
- Mr.Mon ĐƯỢC ĐỌC file khoá của cả 3 app để nối (anh, 20/10/2026) — điều kiện dùng khoá ở CLAUDE.md mục Phạm vi.

- Mã nguồn trên GitHub KHÔNG chứa khoá nào, kể cả khoá anon / publishable (anh, 20/10/2026: "đảm bảo bảo mật không để lộ khoá trên mã nguồn github").
  Chốt chặn: `scripts/soat-khoa.js` chạy trước mỗi commit (hook trên máy) và trong workflow `pages` (có khoá → không đưa web lên).

- **KHÔNG dùng API key Console (trả theo token), CHỈ dùng gói Claude** (anh, 20/10/2026: "t k muốn tốn token api, chỉ dùng gói thôi").
  Thay BRIEF mục 5.4 + mục 6 (dòng "API key riêng" / "Usage API"). "Độ mệt" không đo được theo key → đo bằng số việc / thời gian chạy / % hạn mức gói.

## 4. NHẬT KÝ
- **20/10/2026** — Anh đặt tên: Claude = Giám đốc Mr.Mon; thêm nhân sự Tester. Web v0.2: phòng Mr.Mon trên, 3 phòng app giữa, phòng Tester dưới. Sửa CLAUDE.md / BRIEF.md / VIEC.md tiêu đề.
- **20/10/2026** — Anh cho phép → chuyển repo `van-phong-ao` sang CÔNG KHAI, bật Pages (nguồn GitHub Actions), bật Secret scanning + Push protection của GitHub. Trước đó đã soát khoá toàn bộ lịch sử: sạch. Nhật ký khoá: dùng GITHUB_TOKEN trong file khoá app QC (đọc vào biến, không in) cho 4 lệnh API trên; lần này hệ thống chặn tự động KHÔNG chặn (sau khi anh cho phép).
- **20/10/2026** — Dựng web khung `web/index.html` v0.1 (sơ đồ văn phòng 2D 4 nhân vật, bảng việc 6 trạng thái, ô chat khoá lại — CHƯA nối dữ liệu, không khoá, `noindex`, CSP chặt) + workflow `.github/workflows/pages.yml` (soát khoá cả lịch sử → chỉ đưa thư mục `web/` lên Pages) + `scripts/soat-khoa.js` (đã thử khoá giả: bắt đúng) + hook pre-commit trên máy + siết `.gitignore`. Trang CHƯA lên vì repo còn riêng tư (xem mục 1 #1).
- **20/10/2026** — Nhật ký khoá: thử đọc token GitHub trong file khoá 3 app (để kiểm gói tài khoản / bật Pages) → hệ thống chặn tự động của Claude Code CHẶN, không đọc được giá trị nào, không lách. Đẩy code bằng git thường (Credential Manager của máy).
- **20/10/2026** — Anh nhắn nhầm luồng ("test xong xoá đi" + ảnh phiếu chi app Kế toán), anh bảo bỏ qua → không làm gì.
- **20/10/2026** — Tạo repo `hh-vibecode/van-phong-ao` (RIÊNG TƯ) theo lời anh "tạo hộ repo", đẩy CLAUDE.md, BRIEF.md, VIEC.md, .gitignore (chặn `*.local.*`).
- **20/10/2026** — Tạo thư mục `0.van-phong-ao` + `CLAUDE.md`, `BRIEF.md` (tóm tắt 3 app, bảng chia việc, luật chung, rủi ro, kiến trúc đề xuất), `VIEC.md`. Anh cho phép trưởng phòng đọc file khoá 3 app để nối (ghi điều kiện an toàn vào CLAUDE.md).
