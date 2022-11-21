import { Menu } from "@mui/material";
import styles from "./styles.module.scss";

const FloatingMenu = ({
  open,
  onClose,
  anchor,
  children,
  secondary,
  ...props
}) => {
  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorEl={anchor}
      anchorOrigin={secondary ? {
        vertical: "center",
        horizontal: "right"
      } : {
        vertical: "center",
        horizontal: "left"
      }}
      transformOrigin={secondary ? {
        vertical: "center",
        horizontal: "left"
      } : {
        vertical: "center",
        horizontal: "right"
      }}
      className={styles.floatingMenu}
      autoFocus
      {...props}
    >
      {children}
    </Menu>
  );
};

export default FloatingMenu;