import { Switch } from "@mui/material";
import { FloatingMenu, FloatingMenuOption, FloatingMenuSection } from "../../../molecules";

const PageOptionsMenu = ({
  open,
  anchor,
  onClose,
  properties,
  updateProperty
}) => {
  
  return (
    <FloatingMenu open={open} onClose={onClose} anchor={anchor} anchorOrigin={{
      horizontal: 'right',
    }}>
      <FloatingMenuSection noDivider>
        <FloatingMenuOption
          onClick={() => updateProperty("smallText", !properties.smallText)}
          title={"Small text"}
          expandIcon={<>
            <Switch
              checked={properties.smallText}
              size={"small"}
            />
          </>}
        />
        <FloatingMenuOption
          onClick={() => updateProperty("fullWidth", !properties.fullWidth)}
          title={"Full width"}
          expandIcon={<>
            <Switch
              checked={properties.fullWidth}
              size={"small"}
            />
          </>}
          />
      </FloatingMenuSection>
    </FloatingMenu>
  );
};

export default PageOptionsMenu;