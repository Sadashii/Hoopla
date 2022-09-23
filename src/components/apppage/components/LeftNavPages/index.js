import AddIcon from "@mui/icons-material/Add";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { FlexBox, Tooltip } from "../../../atoms";
import { findPageInPages } from "../../recursion";
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
  const addPageToWorkspace = () => {
    axios
      .post(`/api/workspace/pages`, {
        operation: "CREATE",
        workspace: workspaceData._id,
        properties: {
          position: workspacePagesData.pages.length // At the end
        }
      })
      .then(res => {
        let workspacePagesClone = {...workspacePagesData}
        workspacePagesClone.pages.push(res.data)
        setWorkspacePagesData(workspacePagesClone)
        setExpandedPages([])
        openPage(res.data)
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  const addPageToPage = (page) => {
    axios
      .post(`/api/workspace/pages`, {
        operation: "CREATE",
        parent: page._id,
        properties: {
          position: page.children?.pages.length || 0
        }
      })
      .then(res => {
        let workspacePagesClone = {...workspacePagesData}
        let pageParent = findPageInPages(page._id, workspacePagesClone)

        if (!pageParent.children) {
          pageParent.children = {
            pages: [],
            __v: null
          }
        }

        pageParent.children.pages.push(res.data)
        setWorkspacePagesData(workspacePagesClone)
        openPage(res.data)
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
          <Tooltip title={null} icon>
            <ArrowRightIcon
              className={clsx(styles.pageExpandIcon, expandedPages.includes(page._id) && styles.pageExpandedIcon)}
              onClick={() => {
                if (expandedPages.includes(page._id)) {
                  setExpandedPages(expandedPages => expandedPages.filter(p => p !== page._id))
                } else {
                  axios
                    .post(`/api/workspace/pages`, {
                      operation: "GET",
                      page: page._id,
                      current_version: page.children?.__v || null,
                    })
                    .then(res => {
                      let updatedData = {...workspacePagesData}
                      let parent = findPageInPages(page._id, updatedData)
                      parent.children = res.data
                      setWorkspacePagesData(updatedData)
                      setExpandedPages([...expandedPages, page._id])
  
                    })
                    .catch(err => {
                      if (err.response.status === 304) {
                        setExpandedPages([...expandedPages, page._id])
                        return
                      }
                      
                      throw new Error(err)
                    })
                }
              }}
            />
          </Tooltip>
          <FlexBox fullWidth onClick={() => openPage(page)} className={styles.pageName}>
            {getPageIconType(page.icon) === pageIconTypes.EMOJI && (
              <span>
                {emojis[page.icon]}
              </span>
            )}
            {page.name || "Untitled"}
          </FlexBox>
          <>
            <FlexBox align className={clsx(styles.pageAddIcon)}>
              <Tooltip title={"Add page inside"} icon>
                <AddIcon onClick={() => addPageToPage(page)}/>
              </Tooltip>
            </FlexBox>
          </>
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
                style={{paddingLeft: `${12 * (level + 1) + 20}px`, opacity: '.7'}}
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
      <FlexBox onClick={addPageToWorkspace} className={clsx(stylesP.navOptionLightBold, styles.pageNavItem)}>
        <AddIcon style={{marginRight: '4px'}} /> Add a page
      </FlexBox>
    </>
  )
}

export default PageNav;