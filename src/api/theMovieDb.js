import axios from "axios";
import { theMovieDbApiKey } from "./apiKeys";

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${theMovieDbApiKey}`,
  },
});

