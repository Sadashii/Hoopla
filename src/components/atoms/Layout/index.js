import { Navbar } from "../../organisms";
import styles from "./styles.module.scss";


const Layout = ({logoOnly = false, children}) => {
  
  return (
    <div className={styles.layout}>
      <Navbar logoOnly={logoOnly}/>
      {children}
    </div>
  );
};

export default Layout;