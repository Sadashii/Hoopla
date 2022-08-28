import axios from "axios";
import clsx from "clsx";
import emojis from "node-emoji/lib/emoji.json"
import { useEffect, useRef, useState } from "react";
import slugify from "slugify";
import { FlexBox, Tooltip } from "../../../atoms";
import { findPageInPages } from "../../recursion";
import { getPageIconType, pageIconTypes } from "../../utils";
import IconSelector from "../IconSelector";
import styles from "./styles.module.scss"
import stylesP from "../../styles.module.scss"

const PageTitleEditor = ({
  pageData,
  setPageData,
  setWorkspacePagesData
}) => {
  const iconDivRef = useRef(null)
  const titleDivRef = useRef(null)
  const [showIconSelector, setShowIconSelector] = useState(false)
  const [pageNameID, setPageNameID] = useState("")
  
  useEffect(() => {
    if (pageNameID !== pageData._id) {
      titleDivRef.current.innerText = pageData.name
      setPageNameID(pageData._id)
    }
  }, [pageData])
  
  
  const updatePageValue = (id, values) => {
    setPageData(pageData => {
      let clone = {...pageData}
      for (const [key, value] of Object.entries(values)) {
        clone[key] = value
      }
  
      return clone
    })
    setWorkspacePagesData(workspacePagesData => {
      let clone = {...workspacePagesData}
      let pageInClone = findPageInPages(id, clone)
      for (const [key, value] of Object.entries(values)) {
        pageInClone[key] = value
      }

      axios
        .patch(`/api/workspace/pages`, {
          _id: id,
          ...values
        })

      return clone
    })
  }
  
  const onTitleChange = (e) => {
    updatePageValue(pageData._id, {
      name: e.target.innerText,
      slug: slugify(e.target.innerText)
    })
  }
  
  const onIconChange = (emojiName) => {
    updatePageValue(pageData._id, {
      icon: emojiName
    })
    setShowIconSelector(false);
  }
  
  const addIcon = () => {
    const icons = Object.keys(emojis)
    const icon = icons[Math.floor(Math.random() * icons.length)]
    onIconChange(icon)
  }
  
  return (
    <FlexBox fullWidth column className={styles.pageTitleEditor}>
      <FlexBox align className={styles.pageDisplayOptions}>
        {pageData.icon === null && (
          <div className={clsx(stylesP.navOptionLightBold, styles.pageDisplayOption)} onClick={addIcon}>🙂 Add icon</div>
        )}
      
      </FlexBox>
      <FlexBox align>
        {pageData.icon && (
          <>
            <Tooltip title={"Change icon"}>
              <div className={styles.pageIcon} onClick={() => setShowIconSelector(true)} ref={iconDivRef}>
                {getPageIconType(pageData.icon) === pageIconTypes.EMOJI && (
                  <p className={styles.pageIconEmoji}>
                    {emojis[pageData.icon]}
                  </p>
                )}
              </div>
            </Tooltip>
            {showIconSelector && (
              <IconSelector onClick={onIconChange} element={iconDivRef} onCancel={() => setShowIconSelector(false)} />
            )}
          </>
        )}
          <div contentEditable={true} className={styles.pageTitle} onInput={onTitleChange} ref={titleDivRef} />
      </FlexBox>
      
    </FlexBox>
  )
}

export default PageTitleEditor;