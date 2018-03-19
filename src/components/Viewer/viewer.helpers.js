/**
 * Open diagram in our viewer instance.
 *
 * @param {Object} bpmnViewer container to attach the diagram to
 * @param {String} bpmnXML diagram to display
 */
const openDiagram = (bpmnViewer, bpmnXML) => {
  bpmnViewer.importXML(bpmnXML, err => {
    if (err) {
      return console.error("could not import BPMN 2.0 diagram", err);
    }
    // access viewer components
    const canvas = bpmnViewer.get("canvas");
    const overlays = bpmnViewer.get("overlays");
    // zoom to fit full viewport
    canvas.zoom("fit-viewport");
    // attach an overlay to a node
    overlays.add("SCAN_OK", "note", {
      position: {
        bottom: 0,
        right: 0
      },
      html: '<div class="diagram-note">Mixed up the labels?</div>'
    });
    // add marker
    canvas.addMarker("SCAN_OK", "needs-discussion");
  });
};

module.exports = {
  openDiagram
};
