import { parse } from 'node-html-parser';

export default eventHandler(async (event) => 
{
    const body = await readBody(event)

    const data = await $fetch(body.url)

    return data

})