import { Movie } from "../db/entity/movie";
import { connectToDatabase } from "../db/connection";

export const handler = async (req: any) => {
  try {
    const { id } = req.pathParameters;
    const connection = await connectToDatabase();

    const movie = await connection.getRepository(Movie).findOne({ id });
    await connection.close();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: 1,
        movie
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
