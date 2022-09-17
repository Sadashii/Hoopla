import { AppBar, Button, Toolbar } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserHelper from "../../../helper/UserHelper";
import { useMobileView } from "../../../utils/useMobileView";
import { FlexBox } from "../../atoms";
import { AuthButtons } from "../../molecules";
import navbarItems from "./NavbarItems";
import styles from "./styles.module.scss";

const Navbar = ({logoOnly}) => {
  const [sidenavOpen, setSidenavOpen] = useState(false)
  const [logoSize, setLogoSize] = useState(50);
  const isMobile = useMobileView(768);
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
          <FlexBox align>
            {isMobile && (
              <FlexBox column align justify className={styles.hamburgerContainer} onClick={() => setSidenavOpen(!sidenavOpen)}>
                <div className={styles.hamburger} />
              </FlexBox>
            )}
            <Link href="/">
              <FlexBox align justify style={{cursor: "pointer", marginRight: '1rem'}} className={styles.navbarLogo}>
                <Image src="/logo.png" height={logoSize} width={logoSize} alt={"Brand Logo"}/>
                {!isMobile && (
                  <h2>Hoopla</h2>
                )}
              </FlexBox>
            </Link>
            {!isMobile && (
              <>
                {navbarItems.map(item => {
                  if (!item.mobileOnly) {
                    return (
                      <Link href={`/${item.to}`}>
                        <Button className={styles.navButtonDesktop}>{item.title}</Button>
                      </Link>
                    )
                  }
                })}
              </>
            )}
          </FlexBox>
  
          {isMobile && (
            <FlexBox column className={clsx(styles.mobileSidebar, sidenavOpen && styles.mobileSidebarOpen)}>
              <FlexBox align justifyBetween style={{marginBottom: '1rem'}}>
                <Link href="/">
                  <FlexBox align style={{cursor: "pointer", marginRight: '1rem'}} className={styles.navbarLogo}>
                    <Image src="/logo.png" height={logoSize} width={logoSize} alt={"Brand Logo"}/>
                    <h2>Hoopla</h2>
                  </FlexBox>
                </Link>
  
                <FlexBox column align justify className={styles.hamburgerContainer} onClick={() => setSidenavOpen(!sidenavOpen)}>
                  <div className={styles.hamburger} />
                </FlexBox>
              </FlexBox>
              
  
              {navbarItems.map(item => {
                if (!item.mobileOnly) {
                  return (
                    <Link href={`/${item.to}`}>
                      <FlexBox align className={styles.navButtonMobile}>
                        <FlexBox align justify className={styles.icon}>
                          <item.icon />
                        </FlexBox>
                        {item.title}
                      </FlexBox>
                    </Link>
                  )
                }
              })}
              
              <FlexBox align justifyBetween style={{padding: '1rem 1.5rem'}}>
                <AuthButtons />
              </FlexBox>
            </FlexBox>
          )}
          
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