import { observable, action, autorun } from "mobx";
import remotedev from "mobx-remotedev";

const store = observable({
  movieName: "",
  movies: [],
  loading: false,
  onInputChange: action(function(movie) {
    this.movieName = movie;
  })
});

autorun(() => {
  console.log(`Movie: ${store.movieName}`);
});

export default remotedev(store);

window.store = remotedev(store);
