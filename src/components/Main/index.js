import React, { Component } from "react";
import throttle from "lodash/throttle";
import styled from "styled-components";
import Title from "../Title";
import InputBox from "../InputBox";
import MovieGrid from "../MovieGrid";
import Footer from "../Footer";
import { getMovieDetails } from "../../api";

const Container = styled.div`
  min-height: calc(100vh - 11em);
`;

const TopMostContainer = styled.div`
  background: #393e46;
  min-height: 100vh;
`;

const Message = styled.h2`
  font-family: "Acme", sans-serif;
  color: #dba717;
  padding: 1em;
  width: 50%;
  margin: 0 auto;
  font-weight: 600;
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: "",
      loading: false,
      movies: []
    };
    this.fetchMovies = throttle(this.fetchMovies.bind(this), 2000, {
      leading: false,
      trailing: true
    });
    this.onInputChange = this.onInputChange.bind(this);
  }

  async fetchMovies(movie) {
    if (movie === "") {
      this.setState({
        loading: false,
        movies: [],
        message: ""
      });
      return;
    }
    this.setState({
      movies: [],
      loading: true,
      message: ""
    });
    const movies = await getMovieDetails(movie);
    this.setState({
      movies,
      loading: false,
      message: movies.length === 0 ? "No Movies found" : ""
    });
  }

  onInputChange(movie) {
    if (movie === "") {
      this.setState({
        movies: [],
        message: "",
        loading: false
      });
    }
    this.setState({ message: "", loading: false });
    this.fetchMovies(movie);
  }

  render() {
    const { loading } = this.state;
    return (
      <TopMostContainer>
        <Title />
        {/* Bootstrap container */}
        <Container className="container">
          <InputBox onInputChange={this.onInputChange} />
          {loading ? (
            <Message>Fetching Movies...</Message>
          ) : (
            <MovieGrid movies={this.state.movies} />
          )}
          <Message>{this.state.message}</Message>
        </Container>
        <Footer />
      </TopMostContainer>
    );
  }
}

export default Main;
