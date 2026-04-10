-- WishPath Financial Markets — Supabase Migration
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Watchlists table
CREATE TABLE IF NOT EXISTS user_watchlists (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL DEFAULT 'New Watchlist',
  symbols jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_watchlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own watchlists" ON user_watchlists
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Portfolio holdings table
CREATE TABLE IF NOT EXISTS user_portfolios (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  symbol text NOT NULL,
  quantity numeric NOT NULL DEFAULT 0,
  avg_cost numeric NOT NULL DEFAULT 0,
  added_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_portfolios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own portfolio" ON user_portfolios
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Chart Studio saved configs
CREATE TABLE IF NOT EXISTS user_chart_configs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL DEFAULT 'Untitled Chart',
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  chart_type text DEFAULT 'pie',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_chart_configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own chart configs" ON user_chart_configs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Saved news articles
CREATE TABLE IF NOT EXISTS user_saved_articles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text,
  url text,
  source text,
  summary text,
  sentiment text,
  saved_at timestamptz DEFAULT now()
);

ALTER TABLE user_saved_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own saved articles" ON user_saved_articles
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_watchlists_user ON user_watchlists(user_id);
CREATE INDEX IF NOT EXISTS idx_user_portfolios_user ON user_portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_user_chart_configs_user ON user_chart_configs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_saved_articles_user ON user_saved_articles(user_id);
