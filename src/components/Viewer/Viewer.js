import React, { PureComponent } from "react";
import BpmnViewer from "bpmn-js";

import FileUploader from "../file-uploader/FileUploader";

import { openDiagram } from "./viewer.helpers";

import "./viewer.css";

class Viewer extends PureComponent {
  constructor(props) {
    super(props);
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
        <div id={this.containerId} className="viewer__container" />
      </div>
    );
  }

  componentDidMount() {
    this.viewer.attachTo("#" + this.containerId);
  }

  showDiagram(diagramXml) {
    openDiagram(this.viewer, diagramXml);
  }
}

export default Viewer;
