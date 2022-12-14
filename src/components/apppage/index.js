import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserHelper from "../../helper/UserHelper";
import GeneralHelper from "../../utils/GeneralHelper";
import { useStickyState } from "../../utils/useStickyState";
import { FlexBox, Tooltip } from "../atoms";
import PageNav from "./components/LeftNavPages";
import PageContentEditor from "./components/PageContentEditor";
import PageOptions from "./components/PageOptions";
import PageTitleEditor from "./components/PageTitleEditor";
import SettingsModal from "./components/SettingsModal";
import { findPageInPages } from "./recursion";
import styles from "./styles.module.scss";

const AppPage = () => {
  let user = UserHelper.getUser();
  const router = useRouter();
  
  const [navbarOpen, setNavbarOpen] = useStickyState(true, "user_show_sidebar");
  
  const [workspaceID, setWorkspaceID, fetchedWorkspaceID] = useStickyState(null,
    "user_current_workspace");
  const [workspaceData, setWorkspaceData, fetchedWorkspaceData] = useStickyState(
    null, "user_current_workspace_data");
  
  const [workspacePagesData, setWorkspacePagesData, fetchedWorkspacePages] = useStickyState(
    null, "user_current_workspace_pages_data");
  
  const [currentPageID, setCurrentPageID, fetchedPageID] = useStickyState(null,
    "user_current_page");
  const [currentPage, setCurrentPage] = useState(null);
  
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);
  
  useEffect(() => {
    if (user && fetchedWorkspaceID && workspaceID === null) {
      setWorkspaceID(user._id);
    }
    
    if (fetchedWorkspaceData && workspaceID) {
      fetchWorkspace(workspaceID,
        workspaceData?._id ? workspaceData.__v : null);
    }
  }, [user, fetchedWorkspaceID, workspaceID, fetchedWorkspaceData]);
  
  useEffect(() => {
    if (workspacePagesData && fetchedPageID && currentPageID !== null) {
      setCurrentPage(findPageInPages(currentPageID, workspacePagesData));
    }
  }, [fetchedPageID, currentPageID]);
  
  const fetchWorkspace = (wid, __v) => {
    axios.post(`/api/workspace/workspace`, {
      operation: "GET_WORKSPACE",
      workspace: wid,
      current_version: __v
    }).then(res => {
      setWorkspaceData(res.data);
      fetchPages(wid, workspacePagesData?.__v ? workspacePagesData?.__v : null);
    }).catch(err => {
      if (err.response.status === 304) { // The current workspaceData is latest, no changes
        fetchPages(wid,
          workspacePagesData?.__v ? workspacePagesData?.__v : null);
        return;
      }
      throw new Error(err);
    });
  };
  
  const fetchPages = (wid, __v) => {
    axios.post(`/api/workspace/pages`, {
      operation: "GET",
      workspace: wid,
      current_version: __v
    }).then(res => {
      let pagesData = res.data;
      let pages = pagesData.pages;
      pages.sort((a, b) => a.properties.position - b.properties.position);
      
      setWorkspacePagesData(pagesData);
    }).catch(err => {
      if (err.response.status === 304) { // The current workspacePagesData for this ws has no changes
        return;
      }
      throw new Error(err);
    });
  };
  
  return (
    <>
      {GeneralHelper.generateHead(currentPage ? currentPage.name || "Untitled" : (workspaceData ? workspaceData.name || "Untitled" : "App"))}
      <FlexBox className={clsx(styles.mainContainer)}>
        <FlexBox column className={clsx(styles.leftNavbar,
          navbarOpen && styles.leftNavbarOpen)}>
          {workspaceData && (
            <FlexBox justifyBetween style={{ cursor: "pointer" }}
                     className={clsx(styles.navOption, styles.logo)}>
              <FlexBox align>
                <Image src={workspaceData.icon} height={35} width={35}
                       alt={"Brand Logo"}/>
                <h3>{workspaceData.name}</h3>
              </FlexBox>
              <Tooltip title={"Close sidebar"} icon>
                <KeyboardDoubleArrowLeftIcon
                  className={styles.toggleNavbarIcon}
                  onClick={() => setNavbarOpen(!navbarOpen)}
                />
              </Tooltip>
            </FlexBox>
          )}
          {fetchedWorkspacePages && (
            <>
              <PageNav
                workspacePagesData={workspacePagesData}
                setWorkspacePagesData={setWorkspacePagesData}
                workspaceData={workspaceData}
                pageID={currentPageID}
                setPageID={setCurrentPageID}
                toggleSettingsModal={() => setShowSettingsModal(
                  !showSettingsModal)}
                currentPage={currentPage}
              />
            </>
          )}
        </FlexBox>
        {currentPage && (
          <FlexBox fullWidth column className={clsx(styles.page,
            navbarOpen && styles.leftNavbarOpenPage)}>
            <FlexBox align justifyBetween fullWidth
                     className={styles.pageOptions}>
              <PageOptions
                workspacePages={workspacePagesData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                openPage={setCurrentPageID}
                navbarOpen={navbarOpen}
                toggleNavbar={() => setNavbarOpen(!navbarOpen)}
              />
            
            </FlexBox>
            {/* main render */}
            <FlexBox fullWidth className={styles.pageContainerContainer}>
              {currentPage && (
                <FlexBox fullWidth column className={clsx(styles.pageContainer)}
                         style={{
                           fontSize: currentPage.properties.smallText
                             ? "14px"
                             : "16px",
                           maxWidth: currentPage.properties.fullWidth
                             ? "100%"
                             : "900px"
                         }}>
                  <PageTitleEditor
                    pageData={currentPage}
                    setPageData={setCurrentPage}
                    setWorkspacePagesData={setWorkspacePagesData}
                  />
                  <PageContentEditor
                    user={user}
                    pageData={currentPage}
                  />
                </FlexBox>
              )}
            </FlexBox>
          </FlexBox>
        )}
        
        {showSettingsModal && (
          <SettingsModal
            open={showSettingsModal}
            onClose={() => {
              setShowSettingsModal(false);
            }}
            user={user}
            router={router}
          
          />
        )}
      </FlexBox>
    </>
  );
};

export default AppPage;