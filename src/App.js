import React, { Component } from "react";
import Main from "./components/Main";
import "./App.css";
import store from "./store";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main store={store} />
      </div>
    );
  }
}

export default App;
