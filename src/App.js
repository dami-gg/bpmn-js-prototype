import React, { Component } from "react";

import Viewer from "./components/viewer/Viewer";
import Modeler from "./components/modeler/Modeler";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "./app.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__header__title">BPMN workflows prototype</h1>
        </header>
        
        <Tabs>
          <TabList>
            <Tab>Viewer</Tab>
            <Tab>Modeler</Tab>
          </TabList>
          <TabPanel>
            <Viewer />
          </TabPanel>
          <TabPanel>
            <Modeler />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default App;
