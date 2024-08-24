export default eventHandler(async (event) => {
    
    const body = await readBody(event)

    const slugify = (str:String) => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
        str = str.toLowerCase(); // convert string to lowercase
        str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
                 .replace(/\s+/g, '-') // replace spaces with hyphens
                 .replace(/-+/g, '-'); // remove consecutive hyphens
        return str
    }

    const article = await useDrizzle().insert(tables.posts).values({
        type: 'article',
        title: body.title,
        slug: slugify(body.title)
    }).returning().get()


    return article
})