import * as AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, S3_BUCKET_NAME } from '../utils/constants';
// import logger from '../../utils/logger';

export const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
});

interface S3UploadParams {
    buffer: Buffer;
    fileName: string;
    folder?: string;
    contentType?: string;
}
export const uploadBufferToS3 = (params: S3UploadParams): Promise<boolean> => {
    const s3Params = {
        Bucket: `${S3_BUCKET_NAME}/resume`,
        Key: `${params.fileName}`,
        Body: params.buffer,
        // ContentType: params.contentType || config.PDF_CONTENT_TYPE,
    };
    return new Promise<boolean>((resolve, reject) => {
        s3.upload(s3Params as PutObjectRequest, (error, _data) => {
            if(error) {
                reject(error);
            }
            // logger.info('Image Uploaded to s3 - ' + JSON.stringify(data));
            resolve(true);
        });
    });
};
s3.upload
