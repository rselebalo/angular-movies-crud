import { Movie } from "../db/entity/movie";
import { connectToDatabase } from "../db/connection";
import { isEmpty } from "lodash";

export const handler = async (req: any) => {
  try {
    const { id } = req.pathParameters;
    const data = JSON.parse(req.body);
    const connection = await connectToDatabase();

    const movie = await connection.getRepository(Movie).findOne({ id });
    if (!isEmpty(movie)) {
      movie.title = data.title;
      movie.overview = data.overwiew;
      movie.rating = data.rating;
      movie.genre = data.genre;
      movie.release_date = data.release_date;

      // save record and close connection
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
    }
    await connection.close();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: 0,
        message: "Movie with the given ID not found"
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
