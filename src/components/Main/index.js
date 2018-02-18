import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Title from "../Title";
import InputBox from "../InputBox";
import { getMovieDetails } from "../../api";
import throttle from "lodash/throttle";
import { DotScale } from "styled-loaders-react";

const TopContainer = styled.div`
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
        movies: []
      });
      return;
    }
    this.setState({
      movies: [],
      loading: true
    });
    const movies = await getMovieDetails(movie);
    this.setState({
      movies,
      loading: false
    });
  }

  onInputChange(movie) {
    // console.log("Movie: ", movie);
    this.fetchMovies(movie);
  }

  render() {
    const { loading, movie } = this.state;
    return (
      <TopContainer>
        <Title />
        {/* Bootstrap container */}
        <div className="container">
          {/* pass mobx store to inputbox */}
          <InputBox onInputChange={this.onInputChange} />
          {loading && <DotScale color="#00ADB5" />}
        </div>
      </TopContainer>
    );
  }
}

Main.propTypes = {
  // store: PropTypes.object.isRequired
};

export default Main;
