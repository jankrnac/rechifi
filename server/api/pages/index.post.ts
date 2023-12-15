import { serverSupabaseServiceRole  } from '#supabase/server'

export default eventHandler(async (event) => 
{
    const client = serverSupabaseServiceRole (event)

    const body = await readBody(event)

    const { data, error } = await client
    .from('pages')
    .insert(body)
    
    return data
    
})