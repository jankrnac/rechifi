export default defineEventHandler((event) => {
    return [

        {
            id: 1, type: 'header', caption: 'Header', 
            data: {
                text: 'Header text'
            },
            options: [
                'textalign'
            ]
        },

        {
            id: 2, type: 'paragraph', caption: 'Paragraph', data: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
        },

        {
            id: 3, type: 'image', caption: 'Image', data: {
                image: 'placeholder.webp'
            }
        },


    ]
})