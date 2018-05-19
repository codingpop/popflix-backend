import cloudinary from 'cloudinary';
import del from 'del';

import '../config';

const upload = (media) => {
  try {
    return cloudinary.v2.uploader.upload(media.path, {
      resource_type: media.mimetype.startsWith('video') ? 'video' : 'image',
    });
  } catch (err) {
    throw err;
  } finally {
    del([media.path]);
  }
};

export default upload;
