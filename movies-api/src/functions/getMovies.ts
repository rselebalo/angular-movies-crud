import { Movie } from "../db/entity/movie";
import { connectToDatabase } from "../db/connection";

export const handler = async () => {
  try {
    const connection = await connectToDatabase();

    const movies = await connection.getRepository(Movie).find();
    await connection.close();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: 1,
        movies
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: 0,
        message: error
      })
    };
  }
};
