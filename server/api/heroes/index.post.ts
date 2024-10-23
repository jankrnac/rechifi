import { createHero } from '~/utils/abilities'

export default eventHandler(async (event) => {
        
    await authorize(createHero, {})

    const body = await readBody(event)
    
    const hero = await useDrizzle().insert(tables.heroes).values(body).returning().get()

    return hero
})