import { editProduct } from '~/utils/abilities'

export default eventHandler(async (event) => {

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    await authorize(editProduct, {})

    await useDrizzle().update(tables.products).set(body).where(eq(tables.products.id, id))

})