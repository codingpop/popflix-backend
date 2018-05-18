import upload from '../helpers/upload';
import Movie from '../models/Movie';

process.on('message', async (movieData) => {
  try {
    const movie = movieData.file;
    const uploadedMovie = await upload(movie);

    Movie.create({
      ...movieData.info,
      secureUrl: uploadedMovie.secure_url,
      publicId: uploadedMovie.public_id,
      duration: uploadedMovie.duration,
    });
  } catch (err) {
    console.log(err, 'This is me');
  }
});
