-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Weeks Table
create table public.weeks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  start_date date not null,
  end_date date not null,
  is_locked boolean default false,
  locked_at timestamp with time zone,
  status text check (status in ('active', 'completed')) default 'active',
  created_at timestamp with time zone default now()
);

-- Tasks Table
create table public.tasks (
  id uuid primary key default uuid_generate_v4(),
  week_id uuid references public.weeks(id) on delete cascade not null,
  user_id uuid references auth.users(id) not null,
  category text check (category in ('planned', 'done', 'next', 'extra')) not null,
  content text not null,
  is_completed boolean default false,
  order_index integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS Policies
alter table public.weeks enable row level security;
alter table public.tasks enable row level security;

-- Weeks Policies
create policy "Users can view their own weeks"
  on public.weeks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own weeks"
  on public.weeks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own weeks"
  on public.weeks for update
  using (auth.uid() = user_id);

-- Tasks Policies
create policy "Users can view their own tasks"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own tasks"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
  on public.tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own tasks"
  on public.tasks for delete
  using (auth.uid() = user_id);
