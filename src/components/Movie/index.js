import React, { Component } from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";

const TopContainer = styled.div`
  display: flex;
  padding-bottom: 2em;
  padding-top: 1em;
  flex: 1;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  padding-bottom: 2em;
  padding-top: 1em;
  flex: 1;
  flex-direction: row;
`;

const PosterContainer = styled.div`
  flex: 1;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #eeeeee;
  margin-left: 2em;
  flex: 3;
  & > * {
    display: flex;
    flex-direction: row;
  }
`;

const Title = styled.h3`
  font-family: "Acme", sans-serif;
  color: #dba717;
`;

const Rating = styled.div`
  padding-bottom: 1em;
`;
const Plot = styled.div`
  padding-bottom: 1em;
`;
const Links = styled.div`
  padding-top: 1em;
`;

const SideHeading = styled.div`
  min-width: 5em;
`;

const IMDBLink = styled.a`
  font-family: "Acme", sans-serif;
  color: #dba717;
  margin-right: 1em;
  padding-bottom: 2px;
  &:hover,
  &:active {
    color: #dba717;
    text-decoration: none;
    border-bottom: 1px solid #dba717;
  }
`;

const RTLink = styled.a`
  margin-left: 1em;
  font-family: "Acme", sans-serif;
  color: #ff6347;
  padding-bottom: 2px;
  &:hover,
  &:active {
    color: #ff6347;
    border-bottom: 1px solid #ff6347;
    text-decoration: none;
  }
`;

const MobilePlotLink = styled.div`
  font-family: "Acme", sans-serif;
  color: #3a9425;
  & > span {
    color: #3a9425;
    margin-bottom: 2px;
    border-bottom: 1px solid #3a9425;
  }
`;

const MobilePlot = styled.div`
  max-height: 10em;
  color: #eeeeee;
  background: #222831;
  overflow: auto;
  size: 1em;
  & > div {
    border: 1px solid #707070;
    padding: 1em;
  }
`;

const Image = styled.img`
  margin-right: 1em;
  max-height: 250px;
  max-width: 160px;
  @media (max-width: 768px) {
    max-height: 170px;
    max-width: 100px;
  }
`;

class Movie extends Component {
  state = {
    collapsePlot: false
  };
  render() {
    const { movie } = this.props;
    let poster =
      movie.Poster === "N/A" ? (
        <Image
          src="http://via.placeholder.com/170x250?text=Poster+N/A"
          className="figure-img img-fluid"
          alt={movie.Title}
        />
      ) : (
        <Image src={movie.Poster} alt={movie.Title} />
      );
    let imdbURL = `http://www.imdb.com/title/${movie.imdbID}/`;
    return (
      <TopContainer>
        <Container>
          <PosterContainer>{poster}</PosterContainer>
          <InfoContainer>
            <Title>{movie.Title}</Title>
            <Rating className="text-left">
              <SideHeading>Rating</SideHeading>
              <div>{movie.imdbRating || `N/A`} </div>
            </Rating>
            <MediaQuery maxWidth={768}>
              {matches =>
                matches ? (
                  <MobilePlotLink
                    onClick={() =>
                      this.setState(prevState => ({
                        collapsePlot: !prevState.collapsePlot
                      }))
                    }
                  >
                    <span>View Plot</span>
                  </MobilePlotLink>
                ) : (
                  <Plot className="text-left">
                    <SideHeading>Plot</SideHeading>
                    <div>{movie.Plot}</div>
                  </Plot>
                )
              }
            </MediaQuery>

            <Links>
              <IMDBLink href={imdbURL} target="_blank">
                IMDb
              </IMDBLink>
              <RTLink href={movie.tomatoURL} target="_blank">
                {movie.tomatoURL !== "N/A" && <div>Rotten Tomatoes</div>}
              </RTLink>
            </Links>
          </InfoContainer>
        </Container>
        <MobilePlot>
          {this.state.collapsePlot && (
            <div className="text-left">{movie.Plot}</div>
          )}
        </MobilePlot>
      </TopContainer>
    );
  }
}

export default Movie;
