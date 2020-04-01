import S3 from 'aws-s3'

const config = {
    accessKeyId: null,
    secretAccessKey: null,
    region: null,
    bucketName: null,
    dirName: null,
}

const S3Client = new S3(config)

export default S3Client
