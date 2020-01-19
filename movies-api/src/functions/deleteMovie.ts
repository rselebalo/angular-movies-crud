import { Movie } from "../db/entity/movie";
import { connectToDatabase } from "../db/connection";

export const handler = async (req: any) => {
  try {
    const { id } = req.pathParameters;
    const connection = await connectToDatabase();

    // delete record and close connection
    await connection.getRepository(Movie).delete({ id });
    await connection.close();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: 1,
        message: "Success"
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: 0, message: error.message })
    };
  }
};
