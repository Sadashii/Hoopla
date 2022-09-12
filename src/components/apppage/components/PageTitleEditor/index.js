import axios from "axios";
import clsx from "clsx";
import emojis from "node-emoji/lib/emoji.json"
import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
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
  const [showIconSelector, setShowIconSelector] = useState(false)
  
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
        .post(`/api/workspace/pages`, {
          operation: "UPDATE",
          _id: id,
          ...values
        })

      return clone
    })
  }
  
  const onTitleChange = (e) => {
    updatePageValue(pageData._id, {
      name: e.target.value,
      slug: slugify(e.target.value)
    })
  }
  
  const onIconChange = (emojiName) => {
    setShowIconSelector(false);
    updatePageValue(pageData._id, {
      icon: emojiName
    })
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
                {showIconSelector && (
                  <IconSelector onClick={onIconChange} onCancel={() => setShowIconSelector(false)} />
                )}
              </div>
            </Tooltip>
          </>
        )}
        <ContentEditable
          html={pageData.name}
          onChange={onTitleChange}
          className={styles.pageTitle}
        />
      </FlexBox>
    </FlexBox>
  )
}

export default PageTitleEditor;