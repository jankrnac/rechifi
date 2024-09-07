import { like } from "drizzle-orm"

export default cachedEventHandler(async (event) => {

	const query = getRouterParam(event,'query')

    let posts = await useDrizzle().query.posts.findMany({
		  where: like(sql`lower(${tables.posts.title})`, "%"+query+"%"),
      with: {
        user: true
      }
    })

    return posts
}, {
  	maxAge: 60 * 60,
	swr: true,
	staleMaxAge: 30,
	getKey: (event: H3Event) => event.path

})