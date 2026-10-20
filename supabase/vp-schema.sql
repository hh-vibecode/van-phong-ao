-- Văn phòng ảo (tiền tố vp_, đăng ký trong mkt-sale-app/QUY-UOC-DUNG-CHUNG-SUPABASE.md 20/10/2026) — Mr.Mon
-- Mọi bảng bật RLS, KHÔNG policy nào → anon / authenticated không đọc, không ghi. Chỉ Edge Function vp-api (service_role) đụng tới.
-- Không chứa khoá: tài khoản lưu MUỐI + BĂM (SHA-256), khoá gửi số lưu BĂM, phiên lưu BĂM.

create table if not exists public.vp_tai_khoan (
  ten text primary key,
  muoi text not null,
  bam text not null,
  tao_luc timestamptz not null default now()
);
create table if not exists public.vp_phien (
  bam_token text primary key,
  ten text not null references public.vp_tai_khoan(ten) on delete cascade,
  het_han timestamptz not null,
  tao_luc timestamptz not null default now()
);
create table if not exists public.vp_cau_hinh (
  k text primary key,
  v text not null,
  cap_nhat timestamptz not null default now()
);
-- Usage mới nhất của từng nhân sự (máy anh gửi lên mỗi phút, từ nhật ký phiên Claude Code — không gọi API)
create table if not exists public.vp_usage (
  nguoi text primary key,
  so_lieu jsonb not null,
  cap_nhat timestamptz not null default now()
);

alter table public.vp_tai_khoan enable row level security;
alter table public.vp_phien enable row level security;
alter table public.vp_cau_hinh enable row level security;
alter table public.vp_usage enable row level security;
revoke all on table public.vp_tai_khoan, public.vp_phien, public.vp_cau_hinh, public.vp_usage from anon, authenticated;
grant all on table public.vp_tai_khoan, public.vp_phien, public.vp_cau_hinh, public.vp_usage to service_role;
