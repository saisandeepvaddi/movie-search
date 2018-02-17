import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

const Input = styled.input`
  background: #222831;
  border: 1px solid #707070;
  &:focus {
    background: #222831;
  }
  &::placeholder {
    font-family: cursive;
  }
`;

const InputBox = ({ store }) => {
  return (
    <Input
      type="text"
      className="form-control"
      placeholder="Search for a movie here"
      onChange={e => {
        store.onInputChange(e.target.value);
      }}
      aria-label="Movie input box"
      aria-describedby="Enter movie name here"
    />
  );
};

InputBox.propTypes = {
  store: PropTypes.object.isRequired
};

export default observer(InputBox);
