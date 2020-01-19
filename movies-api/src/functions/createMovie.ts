import { Movie } from "../db/entity/movie";
import { connectToDatabase } from "../db/connection";

export const handler = async (req: any) => {
  try {
    const data = JSON.parse(req.body);
    const connection = await connectToDatabase();

    const movie = new Movie();
    movie.title = data.title;
    movie.overview = data.overview;
    movie.rating = data.rating;
    movie.genre = data.genre;
    movie.release_date = data.release_date;

    // save new record and close connection
    await connection.getRepository(Movie).save(movie);
    await connection.close();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: 1,
        id: movie.id
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: 0, message: error })
    };
  }
};
