import AddIcon from "@mui/icons-material/Add";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FlexBox, Tooltip } from "../../../atoms";
import stylesP from "../../styles.module.scss";
import { getPageIconType, pageIconTypes } from "../../utils";
import styles from "./styles.module.scss"
import emojis from "node-emoji/lib/emoji.json"

const PageNav = ({
  workspacePagesData,
  setWorkspacePagesData,
  workspaceData,
  pageID,
  setPageID,
}) => {
  const [expandedPages, setExpandedPages] = useState([])

  const openPage = (page) => {
    setPageID(page._id)
  }
  const addPage = (wid) => {
    axios
      .post(`/api/workspace/pages`, {
        operation: "CREATE",
        workspace: wid,
      })
      .then(res => {
        setWorkspacePagesData(workspacePagesData => ({
          pages: [...workspacePagesData.pages, res.data],
          __v: workspacePagesData.__v,
        }))
        openPage(res.data)
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  const addPageToPage = (pid) => {
    axios
      .post(`/api/workspace/pages`, {
        operation: "CREATE",
        parent: pid,
      })
      .then(res => {
        // TODO: Add recursive function to find this page in workspacePagesData and add the new page to it
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  
  const renderPage = (page, level=0) => {
    return (
      <>
        <FlexBox
          justifyBetween
          fullWidth
          className={clsx(pageID === page._id ? stylesP.navOptionBold : stylesP.navOptionLightBold, styles.pageNavItem)}
          style={{paddingLeft: `${12 * level + 6}px`}}
        >
          <ArrowRightIcon
            className={clsx(styles.pageExpandIcon, expandedPages.includes(page._id) && styles.pageExpandedIcon)}
            onClick={() => {
              axios
                .post(`/api/workspace/pages`, {
                  operation: "GET",
                  page: page._id,
                  current_version: page.children?.__v || null,
                })
                .then(res => {
                  // Recursion function which I don't understand ever since I wrote it
                  let updatedData = {...workspacePagesData}
                  const findAndReplace = (id, pages, children) => {
                    let found = false
                    for (const page of pages) {
                      if (page._id === id) {
                        page.children = children
                        found = true
                        return updatedData
                      }
                    }
    
                    if (!found) {
                      for (const page of pages) {
                        findAndReplace(id, page.children.pages || [], children)
                      }
                    }
                  }
                  findAndReplace(page._id, workspacePagesData.pages, res.data)
                  setWorkspacePagesData(updatedData)

        
                  if (expandedPages.includes(page._id)) {
                    setExpandedPages(expandedPages => expandedPages.filter(p => p !== page._id))
                  } else {
                    setExpandedPages([...expandedPages, page._id])
                  }
                })
                .catch(err => {
                  if (err.response.status === 304) {
                    if (expandedPages.includes(page._id)) {
                      setExpandedPages(expandedPages => expandedPages.filter(p => p !== page._id))
                    } else {
                      setExpandedPages([...expandedPages, page._id])
                    }
                    return
                  }
        
                  throw new Error(err)
                })
            }}
          />
          <FlexBox fullWidth onClick={() => openPage(page)} className={styles.pageName}>
            {getPageIconType(page.icon) === pageIconTypes.EMOJI && (
              <span>
                {emojis[page.icon]}
              </span>
            )}
            {page.name || "Untitled"}
          </FlexBox>
          <FlexBox align className={clsx(styles.pageAddIcon)}>
            <Tooltip title={"Add page inside"}>
              <AddIcon onClick={() => addPageToPage(page._id)}/>
            </Tooltip>
          </FlexBox>
        </FlexBox>
        {expandedPages.includes(page._id) && (
          <>
            {page.children?.pages?.length > 0 ? (
              <>
                {page.children.pages.map(page => renderPage(page, level + 1))}
              </>
            ) : (
              <div
                className={clsx(stylesP.navOptionLightBold)}
                style={{paddingLeft: `${12 * (level + 1) + 20}px`}}
              >
                No pages inside
              </div>
            )}
          </>
        )}
      </>
    )
  }
  
  return (
    <>
      {workspacePagesData?.pages.map(page => renderPage(page))}
      <FlexBox onClick={() => addPage(workspaceData._id)} className={clsx(stylesP.navOptionLightBold, styles.pageNavItem)}>
        <AddIcon style={{marginRight: '4px'}} /> Add a page
      </FlexBox>
    </>
  )
}

export default PageNav;