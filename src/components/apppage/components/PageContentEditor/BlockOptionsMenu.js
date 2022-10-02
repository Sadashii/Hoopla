import AutorenewIcon from "@mui/icons-material/Autorenew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowRightOutlinedIcon
  from "@mui/icons-material/KeyboardArrowRightOutlined";
import LinkIcon from "@mui/icons-material/Link";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import clsx from "clsx";
import { useState } from "react";
import UserHelper from "../../../../helper/UserHelper";
import { FlexBox } from "../../../atoms";
import { RelativeTime } from "../../../molecules";
import FloatingMenu from "../../../molecules/FloatingMenu";
import FloatingMenuOption
  from "../../../molecules/FloatingMenu/FloatingMenuOption";
import FloatingMenuSection
  from "../../../molecules/FloatingMenu/FloatingMenuSection";
import floatingMenuClasses
  from "../../../molecules/FloatingMenu/styles.module.scss";
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
  onClickOutside,
  onDelete,
  onDuplicate,
  onCopyLink,
  onChangeInto,
  onTextColorChange,
  onTextBackgroundChange,
  block
}) => {
  const [showColorSwitcher, setShowColorSwitcher] = useState(false);
  const [showChangeInto, setShowChangeInto] = useState(false);
  
  const user = UserHelper.getUser();
  
  const colorSwitcherMenu = () => {
    return (
      <FloatingMenu onClickOutside={onClickOutside}>
        <FloatingMenuSection>
          {Object.entries(colors).map(color => (
            <FloatingMenuOption onClick={() => onTextColorChange(color[1])}>
              <FlexBox fullWidth align justifyBetween>
                <FlexBox align>
                  <p className={clsx(floatingMenuClasses.menuOptionIcon,
                    styles.formatColorTextColor)}
                     style={{ color: color[1] }}>A</p> {color[0]}
                </FlexBox>
                {(color[1] === block.properties.textColor ||
                  (color[1] === "black" && !block.properties.textColor)) && (
                  <FlexBox className={floatingMenuClasses.menuOptionRightIcon}>
                    <DoneIcon/>
                  </FlexBox>
                )}
              </FlexBox>
            </FloatingMenuOption>
          ))}
        </FloatingMenuSection>
        <FloatingMenuSection>
          {Object.entries(colors).map(color => (
            <FloatingMenuOption
              onClick={() => onTextBackgroundChange(color[1])}>
              <FlexBox fullWidth align justifyBetween>
                <FlexBox align>
                  <p className={clsx(floatingMenuClasses.menuOptionIcon,
                    styles.formatColorBackgroundColor)}
                     style={{
                       backgroundColor: color[1],
                       color: "white"
                     }}>A</p> {color[0]} Background
                </FlexBox>
                {(color[1] === block.properties.backgroundColor ||
                  (color[1] === "white" &&
                    !block.properties.backgroundColor)) && (
                  <FlexBox className={floatingMenuClasses.menuOptionRightIcon}>
                    <DoneIcon/>
                  </FlexBox>
                )}
              </FlexBox>
            </FloatingMenuOption>
          ))}
        </FloatingMenuSection>
      </FloatingMenu>
    );
  };
  const changeIntoMenu = () => {
    return (
      <FloatingMenu onClickOutside={onClickOutside}>
        <FloatingMenuSection>
          {Object.entries(blockTypes).map(bType => (
            <FloatingMenuOption onClick={() => onChangeInto(bType[1])}>
              <FlexBox fullWidth align justifyBetween>
                <FlexBox align>
                  {bType[0]}
                </FlexBox>
                {bType[1] === block.type && (
                  <FlexBox className={floatingMenuClasses.menuOptionRightIcon}>
                    <DoneIcon/>
                  </FlexBox>
                )}
              </FlexBox>
            </FloatingMenuOption>
          ))}
        </FloatingMenuSection>
      </FloatingMenu>
    );
  };
  
  return (
    <FloatingMenu onClickOutside={onClickOutside}>
      <FloatingMenuSection>
        <FloatingMenuOption onClick={onDelete}>
          <DeleteOutlineIcon fontSize={"small"}
                             className={floatingMenuClasses.menuOptionIcon}/> Delete
        </FloatingMenuOption>
        <FloatingMenuOption onClick={onDuplicate}>
          <ContentCopyIcon fontSize={"small"}
                           className={floatingMenuClasses.menuOptionIcon}/> Duplicate
        </FloatingMenuOption>
        <FloatingMenuOption onMouseEnter={() => {
          setShowChangeInto(true);
          setShowColorSwitcher(false);
        }}>
          <FlexBox fullWidth align justifyBetween>
            <FlexBox align>
              <AutorenewIcon fontSize={"small"}
                             className={floatingMenuClasses.menuOptionIcon}/> Change
              into
            </FlexBox>
            <FlexBox className={floatingMenuClasses.menuOptionRightIcon}>
              <KeyboardArrowRightOutlinedIcon fontSize={"small"}/>
              {showChangeInto && changeIntoMenu()}
            </FlexBox>
          </FlexBox>
        </FloatingMenuOption>
        <FloatingMenuOption onClick={onCopyLink}>
          <LinkIcon fontSize={"small"}
                    className={floatingMenuClasses.menuOptionIcon}/> Copy link
          to block
        </FloatingMenuOption>
      </FloatingMenuSection>
      <FloatingMenuSection>
        <FloatingMenuOption onMouseEnter={() => {
          setShowColorSwitcher(true);
          setShowChangeInto(false);
        }}>
          <FlexBox fullWidth align justifyBetween>
            <FlexBox align>
              <PaletteOutlinedIcon fontSize={"small"}
                                   className={floatingMenuClasses.menuOptionIcon}/> Color
            </FlexBox>
            <FlexBox className={floatingMenuClasses.menuOptionRightIcon}>
              <KeyboardArrowRightOutlinedIcon fontSize={"small"}/>
              {showColorSwitcher && colorSwitcherMenu()}
            </FlexBox>
          </FlexBox>
        </FloatingMenuOption>
      </FloatingMenuSection>
      <FloatingMenuSection
        style={{ color: "rgba(0,0,0,0.6)", fontSize: ".9em" }}>
        <p>Last edited by {user.firstName} {user.lastName}</p>
        <RelativeTime value={block.updatedAt}/>
      </FloatingMenuSection>
    </FloatingMenu>
  );
};

export default BlockOptionsMenu;