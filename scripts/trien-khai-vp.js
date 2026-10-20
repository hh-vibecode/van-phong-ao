// Triển khai máy chủ Văn phòng ảo: bảng vp_* + tài khoản anh (băm) + khoá gửi usage (băm) + Edge Function vp-api, rồi tự chạy thử.
// Dùng: ELECTRON_RUN_AS_NODE=1 "D:/Microsoft VS Code/Code.exe" scripts/trien-khai-vp.js
// KHÔNG in khoá / mật khẩu. Chỉ in mã trạng thái. Mr.Mon, 20/10/2026.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const { vp, quanTriSupabase, themVp } = require('./khoa');
const REF = 'bcrpxfvvjsjpvbksqzls', API = `https://api.supabase.com/v1/projects/${REF}`;
const FN = `https://${REF}.supabase.co/functions/v1/vp-api`;
const QT = quanTriSupabase(), H = { Authorization: 'Bearer ' + QT.token };
const sha = s => crypto.createHash('sha256').update(s).digest('hex');

async function sql(query) {
  const r = await fetch(API + '/database/query', { method: 'POST', headers: { ...H, 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) });
  const t = await r.text();
  if (!r.ok) throw new Error(`SQL lỗi ${r.status}: ${t.slice(0, 400)}`);
  return t ? JSON.parse(t) : null;
}
const goi = async (body, origin = 'https://hh-vibecode.github.io') => {
  const r = await fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body) });
  let j = {}; try { j = await r.json(); } catch {}
  return { s: r.status, j };
};

(async () => {
  console.log('khoá quản trị Supabase: lấy từ', QT.nguon);
  // 1. Bảng
  await sql(fs.readFileSync(path.join(__dirname, '..', 'supabase', 'vp-schema.sql'), 'utf8'));
  console.log('1. bảng vp_*: ok');
  // 2. Tài khoản anh (chỉ băm + muối lên CSDL)
  let K = vp();
  if (!/^[a-z0-9_.-]{2,40}$/.test(K.VP_TAI_KHOAN || '') || !/^[0-9a-f]{32}$/.test(K.VP_MAT_KHAU_SALT || '') || !/^[0-9a-f]{64}$/.test(K.VP_MAT_KHAU_SHA256 || ''))
    throw new Error('vp-keys.local.txt thiếu / sai tài khoản');
  await sql(`insert into public.vp_tai_khoan (ten, muoi, bam) values ('${K.VP_TAI_KHOAN}', '${K.VP_MAT_KHAU_SALT}', '${K.VP_MAT_KHAU_SHA256}')
    on conflict (ten) do update set muoi = excluded.muoi, bam = excluded.bam`);
  console.log('2. tài khoản:', K.VP_TAI_KHOAN, '(băm)');
  // 3. Khoá gửi usage (máy anh) — sinh nếu chưa có, chỉ băm lên CSDL
  if (!/^[0-9a-f]{64}$/.test(K.VP_KHOA_GUI || '')) {
    themVp('VP_KHOA_GUI', crypto.randomBytes(32).toString('hex'), 'Khoá máy anh gửi usage lên vp-api (chỉ ghi được bảng vp_usage) — Mr.Mon 20/10/2026');
    K = vp();
  }
  await sql(`insert into public.vp_cau_hinh (k, v) values ('khoa_gui_bam', '${sha(K.VP_KHOA_GUI)}') on conflict (k) do update set v = excluded.v, cap_nhat = now()`);
  console.log('3. khoá gửi usage: ok (băm)');
  // 4. Edge Function
  const fd = new FormData();
  fd.append('metadata', JSON.stringify({ entrypoint_path: 'index.ts', name: 'vp-api', verify_jwt: false }));
  fd.append('file', new Blob([fs.readFileSync(path.join(__dirname, '..', 'supabase', 'functions', 'vp-api', 'index.ts'))], { type: 'application/typescript' }), 'index.ts');
  const d = await fetch(API + '/functions/deploy?slug=vp-api', { method: 'POST', headers: H, body: fd });
  console.log('4. deploy vp-api:', d.status);
  if (!d.ok) throw new Error((await d.text()).slice(0, 300));
  // 5. Chạy thử (chỉ in trạng thái)
  await new Promise(r => setTimeout(r, 4000));
  const sai = await goi({ viec: 'dang_nhap', ten: K.VP_TAI_KHOAN, mk: 'sai-mat-khau-123' });
  const dung = await goi({ viec: 'dang_nhap', ten: K.VP_TAI_KHOAN, mk: K.VP_MAT_KHAU });
  const khongPhien = await goi({ viec: 'usage' });
  const coPhien = await goi({ viec: 'usage', phien: dung.j.phien });
  const guiSai = await goi({ viec: 'gui_usage', khoa: 'x'.repeat(64), ds: [] });
  const guiDung = await goi({ viec: 'gui_usage', khoa: K.VP_KHOA_GUI, ds: [] });
  const xuat = await goi({ viec: 'dang_xuat', phien: dung.j.phien });
  const sauXuat = await goi({ viec: 'usage', phien: dung.j.phien });
  const ck = await goi({ viec: 'cong_khai' });
  const ckSach = ck.s === 200 && Array.isArray(ck.j.ds) && !JSON.stringify(ck.j).match(/model|tokDocCache|phien|"luc":\d+,"loai"/);
  console.log('   công khai (không đăng nhập):', ck.s, ck.j.ds ? ck.j.ds.length + ' người' : '', ckSach ? '· chỉ phần tối thiểu' : '· CÓ TRƯỜNG THỪA');
  const anon = await fetch(`https://${REF}.supabase.co/rest/v1/vp_tai_khoan?select=ten`, { headers: { apikey: 'khong-co' } });
  console.log('5. thử: đăng nhập SAI', sai.s, '(cần 401) · ĐÚNG', dung.s, dung.j.phien ? '(có phiên)' : '(KHÔNG có phiên)',
    '· đọc usage không phiên', khongPhien.s, '(cần 401) · có phiên', coPhien.s, '· gửi khoá sai', guiSai.s, '(cần 401) · khoá đúng', guiDung.s,
    '· đăng xuất', xuat.s, '· dùng phiên đã xuất', sauXuat.s, '(cần 401) · đọc thẳng bảng không khoá', anon.status, '(cần 401)');
})().catch(e => { console.error('DỪNG:', e.message); process.exit(1); });
