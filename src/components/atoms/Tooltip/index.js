import { Tooltip as MUITooltip } from "@mui/material";
import { FlexBox } from "../index";
import styles from "./styles.module.scss";

const Tooltip = ({ title, shortcut, children, icon=false}) => {
  if (icon && !title) {
    return (
      <FlexBox align justify className={styles.iconButton}>
        {children}
      </FlexBox>
    )
  }
  
  return (
    <MUITooltip title={title}>
      {icon ? (
        <FlexBox align justify className={styles.iconButton}>
          {children}
        </FlexBox>
      ) : (
        <>
          {children}
        </>
      )}
    </MUITooltip>
  )
}

export default Tooltip;