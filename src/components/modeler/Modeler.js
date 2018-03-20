import React, { PureComponent } from "react";

import FileUploader from "../file-uploader/FileUploader";

import { openDiagram } from "../../helpers/bpmn.helpers";

import "./modeler.css";

const BpmnModeler = require("bpmn-js/lib/Modeler");
const propertiesPanelModule = require("bpmn-js-properties-panel");
const propertiesPanelBpmnProvider = require("bpmn-js-properties-panel/lib/provider/bpmn");

class Modeler extends PureComponent {
  constructor(props) {
    super(props);
    this.canvasId = "modeler-canvas";
    this.propertiesCanvasId = "properties-canvas";

    this.uploadDiagram = this.uploadDiagram.bind(this);
  }

  render() {
    return (
      <div className="modeler">
        <div className="modeler__uploader">
          <FileUploader onLoad={this.uploadDiagram} />
        </div>
        <div id={this.propertiesCanvasId} className="modeler__properties" />
        <div id={this.canvasId} className="modeler__container" />
      </div>
    );
  }

  componentDidMount() {
    this.modeler = new BpmnModeler({
      container: `#${this.canvasId}`,
      propertiesPanel: {
        parent: `#${this.propertiesCanvasId}`
      },
      additionalModules: [propertiesPanelModule, propertiesPanelBpmnProvider]
    });
  }

  uploadDiagram(diagramXml) {
    openDiagram(this.modeler, diagramXml);
  }
}

export default Modeler;
