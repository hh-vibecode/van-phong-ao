// Đọc nhật ký phiên Claude Code trên máy (~/.claude/projects/**/*.jsonl) -> số THẬT cho từng nhân sự:
// token, giờ làm, số phiên, model, lần hết lượt (+ giờ mở lại), lần hoạt động cuối.
// KHÔNG gọi API nào (không tốn token / tiền), KHÔNG đọc nội dung chat — chỉ lấy con số (usage, model, giờ).
// Dùng:  ELECTRON_RUN_AS_NODE=1 "D:/Microsoft VS Code/Code.exe" scripts/bao-cao-usage.js [--json]
// Mr.Mon, 20/10/2026.
const fs = require('fs');
const path = require('path');
const os = require('os');

const GOC = path.join(os.homedir(), '.claude', 'projects');
// Thư mục dự án -> nhân sự (phiên chạy trong thư mục app nào thì tính cho người đó)
const NGUOI = [
  [/mkt-sale-app/i, 'mkt'], [/qc-cskh/i, 'qc'], [/ke-toan/i, 'kt'], [/van-phong-ao/i, 'gd'],
];
const ai = s => (NGUOI.find(([re]) => re.test(s)) || [null, 'khac'])[1];
const KHOANG_NGHI = 5 * 60 * 1000;   // 2 tin cách nhau > 5 phút = nghỉ, không tính giờ làm
const VN = 7 * 3600000;
const dauNgay = ms => { const d = new Date(ms + VN); d.setUTCHours(0, 0, 0, 0); return d.getTime() - VN; };
const dauTuan = ms => { const n = dauNgay(ms), thu = (new Date(n + VN).getUTCDay() + 6) % 7; return n - thu * 86400000; };

function quet(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) quet(p, out); else if (e.name.endsWith('.jsonl')) out.push(p);
  }
  return out;
}

function tongHop(now = Date.now()) {
  const homNay = dauNgay(now), tuanNay = dauTuan(now);
  const R = {};
  const moi = id => (R[id] = R[id] || {
    phien: new Set(), model: {}, cuoi: 0, hetLuot: null,
    ngay: { tokVao: 0, tokRa: 0, tokGhiCache: 0, tokDocCache: 0, ms: 0, tin: 0 },
    tuan: { tokVao: 0, tokRa: 0, tokGhiCache: 0, tokDocCache: 0, ms: 0, tin: 0 },
  });
  for (const f of quet(GOC, [])) {
    const id = ai(path.relative(GOC, f).split(path.sep)[0]);
    const thayMsg = new Map();          // message.id -> usage (bản cuối, tránh đếm trùng khi stream)
    const moc = [];                     // thời điểm có hoạt động, để tính giờ làm
    const st = fs.statSync(f); if (st.mtimeMs < tuanNay) continue;   // file cũ hơn tuần này: bỏ qua
    for (const dong of fs.readFileSync(f, 'utf8').split('\n')) {
      if (!dong) continue;
      let j; try { j = JSON.parse(dong); } catch { continue; }
      const t = Date.parse(j.timestamp); if (!t || t < tuanNay) continue;
      if (j.type === 'user' || j.type === 'assistant') moc.push(t);
      const r = R[id] || moi(id);
      if (j.sessionId) r.phien.add(j.sessionId);
      if (t > r.cuoi) r.cuoi = t;
      const m = j.message;
      if (j.type === 'assistant' && m && m.usage && m.id) thayMsg.set(m.id, { t, u: m.usage, model: m.model });
      // Công cụ vừa dùng: CHỈ lấy tên (Read / Edit / Bash...), không lấy nội dung / đường dẫn
      if (j.type === 'assistant' && m && Array.isArray(m.content)) for (const c of m.content)
        if (c && c.type === 'tool_use' && typeof c.name === 'string' && (!r.congCu || t >= r.congCu.luc)) r.congCu = { ten: c.name.slice(0, 40), luc: t };
      const rl = (j.apiErrorParams && j.apiErrorParams.rate_limit_info) || j.quotaLimits;   // chỉ có khi bị hết lượt
      if (rl && rl.resetsAt && (!r.hetLuot || t > r.hetLuot.luc)) r.hetLuot = { luc: t, loai: rl.rateLimitType, moLai: rl.resetsAt * 1000 };
    }
    const r = R[id] || moi(id);
    for (const { t, u, model } of thayMsg.values()) {
      for (const [k, tu] of [['tuan', tuanNay], ['ngay', homNay]]) {
        if (t < tu) continue;
        const o = r[k];
        o.tokVao += u.input_tokens || 0; o.tokRa += u.output_tokens || 0;
        o.tokGhiCache += u.cache_creation_input_tokens || 0; o.tokDocCache += u.cache_read_input_tokens || 0; o.tin++;
      }
      if (model) r.model[model] = (r.model[model] || 0) + 1;
    }
    moc.sort((a, b) => a - b);
    for (let i = 1; i < moc.length; i++) {
      const g = moc[i] - moc[i - 1]; if (g > KHOANG_NGHI) continue;
      r.tuan.ms += g; if (moc[i - 1] >= homNay) r.ngay.ms += g;
    }
  }
  const kq = {};
  for (const [id, r] of Object.entries(R)) {
    kq[id] = {
      phien: r.phien.size, cuoi: r.cuoi, dangLam: now - r.cuoi < 3 * 60000,
      model: Object.entries(r.model).sort((a, b) => b[1] - a[1]).map(x => x[0])[0] || null,
      hetLuot: r.hetLuot, congCu: r.congCu || null, ngay: r.ngay, tuan: r.tuan,
    };
  }
  return { luc: now, tuanTu: tuanNay, nguoi: kq };
}

if (require.main === module) {
  const kq = tongHop();
  if (process.argv.includes('--json')) { console.log(JSON.stringify(kq)); process.exit(0); }
  const TEN = { gd: 'Mr.Mon', mkt: 'Masa', qc: 'Quang Lê', kt: 'Katy', khac: 'Khác' };
  const so = n => n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'k' : String(n);
  const gio = ms => (ms / 3600000).toFixed(1) + 'h';
  const gioVN = ms => new Date(ms).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
  console.log('Nhân sự   | Hôm nay: giờ  token(vào+ra+ghi cache) | Tuần: giờ  token     đọc cache | phiên | model | cuối hoạt động | hết lượt gần nhất');
  for (const [id, r] of Object.entries(kq.nguoi)) {
    const tk = o => o.tokVao + o.tokRa + o.tokGhiCache;
    console.log([TEN[id].padEnd(9), gio(r.ngay.ms).padStart(6), so(tk(r.ngay)).padStart(8), '|', gio(r.tuan.ms).padStart(6), so(tk(r.tuan)).padStart(8),
      so(r.tuan.tokDocCache).padStart(9), '|', String(r.phien).padStart(3), '|', r.model || '-', '|', gioVN(r.cuoi), r.dangLam ? '(đang làm)' : '',
      '|', r.hetLuot ? r.hetLuot.loai + ' lúc ' + gioVN(r.hetLuot.luc) + ', mở lại ' + gioVN(r.hetLuot.moLai) : '-'].join(' '));
  }
}
module.exports = { tongHop };
