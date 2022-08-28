import { Button, TextField } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useWindowSize } from "../../../../utils/useWindowSize";
import { FlexBox } from "../../../atoms";
import styles from "./styles.module.scss"
import emojis from "node-emoji/lib/emoji.json"

const IconSelector = ({
  onClick,
  onCancel,
  element
}) => {
  const [coords, setCoords] = useState(null)
  const [filter, setFilter] = useState("")
  const pageSize = useWindowSize()
  
  const onEmojiClick = (emojiName) => {
    onClick(emojiName)
    setCoords(null)
  }
  
  const randomIcon = () => {
    let emojiKeys = Object.keys(emojis)
    onClick(emojiKeys[Math.floor(Math.random() * emojiKeys.length)])
  }
  const removeIcon = () => {
    onClick(null)
  }
  
  const onClickOutsideListener = (e) => {
    if (document.getElementById('icon-selector') && !document.getElementById('icon-selector').contains(e.target)) {
      removeListener()
      return onCancel()
    }
  }
  const removeListener = () => document.removeEventListener("mousedown", onClickOutsideListener)
  const addListener = () => document.addEventListener("mousedown", onClickOutsideListener)
  
  useEffect(() => {
    let elementTop = element.current.offsetTop
    let elementHeight = element.current.offsetHeight
    let elementLeft = element.current.offsetLeft
    let elementWidth = element.current.offsetWidth
    
    let selector = document.getElementById('icon-selector')
    let offsetLeft = (elementLeft + elementWidth / 2) - (selector.offsetWidth / 2)
    
    setCoords({
      top: elementTop + elementHeight,
      left: offsetLeft > 0 ? offsetLeft : 0
    })
  
    addListener()
    document.getElementById('icon-filter').focus()
  }, [element, pageSize])
  
  return (
    <FlexBox column className={clsx(styles.iconSelector, coords === null && styles.iconSelectorHidden)} style={coords} id={'icon-selector'}>
      <FlexBox align justifyBetween className={styles.iconSelectorOptions}>
        <FlexBox align>
          Emojis
        </FlexBox>
        <FlexBox align>
          <Button variant={'text'} className={styles.iconOption} onClick={randomIcon}>
            Random
          </Button>
          <Button variant={'text'} className={styles.iconOption} onClick={removeIcon}>
            Remove
          </Button>
        </FlexBox>
      </FlexBox>
      <FlexBox column fullWidth className={styles.iconSearchContainer}>
        <TextField className={styles.iconSearch} placeholder={"Filter..."} value={filter} onChange={(e) => setFilter(e.target.value)} id={'icon-filter'} />
      </FlexBox>
      <FlexBox fullWidth className={styles.iconSelectorIconsContainer}>
        <FlexBox fullWidth style={{fontSize: '.75em', borderBottom: '1px solid grey', marginBottom: '.5rem'}}>
          {filter.length > 0 ? "RESULTS" : "ALL EMOJIS"}
        </FlexBox>
        {Object.keys(emojis).map(emojiName => {
          if (filter.length > 0 && !emojiName.includes(filter)) {
            return null
          }
        
          return <p className={styles.emoji} onClick={() => onEmojiClick(emojiName)}>{emojis[emojiName]}</p>
        })}
      </FlexBox>
    </FlexBox>
  )
  
}

export default IconSelector;