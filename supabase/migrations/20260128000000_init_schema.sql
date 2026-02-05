-- Create tables for VoxFlow AI

-- 1. Profiles (extending auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  credits integer default 100,
  subscription_tier text default 'Starter',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Voice Models
create table voice_models (
  id uuid DEFAULT gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  quality text default 'Pro Vocalist',
  status text default 'Completed',
  color_gradient text default 'from-brand to-brand-dark',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Generations
create table generations (
  id uuid DEFAULT gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  model_id uuid references voice_models on delete set null,
  prompt text not null,
  title text not null,
  duration integer default 60,
  status text default 'Completed',
  audio_url text,
  waveform integer[] default '{20,40,60,30,50,20,40,70,80,50,30,40,60,80,90,70,50,40,60,30,20,40,50,30}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

alter table voice_models enable row level security;

alter table generations enable row level security;

-- Profiles Policies
create policy "Users can view their own profile." on profiles for
select using (auth.uid () = id);

create policy "Users can update their own profile." on profiles for
update using (auth.uid () = id);

-- Voice Models Policies
create policy "Users can view their own voice models." on voice_models for
select using (auth.uid () = user_id);

create policy "Users can insert their own voice models." on voice_models for
insert
with
    check (auth.uid () = user_id);

create policy "Users can update their own voice models." on voice_models for
update using (auth.uid () = user_id);

-- Generations Policies
create policy "Users can view their own generations." on generations for
select using (auth.uid () = user_id);

create policy "Users can insert their own generations." on generations for
insert
with
    check (auth.uid () = user_id);

-- Realtime setup
alter publication supabase_realtime add table voice_models;

alter publication supabase_realtime add table generations;

-- Trigger for profile creation on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();