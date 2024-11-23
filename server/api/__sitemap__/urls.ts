import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (event) => {
    const productsList = await $fetch('/api/products/all')
    const postsList = await $fetch('/api/posts')

    return productsList.map((product) => {
        return asSitemapUrl({
            loc: `${product.type}/${product.slug}`,
            changefreq: 'weekly'
        })
    }).concat(postsList.map((p) => {

        if(p.type == 'article')
        {
            return asSitemapUrl({
                loc: `/blog/${p.slug}`,
                changefreq: 'weekly'
            })
        }
        else
        {
            return asSitemapUrl({
                loc: `/reviews/${p.user.username}/${p.slug}`,
                changefreq: 'weekly'
            })
        }
    }))

})