export default defineEventHandler((event) => {
    return [

        {id:1, type:'header', caption:'Header', data: {
            text: {
                type:'text',
                value: 'Header text' 
            },
        }},

        {id:2, type:'image', caption:'Image', data: {
            image: {
                type: 'image'
            }
        }},


    ]
  })