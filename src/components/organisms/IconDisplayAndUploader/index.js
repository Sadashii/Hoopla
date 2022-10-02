import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import axios from "axios";
import React, { useState } from "react";
import { types, useAlert } from "react-alert";

import styles from "./styles.module.scss";

const ProfilePicture = ({size = '9rem', currentSrc, onChange, ...props }) => {
  const [profileImage, setProfileImage] = useState(currentSrc);
  
  const alert = useAlert()
  
  const onFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return
    if (file.size / 1000 < 1000) {
      setProfileImage(file)
      alert.show("Your pfp should be updated right now I'm too lazy to set up s3", {type: types.SUCCESS});
      // TODO
    //  axios
    //    .post(`/api/account`, {
    //      image: file.toString(),
    //      operation: "UPLOAD_PROFILE_PICTURE"}
    //    ).then((res) => {
    //      setProfileImage(file);
    //      //onChange(res.data)
    //      alert.show("Profile image updated successfully", {type: types.SUCCESS});
    //    })
    //    .catch((err) => {
    //      const msg = err.response?.status === 500 ? "Server error" : err.message;
    //      alert.show(msg, { type: types.ERROR });
    //    });
    } else {
      alert.show("Filesize above 1MB not allowed!", { type: types.ERROR });
    }
  }
  
  if (!profileImage) {
    return (
      <div className={styles.profilePictureUploadContainer} {...props} style={{height: size, width: size, ...props.style}}>
        <label htmlFor="button-file" style={{height: size, width: size}}>
          <FileUploadOutlinedIcon />
        </label>
        <input
          id="button-file"
          accept="image/*"
          type="file"
          hidden
          onChange={onFileUpload}
        />
      </div>
    )
  }
  
  return (
    <div className={styles.profilePictureImageContainer} {...props} style={{height: size, width: size, ...props.style}}>
      <label htmlFor="button-file" style={{height: size, width: size}}>
        <FileUploadOutlinedIcon />
      </label>
      <input
        id="button-file"
        accept="image/*"
        type="file"
        hidden
        onChange={onFileUpload}
      />
      <img
        src={profileImage?.size ? URL.createObjectURL(profileImage) : profileImage}
        alt="Profile Image"
      />
    </div>
  )
}

export default ProfilePicture;