import { Button, TextField } from "@mui/material";
import emojis from "node-emoji/lib/emoji.json";
import { useState } from "react";
import { FlexBox } from "../../../atoms";
import FloatingMenu from "../../../molecules/FloatingMenu";
import FloatingMenuSection from "../../../molecules/FloatingMenu/FloatingMenuSection";
import styles from "./styles.module.scss";

const IconSelector = ({
  onClick,
  onCancel
}) => {
  const [filter, setFilter] = useState("");
  
  const onEmojiClick = (emojiName) => {
    onClick(emojiName);
  };
  
  const randomIcon = () => {
    let emojiKeys = Object.keys(emojis);
    onClick(emojiKeys[Math.floor(Math.random() * emojiKeys.length)]);
  };
  const removeIcon = () => {
    onClick(null);
  };
  
  return (
    <FloatingMenu onClickOutside={onCancel} style={{ width: "350px" }}>
      <FloatingMenuSection>
        <FlexBox align justifyBetween className={styles.iconSelectorOptions}>
          <FlexBox align>
            Emojis
          </FlexBox>
          <FlexBox align>
            <Button variant={"text"} className={styles.iconOption}
                    onClick={randomIcon}>
              Random
            </Button>
            <Button variant={"text"} className={styles.iconOption}
                    onClick={removeIcon}>
              Remove
            </Button>
          </FlexBox>
        </FlexBox>
      </FloatingMenuSection>
      <FloatingMenuSection>
        <FlexBox column fullWidth className={styles.iconSearchContainer}>
          <TextField placeholder={"Filter..."} value={filter}
                     onChange={(e) => setFilter(e.target.value)}
                     id={"icon-filter"} autoFocus
                     inputProps={{ autoComplete: "off" }}/>
        </FlexBox>
      </FloatingMenuSection>
      <FloatingMenuSection>
        <FlexBox fullWidth className={styles.iconSelectorIconsContainer}>
          {Object.keys(emojis).map(emojiName => {
            if (filter.length > 0 && !emojiName.includes(filter)) {
              return null;
            }
            
            return <p className={styles.emoji} onClick={() => onEmojiClick(
              emojiName)}>{emojis[emojiName]}</p>;
          })}
        </FlexBox>
      </FloatingMenuSection>
    </FloatingMenu>
  );
};

export default IconSelector;