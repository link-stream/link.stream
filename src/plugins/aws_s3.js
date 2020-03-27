import S3 from 'aws-s3'

const config = {
    accessKeyId: process.env.VUE_APP_GOOGLE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VUE_APP_GOOGLE_AWS_ACCESS_SECRET_KEY,
    region: process.env.VUE_APP_GOOGLE_AWS_REGION,
    bucketName: process.env.VUE_APP_GOOGLE_AWS_BUCKET,
    dirName: process.env.VUE_APP_GOOGLE_AWS_DIR,
}

const S3Client = new S3(config)

export default S3Client
