import { Divider } from "@mui/material";
import styles from "./styles.module.scss";

const FloatingMenuSection = ({
  children,
  noDivider
}) => {
  
  return (
    <>
      {children}
      {!noDivider && (
        <Divider className={styles.menuDivider}/>
      )}
    </>
  );
};

export default FloatingMenuSection;