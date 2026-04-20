-- Supabase Database Schema for Typing Game
-- Run this SQL in your Supabase Dashboard SQL Editor

-- ============================================
-- 1. Profiles Table (linked to auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  provider TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- 2. Scores Table
-- ============================================
CREATE TABLE public.scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,

  -- Game identification
  game_category TEXT NOT NULL,  -- 'worldmap' | 'japanmap' | 'other'
  game_mode TEXT NOT NULL,      -- 'east-asia-country' | 'kanto-prefecture' etc.

  -- Score data
  clear_time_ms INTEGER NOT NULL,
  mistake_count INTEGER NOT NULL DEFAULT 0,
  keystroke_count INTEGER NOT NULL DEFAULT 0,
  question_count INTEGER NOT NULL,

  -- Anti-cheat: Question timestamps (JSONB)
  question_timestamps JSONB NOT NULL,

  -- Verification status
  is_verified BOOLEAN DEFAULT FALSE,
  verification_failed_reason TEXT,

  -- Timestamp
  played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_clear_time CHECK (clear_time_ms > 0),
  CONSTRAINT valid_mistake_count CHECK (mistake_count >= 0)
);

-- Enable Row Level Security
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;

-- Policies for scores
CREATE POLICY "Verified scores are viewable by everyone"
  ON public.scores FOR SELECT
  USING (is_verified = TRUE);

CREATE POLICY "Users can view own scores"
  ON public.scores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert own scores"
  ON public.scores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 3. Indexes for Performance
-- ============================================

-- Ranking queries (category + mode + verified + time)
CREATE INDEX idx_scores_ranking ON public.scores (
  game_category,
  game_mode,
  is_verified,
  clear_time_ms ASC
) WHERE is_verified = TRUE;

-- Period-based ranking queries
CREATE INDEX idx_scores_played_at ON public.scores (played_at DESC);

-- User's score history
CREATE INDEX idx_scores_user ON public.scores (user_id, played_at DESC);

-- Composite index for category + period + time
CREATE INDEX idx_scores_category_period ON public.scores (
  game_category,
  played_at,
  clear_time_ms
) WHERE is_verified = TRUE;

-- ============================================
-- 4. Auto-create profile on user signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url, provider)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_app_meta_data->>'provider'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
