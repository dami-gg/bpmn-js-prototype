import React, { PureComponent } from "react";
import fileDownload from "js-file-download";

import FileUploader from "../file-uploader/FileUploader";

import { openDiagram } from "../../helpers/bpmn.helpers";

import "./modeler.css";

const BpmnModeler = require("bpmn-js/lib/Modeler");
const propertiesPanelModule = require("bpmn-js-properties-panel");
const propertiesPanelBpmnProvider = require("bpmn-js-properties-panel/lib/provider/bpmn");
const camundaModdleDescriptor = require("camunda-bpmn-moddle/resources/camunda");

class Modeler extends PureComponent {
  constructor(props) {
    super(props);
    this.canvasId = "modeler-canvas";
    this.propertiesCanvasId = "properties-canvas";

    this.uploadDiagram = this.uploadDiagram.bind(this);
    this.exportXml = this.exportXml.bind(this);
    this.exportSvg = this.exportSvg.bind(this);
  }

  render() {
    return (
      <div className="modeler">
        <div className="modeler__uploader">
          <FileUploader onLoad={this.uploadDiagram} />
        </div>
        <div className="modeler__container">
          <div id={this.canvasId} className="modeler__container__canvas" />
          <div
            id={this.propertiesCanvasId}
            className="modeler__container__panel"
          />
        </div>
        <div className="modeler__container__buttons">
          <button
            className="modeler__container__button modeler__container__button--xml"
            onClick={this.exportXml}>
            Export as XML
          </button>
          <button
            className="modeler__container__button modeler__container__button--svg"
            onClick={this.exportSvg}>
            Export as SVG
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.modeler = new BpmnModeler({
      container: `#${this.canvasId}`,
      propertiesPanel: {
        parent: `#${this.propertiesCanvasId}`
      },
      additionalModules: [propertiesPanelModule, propertiesPanelBpmnProvider],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    });
  }

  uploadDiagram(diagramXml) {
    openDiagram(this.modeler, diagramXml);
  }

  exportXml() {
    this.modeler.saveXML({ format: true }, (err, xml) =>
      fileDownload(xml, "diagram.bpmn", "application/xml")
    );
  }

  exportSvg() {
    this.modeler.saveSVG((err, svg) =>
      fileDownload(svg, "diagram.svg", "image/svg+xml")
    );
  }
}

export default Modeler;
