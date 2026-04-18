import {Client, Databases, ID, Query} from "appwrite";

import {APPWRITE_CONFIG} from "../constants/appwrite";
import {TMDB_IMAGE_BASE_URL} from "../constants/images";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(APPWRITE_CONFIG.PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await database.listDocuments(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.TABLE_ID,
      [Query.equal("searchTerm", searchTerm)],
    );

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.TABLE_ID,
        doc.$id,
        {
          count: doc.count + 1,
        },
      );
    } else {
      await database.createDocument(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.TABLE_ID,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          movie_title: movie.title,
          poster_url: `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`,
        },
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.TABLE_ID,
      [Query.limit(5), Query.orderDesc("count")],
    );

    return result.documents;
  } catch (error) {
    console.error(error);
  }
};
