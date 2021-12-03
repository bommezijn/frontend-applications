import { createPath } from '../../utilities/helpers';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export default async function handler(req, res) {
  if (!parseInt(req.query.page)) {
    res.status(200).json({
      message: 'Invalid page number',
      success: false,
    });
  } else {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${req.query.page}`
      );
      const data = await response.json();
      const results = await data.results.map(element => {
        return {
          title: element.title,
          vote: element.vote_average,
          data: element.release_date,
          sypnosis: element.overview,
          poster: createPath(IMAGE_URL, element.poster_path),
        };
      });
      // console.log(results.length, results);
      return res.status(200).json(await results);
    } catch (error) {
      res.status(200).json({ error: 'error' });
    }
  }
}
