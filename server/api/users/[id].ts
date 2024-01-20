import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default eventHandler(async (event) => 
{
    const client = await serverSupabaseClient(event)
    const id = getRouterParam(event, 'id')

    const { data } = await client
    .from('profiles')
    .select()
    .eq('id', id)
    .single()

    const user = await serverSupabaseUser(event)

    if( !data ) {
        const { data, error } = await client.from('profiles').insert({
            id: user.id
        })

        return data
    }
    
    return data
    
})