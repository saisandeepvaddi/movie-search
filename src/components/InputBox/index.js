import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Input = styled.input`
  color: #dba717;
  background: #222831;
  border: 1px solid #707070;
  &:focus {
    color: #dba717;
    background: #222831;
  }
  &::placeholder {
    font-family: cursive;
  }
`;

const InputBox = ({ onInputChange }) => {
  return (
    <Input
      type="text"
      className="movie-input form-control"
      placeholder="Search for a movie here"
      onChange={e => onInputChange(e.target.value)}
      aria-label="Movie input box"
      aria-describedby="Enter movie name here"
    />
  );
};

InputBox.propTypes = {
  onInputChange: PropTypes.func.isRequired
};

export default InputBox;
