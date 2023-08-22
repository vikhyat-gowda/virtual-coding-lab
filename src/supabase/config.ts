import { createClient } from '@supabase/supabase-js'

const SUPABASEURL = 'YOUR_SUPABASE_URL'
const SUPABASEKEY = 'YOUR_SUPABASE_KEY'

const Supabase = createClient(SUPABASEURL, SUPABASEKEY)

export default Supabase
