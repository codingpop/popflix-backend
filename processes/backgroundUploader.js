import upload from '../helpers/upload';
import Movie from '../models/Movie';
import { sendOne } from '../helpers/mailer';

process.on('message', async (movieData) => {
  try {
    const movie = movieData.file;
    const uploadedMovie = await upload(movie);

    await Movie.create({
      ...movieData.info,
      secureUrl: uploadedMovie.secure_url,
      publicId: uploadedMovie.public_id,
      duration: uploadedMovie.duration,
    });

    sendOne({
      to: movieData.uploader,
      subject: 'PopFlix Notification',
      html: `<strong>The movie titled "${movieData.info.title}"is uploaded successfully.</strong>`,
    });
  } catch (err) {
    sendOne({
      to: movieData.uploader,
      subject: 'PopFlix Notification',
      html: `<strong>An error occurred while uploading "${movieData.info.title}". Please try again.</strong>`,
    });
  }
});
