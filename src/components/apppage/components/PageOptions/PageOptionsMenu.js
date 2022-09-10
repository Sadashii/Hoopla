import { Switch } from "@mui/material";
import { FlexBox } from "../../../atoms";
import FloatingMenu from "../../../molecules/FloatingMenu";
import FloatingMenuOption from "../../../molecules/FloatingMenu/FloatingMenuOption";
import FloatingMenuSection from "../../../molecules/FloatingMenu/FloatingMenuSection";

const PageOptionsMenu = ({
  onCancel,
  properties,
  updateProperty
}) => {


  return (
    <FloatingMenu onClickOutside={onCancel}>
      <FloatingMenuSection>
        <FloatingMenuOption>
          <FlexBox fullWidth align justifyBetween onClick={() => updateProperty('smallText', !properties.smallText)}>
            <p>Small text</p>
            <Switch
              checked={properties.smallText}
              size={'small'}
            />
          </FlexBox>
        </FloatingMenuOption>
        <FloatingMenuOption>
          <FlexBox fullWidth align justifyBetween onClick={() => updateProperty('fullWidth', !properties.fullWidth)}>
            <p>Full width</p>
            <Switch
              checked={properties.fullWidth}
              size={'small'}
            />
          </FlexBox>
        </FloatingMenuOption>
      </FloatingMenuSection>
    </FloatingMenu>
    )
}

export default PageOptionsMenu;