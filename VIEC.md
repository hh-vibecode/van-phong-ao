# SỔ VIỆC — Văn phòng ảo / Trưởng phòng

> Mở file này đầu mỗi phiên. Xong việc thì xoá khỏi ĐANG NỢ và ghi 1 dòng NHẬT KÝ. Anh đã quyết thì làm, đừng hỏi lại.
> Tạo 20/10/2026 bởi Monsieur Claude (phiên app MKT/Sale).

## 1. ĐANG CHỜ ANH QUYẾT
| # | Việc | Cần anh nói gì |
|---|---|---|
| 1 | Domain web văn phòng ảo (repo đã tạo `hh-vibecode/van-phong-ao`, riêng tư — Pages miễn phí cần công khai); tiền tố CSDL (đề xuất `vp_`) | chốt |
| 2 | Agent chạy bằng API key Console (trả theo token) — mức trần chi phí / ngày mỗi nhân sự | con số |
| 3 | Việc nào nhân sự tự làm, việc nào bắt buộc anh bấm duyệt | danh sách |
| 4 | Có thêm nhân sự ngoài 3 app không | có / không |

## 2. ĐANG NỢ
| # | Việc | Ghi chú |
|---|---|---|
| 1 | Viết kế hoạch chi tiết bản chạy thử (bảng `vp_viec`, luồng trạng thái, cách kích agent từng repo, đo usage theo key, ước tính chi phí / tháng) để anh duyệt | xem BRIEF.md mục 5–7 |

## 3. QUY TẮC ĐÃ CHỐT
- Văn phòng ảo là app riêng, đứng đầu; 3 nhân sự = 3 agent ứng với 3 app (MKT/Sale, QC CSKH, Kế toán); usage = "độ mệt" (anh, 20/10/2026).
- Thư mục đặt tên bắt đầu bằng `0.` (anh, 20/10/2026).
- Trưởng phòng ĐƯỢC ĐỌC file khoá của cả 3 app để nối (anh, 20/10/2026) — điều kiện dùng khoá ở CLAUDE.md mục Phạm vi.

## 4. NHẬT KÝ
- **20/10/2026** — Tạo repo `hh-vibecode/van-phong-ao` (RIÊNG TƯ) theo lời anh "tạo hộ repo", đẩy CLAUDE.md, BRIEF.md, VIEC.md, .gitignore (chặn `*.local.*`).
- **20/10/2026** — Tạo thư mục `0.van-phong-ao` + `CLAUDE.md`, `BRIEF.md` (tóm tắt 3 app, bảng chia việc, luật chung, rủi ro, kiến trúc đề xuất), `VIEC.md`. Anh cho phép trưởng phòng đọc file khoá 3 app để nối (ghi điều kiện an toàn vào CLAUDE.md).
