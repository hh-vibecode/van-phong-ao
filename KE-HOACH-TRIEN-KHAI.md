# KẾ HOẠCH TRIỂN KHAI — Văn phòng ảo chạy thật

> Mr.Mon, 20/10/2026. Trả lời anh: "giờ cần gì để triển khai chạy được". Luật đã chốt: CHỈ dùng gói Claude (không API key),
> trang web không chứa khoá, Mr.Mon chỉ phân biệt việc (không đọc hết kiến thức app), mỗi repo 1 việc một lúc.

## Kiến trúc

```
Web (GitHub Pages, công khai, KHÔNG khoá)
  └─ gọi Edge Function `vp-api` (Supabase chung bcrpxfvvjsjpvbksqzls) — kiểm mã đăng nhập của anh ở MÁY CHỦ
       ├─ bảng vp_viec (việc), vp_tin (chat), vp_su_kien (điểm, chỉ thêm), vp_luot_chay (token / thời gian mỗi lượt) — RLS bật, anon không đọc
       └─ anh bấm "Giao" → gọi GitHub API (repository_dispatch) → kích workflow trong repo van-phong-ao
GitHub Actions (repo van-phong-ao) — 1 workflow / nhân sự, mỗi cái 1 Environment riêng chỉ chứa khoá của app đó
  └─ checkout repo app → chạy Claude Code (`claude -p ... --output-format json`) bằng token GÓI của anh
       → nhân sự đọc CLAUDE.md + VIEC.md repo mình → làm → commit / push repo app → gửi kết quả + token + thời gian về vp-api
```

Vì sao đặt workflow ở repo van-phong-ao: không phải sửa 3 repo con (luật "mỗi app chỉ sửa repo mình"); nhân sự chỉ push code vào repo app của nó.

## Các bước

| # | Việc | Ai | Ghi chú |
|---|---|---|---|
| 1 | Đăng ký tiền tố `vp_` / `vp-` vào sổ quy ước Supabase | phiên MKT | sổ nằm trong repo MKT |
| 2 | Tạo bảng `vp_*` + Edge Function `vp-api` (đăng nhập, đọc / ghi việc, chat, sự kiện) | Mr.Mon | cần khoá quản trị Supabase (đọc từ file khoá, anh đã cho) |
| 3 | Anh đặt mã đăng nhập (chỉ anh) | anh | anh tự gõ vào Supabase → Edge Functions → Secrets `VP_MA_TRUY_CAP`; em không cần biết mã |
| 4 | Web: màn đăng nhập, chat / bảng việc / bảng xếp hạng đọc dữ liệu thật | Mr.Mon | không có mã → không xem, không giao được gì |
| 5 | Token gói Claude cho máy chạy | anh | chạy `claude setup-token` trên máy anh → dán vào GitHub repo van-phong-ao → Settings → Secrets `CLAUDE_CODE_OAUTH_TOKEN` |
| 6 | GitHub token cho máy chạy (fine-grained): ghi code 3 repo con + kích Actions repo van-phong-ao | anh tạo, hoặc cho em dùng token sẵn có | dán vào Secrets, không gửi chat |
| 7 | Workflow chạy 1 nhân sự thử trước (đề xuất Katy hoặc Masa, việc nhỏ) | Mr.Mon | xong ổn mới mở 3 người còn lại + Tester |
| 8 | Khoá từng app vào GitHub Environment riêng (masa / quang-le / katy / tester) | Mr.Mon | mỗi agent chỉ cầm khoá phần việc của nó |
| 9 | Nối điểm thật: mỗi lượt chạy ghi token + thời gian vào `vp_luot_chay`, sự kiện vào `vp_su_kien` | Mr.Mon | bảng xếp hạng bỏ giả lập |

## Giới hạn phải biết
- **Hạn mức gói dùng chung**: agent chạy ăn chung hạn mức với phiên anh đang chat. Cần trần mỗi ngày (vd tối đa N lượt / nhân sự) để không hết gói giữa ngày.
- **"Năng lượng" chưa có số chính xác**: Anthropic không có API đọc % hạn mức gói; em đo được token + thời gian mỗi lượt chạy (từ kết quả Claude Code),
  rồi quy ra % theo "ngân sách tuần" anh đặt. Nếu sau này có cách đọc % thật thì thay.
- **Agent không hỏi giữa chừng**: gặp chỗ cần anh → dừng, ghi câu hỏi, việc sang "Chờ anh trả lời"; anh trả lời trên web → lượt sau làm tiếp.
- **Việc cần máy anh** (file trên Desktop, script .vbs, Excel) không chạy trên cloud được.
- **Tester** cần trình duyệt chạy ngầm trên máy chạy (Ubuntu có sẵn Chrome); bộ kiểm hiện viết cho Edge trên Windows → phải chỉnh.
- Dùng token gói trong GitHub Actions: Claude Code hỗ trợ (`claude setup-token` / `claude-code-action`), nhưng em sẽ kiểm lại điều khoản hiện hành trước khi bật chạy thật.

## Cần anh quyết
1. Chốt cách chạy (b) GitHub Actions + token gói — đề xuất; hay (a) lịch cloud chạy định kỳ (chậm tới ~1 tiếng).
2. Chốt tiền tố `vp_`.
3. Trần mỗi ngày cho mỗi nhân sự (số lượt chạy) + "ngân sách tuần" để quy ra năng lượng.
4. Việc nào phải anh bấm duyệt trước khi làm (đề xuất: xoá dữ liệu, phân quyền, chi tiền, gửi tin khách / đơn Pancake hàng loạt, đổi logic báo cáo).
5. Nhân sự chạy thử đầu tiên: Katy hay Masa.
