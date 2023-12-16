import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => 
{
    const client = await serverSupabaseClient(event)

    const slug = getRouterParam(event, 'slug')

    const { data } = await client
    .from('reviews')
    .select()
    .eq('slug', slug )
    
    return data
    
})