import { useEffect, useState } from "react";
import GeneralHelper from "../helper/GeneralHelper";
import { useWindowSize } from "./useWindowSize";

export const useMobileView = (size = 768) => {
  const [isMobileView, setIsMobileView] = useState(false);
  let dimens;
  if (GeneralHelper.isClient()) {
    dimens = useWindowSize();
  }
  useEffect(() => {
    if (dimens && dimens[1] <= size) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  }, [dimens]);
  
  return isMobileView
}