import axios from "axios";

export class MovieApiService {
  // constructor({ per_page = 20 } = {}) {
  //   this.per_page = per_page;
  //           this.page = current_page;

  // }

async axiosApiMovie(page) {
  const API_KEY = "36c444871f3c4ccb3f8770d789f46dd7";
  const BASE_URL = 'https://api.themoviedb.org';
  const URL = `${BASE_URL}/3/trending/movie/day?api_key=${API_KEY}&page=${page}`

    return await axios.get(URL).then(response => {
      console.log("response.data",response.data.results);
      return response;
    });
  };
};