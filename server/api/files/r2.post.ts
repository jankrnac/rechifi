import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export default eventHandler(async (event) => 
{

    const S3 = new S3Client({
        region: "auto",
        endpoint: `https://7471c3f706c92aa33de7b01621143001.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: '7269ddce39392ef6fa3dc42a5bb1353f',
            secretAccessKey: '08027d84f624956e4c491c698b6801b891a7578ebf91d6cc61e8a09b6ddfd6d0',
        },
    });

    const formData = await readMultipartFormData(event)


    console.log(formData[0].data)

    await S3.send(
        new PutObjectCommand({
            Body: formData[0].data,
            Bucket: 'rechifi',
            Key: formData.find(e => e.name == 'file').filename,
            ContentType: 'multipart/form-data',
            ContentLength: formData[0].data.toString().length
        })
    )

})