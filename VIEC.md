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
| 1 | Kế hoạch triển khai ĐÃ VIẾT: `KE-HOACH-TRIEN-KHAI.md` (20/10) — chờ anh chốt 5 điểm cuối file | xem BRIEF.md mục 5–7. Đề xuất: web gọi Edge Function `vp-*` (không cần khoá trong trang), đăng nhập bằng mã của anh kiểm ở máy chủ |
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

- Hình văn phòng: MƯỢN nhân vật / đồ đạc / sàn / tường của dự án mở có sẵn, ghi nguồn trên trang; mình chỉ làm phần logic (anh, 20/10/2026:
  "mượn nhân vật bối cảnh của nó, mình làm về phần logic khác thôi", "dùng thì note trong info là dùng model gì"). Đang dùng Pixel Agents (MIT).
- Văn phòng 1 phòng chung: 4 nhân sự ngồi bàn giữa phòng, Mr.Mon ngồi ghế đối diện (anh, 20/10/2026).
- Tên nhân sự (anh, 20/10/2026): Masa = MKT/Sale, Quang Lê = QC CSKH (anh viết "QC Sale"), Katy = Kế toán, Tester = Tester.

- Mr.Mon chỉ PHÂN BIỆT việc thuộc app nào (`PHAN-VIEC.md` + `web/phan-viec.json`), không đọc hết kiến thức app — tốn token (anh, 20/10/2026).
- Mr.Mon thỉnh thoảng đi kiểm tra: việc quá lâu thì nhắc, ai chờ anh thì báo anh, còn lại động viên (anh, 20/10/2026).
- Mỗi nhân sự phải có đủ thông tin: năng lượng (usage còn lại), phiên 5 giờ, usage tuần, còn bao nhiêu ngày tới lúc đặt lại hạn mức tuần,
  ô trạng thái kiểu phiên Claude Code cạnh đầu khi đang xử lý; khung chat kiểu Claude trong VS Code ở 1 bên, không che văn phòng (anh, 20/10/2026).
- BẢO MẬT khi nối thật: người ngoài có link KHÔNG được giao việc / sửa gì → đăng nhập kiểm ở MÁY CHỦ (Edge Function `vp-*` + mã của anh băm),
  trang không có khoá; khoá ở GitHub Secrets. Khoá mật khẩu bằng JS trên trang tĩnh là vô dụng (code công khai) — không làm kiểu đó.

- Thanh trái = BẢNG XẾP HẠNG nhân viên xuất sắc, cập nhật trực tiếp: avatar, giờ làm, số việc, token, quy ra điểm (anh, 20/10/2026 — nhắn nhầm
  sang phiên MKT, phiên đó chuyển lại). Điểm do MÁY tính từ nhật ký sự kiện (sau này bảng `vp_su_kien`, chỉ thêm); KHÔNG cộng theo giờ / token.
  Bảng tuần đặt lại 00:00 thứ Hai giờ VN. Luật điểm xem nút "Cách tính điểm" trên web (đã gửi anh qua phiên MKT).

- **ƯU TIÊN SỐ 1: KHÔNG dùng API tốn tiền thật, chỉ dùng tính năng trong gói** (anh nhắc lại 20/10/2026).

## 4. NHẬT KÝ
- **20/10/2026** — USAGE THẬT LÊN WEB (v0.12). Phiên MKT đăng ký tiền tố `vp_` / `vp-` (anh duyệt, commit b7a711c repo MKT). Đã tạo trên Supabase chung:
  bảng `vp_tai_khoan`, `vp_phien`, `vp_cau_hinh`, `vp_usage` (RLS bật, không policy, revoke anon/authenticated — thử khoá anon thật: đọc / ghi đều 401 / 42501)
  + Edge Function `vp-api` (verify_jwt false; đăng nhập so băm có muối, phiên 30 ngày lưu băm, sai chờ 1 giây; `gui_usage` cần khoá gửi riêng, chỉ ghi `vp_usage`;
  CORS chỉ hh-vibecode.github.io + 127.0.0.1:8765). Tự thử 9/9 đạt. Máy anh: lịch Windows **`vp-gui-usage`** mỗi phút (`scripts/gui-usage.vbs` → `gui-usage.js`
  → `bao-cao-usage.js`), không gọi API Claude. Web: nút Đăng nhập, 30 giây lấy số 1 lần → trạng thái thật (Đang làm / Đang nghỉ / Hết lượt gói), ô phiên
  trên đầu (công cụ đang dùng — chỉ tên, token hôm nay, giờ làm), bảng thông tin (giờ / token hôm nay + tuần, % phần của người đó, model, hết lượt + giờ mở lại),
  thẻ usage tuần cả văn phòng, bảng xếp hạng giờ · token thật. Thử trọn luồng bằng Edge chạy ngầm + DevTools: không lỗi JS.
  Lỗi đã gây (đã sửa trước khi đẩy): tiêu đề chú thích `/*` thiếu `*/` làm cả khối "dữ liệu thật" thành chú thích.
  CHƯA có: % hạn mức gói (phiên 5h / tuần) — chờ anh chọn (a) endpoint usage không chính thức / (b) anh nhập tay / (c) quy theo token. Tester chưa có phiên riêng → không số.
  Anh có 2 tài khoản Claude (TK1 / TK2, theo sổ Kế toán) — số token đang cộng chung cả 2 vì cùng thư mục `~/.claude` trên máy.
- **20/10/2026** — Nhật ký khoá: dùng `SUPABASE_ACCESS_TOKEN` (file khoá app Kế toán) để tạo bảng `vp_*`, ghi tài khoản (băm) + khoá gửi (băm), triển khai `vp-api`; dùng `ANON_KEY` (file khoá app QC) để thử bảng `vp_*` đóng với anon. Không in giá trị. Khoá gửi usage `VP_KHOA_GUI` sinh mới, chỉ nằm trong `vp-keys.local.txt`.
- **20/10/2026** — Usage thật: `scripts/bao-cao-usage.js` đọc nhật ký phiên Claude Code trên máy anh (`~/.claude/projects/**/*.jsonl`) → mỗi nhân sự: token (vào / ra / ghi cache / đọc cache), giờ làm (khoảng nghỉ > 5 phút không tính), số phiên, model, đang làm hay không, lần HẾT LƯỢT gần nhất + giờ mở lại. Không gọi API, không đọc nội dung chat, chạy 1,7 giây. Thanh trạng thái (statusline — có sẵn % phiên 5h / tuần) KHÔNG chạy trong khung chat VS Code (đã thử, đã gỡ cài đặt thử). % hạn mức liên tục chưa có nguồn chính thức trong VS Code → hỏi anh. Đã nhắn phiên MKT đăng ký tiền tố `vp_` trước khi tạo bảng.
- **20/10/2026** — Tạo tài khoản đăng nhập web cho anh (`anhhai`, mật khẩu ngẫu nhiên 20 ký tự) → chép vào clipboard anh + lưu `vp-keys.local.txt` (đã kiểm git bỏ qua) kèm bản băm SHA-256 có muối để đặt lên máy chủ. Chưa dùng được tới khi có màn đăng nhập máy chủ.
- **20/10/2026** — Web v0.11: thanh trái bảng xếp hạng (ghép bản nháp của phiên MKT/Sale, phiên đó KHÔNG sửa repo này): hạng, avatar cắt từ hình nhân vật, giờ · việc · token hiện thẳng trên dòng, điểm, ▲▼ so đầu ngày, huy hiệu (7 ngày không lỗi / Tiết kiệm token / Nhanh nhất tuần / Bắt lỗi giỏi), tab Tuần / Tháng, bấm dòng xem "điểm từ đâu", hộp "Cách tính điểm", nhân viên xuất sắc tuần trước. Chat: anh giao đúng người Mr.Mon đề xuất → Mr.Mon +2, chọn người khác → −3 (chỉ trong trình duyệt). Giả lập tạo lịch sử 2 tuần + sự kiện mới; tắt giả lập thì xoá số giả lập. Bản đồ chuyển sang co giãn liên tục (có thanh trái + khung chat vẫn đủ to). Chưa có số thật: chưa nối máy chủ / nguồn token.
- **20/10/2026** — Web v0.10: ẩn dòng ghi nguồn / giấy phép dưới bản đồ, chuyển vào nút "Thông tin" trên thanh đầu trang (file LICENSE MIT vẫn kèm trong trang như giấy phép yêu cầu).
- **20/10/2026** — Web v0.9: chức danh TRÊN tên nhân vật, dạng "Agent …" (Agent Giám Đốc, Agent MKT/Sale, Agent QC CSKH, Agent Kế toán, Agent Kiểm Thử — đúng chữ anh đưa) theo lời anh.
- **20/10/2026** — Web v0.6: khung chat Mr.Mon (nút góc, mở nằm bên phải 390px, văn phòng tự thu lại; điện thoại thì phủ toàn màn) — Mr.Mon phân việc theo `web/phan-viec.json` (thử 15 câu mẫu: chia đúng, câu dễ nhầm như "doanh thu", "Pancake bị lỗi", "cấp quyền" thì hỏi lại kèm nút chọn); anh bấm "Giao …" thì việc chuyển cột trên Bảng việc (chỉ trong trình duyệt, chưa gửi). Ô trạng thái kiểu Claude Code cạnh đầu (động từ + công cụ + file, thời gian, token), thanh năng lượng dưới tên, bảng thông tin đủ: năng lượng, phiên 5 giờ, tuần, còn mấy ngày đặt lại, phần usage của người đó, số việc tuần, model. Mr.Mon đi đôn đốc / động viên, ghi báo vào chat. Số liệu năng lượng / phiên hiện là GIẢ LẬP (nút giả lập) — chưa có nguồn usage thật.
- **20/10/2026** — Đã dừng giữa chừng agent đọc toàn bộ tài liệu 3 app (anh bảo tốn token) — không dùng kết quả; soạn `PHAN-VIEC.md` gọn từ BRIEF mục 3.
- **20/10/2026** — Web v0.4: thay hình tự vẽ bằng hình Pixel Agents (`pixel-agents-hq/pixel-agents`, MIT © 2026 Pablo De Lucca; nhân vật dựa trên Metro City của JIK-A-4) — chép 33 file hình vào `web/assets/pa/` (122 KB) + `LICENSE-pixel-agents.txt`; ghi nguồn dưới bản đồ. Sơ đồ `web/office-layout.json` đúng định dạng layout của Pixel Agents (sửa được bằng trình sửa của họ). Bộ vẽ + logic viết lại bằng JS thuần (đọc sơ đồ, tô màu sàn / tường, xếp lớp theo zY, tìm đường, ngồi / đi nghỉ sofa / cà phê / bảng trắng, thẻ tên, bảng thông tin, nút "giả lập đang làm việc"). 1 phòng: 4 nhân sự bàn chung giữa phòng (MKT, QC trên; Kế toán, Tester dưới), Mr.Mon bàn trên quay xuống, sau lưng bảng trắng. Đã chụp kiểm bằng Edge chạy ngầm ở 1300px (thường + giả lập) và 500px: hiển thị đúng, không tràn ngang. CHƯA kiểm điện thoại thật (Edge chạy ngầm không thu hẹp dưới 500px).
- **20/10/2026** — Tìm dự án có sẵn: Pixel Agents (9.8k sao, MIT — chỉ theo dõi phiên Claude Code trên máy, không giao việc), claude-office (MIT, cần máy chủ Python, chỉ theo dõi máy), pixel-office (Boss chia việc + bảng việc nhưng dùng API key và KHÔNG có giấy phép → không chép). Không cái nào làm sẵn "giao việc trên web → agent chạy cloud bằng gói" → giữ logic tự làm, mượn hình.
- **20/10/2026** — Lỗi đã gây: bản v0.3 em tự vẽ pixel bằng code (tốn thời gian / token) trước khi anh bảo mượn hình có sẵn → đã bỏ, thay bằng v0.4.
- **20/10/2026** — Anh đặt tên: Claude = Giám đốc Mr.Mon; thêm nhân sự Tester. Web v0.2: phòng Mr.Mon trên, 3 phòng app giữa, phòng Tester dưới. Sửa CLAUDE.md / BRIEF.md / VIEC.md tiêu đề.
- **20/10/2026** — Anh cho phép → chuyển repo `van-phong-ao` sang CÔNG KHAI, bật Pages (nguồn GitHub Actions), bật Secret scanning + Push protection của GitHub. Trước đó đã soát khoá toàn bộ lịch sử: sạch. Nhật ký khoá: dùng GITHUB_TOKEN trong file khoá app QC (đọc vào biến, không in) cho 4 lệnh API trên; lần này hệ thống chặn tự động KHÔNG chặn (sau khi anh cho phép).
- **20/10/2026** — Dựng web khung `web/index.html` v0.1 (sơ đồ văn phòng 2D 4 nhân vật, bảng việc 6 trạng thái, ô chat khoá lại — CHƯA nối dữ liệu, không khoá, `noindex`, CSP chặt) + workflow `.github/workflows/pages.yml` (soát khoá cả lịch sử → chỉ đưa thư mục `web/` lên Pages) + `scripts/soat-khoa.js` (đã thử khoá giả: bắt đúng) + hook pre-commit trên máy + siết `.gitignore`. Trang CHƯA lên vì repo còn riêng tư (xem mục 1 #1).
- **20/10/2026** — Nhật ký khoá: thử đọc token GitHub trong file khoá 3 app (để kiểm gói tài khoản / bật Pages) → hệ thống chặn tự động của Claude Code CHẶN, không đọc được giá trị nào, không lách. Đẩy code bằng git thường (Credential Manager của máy).
- **20/10/2026** — Anh nhắn nhầm luồng ("test xong xoá đi" + ảnh phiếu chi app Kế toán), anh bảo bỏ qua → không làm gì.
- **20/10/2026** — Tạo repo `hh-vibecode/van-phong-ao` (RIÊNG TƯ) theo lời anh "tạo hộ repo", đẩy CLAUDE.md, BRIEF.md, VIEC.md, .gitignore (chặn `*.local.*`).
- **20/10/2026** — Tạo thư mục `0.van-phong-ao` + `CLAUDE.md`, `BRIEF.md` (tóm tắt 3 app, bảng chia việc, luật chung, rủi ro, kiến trúc đề xuất), `VIEC.md`. Anh cho phép trưởng phòng đọc file khoá 3 app để nối (ghi điều kiện an toàn vào CLAUDE.md).
