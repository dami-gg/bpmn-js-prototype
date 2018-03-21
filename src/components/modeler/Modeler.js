import React, { Component, Fragment } from "react";
import fileDownload from "js-file-download";

import FileUploader from "../file-uploader/FileUploader";

import { openDiagram } from "../../helpers/bpmn.helpers";

import { NEW_DIAGRAM_XML } from "./modeler.constants";

import "./modeler.css";

const BpmnModeler = require("bpmn-js/lib/Modeler");
const propertiesPanelModule = require("bpmn-js-properties-panel");
const propertiesPanelBpmnProvider = require("bpmn-js-properties-panel/lib/provider/bpmn");
const camundaModdleDescriptor = require("camunda-bpmn-moddle/resources/camunda");

class Modeler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      error: false
    };

    this.canvasId = "modeler-canvas";
    this.propertiesCanvasId = "properties-canvas";

    this.createNewDiagram = this.createNewDiagram.bind(this);
    this.uploadDiagram = this.uploadDiagram.bind(this);
    this.exportXml = this.exportXml.bind(this);
    this.exportSvg = this.exportSvg.bind(this);
  }

  render() {
    return (
      <div className="modeler">
        <div className="modeler__buttons modeler__buttons--top">
          <button
            className="modeler__button modeler__button--create"
            onClick={this.createNewDiagram}>
            Create new diagram
          </button>
          <div className="modeler__button modeler__uploader">
            <FileUploader onLoad={this.uploadDiagram} />
          </div>
        </div>

        <div className={`modeler__container ${this.state.error ? "modeler__container--error" : ""}`}>
          {this.state.error ? (
            <h1 className="error-message">
              Could not import the selected BPMN 2.0 diagram
            </h1>
          ) : (
            <Fragment>
              <div
                id={this.canvasId}
                className={`modeler__container__canvas${
                  this.state.loaded ? "--loaded" : "--empty"
                }`}
              />
              <div
                id={this.propertiesCanvasId}
                className="modeler__container__panel"
              />
            </Fragment>
          )}
        </div>

        <div className="modeler__buttons modeler__buttons--bottom">
          <button
            className="modeler__button modeler__button--xml"
            onClick={this.exportXml}>
            Export as XML
          </button>
          <button
            className="modeler__button modeler__button--svg"
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

  async createNewDiagram() {
    try {
      await openDiagram(this.modeler, NEW_DIAGRAM_XML);
      this.setState({ loaded: true });
    } catch (err) {
      this.setState({ error: true });
    }
  }

  async uploadDiagram(diagramXml) {
    try {
      await openDiagram(this.modeler, diagramXml);
      this.setState({ loaded: true });
    } catch (err) {
      this.setState({ error: true });
    }
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
