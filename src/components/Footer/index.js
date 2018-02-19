import React from "react";
import styled from "styled-components";

const TopContainer = styled.div`
  display: flex;
  font-family: "Acme", sans-serif;
  flex: 1;
  padding-left: 1em;
  padding-right: 1em;
  justify-content: space-between;
  align-items: center;
  color: #dba717;
  background: #222831;
  min-height: 5em;
`;

const Link = styled.a`
  color: #dba717;
  font-family: "Acme", sans-serif;
  &:hover,
  &:active {
    color: #dba717;
    text-decoration: none;
    border-bottom: 1px solid #dba717;
  }
`;

const Footer = () => {
  return (
    <TopContainer>
      <div>
        <Link href="https://github.com/saisandeepvaddi" target="_blank">
          MIT
        </Link>
      </div>
      <div>
        Made with{" "}
        <span role="img" aria-labelledby="Red heart emoji">
          ❤️
        </span>{" "}
        by{" "}
        <Link href="https://github.com/saisandeepvaddi" target="_blank">
          @saisandeepvaddi
        </Link>
      </div>
      <div>
        <Link
          href="https://github.com/saisandeepvaddi/movie-search"
          target="_blank"
        >
          Github
        </Link>
      </div>
    </TopContainer>
  );
};

export default Footer;
