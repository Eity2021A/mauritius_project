import { createClient } from "@supabase/supabase-js"

const url = process.env.CONTENT_SUPABASE_URL
const key = process.env.CONTENT_SUPABASE_ANON_KEY

export const contentDb =
  url && key ? createClient(url, key, { auth: { persistSession: false } }) : null
