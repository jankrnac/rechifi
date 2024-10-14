import { like } from "drizzle-orm"

export default eventHandler(async (event) => {

	const query = getRouterParam(event,'query')

    let posts = await useDrizzle().query.posts.findMany({
		  where: like(sql`lower(${tables.posts.title})`, "%"+query+"%"),
      with: {
        user: true,
        cover: true,
        likes: true
      }
    })

    return posts
})