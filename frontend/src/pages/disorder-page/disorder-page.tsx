import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ANGER_COLOR,
  FEAR_COLOR,
  JOY_COLOR,
  LOVE_COLOR,
  SADNESS_COLOR,
  SURPRISE_COLOR,
} from "../../constants";
import { Disorder } from "../../models/disorder";
import {
  deleteDisorder,
  getDisorder,
  updateDisorder,
} from "../../services/api-service";
import {
  buttonsClassName,
  cancelButtonClassName,
  deleteButtonClassName,
  editButtonClassName,
  editButtonsClassName,
  editInputClassName,
  editEntryInputStyle,
  editDisorderClassName,
  saveButtonClassName,
  viewDisorderClassName,
  confirmationsClassName,
  cofirmationStyle,
  confirmationDeleteButtonClassName,
  confirmationCancelButtonClassName,
} from "./disorder-page-style";

export const DisorderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialDisorder, setInitialDisorder] = useState<Disorder>();
  const [disorder, setDisorder] = useState<Disorder>();
  const token = localStorage.getItem("token");
  const [editing, setEditing] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    updateDisorder(token!, disorder!)
      .then((response) => {
        setEditing(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleCancel = () => {
    setDisorder(initialDisorder);
    setEditing(false);
  };

  const handleDelete = () => {
    deleteDisorder(token!, disorder!._id!)
      .then((response) => {
        setConfirmDelete(false);
        navigate("/user");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = event.target;
      let val: string | number = value;

      if (type === "number") {
        val = parseInt(value);
      } else if (!isNaN(Number(value))) {
        val = parseInt(value, 10); // Use radix 10 for base 10 numbers
      }

      console.log(`Updating disorder.${name} to:`, val);
      setDisorder((prevDisorder) => ({
        ...prevDisorder!,
        [name]: val,
      }));
    },
    []
  );

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const id_val = parseInt(id!);
    if (!isNaN(id_val)) {
      getDisorder(token!, id_val)
        .then((response) => {
          setDisorder(response);
          setInitialDisorder(response);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else {
      console.log("Invalid ID");
    }
  }, [id, token, navigate]);

  return (
    <div>
      {editing ? (
        <div className={editDisorderClassName}>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={disorder?.age || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              value={disorder?.gender || 0}
              onChange={handleChange}
            >
              <option value={0}>Male</option>
              <option value={1}>Female</option>
            </select>
          </label>
          <label>
            Family History:
            <select
              name="family_history"
              value={disorder?.family_history || 0}
              onChange={handleChange}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </label>
          {/* Add other fields similarly */}
          <div className={editButtonsClassName}>
            <DefaultButton
              className={saveButtonClassName}
              text="Save"
              onClick={handleSave}
            />
            <DefaultButton
              className={cancelButtonClassName}
              text="Cancel"
              onClick={handleCancel}
            />
          </div>
        </div>
      ) : (
        <div className={viewDisorderClassName}>
          <h1>{disorder?.age}</h1>
          <p>{disorder?.gender === 0 ? "Male" : "Female"}</p>
          {/* Display other fields similarly */}
          <div className={buttonsClassName}>
            <PrimaryButton
              className={editButtonClassName}
              text="Edit"
              onClick={handleEdit}
            />
            <DefaultButton
              iconProps={{ iconName: "Delete" }}
              className={deleteButtonClassName}
              text="Delete"
              onClick={() => setConfirmDelete(true)}
            />
          </div>
        </div>
      )}
      <Dialog
        modalProps={{
          className: confirmationsClassName,
        }}
        hidden={!confirmDelete}
        onDismiss={() => setConfirmDelete(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Confirm Delete",
          subText: "Are you sure you want to delete this disorder entry?",
          className: confirmationsClassName,
        }}
        styles={cofirmationStyle}
      >
        <DialogFooter>
          <PrimaryButton
            className={confirmationDeleteButtonClassName}
            text="Delete"
            onClick={handleDelete}
          />
          <DefaultButton
            className={confirmationCancelButtonClassName}
            text="Cancel"
            onClick={() => setConfirmDelete(false)}
          />
        </DialogFooter>
      </Dialog>
    </div>
  );
};
