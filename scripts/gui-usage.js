// Gửi usage THẬT (từ nhật ký phiên Claude Code trên máy anh) lên vp-api — lịch Windows "vp-gui-usage" chạy mỗi phút (qua gui-usage.vbs, ẩn cửa sổ).
// Không gọi API Claude (không tốn token / tiền). Khoá gửi đọc từ vp-keys.local.txt, chỉ ghi được bảng vp_usage. Không in khoá.
// Mr.Mon, 20/10/2026.
const fs = require('fs'), path = require('path');
const { tongHop } = require('./bao-cao-usage');
const { vp } = require('./khoa');
const FN = 'https://bcrpxfvvjsjpvbksqzls.supabase.co/functions/v1/vp-api';
const LOG = path.join(__dirname, '..', 'gui-usage.local.log');
const ghi = s => { try { fs.writeFileSync(LOG, new Date().toISOString() + ' ' + s + '\n'); } catch {} };   // chỉ giữ dòng cuối
(async () => {
  const K = vp();
  if (!K.VP_KHOA_GUI) { ghi('THIẾU VP_KHOA_GUI'); process.exit(1); }
  const kq = tongHop();
  const ds = Object.entries(kq.nguoi).map(([nguoi, s]) => ({ nguoi, so_lieu: { ...s, luc: kq.luc, tuanTu: kq.tuanTu } }));
  const r = await fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ viec: 'gui_usage', khoa: K.VP_KHOA_GUI, ds }) });
  ghi(`gui ${ds.length} nguoi -> ${r.status}`);
  if (process.argv.includes('--in')) console.log('gửi', ds.length, 'nhân sự ->', r.status);
})().catch(e => { ghi('LỖI ' + e.message); process.exit(1); });
