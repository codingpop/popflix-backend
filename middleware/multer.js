import multer from 'multer';
import composeError from '../helpers/composeError';

let fileType;

export default multer({
  dest: 'uploads/',
  fileFilter: (req, { mimetype }, callback) => {
    const mimetypes = ['video/mp4', 'image/png', 'image/jpeg'];

    if (!mimetypes.includes(mimetype)) {
      return callback(composeError(
        'UploadError',
        'Unsupported media type',
      ), false);
    }

    fileType = mimetype;

    return callback(null, true);
  },
  limits: {
    // fileSize: fileType === 'video/mp4' ? ((1024 ** 2) * 100) : ((1024 ** 2) * 2),
    fileSize: (1024 ** 2) * 100,
  },
});
