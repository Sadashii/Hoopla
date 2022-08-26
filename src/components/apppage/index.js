import { Divider, IconButton } from "@mui/material";
import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserHelper from "../../helper/UserHelper";
import { useStickyState } from "../../utils/useStickyState";
import { FlexBox, Tooltip } from "../atoms";
import styles from "./styles.module.scss"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const AppPage = () => {
  const user = UserHelper.getUser()
  const router = useRouter()
  
  const [navbarOpen, setNavbarOpen] = useState(true)
  const [workspaceID, setWorkspaceID, fetchedWorkspaceID] = useStickyState(null, "user_current_workspace")
  const [workspaceData, setWorkspaceData] = useState(null)
  
  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [])
  
  
  useEffect(() => {
    if (fetchedWorkspaceID && workspaceID === null) {
      setWorkspaceID(user._id)
    }
    
    if (workspaceID) {
      axios
        .post(`/api/getWorkspace`, {
          workspace: workspaceID,
        })
        .then(res => {
          setWorkspaceData(res.data)
        })
        .catch(err => {
          throw new Error(err)
        })
    }
  }, [fetchedWorkspaceID, workspaceID])

  
  return (
    <>
      <FlexBox className={styles.mainContainer}>
        <FlexBox column className={clsx(styles.leftNavbar, navbarOpen !== true && styles.leftNavbarClose)}>
          {/* <FlexBox align justifyBetween style={{cursor: "pointer"}} className={clsx(styles.navOption, styles.logo)}> */}
          {/*   <FlexBox align> */}
          {/*     <Image src="/logo.png" height={35} width={35} alt={"Brand Logo"}/> */}
          {/*     <h2>Hoopla</h2> */}
          {/*   </FlexBox> */}
          {/*   <Tooltip title={"Close sidebar"} shortcut={"Ctrl + /"}> */}
          {/*     <IconButton> */}
          {/*       <KeyboardDoubleArrowLeftIcon */}
          {/*         className={styles.toggleNavbarIcon} */}
          {/*         onClick={() => setNavbarOpen(!navbarOpen)} */}
          {/*       /> */}
          {/*     </IconButton> */}
          {/*   </Tooltip> */}
          {/* </FlexBox> */}
          {/* <Divider /> */}
          {workspaceData && (
            <FlexBox align justifyBetween style={{cursor: "pointer"}} className={clsx(styles.navOption, styles.logo)}>
              <FlexBox align>
                <Image src={workspaceData.icon} height={35} width={35} alt={"Brand Logo"}/>
                <h3>{workspaceData.name}</h3>
              </FlexBox>
              <Tooltip title={"Close sidebar"} shortcut={"Ctrl + /"}>
                <IconButton>
                  <KeyboardDoubleArrowLeftIcon
                    className={styles.toggleNavbarIcon}
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  />
                </IconButton>
              </Tooltip>
            </FlexBox>
          )}
          <Divider />
        </FlexBox>
        <FlexBox fullWidth column>
          <FlexBox align justifyBetween fullWidth>
            {/* navigator */}
            <div>
              {navbarOpen === false && (
                <Tooltip title={"Open sidebar"} shortcut={"Ctrl + /"}>
                  <IconButton>
                    <KeyboardDoubleArrowRightIcon
                      onClick={() => setNavbarOpen(!navbarOpen)}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          {/*   top right utils */}
          </FlexBox>
          {/* main render */}
          <div>
            <h1>hey</h1>

          </div>
        </FlexBox>
      </FlexBox>
    </>
  )
}

export default AppPage;