import {
  observable,
  action,
  autorun,
  runInAction,
  autorunAsync,
  transaction
} from "mobx";
import remotedev from "mobx-remotedev/lib/dev";
import { getMovieDetails } from "./api";
import throttle from "lodash/throttle";

const store = observable({
  movieName: "",
  movies: [],
  loading: false,
  message: "",
  onInputChange: action(async function(movie) {
    this.movies = [];

    // Do not fetch if movie name is empty
    if (movie === "") {
      this.loading = false;
      return;
    }

    const moviesWithDetails = await getMovieDetails(movie);
    console.log(moviesWithDetails);
    runInAction(() => {
      if (moviesWithDetails.length === 0) {
        this.message = "No Movies Found";
      }

      this.movies = moviesWithDetails;
      // this.loading = true;
      this.movieName = movie;
    });
  })
});

autorun(() => {
  console.log(`Loading: ${store.loading}`);
}, 100);

export default remotedev(store);

window.store = store;
