export default eventHandler(async (event) => {
    return hubBlob().handleUpload(event, {
        formKey: 'files', // read file or files form the `formKey` field of request body (body should be a `FormData` object)
        multiple: true, // when `true`, the `formKey` field will be an array of `Blob` objects
        ensure: {
            contentType: ['image/jpeg', 'images/png', 'images/webp'], // allowed types of the file
            types: ['image'],
            maxSize: '16MB'
        },
        put: {
            addRandomSuffix: true
        }
    })
  })