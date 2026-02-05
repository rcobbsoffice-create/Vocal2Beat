export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  credits: number;
  subscription_tier: 'Starter' | 'Pro' | 'Studio';
  created_at: string;
  updated_at: string;
};

export type VoiceModel = {
  id: string;
  user_id: string;
  name: string;
  quality: string;
  status: 'Completed' | 'Training' | 'Failed';
  color_gradient: string;
  created_at: string;
};

export type Generation = {
  id: string;
  user_id: string;
  model_id: string | null;
  prompt: string;
  title: string;
  duration: number;
  status: 'Completed' | 'Processing' | 'Failed';
  audio_url: string | null;
  waveform: number[];
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'updated_at' | 'credits' | 'subscription_tier'> & Partial<Pick<Profile, 'credits' | 'subscription_tier'>>;
        Update: Partial<Profile>;
      };
      voice_models: {
        Row: VoiceModel;
        Insert: Omit<VoiceModel, 'id' | 'created_at'>;
        Update: Partial<VoiceModel>;
      };
      generations: {
        Row: Generation;
        Insert: Omit<Generation, 'id' | 'created_at'>;
        Update: Partial<Generation>;
      };
    };
  };
};
