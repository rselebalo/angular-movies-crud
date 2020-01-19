import "reflect-metadata";
import {
  createConnection,
  Connection,
  ConnectionManager,
  getConnectionManager
} from "typeorm";
import { Movie } from "./entity/movie";

export const connectToDatabase = async () => {
  try {
    let connection: Connection;
    const connectionManager: ConnectionManager = getConnectionManager();

    if (connectionManager.has(`${process.env.DEFAULT_DB_CONNECTION}`)) {
      console.log("=> using existing database connection");
      connection = await connectionManager.get("default");
      return Promise.resolve(connection);
    }

    console.log("=> using new database connection");

    connection = await createConnection({
      synchronize: true,
      logging: false,
      type: "postgres",
      entities: [Movie],
      url: process.env.CONNECTION_URL
    });

    console.log("Connected...");

    // run migrations
    await connection.runMigrations();
    return Promise.resolve(connection);
  } catch (error) {
    // If AlreadyHasActiveConnectionError occurs, return already existent connection
    if (error.name === "AlreadyHasActiveConnectionError") {
      const existentConn = getConnectionManager().get("default");
      return Promise.resolve(existentConn);
    }
    return Promise.reject();
  }
};
