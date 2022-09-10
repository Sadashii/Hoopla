import clsx from "clsx";
import styles from "./styles.module.scss";

const FloatingMenuOption = ({
                               children,
  className,
  preserveOriginalClass=true,
                               ...props
                             }) => {
  
  return (
    <div className={clsx(className ? preserveOriginalClass && styles.menuOption: styles.menuOption, className)} {...props}>
      {children}
    </div>
  )
}

export default FloatingMenuOption;