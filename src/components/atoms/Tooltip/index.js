import { Tooltip as MUITooltip } from "@mui/material"

const Tooltip = ({ title, shortcut, children}) => {
  
  return (
    <MUITooltip title={title}>
      {children}
    </MUITooltip>
  )
}

export default Tooltip;