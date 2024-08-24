import { writeFile } from 'fs/promises'

export default eventHandler(async (event) => 
{

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }


    const formData = await readMultipartFormData(event)

    const file = formData?.find(e => e.name == 'file')

    const path = '/uploads/' +  generateString(12) + '.' + file?.filename.split('.')[1]

    await writeFile('public/'+ path, file?.data)

    return path

}) 