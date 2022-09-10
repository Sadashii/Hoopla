import { IconButton, Tooltip as MUITooltip } from "@mui/material";

const Tooltip = ({ title, shortcut, children, icon=false}) => {
  
  return (
    <MUITooltip title={title}>
      {icon ? (
        <IconButton>
          {children}
        </IconButton>
      ) : (
        <>
          {children}
        </>
      )}
    </MUITooltip>
  )
}

export default Tooltip;