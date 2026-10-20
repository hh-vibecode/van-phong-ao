// Đọc khoá cho Văn phòng ảo — KHÔNG BAO GIỜ in giá trị.
// - vp-keys.local.txt (repo này, git bỏ qua): tài khoản web của anh (băm), khoá gửi usage.
// - Khoá quản trị Supabase (sbp_): đọc từ file khoá app Kế toán / QC (anh cho phép đọc để nối, 20/10/2026) — mỗi lần dùng ghi nhật ký VIEC.md.
// Mr.Mon, 20/10/2026.
const fs = require('fs'), path = require('path');
const VP = path.join(__dirname, '..', 'vp-keys.local.txt');
function doc(file) {
  if (!fs.existsSync(file)) return {};
  const k = {}, dong = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  for (let i = 0; i < dong.length; i++) {
    const m = dong[i].match(/^\s*([A-Z][A-Z0-9_]+)\s*(?:\([^)]*\))?\s*(?:[=:]\s*(.*))?$/);
    if (!m) continue;
    let v = (m[2] || '').trim();
    if (!v) { let j = i + 1; while (j < dong.length && !dong[j].trim()) j++; if (j < dong.length && !/^\s*[A-Z][A-Z0-9_]+\s*([=:]|$)/.test(dong[j])) v = dong[j].trim(); }
    v = v.replace(/^["']|["']$/g, '');
    if (v && !(m[1] in k)) k[m[1]] = v;
  }
  return k;
}
function vp() { return doc(VP); }
function quanTriSupabase() {
  const kt = doc('C:/Users/HP/Desktop/ke-toan/kt-keys.local.txt');
  if (/^sbp_/.test(kt.SUPABASE_ACCESS_TOKEN || '')) return { token: kt.SUPABASE_ACCESS_TOKEN, nguon: 'ke-toan' };
  const qc = doc('C:/Users/HP/Desktop/qc-cskh/qc-keys.local.txt');
  if (/^sbp_/.test(qc.SUPABASE_MGMT_TOKEN || '')) return { token: qc.SUPABASE_MGMT_TOKEN, nguon: 'qc-cskh' };
  throw new Error('Không tìm thấy khoá quản trị Supabase (sbp_)');
}
function themVp(ten, giaTri, ghiChu) {
  fs.appendFileSync(VP, `# ${ghiChu}\r\n${ten}: ${giaTri}\r\n`);
}
module.exports = { vp, quanTriSupabase, themVp, VP };
if (require.main === module) {   // tự soát: chỉ in TÊN nhãn
  console.log('vp-keys:', Object.keys(vp()).join(', ') || 'trống');
  try { console.log('quản trị Supabase: có (từ ' + quanTriSupabase().nguon + ')'); } catch (e) { console.log(e.message); }
}
