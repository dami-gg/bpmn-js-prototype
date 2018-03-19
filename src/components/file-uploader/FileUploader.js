import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";

import "./file-uploader.css";

class FileUploader extends PureComponent {
  constructor() {
    super();
    this.readFile = this.readFile.bind(this);
  }

  render() {
    return (
      <Fragment>
        <label htmlFor="file-uploader__input" className="file-uploader__label">
          Upload diagram
        </label>
        <input
          type="file"
          className="file-uploader__input"
          onChange={this.readFile}
        />
      </Fragment>
    );
  }

  readFile(event) {
    event.persist();
    const input = event.target;

    const reader = new FileReader();
    reader.onload = () => {
      this.props.onLoad(reader.result);
    };
    reader.readAsText(input.files[0]);
  }
}

FileUploader.propTypes = {
  onLoad: PropTypes.func
};

export default FileUploader;
