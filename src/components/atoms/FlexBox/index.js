import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles.module.scss"

const FlexBox = ({
     justify,
     justifyBetween,
     justifyEnd,
     align,
     alignEnd,
     column,
     className,
     noShrink,
     fullWidth,
     ...props
   }) => {
  const columnCN = column && styles.column;
  
  const justifyCN = justify && styles.justifyCenter
  const justifyBetweenCN = justifyBetween && styles.justifyBetween
  const justifyEndCN = justifyEnd && styles.justifyEnd
  
  const alignCN = align && styles.alignCenter
  const alignEndCN = alignEnd && styles.alignEnd
  const fullWidthCN = fullWidth && styles.fullWidth
  const noShrinkCN = noShrink && styles.noShrink
  const fullCN = `${styles.flexbox} ${fullWidthCN} ${columnCN} ${justifyCN} ${alignCN} ${justifyBetweenCN} ${justifyEndCN} ${alignEndCN} ${noShrinkCN} ${className}`;
  
  return <div className={fullCN} {...props} />;
};

FlexBox.propTypes = {
  className: PropTypes.string,
  column: PropTypes.bool,
  justify: PropTypes.bool,
  align: PropTypes.bool,
  noShrink: PropTypes.bool,
  justifyBetween: PropTypes.bool,
  fullWidth: PropTypes.bool,
  justifyEnd: PropTypes.bool,
  alignEnd: PropTypes.bool,
};

FlexBox.defaultProps = {
  className: '',
  column: false,
  justify: false,
  align: false,
  noShrink: false,
  justifyBetween: false,
  fullWidth: false,
  justifyEnd: false,
  alignEnd: false,
};

export default FlexBox;