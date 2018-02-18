import React, { Component } from "react";
import throttle from "lodash/throttle";
import styled from "styled-components";
import { DotScale } from "styled-loaders-react";
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
    this.setState({ message: "" });
    this.fetchMovies(movie);
  }

  render() {
    const { loading } = this.state;
    return (
      <TopMostContainer>
        <Title />
        {/* Bootstrap container */}
        <Container className="container">
          {/* pass mobx store to inputbox */}
          <InputBox onInputChange={this.onInputChange} />
          {loading ? (
            <DotScale color="#00ADB5" />
          ) : (
            <MovieGrid movies={this.state.movies} />
          )}
          {this.state.message}
        </Container>
        <Footer />
      </TopMostContainer>
    );
  }
}

export default Main;
