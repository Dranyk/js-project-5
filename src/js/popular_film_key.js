import axios from "axios";

export class MovieApiService {

async axiosApiMovie(currentPage) {
  const API_KEY = "36c444871f3c4ccb3f8770d789f46dd7";
  const BASE_URL = 'https://api.themoviedb.org';
  const URL = `${BASE_URL}/3/trending/movie/day?api_key=${API_KEY}&page=${currentPage}`

    return await axios.get(URL).then(response => {
      console.log("response.data",response.data.results);
      return response;
    });
  };
};