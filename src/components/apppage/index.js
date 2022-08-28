import { Divider, IconButton } from "@mui/material";
import axios from "axios";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserHelper from "../../helper/UserHelper";
import { useStickyState } from "../../utils/useStickyState";
import { FlexBox, Tooltip } from "../atoms";
import PageContentEditor from "./components/PageContentEditor";
import PageNav from "./components/PageNav";
import PageTitleEditor from "./components/PageTitleEditor";
import { findPageInPages } from "./recursion";
import styles from "./styles.module.scss"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const AppPage = () => {
  const user = UserHelper.getUser()
  const router = useRouter()
  
  const [navbarOpen, setNavbarOpen] = useState(true)
  const [workspaceID, setWorkspaceID, fetchedWorkspaceID] = useStickyState(null, "user_current_workspace")
  const [workspaceData, setWorkspaceData, fetchedWorkspaceData] = useStickyState(null, "user_current_workspace_data")
  const [pageID, setPageID, fetchedPageID] = useStickyState(null, "user_current_page")
  const [workspacePagesData, setWorkspacePagesData, fetchedWorkspacePages] = useStickyState(null, "user_current_page_data")
  const [currentPage, setCurrentPage] = useState(null)
  
  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [])
  
  useEffect(() => {
    if (fetchedWorkspaceID && workspaceID === null) {
      setWorkspaceID(user._id)
    }
  
    if (fetchedWorkspaceData && workspaceID) {
      fetchWorkspace(workspaceID, workspaceData?._id ? workspaceData.__v : null)
    }
  }, [fetchedWorkspaceID, workspaceID, fetchedWorkspaceData])
  
  useEffect(() => {
    if (fetchedPageID && pageID !== null) {
      setCurrentPage(findPageInPages(pageID, workspacePagesData))
    }
  }, [fetchedPageID, pageID])
  
  const fetchWorkspace = (wid, __v) => {
    axios
      .post(`/api/workspace/workspace`, {
        workspace: wid,
        current_version: __v,
      })
      .then(res => {
        setWorkspaceData(res.data)
        fetchPages(wid, workspacePagesData?.__v ? workspacePagesData?.__v : null)
      })
      .catch(err => {
        if (err.response.status === 304) { // The current workspaceData is latest, no changes
          fetchPages(wid, workspacePagesData?.__v ? workspacePagesData?.__v : null)
          return
        }
        throw new Error(err)
      })
  }
  
  const fetchPages = (wid, __v) => {
    axios
      .post(`/api/workspace/pages`, {
        workspace: wid,
        current_version: __v,
      })
      .then(res => {
        setWorkspacePagesData(res.data)
      })
      .catch(err => {
        if (err.response.status === 304) { // The current workspacePagesData for this ws has no changes
          return
        }
        throw new Error(err)
      })
  
  }
  
  
  return (
    <>
      <FlexBox className={styles.mainContainer}>
        <FlexBox column className={clsx(styles.leftNavbar, navbarOpen === false && styles.leftNavbarClose)}>
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
            <FlexBox justifyBetween style={{cursor: "pointer"}} className={clsx(styles.navOption, styles.logo)}>
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
          {fetchedWorkspacePages && (
            <>
            <PageNav workspacePagesData={workspacePagesData} setWorkspacePagesData={setWorkspacePagesData} workspaceData={workspaceData} pageID={pageID} setPageID={setPageID} />
            </>
          )}
        </FlexBox>
        <FlexBox fullWidth column>
          <FlexBox align justifyBetween fullWidth>
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
          {currentPage && (
            <FlexBox fullWidth column className={clsx(styles.pageContainer)} style={{fontSize: '16px'}}>
              <PageTitleEditor
                pageData={currentPage}
                setPageData={setCurrentPage}
                setWorkspacePagesData={setWorkspacePagesData}
              />
              {/* <PageContentEditor */}
              {/* /> */}
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
    </>
  )
}

export default AppPage;