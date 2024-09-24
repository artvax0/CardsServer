import connectToLocalDb from "./mongodb/connectToMongodbLocally.js";
import connectToAtlasDb from "./mongodb/connectToAtlas.js";
import config from "config";

const environment = config.get('ENVIRONMENT');

const connectToDb = async () => {
  if (environment === "development") {
    await connectToLocalDb();
  } else if (environment === "production") {
    await connectToAtlasDb();
  }
}

export default connectToDb;