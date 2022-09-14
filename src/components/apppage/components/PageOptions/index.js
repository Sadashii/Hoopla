import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlexBox, Tooltip } from "../../../atoms";
import recursion from "../../recursion";
import { getPageIconType, pageIconTypes } from "../../utils";
import PageOptionsMenu from "./PageOptionsMenu";
import styles from "./styles.module.scss"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import emojis from "node-emoji/lib/emoji.json"

const PageOptions = ({
  workspacePages,
  currentPage,
  setCurrentPage,
  openPage
                     }) => {
  const [showPageOptionsMenu, setShowPageOptionsMenu] = useState(false)
  const [breadcrumbs, setBreadcrumbs] = useState([])
  
  useEffect(() => {
    if (currentPage) {
      let crumbs = [currentPage]
      const getParent = (id) => recursion.findPageParent(id, workspacePages)
      let parent = getParent(currentPage._id)
      if (!parent.__v) {
        crumbs.unshift(parent)
      }
      while (!parent.__v) {
        parent = getParent(crumbs[0]._id)
        if (parent.__v) {
          break
        }
        crumbs.unshift(parent)
      }
      setBreadcrumbs(crumbs)
    }
  }, [currentPage])
  
  const updatePageProperty = (property, value) => {
    let clone = {...currentPage}
    clone.properties[property] = value
    clone.updatedAt = new Date()
    let properties = clone.properties
    
    setCurrentPage(clone)
    
    axios
      .post(`/api/workspace/pages`, {
        operation: "UPDATE",
        _id: currentPage._id,
        properties: {
          ...properties
        }
      })
  }
  
  return (
    <FlexBox align fullWidth justifyBetween className={styles.pageOptions}>
      <FlexBox>
        {breadcrumbs.map(bread => {
          
          return (
            <>
              <Button variant={"text"} className={styles.breadcrumbButton} onClick={() => openPage(bread._id)}>
                <span className={styles.pageIcon}>
                  {getPageIconType(bread.icon) === pageIconTypes.EMOJI && (
                    <p className={styles.pageIconEmoji}>
                      {emojis[bread.icon]}
                    </p>
                  )}
                </span>
                {bread.name}
              </Button>
              <p style={{opacity: .7}}>/</p>
            </>
          )
        })}
      </FlexBox>
      <FlexBox align>
        {/* <p>edited</p> */}
        {/* <p>share</p> */}
        <div>
          {showPageOptionsMenu ? (
            <IconButton>
              <MoreHorizIcon onClick={() => {
                setShowPageOptionsMenu(true)
              }} />
            </IconButton>
          ) : (
            <Tooltip title={"Page settings"} icon>
              <MoreHorizIcon onClick={() => {
                setShowPageOptionsMenu(true)
              }} />
            </Tooltip>
          )}
          {showPageOptionsMenu && (
            <PageOptionsMenu
              onCancel={() => setShowPageOptionsMenu(false)}
              properties={currentPage.properties}
              updateProperty={updatePageProperty}
            />
          )}
        </div>
      </FlexBox>
    </FlexBox>
  )
}

export default PageOptions;