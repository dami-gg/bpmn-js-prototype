import React, { PureComponent } from "react";
import BpmnViewer from "bpmn-js";

import { openDiagram } from "./viewer.helpers";

import "./viewer.css";

class Viewer extends PureComponent {
  constructor() {
    super();
    this.viewer = new BpmnViewer();
    this.containerId = "diagram-container";

    this.uploadDiagram = this.uploadDiagram.bind(this);
  }

  render() {
    return (
      <div className="viewer">
        <div className="viewer__uploader">
          <label
            htmlFor="viewer__uploader__input"
            className="viewer__uploader__label">
            Upload diagram
          </label>
          <input
            type="file"
            className="viewer__uploader__input"
            onChange={this.uploadDiagram}
          />
        </div>
        <div id={this.containerId} className="viewer__container" />
      </div>
    );
  }

  componentDidMount() {
    this.viewer.attachTo("#" + this.containerId);
  }

  uploadDiagram(event) {
    event.persist();
    const input = event.target;

    const reader = new FileReader();
    reader.onload = () => {
      openDiagram(this.viewer, reader.result);
    };
    reader.readAsText(input.files[0]);
  }
}

export default Viewer;
