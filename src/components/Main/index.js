import React, { Component } from "react";
import styled from "styled-components";
import Title from "../Title";
import InputBox from "../InputBox";

const TopContainer = styled.div`
  background: #393e46;
  min-height: 100vh;
`;



class Main extends Component {
  state = {
    searchTerm: ""
  }

  onInputChange = (value) => {
    this.setState(() => ({
      searchTerm: value
    }))
  }

  render() {
    return (
      <TopContainer>
        <Title />
        <div className="container">
          <InputBox onInputChange={(value) => this.onInputChange(value)} />
        </div>
      </TopContainer>
    );
  }
}

export default Main;
