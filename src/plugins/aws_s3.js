import S3 from 'aws-s3'

const config = {
    accessKeyId: process.env.AWS.ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS.ACCESS_SECRET_KEY,
    region: process.env.AWS.REGION,
    bucketName: process.env.AWS.BUCKET,
    dirName: process.env.AWS.DIR,
}

const S3Client = new S3(config)

export default S3Client
