import { getPartialResults } from "partial-promises";

export const getMovieIds = async movieName => {
  let url = encodeURI(
    `https://www.omdbapi.com/?apikey=${
      process.env.REACT_APP_API_KEY
    }&s=${movieName}`
  );

  let rawDataPromiseFromUrl = fetch(url).then(res => res.json());

  const rawDataFromUrl = await getPartialResults([rawDataPromiseFromUrl], {
    time: 2000,
    filter: true
  });

  const data = rawDataFromUrl[0];

  let ids =
    data.Response === "True" ? data.Search.map(movie => movie.imdbID) : [];

  return ids;
};

export const getMovieDetails = async movieName => {
  let ids = await getMovieIds(movieName);

  // Return emptry array if no results
  if (ids.length === 0) {
    return [];
  }

  const movieUrlsWithIds = ids.map(id => {
    return encodeURI(
      `https://www.omdbapi.com/?apikey=${
        process.env.REACT_APP_API_KEY
      }&i=${id}&plot=full&tomatoes=true`
    );
  });

  const moviePromises = movieUrlsWithIds.map(url => {
    return fetch(url).then(res => res.json());
  });

  // Use partial-promises to filter out anything that isn't resolved within 4 seconds
  const movies = await getPartialResults(moviePromises, {
    time: 4000,
    filter: true
  });

  return movies || [];
};
