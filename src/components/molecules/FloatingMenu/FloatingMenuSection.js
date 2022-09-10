import styles from "./styles.module.scss";

const FloatingMenuSection = ({
  children,
  ...props
  }) => {

  return (
    <div className={styles.menuSection} {...props}>
      {children}
    </div>
  )
}

export default FloatingMenuSection;