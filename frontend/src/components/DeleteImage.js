import { deleteFile } from 'react-s3';
import GetObservationID from './GetObservationID';
 
window.Buffer = window.Buffer || require("buffer").Buffer;

const S3_BUCKET =process.env.REACT_APP_S3_BUCKET;
const REGION =process.env.REACT_APP_S3_REGION;
const ACCESS_KEY =process.env.REACT_APP_S3_ACCESSKEY;
const SECRET_ACCESS_KEY =process.env.REACT_APP_S3_SECRETACCESSKEY;

const DeleteImageFromS3 = async (filename) => {
    const config = {
        bucketName: S3_BUCKET,
        dirName: 'user/' + GetObservationID(),
        region: REGION,
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
    }

    deleteFile(filename, config)
        .then(response => console.log(response))
        .catch(err => console.error(err))
}
 
export default DeleteImageFromS3;