import { getMovieIds, getMovieDetails } from "./api";
import fetchMock from "fetch-mock";

const dummyMovieIds = [{ id: 1 }, { id: 2 }];

describe("Api Testing", () => {
  it("getMovieIds should fetch array of ids", async () => {
    const url = `https://www.omdbapi.com/?apikey=${
      process.env.REACT_APP_API_KEY
    }&s=asdf`;

    fetchMock.getOnce(url, {
      status: 200,
      body: dummyMovieIds
    });

    await expect(getMovieIds("asdf")).resolves.toEqual([]);
  });
});
