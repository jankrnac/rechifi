import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => 
{
    const client = await serverSupabaseClient(event)
    const id = getRouterParam(event, 'id')

    const { data } = await client
    .from('profiles')
    .select()
    .eq('id', id)
    .single()
    
    return data
    
})