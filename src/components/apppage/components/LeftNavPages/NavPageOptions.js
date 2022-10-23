import { FloatingMenu, FloatingMenuOption, FloatingMenuSection } from "../../../molecules";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const NavPageOptions = ({
  open,
  onClose,
  anchor,
  onDelete,
  onDuplicate,
  onCopyLink,
}) => {

  return (
    <FloatingMenu open={open} onClose={onClose} anchor={anchor} secondary>
      <FloatingMenuSection noDivider>
        <FloatingMenuOption onClick={onDelete} title={"Delete"} icon={<DeleteOutlineIcon />} />
        <FloatingMenuOption onClick={onDuplicate} title={"Duplicate"} icon={<ContentCopyIcon />} />
        <FloatingMenuOption onClick={onCopyLink} title={"Copy link"} icon={<LinkIcon />} />
      </FloatingMenuSection>
    </FloatingMenu>
  )
}

export default NavPageOptions;