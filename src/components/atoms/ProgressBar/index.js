import { LinearProgress } from "@mui/material";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const ProgressBar = ({
   height = 10,
   className,
   primaryColor,
   secondaryColor,
    backgroundColor,
   ...props
 }) => {
  return (
    <LinearProgress
      sx={{
        height,
        borderRadius: 20,
        backgroundColor: backgroundColor || 'primary',
        "span": {
          background: `linear-gradient(90deg, ${secondaryColor} 0%, ${primaryColor} 100%) !important`,
        },
      }}
      className={clsx(className)}
      variant={"determinate"}
      {...props}
    />
  );
};

ProgressBar.defaultProps = {
  className: "",
  thin: false,
  secondaryColor: "rgba(216, 255, 143, 1)",
  primaryColor: "rgba(134, 241, 196, 1)",
};

ProgressBar.propTypes = {
  thin: PropTypes.bool,
  className: PropTypes.string,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
};

export default ProgressBar;