export default eventHandler(async (event) => 
{
    const client = await serverSupabaseClient(event)
    const body = await readBody(event)

    const { data } = await client
    .from('reviews')
    .select('*, profiles(*)')
    .eq('brand', body.brand )
    .eq('model', body.model )
    .eq('profiles.username', body.username )
    .single()

    return data
    
})