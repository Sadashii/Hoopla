import { Tooltip as MUITooltip } from "@mui/material";
import clsx from "clsx";
import { FlexBox } from "../index";
import styles from "./styles.module.scss";

const Tooltip = ({
  title,
  shortcut,
  children,
  icon = false,
  hoverLight = false
}) => {
  if (icon && !title) {
    return (
      <FlexBox align justify className={clsx(styles.iconButton,
        hoverLight ? styles.hoverLight : styles.hoverDark)}>
        {children}
      </FlexBox>
    );
  }
  
  return (
    <MUITooltip title={title}>
      {icon ? (
        <FlexBox align justify className={clsx(styles.iconButton,
          hoverLight ? styles.hoverLight : styles.hoverDark)}>
          {children}
        </FlexBox>
      ) : (
        <>
          {children}
        </>
      )}
    </MUITooltip>
  );
};

export default Tooltip;