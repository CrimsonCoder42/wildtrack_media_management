import React from "react";
import PropTypes from "prop-types";

function Image({ image }) {
  return (
    <div>
      <img alt="" src={image.src} />
    </div>
  );
}

Image.propTypes = {
  image: PropTypes.img,
};

export default Image;
