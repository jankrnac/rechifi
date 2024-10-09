import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { serverQueryContent } from '#content/server'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (event) => {
    const contentList = (await serverQueryContent(event).find()) as ParsedContent[]
    const postsList = await $fetch('/api/posts')

    return contentList.map((c) => {
        return asSitemapUrl({
            loc: `${c._path}`,
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
                loc: `/reviews/${p.user.username}/${p.brand}/${p.model}`,
                changefreq: 'weekly'
            })
        }
    }))

})