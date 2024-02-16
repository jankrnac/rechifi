export default defineEventHandler((event) => {
    return [

        {
            id: 1, type: 'title', caption: 'Title', 
            data: {
                text: 'Title text'
            },
        },

        {
            id: 2, type: 'section', caption: 'Section start', data: {
                name: 'Section name',
            },
        },

        {
            id: 3, type: 'header', caption: 'Header', data: {
                text: 'Header text',
            },
        },

        {
            id: 4, type: 'paragraph', caption: 'Paragraph', data: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
        },

        {
            id: 5, type: 'image', caption: 'Image', data: {
                image: 'placeholder.webp',
                textAlign: 'center' 
            },
        },

        {
            id: 6, type: 'proscons', caption: 'Pros and cons', data: {
                pros: ['This is one pros bullet'],
                cons: ['This is one cons bullet'] 
            },
        },

        {
            id: 7, type: 'image-text', caption: 'Image with text', data: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                image: 'placeholder.webp',
                reversed: false
            },
        },

        {
            id: 8, type: 'score', caption: 'Score', data: {
                score: 50,
            },
        },

        {
            id: 8, type: 'gallery', caption: 'Gallery', data: {
                images: [
                    'placeholder.webp',
                    'placeholder.webp',
                    'placeholder.webp'
                ]
            },
        },




    ]
})