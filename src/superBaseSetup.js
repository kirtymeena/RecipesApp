import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    import.meta.env.VITE_SUPERBASE_URL,
    import.meta.env.VITE_ANON_KEY
)

export default supabase