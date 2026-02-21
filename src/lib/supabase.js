import { createClient } from '@supabase/supabase-js'

// Ces valeurs seront à remplacer par vos propres clés Supabase
// Sur Vercel, elles seront lues depuis les variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://votre-projet.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'votre-cle-anonyme'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
