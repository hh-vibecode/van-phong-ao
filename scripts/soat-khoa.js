// Soát khoá / token / mật khẩu trước khi đẩy lên GitHub. Chỉ in TÊN FILE + DÒNG + LOẠI, KHÔNG BAO GIỜ in giá trị.
// Dùng:  node scripts/soat-khoa.js            -> soát mọi file git đang theo dõi + file sắp commit
//        node scripts/soat-khoa.js --lich-su  -> soát thêm toàn bộ lịch sử commit (trước khi chuyển repo công khai)
// Máy anh Hải: ELECTRON_RUN_AS_NODE=1 "D:/Microsoft VS Code/Code.exe" scripts/soat-khoa.js
// Có lỗi -> thoát mã 1 (workflow GitHub dừng, không đưa web lên). Monsieur Claude, 20/10/2026.
const { execFileSync } = require('child_process');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });

// Mẫu khoá. Khoá "publishable / anon" của Supabase cũng chặn: anh yêu cầu mã nguồn không chứa khoá nào.
const MAU = [
  ['Supabase secret key', /sb_secret_[A-Za-z0-9_-]{10,}/],
  ['Supabase publishable key', /sb_publishable_[A-Za-z0-9_-]{10,}/],
  ['Supabase management token', /sbp_[A-Fa-f0-9]{20,}/],
  ['JWT (anon / service_role / phiên)', /eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\./],
  ['GitHub token', /(gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})/],
  ['Anthropic API key', /sk-ant-[A-Za-z0-9_-]{20,}/],
  ['OpenAI-style key', /\bsk-(proj-)?[A-Za-z0-9]{32,}/],
  ['Google API key', /AIza[0-9A-Za-z_-]{35}/],
  ['Facebook / Meta token', /\bEAA[A-Za-z0-9]{40,}/],
  ['Slack token', /xox[abprs]-[A-Za-z0-9-]{10,}/],
  ['Private key', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['Chuỗi kết nối Postgres có mật khẩu', /postgres(ql)?:\/\/[^:\s/]+:[^@\s]{6,}@/],
  ['Gán mật khẩu / token dạng chữ', /(password|passwd|pwd|mat_?khau|secret|api[_-]?key|access[_-]?token|token)["']?\s*[:=]\s*["'][^"'\s]{12,}["']/i],
];
// File không bao giờ được nằm trong repo
const FILE_CAM = [/\.local(\.|$)/, /(^|\/)\.env(\.|$)/, /\.(pem|key|p12|pfx)$/i, /(^|\/)(id_rsa|id_ed25519)/];

const loi = [];
const soatChu = (nguon, text) => {
  text.split(/\r?\n/).forEach((dong, i) => {
    for (const [ten, re] of MAU) if (re.test(dong)) loi.push(`${nguon}:${i + 1}  ${ten}`);
  });
};

// 1) File đang theo dõi + file sắp commit
const files = new Set(git('ls-files').split('\n').filter(Boolean));
git('diff', '--cached', '--name-only', '--diff-filter=ACMR').split('\n').filter(Boolean).forEach(f => files.add(f));
for (const f of files) {
  if (FILE_CAM.some(re => re.test(f))) loi.push(`${f}  file cấm đưa lên (khoá / môi trường)`);
  let t;
  try { t = git('show', ':' + f); } catch { continue; } // lấy bản trong index (bản sẽ được commit)
  if (t.includes('\u0000')) continue; // file nhị phân
  soatChu(f, t);
}

// 2) Toàn bộ lịch sử (tuỳ chọn)
if (process.argv.includes('--lich-su')) {
  const log = git('log', '--all', '-p', '--no-color', '--format=@@commit %h');
  let commit = '?';
  log.split('\n').forEach(dong => {
    if (dong.startsWith('@@commit ')) { commit = dong.slice(9); return; }
    if (dong.startsWith('+++ b/')) {
      const f = dong.slice(6);
      if (FILE_CAM.some(re => re.test(f))) loi.push(`lịch sử ${commit} ${f}  file cấm từng được commit`);
      return;
    }
    if (dong.startsWith('+') || dong.startsWith('-')) {
      for (const [ten, re] of MAU) if (re.test(dong)) loi.push(`lịch sử ${commit}  ${ten}`);
    }
  });
}

if (loi.length) {
  console.error('SOÁT KHOÁ: CÓ VẤN ĐỀ (' + loi.length + ')');
  [...new Set(loi)].forEach(l => console.error('  - ' + l));
  process.exit(1);
}
console.log(`soát khoá: sạch (${files.size} file${process.argv.includes('--lich-su') ? ' + toàn bộ lịch sử' : ''})`);
