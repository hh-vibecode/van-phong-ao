// Edge Function vp-api — máy chủ của Văn phòng ảo (Mr.Mon, 20/10/2026). verify_jwt = false: web KHÔNG chứa khoá nào.
// Body JSON {viec, ...}:
//   {viec:'dang_nhap', ten, mk}        -> {phien, ten, het_han}   (mật khẩu so bằng BĂM có muối; sai -> 401 sau 1 giây)
//   {viec:'kiem_phien', phien}         -> {ten}
//   {viec:'dang_xuat', phien}          -> {ok}
//   {viec:'usage', phien}              -> {ds:[{nguoi, so_lieu, cap_nhat}]}
//   {viec:'gui_usage', khoa, ds:[...]} -> {ok, so}   (máy anh gửi; khoá gửi so bằng BĂM — chỉ ghi được bảng vp_usage)
const SB = Deno.env.get('SUPABASE_URL')!, SK = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const H = { apikey: SK, Authorization: 'Bearer ' + SK, 'Content-Type': 'application/json' };
const NGUON = ['https://hh-vibecode.github.io', 'http://127.0.0.1:8765'];
const NGUOI = ['gd', 'mkt', 'qc', 'kt', 'test', 'khac', '_goi'];
const NGAY_PHIEN = 30;

const cors = (req: Request) => {
  const o = req.headers.get('origin') || '';
  return { 'Access-Control-Allow-Origin': NGUON.includes(o) ? o : NGUON[0], 'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Vary': 'Origin' };
};
const hex = (b: ArrayBuffer) => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
const bam = async (s: string) => hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)));
const ngauNhien = () => hex(crypto.getRandomValues(new Uint8Array(32)).buffer);
const bang = (a: string, b: string) => { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0; };
const ngu = (ms: number) => new Promise(r => setTimeout(r, ms));
class Loi extends Error { constructor(m: string, public s = 400) { super(m); } }

async function rest(duong: string, init: RequestInit = {}) {
  const r = await fetch(`${SB}/rest/v1/${duong}`, { ...init, headers: { ...H, ...(init.headers || {}) } });
  const t = await r.text();
  if (!r.ok) throw new Loi('CSDL lỗi ' + r.status, 500);
  return t ? JSON.parse(t) : null;
}
async function kiemPhien(phien: unknown) {
  if (typeof phien !== 'string' || !/^[0-9a-f]{64}$/.test(phien)) throw new Loi('Chưa đăng nhập', 401);
  const ds = await rest(`vp_phien?select=ten,het_han&bam_token=eq.${await bam(phien)}`);
  if (!ds.length || Date.parse(ds[0].het_han) < Date.now()) throw new Loi('Phiên hết hạn, đăng nhập lại', 401);
  return ds[0].ten as string;
}

Deno.serve(async req => {
  const C = cors(req);
  const tra = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...C, 'Content-Type': 'application/json' } });
  if (req.method === 'OPTIONS') return new Response(null, { headers: C });
  if (req.method !== 'POST') return tra({ loi: 'Chỉ nhận POST' }, 405);
  try {
    const raw = await req.text();
    if (raw.length > 100_000) throw new Loi('Dữ liệu quá lớn', 413);
    const b = JSON.parse(raw || '{}');

    if (b.viec === 'dang_nhap') {
      const ten = String(b.ten || '').trim().toLowerCase(), mk = String(b.mk || '');
      const ds = /^[a-z0-9_.-]{2,40}$/.test(ten) ? await rest(`vp_tai_khoan?select=muoi,bam&ten=eq.${ten}`) : [];
      const dung = ds.length && mk.length >= 8 && bang(await bam(ds[0].muoi + ':' + mk), ds[0].bam);
      if (!dung) { await ngu(1000); throw new Loi('Sai tài khoản hoặc mật khẩu', 401); }
      const phien = ngauNhien(), het = new Date(Date.now() + NGAY_PHIEN * 86400000).toISOString();
      await rest('vp_phien', { method: 'POST', body: JSON.stringify({ bam_token: await bam(phien), ten, het_han: het }) });
      await rest(`vp_phien?het_han=lt.${new Date().toISOString()}`, { method: 'DELETE' });   // dọn phiên hết hạn
      return tra({ phien, ten, het_han: het });
    }
    if (b.viec === 'kiem_phien') return tra({ ten: await kiemPhien(b.phien) });
    if (b.viec === 'dang_xuat') {
      if (typeof b.phien === 'string' && /^[0-9a-f]{64}$/.test(b.phien)) await rest(`vp_phien?bam_token=eq.${await bam(b.phien)}`, { method: 'DELETE' });
      return tra({ ok: true });
    }
    if (b.viec === 'usage') {
      await kiemPhien(b.phien);
      return tra({ ds: await rest('vp_usage?select=nguoi,so_lieu,cap_nhat') });
    }
    if (b.viec === 'gui_usage') {
      const ch = await rest('vp_cau_hinh?select=v&k=eq.khoa_gui_bam');
      if (!ch.length || typeof b.khoa !== 'string' || !bang(await bam(b.khoa), ch[0].v)) { await ngu(1000); throw new Loi('Sai khoá gửi', 401); }
      const ds = (Array.isArray(b.ds) ? b.ds : []).filter((x: any) => NGUOI.includes(x?.nguoi) && x.so_lieu && typeof x.so_lieu === 'object')
        .map((x: any) => ({ nguoi: x.nguoi, so_lieu: x.so_lieu, cap_nhat: new Date().toISOString() }));
      if (ds.length) await rest('vp_usage', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates' }, body: JSON.stringify(ds) });
      return tra({ ok: true, so: ds.length });
    }
    throw new Loi('Không rõ việc');
  } catch (e) {
    const s = e instanceof Loi ? e.s : 400;
    return tra({ loi: e instanceof Loi ? e.message : 'Yêu cầu không hợp lệ' }, s);
  }
});
