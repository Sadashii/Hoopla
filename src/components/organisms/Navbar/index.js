import { AppBar, Button, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserHelper from "../../../helper/UserHelper";
import { useMobileView } from "../../../utils/useMobileView";
import { FlexBox } from "../../atoms";
import { AuthButtons } from "../../molecules";
import styles from "./styles.module.scss";


const Navbar = ({logoOnly}) => {
  const [logoSize, setLogoSize] = useState(50);
  const isMobile = useMobileView(600);
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    if (UserHelper.getUserToken()) {
      setUser(UserHelper.getUser())
      UserHelper
        .getLatestUser()
        .then(user => {
          setUser(user)
        })
    }
  }, [])
  
  return (
    <AppBar
      position={"fixed"}
      color={"inherit"}
      className={styles.navbar}
    >
      <Toolbar disableGutters className={styles.navbarInner}>
        <FlexBox fullWidth align justifyBetween className={styles.navbarInner}>
          <Link href="/" className={styles.navbarLogo}>
            <FlexBox align style={{cursor: "pointer"}}>
              <Image src="/logo.png" height={logoSize} width={logoSize} alt={"Brand Logo"}/>
              {!isMobile && (
                <h2>Hoopla</h2>
              )}
            </FlexBox>
          </Link>
          
          {!logoOnly && (
            <div>
              {!user ? (
                <AuthButtons login={!isMobile}/>
              ) : (
                <Button className={"button-primary-bg-black-hover"} href={"/app/"} style={{maxHeight: '40px'}}>
                  Go to app
                </Button>
                )}
            </div>
          )}
        </FlexBox>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;