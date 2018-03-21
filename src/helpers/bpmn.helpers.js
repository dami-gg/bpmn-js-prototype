/**
 * Open diagram in our viewer instance.
 *
 * @param {Object} bpmnContainer container to attach the diagram to
 * @param {String} bpmnXML diagram to display
 */
const openDiagram = (bpmnContainer, bpmnXML) =>
  new Promise((resolve, reject) => {
    bpmnContainer.importXML(
      bpmnXML,
      err => (err ? reject(new Error(err)) : resolve())
    );
  });

module.exports = {
  openDiagram
};
