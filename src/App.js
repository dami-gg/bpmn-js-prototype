import React, { Component } from "react";

import Viewer from "./components/viewer/Viewer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BPMN modeler prototype</h1>
        </header>
        <Viewer />
      </div>
    );
  }
}

export default App;
