import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../models/user";
import {
  getUser,
  updatePassword,
  updateUser,
} from "../../services/api-service";
import { DefaultButton, Stack, TextField } from "@fluentui/react";
import {
  buttonsClassName,
  cancelButtonClassName,
  detailsAndPasswordDivClassName,
  detailsDivClassName,
  editButtonClassName,
  headerClassName,
  mainDivClassName,
  passwordDivClassName,
  profileInputStyle,
  saveButtonClassName,
  savePasswordButtonClassName,
} from "./user-page-style";

export const UserPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<User>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedUser, setUpdatedUser] = useState<User>();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");

  useEffect(() => {
    if (token) {
      getAndSetUser();
    } else {
      navigate("/login");
    }
  }, [token]);

  const getAndSetUser = () => {
    getUser(token!)
      .then((response) => {
        console.log(response);
        setUser(response);
        setUpdatedUser(response);
        setUser((user) => ({ ...user! }));
        setUpdatedUser((user) => ({ ...user! }));
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleUsernameChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setUpdatedUser((user) => ({ ...user!, username: newValue! }));
  };

  const handleFirstNameChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setUpdatedUser((user) => ({ ...user!, first_name: newValue! }));
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // validate input
    if (updatedUser!.username === "" || updatedUser!.username.length < 4) {
      alert("Username too short!");
      return;
    } else if (
      updatedUser!.first_name === "" ||
      updatedUser!.first_name.length < 4
    ) {
      alert("First name too short!");
      return;
    }
    console.log(updatedUser);
    updateUser(token!, updatedUser!)
      .then((response) => {
        setEditMode(false);
        getAndSetUser();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setUpdatedUser(user);
  };

  const handleCurrentPasswordChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setCurrentPassword(newValue!);
  };

  const handleNewPasswordChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setNewPassword(newValue!);
  };

  const handleConfirmPasswordChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setConfirmPassword(newValue!);
  };

  const savePasswordChange = () => {
    if (newPassword === currentPassword) {
      alert("New password cannot be the same as the current password!");
      return;
    }
    if (newPassword === "" || newPassword.length < 4) {
      alert("Password too short!");
      return;
    } else if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    updatePassword(token!, currentPassword, newPassword)
      .then((response) => {
        setEditMode(false);
        getAndSetUser();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className={mainDivClassName}>
      <h1 className={headerClassName}>Your Profile</h1>
      <div className={detailsAndPasswordDivClassName}>
        <div className={detailsDivClassName}>
          <h2>Personal details</h2>
          <TextField
            label="Username"
            value={updatedUser?.username}
            onChange={handleUsernameChange}
            disabled={true}
            styles={profileInputStyle}
          />
          <TextField
            label="First Name"
            value={updatedUser?.first_name}
            onChange={handleFirstNameChange}
            disabled={!editMode}
            styles={profileInputStyle}
          />

          {!editMode && (
            <DefaultButton
              className={editButtonClassName}
              text="Edit"
              onClick={handleEditClick}
            />
          )}
          {editMode && (
            <Stack
              className={buttonsClassName}
              horizontal
              tokens={{ childrenGap: 10 }}
            >
              <DefaultButton
                className={saveButtonClassName}
                text="Save"
                onClick={handleSaveClick}
              />
              <DefaultButton
                className={cancelButtonClassName}
                text="Cancel"
                onClick={handleCancelClick}
              />
            </Stack>
          )}
        </div>
        <div className={passwordDivClassName}>
          <h2>Change password</h2>
          <TextField
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            canRevealPassword
            revealPasswordAriaLabel="Show password"
            styles={profileInputStyle}
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            styles={profileInputStyle}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            styles={profileInputStyle}
          />
          <DefaultButton
            className={savePasswordButtonClassName}
            text="Save"
            onClick={savePasswordChange}
          />
        </div>
      </div>
    </div>
  );
};
