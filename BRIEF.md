# BRIEF — Văn phòng ảo & "Trưởng phòng" điều phối 3 app

> Soạn 20/10/2026 bởi Monsieur Claude (phiên app MKT/Sale), theo yêu cầu anh Hải: "tạo hộ tóm tắt mô tả 3 app và các brief cần thiết
> để tạo trưởng phòng". Đọc HẾT file này ở phiên đầu. Số liệu / lịch chạy ghi theo trạng thái 19–20/10/2026 — khi cần chính xác,
> đọc `CLAUDE.md` + `VIEC.md` của từng repo (đó mới là nguồn gốc, file này là bản tóm tắt).

## 1. Ý tưởng của anh

Một web "văn phòng ảo" (kiểu Sista AI: sơ đồ văn phòng, mỗi nhân viên là 1 nhân vật). Anh chat / giao việc ở web thay vì chat từng
phiên Claude. **Trưởng phòng** (app đứng đầu, repo riêng) nhận việc, chia cho **3 nhân sự** — mỗi nhân sự là 1 agent Claude phụ trách
1 app. "Độ mệt mỏi" của mỗi nhân sự = usage (token / chi phí) của agent đó.

| Nhân sự | App | Repo | Trang live |
|---|---|---|---|
| Nhân sự MKT / Sale | Báo cáo Marketing & Sale | `hh-vibecode/mkt-sale-app` | https://hh-vibecode.github.io/mkt-sale-app/ |
| Nhân sự QC CSKH | Kiểm soát chất lượng chăm sóc khách | `hh-vibecode/qc-cskh` | https://hh-vibecode.github.io/qc-cskh/ |
| Nhân sự Kế toán | Tài chính – Kế toán | `hh-vibecode/ke-toan` | https://hh-vibecode.github.io/ke-toan/ |

Thư mục trên máy anh: `C:\Users\HP\Desktop\mkt-sale-app`, `...\qc-cskh`, `...\ke-toan`. Thư mục này: `...\0.van-phong-ao`.

## 2. Ba app — mỗi app làm gì

### 2.1 App MKT / Sale (`mkt-sale-app`)
**Trả lời:** doanh thu thật bao nhiêu, công của quảng cáo hay của Sale, khách được chăm ra sao.
- **Người dùng:** anh (Supreme), Admin, quản lý, Leader Sale, Sale Lẻ, Sale Sỉ, MKT. Đăng nhập qua Edge Function `dang-nhap`
  (bảng `sales_users`), phân quyền tick theo trang; Sale chỉ thấy khách của mình (lọc SAU khi xác định Sale).
- **Trang:** Báo cáo tổng hợp (doanh thu 2 đội, thương hiệu, bản đồ / tỉnh, so sánh tháng) · Báo cáo MKT (chi phí, mess, ADS/DS theo
  brand; tab Chi tiết: CPM, CTR, CPC theo chiến dịch / quảng cáo) · Sale Lẻ, Sale Sỉ (Tổng quan · Master Data hồ sơ khách · Daily Task
  việc cần làm tự sinh) · Data Hub (dữ liệu thô, Kiot raw, Đối soát Kiot ↔ app, Lưu trữ) · Cài đặt nâng cao (Phân quyền, Nhật ký,
  Logic xử lý = mọi luật + công thức chỉ số).
- **Nguồn dữ liệu & job tự chạy (giờ VN):** Pancake (hội thoại + đơn) 10 phút / lượt, quét lại toàn bộ 7h05 · 12h30 · 18h00 ·
  KiotViet (đơn đặt hàng, hoá đơn, khách) 15 phút / lượt + job tự tạo khách / gắn Mã KH / chốt đơn Sỉ · Meta Ads 07:05 · 12:05 · 15:05 ·
  đối soát từng mã với Kiot 23:00 · nén ảnh hồ sơ 23:40. Chạy bằng GitHub Actions, pg_cron trên Supabase kích (lịch GitHub hay trễ 1–2h đêm).
- **Luật cốt lõi:** Doanh thu Sale = ĐƠN ĐẶT HÀNG Kiot (không phải hoá đơn), ngày chốt = ngày tạo đơn · chỉ tính khi có dấu vết tiền
  (đã trả / có hoá đơn / có cọc) · MKT theo NGUỒN khách Online, chỉ từ 1/6/2026, đơn đầu + tháng đầu · CHỈ tự gộp khách khi trùng SĐT ·
  Sỉ / Lẻ theo nhóm khách + chi nhánh Kiot.
- **Công cụ:** `scripts/sql.js` (SQL), `scripts/kiem-so-lieu.js --so-code` (so 26 chỉ số code cũ / mới — BẮT BUỘC khi đổi logic báo cáo),
  `scripts/check-pagination.js`. Mỗi lần sửa `index.html` đóng dấu `APP_VERSION` + `APP_BAN`.
- **Sở hữu trên Supabase:** bảng lõi không tiền tố (`datahub_*`, `saleretail_manual`, `salesi_crm`, `kiot_*`, `mkt_*`, `sale_nhan_su`,
  `activity_log`, `sync_log`, `sales_users`, `dang-nhap`, `la_quan_tri()`…) — xem `QUY-UOC-DUNG-CHUNG-SUPABASE.md`.

### 2.2 App QC CSKH (`qc-cskh`)
**Trả lời:** khách nhắn đến có được trả lời đúng, đủ, kịp không.
- **Người dùng:** CHỈ anh + giám đốc (luồng báo cáo ngầm), vào bằng 1 mã truy cập chung (băm trong `qc_cau_hinh`). Không cấp tài khoản Sale.
- **Làm gì:** kéo tin nhắn / bình luận từ Pancake (pg_cron `qc-keo-*`: mỗi giờ phút 25, 06:20 và 18:35 VN) → **chấm từng hội thoại**:
  đúng / thiếu ý / sai kiến thức (đối chiếu `product_faq`) / không liên quan / chỉ bot / không trả lời / lỗi nền tảng; bắt **miss**
  (khách hỏi mua mà không ai trả lời), đo **thời gian phản hồi** (giờ làm 8h–17h30), sai quy trình (trả lời dưới bình luận thay vì
  dẫn về tin nhắn). Quản lý bấm "Báo sai" khi AI chấm chưa đúng.
- **Ai chấm:** lịch Claude trên cloud "QC CSKH - chấm tự động mỗi giờ (phút 50)", model Sonnet, làm theo `routine/cham-cloud.md`
  (không sửa repo, chỉ ghi CSDL qua 4 hàm chấm có mã giới hạn). Tồn nhiều thì chia agent `cham-qc` song song.
- **Luật đã chốt nổi bật:** chấm CẢ hội thoại (1 dòng / conv_id), nhắn lại muộn = MUỘN không phải miss, từ 1/10/2026 mọi tin
  Hiền Thủy / Shidai / Nến Bơ Tự Tại Viên là của Sale Vân Ngọc, báo giá được du di.
- **Công cụ:** `tools/sql.js`, `tools/cham-luat.js`, `tools/ghi-cham.js`, `tools/soat-miss-pancake.js`, `tools/push.js`…
- **Sở hữu:** `sale_response_review`, `sale_review_report`, mọi thứ `qc_*` / `qc-*`. CHỈ ĐỌC Pancake.

### 2.3 App Kế toán (`ke-toan`)
**Trả lời:** tiền đang ở đâu, chi có đúng / đủ duyệt không, lãi lỗ và dòng tiền thật.
- **Người dùng:** kế toán, giám đốc, thủ quỹ, quản lý — tài khoản + mật khẩu RIÊNG (`kt_nguoi_dung`), không dùng chung app MKT.
  Màn đầu có form **đề nghị thanh toán công khai** (ai cũng gửi được, không cần tài khoản).
- **Trang:** Tổng quan · Đối soát lỗi · Phiếu chi & duyệt thanh toán (đề nghị → kế toán kiểm → giám đốc duyệt → thủ quỹ / GĐ chi + ảnh
  giao dịch, QR VietQR tự tạo, khung Hoạt động + bình luận) · Phiếu thu · Điều chuyển · Sổ quỹ & số dư tài khoản (kiểm két cuối ngày,
  đối chiếu file dòng tiền) · Tạm ứng & hoàn ứng · Vay & lãi vay · Phải thu / phải trả / lịch đến hạn · Hoá đơn & thuế (HĐ đầu vào /
  đầu ra, kho sổ thuế theo quý) · 8 báo cáo quản trị (P&L, dòng tiền, hiệu suất đơn, dòng tiền dự kiến 8 tuần, ngân sách, hàng tồn, vay,
  theo cơ sở / kênh) · Khoá kỳ · Cài đặt (phân quyền, danh mục, Cần giải đáp, Logic xử lý, nhật ký).
- **Job tự chạy:** kéo Kiot riêng 15 phút / lượt (phút 2·17·32·47), so khớp Kiot hằng đêm, chụp tồn kho, MISA meInvoice (HĐ bán / mua)
  ban đêm, phân bổ chi phí theo doanh số 00:15, tự kiểm hệ thống ngày 15 + cuối tháng.
- **Luật nổi bật:** doanh thu = hoá đơn Kiot Hoàn thành + Đang xử lý (như màn Tổng quan Kiot), DT thuần = − trả hàng (KHÁC app MKT:
  MKT tính theo đơn đặt hàng — không phải lỗi) · chi phí hạch toán theo tháng sử dụng / phân bổ, dòng tiền theo ngày trả · trả gốc vay
  không phải chi phí · tháng khoá thì không sửa số.
- **Riêng:** đóng dấu phiên bản bằng `scripts/dong-dau.js` (v1.N); KHÔNG hiện tên "Monsieur Claude" trên giao diện / dữ liệu.
  Câu hỏi chờ kế toán / anh nằm trên app: Cài đặt → Cần giải đáp (bảng `kt_cau_hoi`).
- **Sở hữu:** mọi thứ `kt_*` / `kt-*`. Dữ liệu tài chính nhạy cảm: bảng `kt_*` không cho anon đọc, trình duyệt chỉ gọi hàm `kt_*`.

## 3. Bảng chia việc cho Trưởng phòng (gợi ý)

| Anh nói về… | Giao cho |
|---|---|
| doanh thu Sale, khách, Master, Daily Task, gán Sale, Mã KH, MKT / quảng cáo, ADS/DS, CPM / CTR, đối soát đơn Kiot ↔ app, Pancake đơn / thẻ, phân quyền app chính | MKT / Sale |
| chấm hội thoại, Sale trả lời sai / thiếu, miss khách, thời gian phản hồi, FAQ sản phẩm, báo chấm sai | QC CSKH |
| phiếu chi / thu, duyệt chi, thủ quỹ, sổ quỹ, số dư tài khoản, tạm ứng, vay, công nợ, hoá đơn VAT / thuế, P&L, dòng tiền, khoá sổ | Kế toán |

Ca dễ nhầm: "doanh thu" — Sale (đơn đặt hàng) vs Kế toán (hoá đơn thuần) là 2 con số KHÁC nhau có chủ đích → hỏi lại anh muốn số nào.
"Pancake" — đơn / thẻ khách → MKT; tin nhắn / chấm → QC. "Kiot" — đơn & khách cho báo cáo Sale → MKT; thu chi / công nợ → Kế toán.
**Không chắc → hỏi lại anh trước khi giao** (luật "tin nhắn lạ hỏi lại", anh chốt 19/10/2026).

## 4. Luật chung cả 3 nhân sự (đã chốt ở mọi repo)

- Tiếng Việt, gọi **anh** (anh Hải). Ký **Monsieur Claude** (riêng app Kế toán: không ký trên giao diện).
- Đầu phiên `git pull` + đọc `VIEC.md` của repo; xong việc ghi sổ + commit + push NGAY.
- **Minh bạch:** mỗi báo cáo kể lỗi đã gây (kể cả đã sửa), phần chưa kiểm, rủi ro. Anh không trách, chỉ cần không giấu.
- **Tự làm**, chỉ nhờ anh khi bị chặn thật. Anh đã quyết thì làm, không hỏi lại. Tin nhắn lạ / nhầm luồng → hỏi lại trước.
- **Mỗi app chỉ sửa repo của mình.** Kế toán chốt 1/10: "3 app không liên quan tới nhau" — cần gì từ app khác thì ghi mục
  "Phụ thuộc chéo" + báo anh, không tự sửa sang.
- **Supabase dùng chung 1 project** `bcrpxfvvjsjpvbksqzls`: theo `mkt-sale-app/QUY-UOC-DUNG-CHUNG-SUPABASE.md` — tiền tố riêng, chỉ GHI
  bảng của mình, bảng dùng chung chỉ THÊM, KHÔNG đụng khoá legacy / JWT secret / `dang-nhap` / `la_quan_tri()`. Bảng mới bật RLS.
- **Khoá / token / mật khẩu:** không in, không dán vào chat, không commit. Pancake token dùng chung MKT + QC (hết hạn ~1/11/2026 — thay ở cả 2).
- Giờ luôn theo giờ VN (UTC+7). Thao tác ra ngoài khó gỡ (đơn Pancake hàng loạt, gửi tin khách): chạy thử, báo số trước.
- Đẩy bản mới: đợi trang live đúng phiên bản rồi báo anh F5. Giao diện: không emoji trang trí, 3 thẻ / hàng, bảng căn phải số.
- Máy anh không có `node` / `gh`: chạy `ELECTRON_RUN_AS_NODE=1 "D:/Microsoft VS Code/Code.exe" file.js`. Heredoc Bash trên máy anh
  nuốt dấu `\` → script có `\` thì ghi bằng công cụ Write.

## 5. Những điều PHẢI tính khi dựng văn phòng ảo (em đã báo anh 20/10)

1. **Bảo mật số 1:** web ra lệnh được cho agent sửa code / chạy SQL / đổi dữ liệu → bắt buộc đăng nhập, chỉ anh; khoá chỉ nằm ở phía
   chạy agent, KHÔNG trong web. Anh cho trưởng phòng ĐỌC file khoá cả 3 app để nối (20/10) — nhưng khi cấp cho agent chạy thật vẫn nên
   tách: mỗi agent chỉ cầm khoá phần việc của nó (một nơi giữ mọi khoá = lộ một chỗ là lộ cả công ty).
2. **Agent chạy ngầm không hỏi lại giữa chừng được** → việc có trạng thái "chờ anh quyết": agent dừng + ghi câu hỏi, anh trả lời trên
   web, lượt chạy mới đọc câu trả lời làm tiếp.
3. **Việc rủi ro cần nút duyệt** (đơn Pancake hàng loạt, xoá dữ liệu, phân quyền, chi tiền): agent đề xuất + số chạy thử, anh bấm duyệt.
4. **Chạy bằng API key (Console), không lấy phiên gói claude.ai** để tự động hoá; mỗi agent 1 key → usage / chi phí theo key = "độ mệt".
   Phiên ngắn theo từng việc (ngữ cảnh > 150k token rất tốn).
5. **Không chạy song song trên cùng repo** (xung đột git từng làm app trắng màn hình) → 1 repo – 1 agent – 1 việc một lúc, việc sau xếp hàng.
6. **Trưởng phòng chia nhầm** → giai đoạn đầu chỉ ĐỀ XUẤT giao cho ai, anh bấm xác nhận.
7. **Báo cáo kết quả mỗi việc:** sửa gì, link bản mới, số trước / sau, phần chưa kiểm, rủi ro.
8. **3D chỉ là vỏ** (three.js được) — làm bảng việc + chat chạy được trước, đắp 3D sau.

## 6. Đề xuất kiến trúc bản chạy thử

```
Web văn phòng ảo (repo mới, vd hh-vibecode/van-phong-ao, tiền tố vp_ — ĐĂNG KÝ vào sổ quy ước Supabase TRƯỚC khi tạo gì)
  └ đăng nhập (chỉ anh) · ô chat · bảng việc · sơ đồ văn phòng (2D trước)
Supabase: bảng vp_viec (id, giao_cho, tieu_de, noi_dung, trang_thai: moi / cho_xac_nhan / dang_lam / cho_anh / cho_duyet / xong / loi,
          cau_hoi, tra_loi, ket_qua, link, chi_phi, tao_luc, xong_luc) + vp_nhat_ky
Trưởng phòng: đọc việc mới → đề xuất giao_cho (anh xác nhận) → kích lượt chạy của nhân sự
Nhân sự: mỗi repo 1 workflow GitHub chạy Claude Code (API key riêng) khi có việc → đọc CLAUDE.md + VIEC.md → làm → commit → ghi vp_viec
Độ mệt: usage / chi phí theo API key (Anthropic Admin / Usage API) → thanh "mệt" trên nhân vật
```

## 7. Còn chờ anh chốt trước khi làm
- Domain web văn phòng ảo; tiền tố CSDL (đề xuất `vp_`). Repo đã tạo 20/10: `hh-vibecode/van-phong-ao` (riêng tư).
- Dùng API key Console cho agent (chi phí theo token) — mức trần chi phí / ngày cho mỗi nhân sự?
- Việc nào nhân sự được tự làm, việc nào bắt buộc anh duyệt.
- Có thêm nhân sự khác ngoài 3 app không (vd 1 agent viết nội dung / bài LinkedIn).
