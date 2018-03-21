import React, { Component } from "react";
import BpmnViewer from "bpmn-js";

import FileUploader from "../file-uploader/FileUploader";

import { openDiagram } from "../../helpers/bpmn.helpers";

import "./viewer.css";

class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      error: false
    };

    this.viewer = new BpmnViewer();
    this.containerId = "diagram-container--viewer";

    this.showDiagram = this.showDiagram.bind(this);
  }

  render() {
    return (
      <div className="viewer">
        <div className="viewer__uploader">
          <FileUploader onLoad={this.showDiagram} />
        </div>
        <div
          id={this.containerId}
          className={`viewer__container ${
            this.state.error ? "viewer__container--error" : ""
          }`}>
          {this.state.error ? (
            <h1 className="error-message">
              Could not import the selected BPMN 2.0 diagram
            </h1>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.viewer.attachTo("#" + this.containerId);
  }

  async showDiagram(diagramXml) {
    try {
      await openDiagram(this.viewer, diagramXml);
      this.setState({ loaded: true });
    } catch (err) {
      this.setState({ error: true });
    }
  }
}

export default Viewer;
