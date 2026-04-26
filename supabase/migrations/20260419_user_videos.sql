-- avatar_videos: registry of pre-generated Nova avatar videos.
-- Phase 1 (this migration) serves pre-generated archetype videos for instant playback.
-- Phase 2 (future) will add per-user personalized videos via a separate user_videos table.

create table if not exists public.avatar_videos (
  id               uuid primary key default gen_random_uuid(),
  kind             text not null,                     -- 'unboxing' | 'paywall' | 'milestone'
  archetype        text,                              -- for unboxing: 'fitness' | 'career' | 'money' | 'relationships' | 'business' | 'learning' | 'default'
  avatar_name      text not null default 'nova',
  video_url        text,                              -- S3/CDN URL returned by HeyGen
  poster_url       text,                              -- thumbnail poster for the video
  caption_url      text,                              -- .vtt captions (optional)
  duration_seconds int,
  script           text,                              -- source script, for reference
  heygen_video_id  text,                              -- HeyGen video ID for refresh/regen
  active           boolean not null default true,     -- toggle without deleting
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists avatar_videos_kind_archetype_idx
  on public.avatar_videos (kind, archetype)
  where active = true;

create unique index if not exists avatar_videos_active_unique
  on public.avatar_videos (kind, coalesce(archetype, 'default'))
  where active = true;

create or replace function public.avatar_videos_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists avatar_videos_touch_updated_at on public.avatar_videos;
create trigger avatar_videos_touch_updated_at
  before update on public.avatar_videos
  for each row execute function public.avatar_videos_touch_updated_at();

alter table public.avatar_videos enable row level security;

-- Public read: anyone can read active videos (they're delivered on success.html pre-login).
drop policy if exists "avatar_videos_public_read" on public.avatar_videos;
create policy "avatar_videos_public_read"
  on public.avatar_videos for select
  using (active = true);

-- Service role inserts/updates via migration + dashboard; no public writes.

-- Seed placeholder rows for the 6 unboxing archetypes + 1 default fallback + 1 paywall.
-- Update video_url, poster_url, duration_seconds after each HeyGen render finishes.
insert into public.avatar_videos (kind, archetype, script, active) values
  ('unboxing', 'fitness',       'UNBOXING — FITNESS (draft)',       false),
  ('unboxing', 'career',        'UNBOXING — CAREER (draft)',        false),
  ('unboxing', 'money',         'UNBOXING — MONEY (draft)',         false),
  ('unboxing', 'relationships', 'UNBOXING — RELATIONSHIPS (draft)', false),
  ('unboxing', 'business',      'UNBOXING — BUSINESS (draft)',      false),
  ('unboxing', 'learning',      'UNBOXING — LEARNING (draft)',      false),
  ('unboxing', 'default',       'UNBOXING — DEFAULT (draft)',       false),
  ('paywall',   null,           'PAYWALL — YOU ARE CLOSE (draft)',  false)
on conflict do nothing;

comment on table public.avatar_videos is 'Pre-generated Nova avatar videos. Phase 1 (archetype-based instant playback).';
