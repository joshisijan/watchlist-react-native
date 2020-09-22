import axios from "axios";
import { theMovieDbApiKey } from "./apiKeys";

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${theMovieDbApiKey}`,
    'Content-Type' : 'application/json;charset=utf-8',
  },
});

export const imageUrl = 'https://image.tmdb.org/t/p/w500';

