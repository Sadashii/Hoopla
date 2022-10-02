import { Modal } from "@mui/material";
import clsx from "clsx";
import { FlexBox } from "../../atoms";
import styles from "./styles.module.scss"

const ClosePopup = ({
  open,
  onClose,
  children,
  className,
  defaultClass
                    }) => {
  
  
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <FlexBox column align className={clsx(className, !className && styles.modalContainer, className && defaultClass && styles.modalContainer)}>
        {children}
      </FlexBox>
    </Modal>
  )

}

export default ClosePopup;