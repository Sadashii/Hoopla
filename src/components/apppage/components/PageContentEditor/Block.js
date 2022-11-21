import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { FlexBox } from "../../../atoms";
import BlockOptionsMenu from "./BlockOptionsMenu";
import styles from "./blocks.module.scss";

const block_config = {
  "text": {
    class: styles.blockText
  },
  "heading_1": {
    class: styles.blockH1
  },
  "heading_2": {
    class: styles.blockH2
  },
  "heading_3": {
    class: styles.blockH3
  },
  "todo": {
    class: styles.todo
  },
  "bulleted_list": {
    class: styles.bulletedList
  },
  "quote": {
    class: styles.blockQuote
  }
};

const Block = ({
  block,
  updateBlockContent,
  addBlock,
  deleteBlock,
  moveCaretToPreviousEnd,
  moveCaretToNextStart
}) => {
  const [showBlockOptionsMenu, setShowBlockOptionsMenu] = useState(false);
  const [previousKey, setPreviousKey] = useState(null);
  
  const blockRef = useRef();
  const config = block_config[block.type];
  
  const openOptionsMenu = () => {
    setShowBlockOptionsMenu(true);
  };
  const closeOptionsMenu = () => {
    setShowBlockOptionsMenu(false);
  };
  
  const selectionOffset = () => document.getSelection().anchorOffset;
  
  const onClickDelete = () => {
    closeOptionsMenu();
    deleteBlock(block);
  };
  const onCopyLink = () => {
    closeOptionsMenu();
  };
  const onDuplicate = () => {
    closeOptionsMenu();
    let clone = {
      page: block.page,
      properties: block.properties,
      type: block.type
    };
    addBlock(clone, block);
  };
  const onChangeInto = (newtype) => {
    closeOptionsMenu();
    updateBlockContent(block, {
      type: newtype
    });
  };
  const onTextColorChange = (color) => {
    closeOptionsMenu();
    updateBlockContent(block, {
      properties: {
        ...block.properties,
        textColor: color
      }
    });
  };
  const onTextBackgroundChange = (color) => {
    closeOptionsMenu();
    updateBlockContent(block, {
      properties: {
        ...block.properties,
        backgroundColor: color
      }
    });
  };
  const onClickAddAfter = () => {
    closeOptionsMenu();
    addBlock({
      type: "text",
      properties: {
        content: ""
      },
      page: block.page
    }, block);
  };
  
  const onKeyDown = useRefCallback((e) => {
    const updatePreviousKey = () => setPreviousKey(e.key);
    
    if (e.key === "Enter" && previousKey !== "Shift") {
      e.preventDefault();
      if (!e.target.innerHTML) { // If the block is empty, special behaviour instead of add new block
        switch (block.type) {
          case "todo":
            updateBlockContent(block, { type: "text" });
            return updatePreviousKey();
          case "bulleted_list":
            updateBlockContent(block, { type: "text" });
            return updatePreviousKey();
        }
      }
      
      let block_type;
      switch (block.type) { // If special block, next block should be of same type
        case "todo":
          block_type = "todo";
          break;
        case "bulleted_list":
          block_type = "bulleted_list";
          break;
        default:
          block_type = "text";
          break;
      }
      addBlock({
        type: block_type,
        properties: {
          content: ""
        },
        page: block.page
      }, block);
    }
    if (e.key === "Backspace" && selectionOffset() === 0) {
      switch (block.type) {
        case "todo":
          updateBlockContent(block, { type: "text" });
          break;
        case "bulleted_list":
          updateBlockContent(block, { type: "text" });
          break;
        case "quote":
          updateBlockContent(block, { type: "text" });
          break;
        default:
          if (!e.target.innerHTML) {
            deleteBlock(block);
          }
      }
    }
    if (e.key === "ArrowLeft" && selectionOffset() === 0) {
      moveCaretToPreviousEnd(block);
    }
    if (e.key === "ArrowRight" && selectionOffset() ===
      e.target.innerHTML.length) {
      moveCaretToNextStart(block);
    }
    if (previousKey === "Control" && e.key === "d") {
      e.preventDefault();
      onDuplicate();
    }
    if (e.key === "Escape") {
      blockRef.current.focus();
    }
    
    updatePreviousKey();
  }, [previousKey]);
  const renderBlockContent = () => {
    switch (block.type) {
      case "text":
        return (
          <ContentEditable
            html={block.properties.content}
            onChange={(e) => {
              updateBlockContent(block, {
                properties: {
                  ...block.properties,
                  content: e.target.value
                }
              });
            }}
            onKeyDown={onKeyDown}
            className={styles.editor}
          />
        );
      case "heading_1":
        return (
          <ContentEditable
            html={block.properties.content}
            onChange={(e) => {
              updateBlockContent(block, {
                properties: {
                  ...block.properties,
                  content: e.target.value
                }
              });
            }}
            onKeyDown={onKeyDown}
            className={styles.editor}
          />
        );
      case "heading_2":
        return (
          <ContentEditable
            html={block.properties.content}
            onChange={(e) => {
              updateBlockContent(block, {
                properties: {
                  ...block.properties,
                  content: e.target.value
                }
              });
            }}
            onKeyDown={onKeyDown}
            className={styles.editor}
          />
        );
      case "heading_3":
        return (
          <ContentEditable
            html={block.properties.content}
            onChange={(e) => {
              updateBlockContent(block, {
                properties: {
                  ...block.properties,
                  content: e.target.value
                }
              });
            }}
            onKeyDown={onKeyDown}
            className={styles.editor}
          />
        );
      case "todo":
        return (
          <>
            <FlexBox align className={styles.checkBoxContainer}>
              {block.properties.checked ? (
                <CheckBoxIcon
                  onClick={() => {
                    updateBlockContent(block, {
                      properties: {
                        ...block.properties,
                        checked: !block.properties.checked
                      }
                    });
                  }}
                />
              ) : (
                <CheckBoxOutlineBlankIcon
                  onClick={() => {
                    updateBlockContent(block, {
                      properties: {
                        ...block.properties,
                        checked: !block.properties.checked
                      }
                    });
                  }}
                />
              )}
            </FlexBox>
            <ContentEditable
              html={block.properties.content}
              onChange={(e) => {
                updateBlockContent(block, {
                  properties: {
                    ...block.properties,
                    content: e.target.value
                  }
                });
              }}
              onKeyDown={onKeyDown}
              className={clsx(block.properties.checked && styles.strikethrough,
                styles.editor)}
            />
          </>
        );
      case "bulleted_list":
        return (
          <>
            <FlexBox align justify>
              <div className={styles.bulletedList_marker}>
                &bull;
              </div>
            </FlexBox>
            <ContentEditable
              html={block.properties.content}
              onChange={(e) => {
                updateBlockContent(block, {
                  properties: {
                    ...block.properties,
                    content: e.target.value
                  }
                });
              }}
              onKeyDown={onKeyDown}
              className={styles.editor}
            />
          </>
        );
      case "quote":
        return (
          <ContentEditable
            html={block.properties.content}
            onChange={(e) => {
              updateBlockContent(block, {
                properties: {
                  ...block.properties,
                  content: e.target.value
                }
              });
            }}
            onKeyDown={onKeyDown}
            className={styles.editor}
          />
        );
    }
  };
  
  return (
    <>
      <FlexBox
        className={clsx(styles.blockWrapper, config.class)}
        ref={blockRef}
        data-block-id={block._id}
        tabIndex={1}
      >
        <FlexBox className={clsx(styles.blockOptions,
          showBlockOptionsMenu && styles.blockOptionsHoverOn)}>
          <AddIcon onClick={onClickAddAfter}/>
          <DragIndicatorIcon onClick={openOptionsMenu}/>
        </FlexBox>
        <FlexBox style={{
          color: block.properties.textColor || "black",
          backgroundColor: block.properties.backgroundColor || "transparent",
          width: "100%",
          alignItems: "flex-start",
          height: "fit-content"
        }} className={styles.editorContainer}>
          {renderBlockContent()}
        </FlexBox>
      </FlexBox>
      {showBlockOptionsMenu && (
        <BlockOptionsMenu
          onClose={closeOptionsMenu}
          onDelete={onClickDelete}
          onCopyLink={onCopyLink}
          onDuplicate={onDuplicate}
          onChangeInto={onChangeInto}
          onTextColorChange={onTextColorChange}
          onTextBackgroundChange={onTextBackgroundChange}
          open={showBlockOptionsMenu}
          block={block}
          anchor={blockRef.current}
        />
      )}
    </>
  );
};

function useRefCallback (cb, deps) {
  const ref = useRef(cb);
  
  const handler = useCallback(cb, deps);
  
  useEffect(() => {
    ref.current = handler;
  }, [handler]);
  
  return (...args) => ref.current(...args);
}

export default Block;