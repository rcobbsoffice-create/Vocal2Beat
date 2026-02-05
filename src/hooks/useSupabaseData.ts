import { createClient } from '@/lib/supabase/client'
import { Profile, VoiceModel, Generation } from '@/types/supabase'

export const useSupabase = () => {
  const supabase = createClient()

  const getProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data: data as Profile | null, error }
  }

  const getVoiceModels = async (userId: string) => {
    const { data, error } = await supabase
      .from('voice_models')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data: data as VoiceModel[] | null, error }
  }

  const getGenerations = async (userId: string) => {
    const { data, error } = await supabase
      .from('generations')
      .select('*, voice_models(name)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data: data as (Generation & { voice_models: { name: string } | null })[] | null, error }
  }

  return { getProfile, getVoiceModels, getGenerations, supabase }
}
