import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Title from "../Title";
import InputBox from "../InputBox";
import { observer } from "mobx-react";
import throttle from "lodash/throttle";

const TopContainer = styled.div`
  background: #393e46;
  min-height: 100vh;
`;

const Main = ({ store }) => {
  const { loading } = store;
  return (
    <TopContainer>
      <Title />
      {/* Bootstrap container */}
      <div className="container">
        {loading && <h2>Searching for movies</h2>}
        {/* pass mobx store to inputbox */}
        <InputBox store={store} />
      </div>
    </TopContainer>
  );
};

Main.propTypes = {
  store: PropTypes.object.isRequired
};

export default observer(Main);
