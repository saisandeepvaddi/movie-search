import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Movie from "../Movie";

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hr = styled.hr`
  background-color: #777;
`;

const MovieGrid = ({ movies }) => {
  return (
    <TopContainer>
      {movies.map((movie, i) => {
        return (
          <div>
            {i > 0 ? <Hr /> : null}
            <Movie key={i} movie={movie} />
          </div>
        );
      })}
    </TopContainer>
  );
};

MovieGrid.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MovieGrid;
