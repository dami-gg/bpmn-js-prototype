import React, { PureComponent } from "react";
import BpmnModeler from "bpmn-js";

import FileUploader from "../file-uploader/FileUploader";

import { openDiagram } from "../viewer/viewer.helpers";

import "./modeler.css";

class Modeler extends PureComponent {
  constructor(props) {
    super(props);
    this.modeler = new BpmnModeler();
    this.containerId = "diagram-container--modeler";

    this.uploadDiagram = this.uploadDiagram.bind(this);
  }

  render() {
    return (
      <div className="modeler">
        <div className="modeler__uploader">
          <FileUploader onLoad={this.uploadDiagram} />
        </div>
        <div id={this.containerId} className="modeler__container" />
      </div>
    );
  }

  componentDidMount() {
    this.modeler.attachTo("#" + this.containerId);
  }

  uploadDiagram(diagramXml) {
    openDiagram(this.modeler, diagramXml);
  }
}

export default Modeler;
