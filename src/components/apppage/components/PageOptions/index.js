import axios from "axios";
import { useState } from "react";
import { FlexBox, Tooltip } from "../../../atoms";
import PageOptionsMenu from "./PageOptionsMenu";
import styles from "./styles.module.scss"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const PageOptions = ({
  currentPage,
  setCurrentPage
                     }) => {
  const [showPageOptionsMenu, setShowPageOptionsMenu] = useState(false)
  
  const updatePageProperty = (property, value) => {
    let clone = {...currentPage}
    clone.properties[property] = value
    clone.updatedAt = new Date()
    let properties = clone.properties
    
    setCurrentPage(clone)
  
    axios
      .patch(`/api/workspace/pages`, {
        _id: currentPage._id,
        properties: {
          ...properties
        }
      })
  }
  
  return (
    <FlexBox align fullWidth justifyBetween className={styles.pageOptions}>
      <p>Breadcrumbs</p>
      <FlexBox align>
        <p>edited</p>
        <p>share</p>
        <div>
          <Tooltip title={"Page settings"} icon>
            <MoreHorizIcon onClick={() => {
              setShowPageOptionsMenu(true)
            }} />
          </Tooltip>
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