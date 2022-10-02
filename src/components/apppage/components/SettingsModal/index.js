import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { types, useAlert } from "react-alert";
import UserHelper from "../../../../helper/UserHelper";
import { useStickyState } from "../../../../utils/useStickyState";
import { FlexBox } from "../../../atoms";
import { ClosePopup } from "../../../molecules";
import { IconDisplayAndUploader } from "../../../organisms";
import styles from "./styles.module.scss";

const SettingsModal = ({
  open,
  onClose,
  user,
  router
}) => {
  const alert = useAlert();
  const [currentPanel, setCurrentPanel] = useStickyState("my_account",
    "user_current_settings_panel");
  
  const account_settings = {
    "my_account": <FlexBox
      fullWidth align
      className={clsx(
        currentPanel === "my_account" && styles.settingNavSelected,
        styles.settingNav)}
      onClick={() => setCurrentPanel("my_account")}
    >
      <Image
        alt={"Profile picture"}
        src={user?.meta.profilePicture || "/logo.png"}
        width={25}
        height={25}
      />
      <p>My account</p>
    </FlexBox>
    
  };
  
  const workspace_settings = {
    "ws_settings": <FlexBox
      fullWidth align
      className={clsx(
        currentPanel === "ws_settings" && styles.settingNavSelected,
        styles.settingNav)}
      onClick={() => setCurrentPanel("ws_settings")}
    >
      <SettingsOutlinedIcon/>
      <p>Settings</p>
    </FlexBox>,
    "ws_members": <FlexBox
      fullWidth align
      className={clsx(
        currentPanel === "ws_members" && styles.settingNavSelected,
        styles.settingNav)}
      onClick={() => setCurrentPanel("ws_members")}
    >
      <PeopleAltOutlinedIcon/>
      <p>Members</p>
    </FlexBox>
  };
  
  const UpdateCancelFooter = ({ onUpdate, onCancel }) => {
    return (
      <FlexBox align className={styles.updateOrCancelFooter}>
        <Button variant={"contained"} className={styles.buttonUpdate}
                onClick={onUpdate}>Update</Button>
        <Button variant={"outlined"} className={styles.buttonCancel}
                onClick={onCancel}>Cancel</Button>
      </FlexBox>
    );
  };
  
  const SettingsMyAccount = ({ user }) => {
    const [modifiedData, setModifiedData] = useState({});
    
    const setField = (field) => (e) => {
      setModifiedData({
        ...modifiedData,
        [field]: typeof e === "string" ? e : e.target.value
      });
    };
    
    const onUpdate = () => {
      if (modifiedData.username && modifiedData.username !== user.username) {
        axios.post(`/api/account`, {
          operation: "UPDATE",
          username: modifiedData.username
        }).then(res => {
          UserHelper.saveUser(res.data);
          user = res.data;
          onClose();
        }).catch(err => {
          alert.show("Unable to update account. Please try again later.",
            { type: types.ERROR });
        });
      }
      
      if (modifiedData.password || modifiedData.repeatPassword) {
        let cancelled = false;
        if (!cancelled && !modifiedData.password) {
          setField("passwordError")("Please enter password");
          cancelled = true;
        }
        if (!!cancelled && modifiedData.repeatPassword) {
          setField("passwordError")("Please repeat your password");
          cancelled = true;
        }
        if (!cancelled && modifiedData.password !==
          modifiedData.repeatPassword) {
          setField("passwordError")("The entered password's do not match");
          cancelled = true;
        }
        if (!cancelled && modifiedData.password.length < 8) {
          setField("passwordError")(
            "The password needs to be atleast 8 characters");
          cancelled = true;
        }
        if (!cancelled) {
          setField("passwordError")("");
          axios.post(`/api/account`, {
            operation: "UPDATE_PASSWORD",
            newPassword: modifiedData.password
          }).then(res => {
            UserHelper.saveUser(res.data);
            user = res.data;
            onClose();
          }).catch(err => {
            alert.show("Unable to update password. Please try again later.",
              { type: types.ERROR });
          });
        }
      }
    };
    
    return (
      <>
        <FlexBox fullwidth justifyBetween>
          <p className={styles.settingTitle}>Account</p>
          
          <IconDisplayAndUploader size={"5rem"}
                                  currentSrc={user.meta.profilePicture}
                                  onChange={() => {
                                  }}/>
        </FlexBox>
        
        <FlexBox column fullWidth className={styles.settingCategory}>
          <p className={styles.settingName}>Account Information</p>
          <span className={styles.inputLabel}>Display name</span>
          <TextField
            variant="outlined"
            fullWidth
            value={modifiedData.username === undefined
              ? user.username
              : modifiedData.username}
            onChange={setField("username")}
            className={styles.settingInputText}
            inputProps={{ autoComplete: "off" }}
          />
        </FlexBox>
        
        <FlexBox column fullWidth className={styles.settingCategory}>
          <p className={styles.settingName}>Password</p>
          <span className={styles.inputLabel}>Password</span>
          <TextField
            variant="outlined"
            fullWidth
            type={"password"}
            value={modifiedData.password}
            className={styles.settingInputText}
            onChange={setField("password")}
          />
          <span className={styles.inputLabel}>Repeat Password</span>
          <TextField
            variant="outlined"
            fullWidth
            type={"password"}
            value={modifiedData.repeatPassword}
            className={styles.settingInputText}
            onChange={setField("repeatPassword")}
          />
          {modifiedData.passwordError && (
            <span className={styles.inputLabel}
                  style={{ color: "red" }}>{modifiedData.passwordError}</span>
          )}
          <span
            className={styles.inputLabel}>Remember to use a variety of characters and digits for a safe password</span>
        </FlexBox>
        
        <FlexBox column fullWidth className={styles.settingCategory}>
          <p className={styles.settingName}>Log out</p>
          <div>
            <Button variant={"outlined"} color={"error"} onClick={() => {
              UserHelper.logoutUser(router);
            }}>Log out</Button>
          </div>
        </FlexBox>
        
        <UpdateCancelFooter onUpdate={onUpdate} onCancel={onClose}/>
      </>
    );
  };
  
  const render_settings_pane = () => {
    switch (currentPanel) {
      case "my_account":
        return <SettingsMyAccount user={user}/>;
    }
  };
  
  return (
    <ClosePopup open={open} onClose={onClose} className={styles.settingsModal}
                defaultClass>
      <FlexBox align fullWidth className={styles.contentContainer}>
        <FlexBox column className={styles.settingsNavigator}>
          <p className={styles.settingsCategoryTitle}>{user?.email.address}</p>
          {Object.entries(account_settings).map((entry) => {
            return entry[1];
          })}
          
          <p className={styles.settingsCategoryTitle}>Workspace</p>
          {Object.entries(workspace_settings).map((entry) => {
            return entry[1];
          })}
        </FlexBox>
        <FlexBox column fullWidth className={styles.settingsPane}>
          {render_settings_pane()}
        </FlexBox>
      </FlexBox>
    </ClosePopup>
  );
};

export default SettingsModal;