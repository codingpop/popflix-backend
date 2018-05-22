import multer from 'multer';
import composeError from '../helpers/composeError';

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

    return callback(null, true);
  },
  limits: {
    fileSize: (1024 ** 2) * 100,
  },
});
