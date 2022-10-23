import AutorenewIcon from "@mui/icons-material/Autorenew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LinkIcon from "@mui/icons-material/Link";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import UserHelper from "../../../../helper/UserHelper";
import { FlexBox } from "../../../atoms";
import { RelativeTime, FloatingMenu, FloatingMenuOption, FloatingMenuSection } from "../../../molecules";
import styles from "./blocks.module.scss";

const colors = {
  "White": "white",
  "Black": "black",
  "Gray": "gray",
  "Orange": "orange",
  "Purple": "purple",
  "Pink": "pink",
  "Red": "red",
  "Yellow": "yellow",
  "Blue": "blue",
  "Green": "green"
};

const blockTypes = {
  "Text": "text",
  "Heading 1": "heading_1",
  "Heading 2": "heading_2",
  "Heading 3": "heading_3",
  "ToDo List": "todo",
  "Bulleted List": "bulleted_list",
  "Quote": "quote"
};

const BlockOptionsMenu = ({
  onClose,
  onDelete,
  onDuplicate,
  onCopyLink,
  onChangeInto,
  onTextColorChange,
  onTextBackgroundChange,
  block,
  anchor,
  open
}) => {
  const [showColorSwitcher, setShowColorSwitcher] = useState(false);
  const [showChangeInto, setShowChangeInto] = useState(false);
  
  const user = UserHelper.getUser();
  
  return (
    <>
      <FloatingMenu open={open} onClose={onClose} anchor={anchor}>
        <FloatingMenuSection>
          <FloatingMenuOption onClick={onDelete} icon={<DeleteOutlineIcon />} title={"Delete"} />
          <FloatingMenuOption onClick={onDuplicate} icon={<ContentCopyIcon />} title={"Duplicate"} />
          <FloatingMenuOption
            id={"block-switcher-menu-item"}
            icon={<AutorenewIcon />}
            title={"Change Into"}
            expandIcon={<KeyboardArrowRightOutlinedIcon />}
            onClick={() => {
              setShowColorSwitcher(false)
              setShowChangeInto(true)
            }}
          />
          <FloatingMenuOption onClick={onCopyLink} icon={<LinkIcon />} title={"Copy link to block"} />
        </FloatingMenuSection>
        <FloatingMenuSection>
          <FloatingMenuOption
            id={"color-switcher-menu-item"}
            icon={<PaletteOutlinedIcon />}
            title={"Color"}
            expandIcon={<KeyboardArrowRightOutlinedIcon />}
            onClick={() => {
              setShowColorSwitcher(true);
              setShowChangeInto(false);
            }}
          />
        </FloatingMenuSection>
        <FloatingMenuSection noDivider>
          <div style={{padding: '4px', fontSize: '.75rem'}}>
            <p>Last edited by {user.username}</p>
            <RelativeTime value={block.updatedAt}/>
          </div>
        </FloatingMenuSection>
      </FloatingMenu>
  
      {/* COLOR SWITCHER MENU */}
      <FloatingMenu open={showColorSwitcher} onClose={() => setShowColorSwitcher(false)} anchor={document.getElementById("color-switcher-menu-item")} secondary>
        <FloatingMenuSection>
          {Object.entries(colors).map(color => (
            <FloatingMenuOption
              onClick={() => onTextColorChange(color[1])}
              title={<>
                <p className={clsx(styles.formatColorTextColor)} style={{ color: color[1] }}>A</p> {color[0]}
              </>}
              expandIcon={<>
                {(color[1] === block.properties.textColor || (color[1] === "black" && !block.properties.textColor)) && (
                  <DoneIcon/>
                )}
              </>}
            />
          ))}
        </FloatingMenuSection>
        <FloatingMenuSection noDivider>
          {Object.entries(colors).map(color => (
            <FloatingMenuOption
              onClick={() => onTextBackgroundChange(color[1])}
              title={<>
                <p className={clsx(styles.formatColorBackgroundColor)} style={{ backgroundColor: color[1], color: "white" }}>A</p> {color[0]} Background
              </>}
              expandIcon={<>
                {(color[1] === block.properties.backgroundColor || (color[1] === "white" && !block.properties.backgroundColor)) && (
                  <DoneIcon/>
                )}
              </>}
            />
          ))}
        </FloatingMenuSection>
      </FloatingMenu>
  
      {/* BLOCK CHANGE MENU */}
      <FloatingMenu open={showChangeInto} onClose={() => setShowChangeInto(false)} anchor={document.getElementById("block-switcher-menu-item")} secondary>
        <FloatingMenuSection>
          {Object.entries(blockTypes).map(bType => (
            <FloatingMenuOption
              onClick={() => onChangeInto(bType[1])}
              title={bType[0]}
              expandIcon={<>
                {bType[1] === block.type && (
                  <DoneIcon/>
                )}
              </>}
            />
          ))}
        </FloatingMenuSection>
      </FloatingMenu>
    </>
  );
};

export default BlockOptionsMenu;