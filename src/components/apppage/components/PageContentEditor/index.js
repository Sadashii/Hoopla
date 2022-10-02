import axios from "axios";
import { useEffect, useState } from "react";
import Block from "./Block";

const PageContentEditor = ({
  user,
  pageData
}) => {
  const [pageContent, setPageContent] = useState([])
  const [pageContentVersion, setPageContentVersion] = useState("")
  const [focusOnBlockID, setFocusOnBlockID] = useState(undefined)

  useEffect(() => {
    if (pageData?._id) {
      axios
        .post(`/api/workspace/blocks`, {
          operation: "GET",
          page: pageData._id,
        })
        .then(res => {
          setPageContent(res.data.blocks.sort((a, b) => a.properties.position - b.properties.position))
          setPageContentVersion(res.data.__v)
        })
    }
  }, [pageData])
  
  const focusOnBlock = (bid, end=true) => {
    let block = document.querySelector(`[data-block-id="${bid}"]`)
    if (block) { // Development issue
      let editor = block.querySelector(`[contenteditable=true]`)
      
      //TODO: Code to move caret to begin/end
      
      editor.focus()
    }
  }
  useEffect(() => {
    if (focusOnBlockID) {
      focusOnBlock(focusOnBlockID)
    }
  }, [focusOnBlockID]) // Focus on a specific block id

  const updateBlock = (id, values) => {
    let clone = [...pageContent]
    let block;
    if (typeof id === "string") {
      block = clone.find(block => block._id === id)
    }
    if (typeof id === "object") {
      block = clone.find(block => block._id === id._id)
    }
    
    for (const [key, value] of Object.entries(values)) {
      block[key] = value
    }
    block.updatedAt = new Date()
    
    setPageContent(clone)
    
    axios
      .post(`/api/workspace/blocks`, {
        operation: "UPDATE",
        ...values,
        updatedBy: user._id,
        _id: id,
      })
  }
  
  const addBlock = (blockData, currentBlock) => {
    let thisPos = 1
    let cbIndex = pageContent.indexOf(currentBlock)
    if (cbIndex !== -1) { // Not an empty pageContent
      if (pageContent.length - 1 === cbIndex) { // This is last block
        thisPos = pageContent.length + 1
      } else {
        thisPos = (pageContent[cbIndex].position + pageContent[cbIndex + 1].position) / 2
      }
    }

    axios
      .post(`/api/workspace/blocks`, {
        operation: "CREATE",
        ...blockData,
        properties: {
          ...blockData.properties,
          position: thisPos
        }
      })
      .then(res => {
        pageContent.splice(cbIndex + 1, 0, res.data);
        setPageContent([...pageContent])
        setFocusOnBlockID(res.data._id)
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  
  const deleteBlock = (block) => {
    axios
      .post(`/api/workspace/blocks`, {
        operation: "DELETE",
        _id: block._id
      })
      .then(res => {
        const blockIndex = pageContent.indexOf(block)
        pageContent.splice(blockIndex, 1);
        const addFallbackBlock = pageContent.length === 0
        setPageContent([...pageContent])
        if (blockIndex > 0) {
          setFocusOnBlockID(pageContent[blockIndex - 1]._id)
        }
        
        if (addFallbackBlock) {
          addBlock({
            type: 'text',
            properties: {
              content: ''
            },
            page: block.page,
          }, block)
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  
  return (
    <>
      {pageContent?.map(block => (
        <Block
          key={block._id}
          block={block}
          updateBlockContent={updateBlock}
          addBlock={addBlock}
          deleteBlock={deleteBlock}
          moveCaretToPreviousEnd={currentBlock => {
            const blockIndex = pageContent.indexOf(currentBlock) - 1
            if (blockIndex >= 0) {
              let focusOnID = pageContent[blockIndex]._id
              focusOnBlock(focusOnID)
            }
          }}
          moveCaretToNextStart={currentBlock => {
            const blockIndex = pageContent.indexOf(currentBlock) + 1
            if (blockIndex < pageContent.length) {
              let focusOnID = pageContent[blockIndex]._id
              focusOnBlock(focusOnID, false)
            }
          }}
        />
      ))}
    </>
  )
}

export default PageContentEditor;