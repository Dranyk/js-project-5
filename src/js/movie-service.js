import axios from "axios";

export default class MovieApiService {
    #api_key = 'a1735b4b403b356dec5f0993d9adcd8f';
    #url = 'https://api.themoviedb.org';
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.idMovie = '';
    } 
    
    async fetchMovie() {
      const { data } = await axios.get(`${this.#url}/3/trending/movie/day?api_key=${this.#api_key}`);
        // console.log("response.data",response.data.results);
        // console.log(data);
        return data;
    };
    

    async fetchMovieByQuery() {                
        const { data } = await axios.get(`${this.#url}/3/search/movie?api_key=${this.#api_key}&query=${this.searchQuery}&page=${this.page}`); 
        this.page += 1;
        return data;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }  
    
    async fetchGenres() {
        return await axios.get(`${this.#url}/3/genre/movie/list?api_key=${this.#api_key}`).then(response => {
            return response.data;
        });        
    }
    get id() {
        return this.idMovie;
      }
    set id(newIdMovie) {
        this.idMovie = newIdMovie;
      }
    
    async fetchDetails() {
        return await axios
          .get(
            `${this.#url}/3/movie/${this.idMovie}?api_key=${
              this.#api_key
            }&language=en-US`
          )
          }
    
}