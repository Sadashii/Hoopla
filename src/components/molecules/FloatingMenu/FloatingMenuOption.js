import { MenuItem } from "@mui/material";
import clsx from "clsx";
import React, { forwardRef } from "react";
import { FlexBox } from "../../atoms";
import styles from "./styles.module.scss";

const FloatingMenuOption = forwardRef(({
  icon,
  title,
  expandIcon,
  onClick,
  ...props
}) => {
  
  return (
    <MenuItem
      disableRipple
      className={clsx(styles.menuOption)}
      onClick={onClick}
      {...props}>
      <FlexBox fullWidth align justifyBetween>
        <FlexBox align className={styles.menuOptionTitle}>
          {icon}
          {title}
        </FlexBox>
        <FlexBox align className={styles.menuOptionRight}>
          {expandIcon}
        </FlexBox>
      </FlexBox>
    </MenuItem>
  );
});

export default FloatingMenuOption;