export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          avatar_url: string | null;
          provider: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          avatar_url?: string | null;
          provider?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string;
          avatar_url?: string | null;
          provider?: string | null;
          created_at?: string;
        };
      };
      scores: {
        Row: {
          id: string;
          user_id: string;
          game_category: string;
          game_mode: string;
          clear_time_ms: number;
          mistake_count: number;
          keystroke_count: number;
          question_count: number;
          question_timestamps: Json;
          is_verified: boolean;
          verification_failed_reason: string | null;
          played_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          game_category: string;
          game_mode: string;
          clear_time_ms: number;
          mistake_count?: number;
          keystroke_count?: number;
          question_count: number;
          question_timestamps: Json;
          is_verified?: boolean;
          verification_failed_reason?: string | null;
          played_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          game_category?: string;
          game_mode?: string;
          clear_time_ms?: number;
          mistake_count?: number;
          keystroke_count?: number;
          question_count?: number;
          question_timestamps?: Json;
          is_verified?: boolean;
          verification_failed_reason?: string | null;
          played_at?: string;
        };
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Score = Database["public"]["Tables"]["scores"]["Row"];
