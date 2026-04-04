-- ========================================
-- HMV School Website - Supabase Schema
-- ========================================
-- Run this in your Supabase project's SQL Editor.
-- ========================================

-- 1. NEWS TABLE
create table if not exists news (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  image_url text default '',
  category text check (category in ('news', 'event', 'announcement')) default 'news',
  publish_date date not null,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. GALLERY TABLE
create table if not exists gallery (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  image_url text not null,
  category text default 'General',
  featured boolean default false,
  created_at timestamptz default now()
);

-- 3. STAFF TABLE
create table if not exists staff (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  department text default '',
  qualification text default '',
  bio text default '',
  image_url text default '',
  email text default '',
  active boolean default true,
  created_at timestamptz default now()
);

-- 4. SOCIETIES TABLE
create table if not exists societies (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  category text default '',
  advisor text default '',
  meeting_day text default '',
  members_count int default 0,
  image_url text default '',
  active boolean default true,
  created_at timestamptz default now()
);

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
alter table news enable row level security;
alter table gallery enable row level security;
alter table staff enable row level security;
alter table societies enable row level security;

-- Public: Anyone can read published news, active staff, active societies, gallery
create policy "Anyone can view published news"
  on news for select
  using (published = true);

create policy "Anyone can view gallery"
  on gallery for select
  using (true);

create policy "Anyone can view active staff"
  on staff for select
  using (active = true);

create policy "Anyone can view active societies"
  on societies for select
  using (active = true);

-- Admin: Authenticated users can do everything
create policy "Admin can manage all news"
  on news for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin can manage all gallery"
  on gallery for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin can manage all staff"
  on staff for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin can manage all societies"
  on societies for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ========================================
-- CONTACT SUBMISSIONS TABLE
-- ========================================
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text default '',
  message text not null,
  created_at timestamptz default now(),
  read boolean default false
);

alter table contact_submissions enable row level security;

-- Only admins can view contact submissions
create policy "Admins can view submissions"
  on contact_submissions for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Anyone can submit a contact form
create policy "Anyone can create submission"
  on contact_submissions for insert
  with check (true);

-- ========================================
-- INDEXES
-- ========================================
create index if not exists idx_news_date on news (publish_date desc);
create index if not exists idx_news_published on news (published);
create index if not exists idx_staff_active on staff (active);
create index if not exists idx_societies_active on societies (active);
create index if not exists idx_gallery_created on gallery (created_at desc);
