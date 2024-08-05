export default eventHandler(async (event) => 
{
    const client = await serverSupabaseClient(event)
    const body = await readBody(event)

    const { data } = await client
    .from('reviews')
    .select('*, profiles(*), elements(*)')
    .eq('brand', body.brand )
    .eq('model', body.model )
    .eq('profiles.username', body.username )
    .order('order', { referencedTable: 'elements', ascending: true })
    .single()

    return data
    
})