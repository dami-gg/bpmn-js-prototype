import React, { Component } from "react";

import Viewer from "./components/viewer/Viewer";
import Modeler from "./components/modeler/Modeler";

import "./app.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__header__title">BPMN modeler prototype</h1>
        </header>
        <div className="app__sections">
          <Viewer />
          <Modeler />
        </div>
      </div>
    );
  }
}

export default App;
