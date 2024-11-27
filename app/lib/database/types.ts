// app/lib/database/types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      embeddings: {
        Row: {
          id: string
          user_id: string
          source: string
          embedding: string | null
          metadata: Json | null
          created_at: string
        }
      }
      semantic_labels: {
        Row: {
          id: string
          user_id: string
          label: string
          confidence: number
          source: string
          created_at: string
        }
      }
      social_profiles: {
        Row: {
          id: string
          user_id: string
          platform: string
          platform_user_id: string
          access_token: string | null
          refresh_token: string | null
          profile_data: Json | null
          created_at: string
          updated_at: string
        }
      }
      users: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
      }
    }
  }
}