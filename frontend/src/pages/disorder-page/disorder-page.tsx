import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [initialDisorder, setInitialDisorder] = useState<Disorder | null>(null);
  const [disorder, setDisorder] = useState<Disorder | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    try {
      console.log("Saving disorder:", disorder);
      await updateDisorder(token!, disorder!);
      setEditing(false);
      setInitialDisorder(disorder);
    } catch (error) {
      console.error(error);
      alert("Failed to save the changes.");
    }
  };

  const handleCancel = () => {
    setDisorder(initialDisorder);
    setEditing(false);
  };

  const handleDelete = () => {
    if (disorder && disorder.id) {
      deleteDisorder(token!, disorder.id)
        .then((response) => {
          setConfirmDelete(false);
          navigate("/user");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else {
      console.error("Disorder or Disorder ID is undefined", disorder);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    let val: string | number = value;

    if (type === "number") {
      val = parseInt(value, 10);
    } else if (!isNaN(Number(value))) {
      val = parseInt(value, 10);
    }

    setDisorder((prevDisorder) => ({
      ...prevDisorder!,
      [name]: val,
    }));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (id) {
      const id_val = parseInt(id);
      if (!isNaN(id_val)) {
        getDisorder(token, id_val)
          .then((response) => {
            console.log("Fetched Disorder:", id_val, response);
            setDisorder(response);
            setInitialDisorder(response);
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to fetch the disorder details.");
          });
      } else {
        console.error("Invalid ID");
      }
    } else {
      console.error("ID is undefined");
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
          <label>
            Personal History:
            <select
              name="personal_history"
              value={disorder?.personal_history || 0}
              onChange={handleChange}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </label>
          <label>
            Current Stressors:
            <select
              name="current_stressors"
              value={disorder?.current_stressors || 0}
              onChange={handleChange}
            >
              <option value={0}>High</option>
              <option value={1}>Moderate</option>
              <option value={2}>Low</option>
            </select>
          </label>
          <label>
            Symptoms:
            <select
              name="symptoms"
              value={disorder?.symptoms || 0}
              onChange={handleChange}
            >
              <option value={0}>No Panic attacks</option>
              <option value={1}>Panic attacks</option>
            </select>
          </label>
          <label>
            Severity:
            <select
              name="severity"
              value={disorder?.severity || 0}
              onChange={handleChange}
            >
              <option value={0}>Mild</option>
              <option value={1}>Moderate</option>
              <option value={2}>Severe</option>
            </select>
          </label>
          <label>
            Impact on Life:
            <select
              name="impact_on_life"
              value={disorder?.impact_on_life || 0}
              onChange={handleChange}
            >
              <option value={0}>Mild</option>
              <option value={1}>Moderate</option>
              <option value={2}>Severe</option>
            </select>
          </label>
          <label>
            Demographics:
            <select
              name="demographics"
              value={disorder?.demographics || 0}
              onChange={handleChange}
            >
              <option value={0}>Rural</option>
              <option value={1}>Urban</option>
            </select>
          </label>
          <label>
            Medical History:
            <select
              name="medical_history"
              value={disorder?.medical_history || 0}
              onChange={handleChange}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </label>
          <label>
            Psychiatric History:
            <select
              name="psychiatric_history"
              value={disorder?.psychiatric_history || 0}
              onChange={handleChange}
            >
              <option value={0}>None</option>
              <option value={1}>Other</option>
              <option value={2}>Depressive disorder</option>
            </select>
          </label>
          <label>
            Substance Use:
            <select
              name="substance_use"
              value={disorder?.substance_use || 0}
              onChange={handleChange}
            >
              <option value={0}>No Drugs</option>
              <option value={1}>Drugs</option>
            </select>
          </label>
          <label>
            Coping Mechanisms:
            <select
              name="coping_mechanisms"
              value={disorder?.coping_mechanisms || 0}
              onChange={handleChange}
            >
              <option value={0}>Socializing</option>
              <option value={1}>Other</option>
            </select>
          </label>
          <label>
            Social Support:
            <select
              name="social_support"
              value={disorder?.social_support || 0}
              onChange={handleChange}
            >
              <option value={0}>High</option>
              <option value={1}>Moderate</option>
              <option value={2}>Low</option>
            </select>
          </label>
          <label>
            Lifestyle Factors:
            <select
              name="lifestyle_factors"
              value={disorder?.lifestyle_factors || 0}
              onChange={handleChange}
            >
              <option value={0}>Sleep quality</option>
              <option value={1}>Exercise</option>
              <option value={2}>Diet</option>
            </select>
          </label>
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
          <h1>Disorder Details</h1>
          <p>
            <strong>Age:</strong> {disorder?.age}
          </p>
          <p>
            <strong>Gender:</strong>{" "}
            {disorder?.gender === 0 ? "Male" : "Female"}
          </p>
          <p>
            <strong>Family History:</strong>{" "}
            {disorder?.family_history === 0 ? "No" : "Yes"}
          </p>
          <p>
            <strong>Personal History:</strong>{" "}
            {disorder?.personal_history === 0 ? "No" : "Yes"}
          </p>
          <p>
            <strong>Current Stressors:</strong>{" "}
            {disorder?.current_stressors === 0
              ? "High"
              : disorder?.current_stressors === 1
              ? "Moderate"
              : "Low"}
          </p>
          <p>
            <strong>Symptoms:</strong>{" "}
            {disorder?.symptoms === 0 ? "No Panic attacks" : "Panic attacks"}
          </p>
          <p>
            <strong>Severity:</strong>{" "}
            {disorder?.severity === 0
              ? "Mild"
              : disorder?.severity === 1
              ? "Moderate"
              : "Severe"}
          </p>
          <p>
            <strong>Impact on Life:</strong>{" "}
            {disorder?.impact_on_life === 0
              ? "Mild"
              : disorder?.impact_on_life === 1
              ? "Moderate"
              : "Severe"}
          </p>
          <p>
            <strong>Demographics:</strong>{" "}
            {disorder?.demographics === 0 ? "Rural" : "Urban"}
          </p>
          <p>
            <strong>Medical History:</strong>{" "}
            {disorder?.medical_history === 0 ? "No" : "Yes"}
          </p>
          <p>
            <strong>Psychiatric History:</strong>{" "}
            {disorder?.psychiatric_history === 0
              ? "None"
              : disorder?.psychiatric_history === 1
              ? "Other"
              : "Depressive disorder"}
          </p>
          <p>
            <strong>Substance Use:</strong>{" "}
            {disorder?.substance_use === 0 ? "No Drugs" : "Drugs"}
          </p>
          <p>
            <strong>Coping Mechanisms:</strong>{" "}
            {disorder?.coping_mechanisms === 0 ? "Socializing" : "Other"}
          </p>
          <p>
            <strong>Social Support:</strong>{" "}
            {disorder?.social_support === 0
              ? "High"
              : disorder?.social_support === 1
              ? "Moderate"
              : "Low"}
          </p>
          <p>
            <strong>Lifestyle Factors:</strong>{" "}
            {disorder?.lifestyle_factors === 0
              ? "Sleep quality"
              : disorder?.lifestyle_factors === 1
              ? "Exercise"
              : "Diet"}
          </p>
          <div className={buttonsClassName}>
            <DefaultButton
              className={editButtonClassName}
              text="Edit"
              onClick={handleEdit}
            />
            <DefaultButton
              className={deleteButtonClassName}
              text="Delete"
              onClick={() => setConfirmDelete(true)}
            />
          </div>
          <Dialog
            hidden={!confirmDelete}
            onDismiss={() => setConfirmDelete(false)}
            dialogContentProps={{
              type: DialogType.normal,
              title: "Delete Disorder",
              subText: "Are you sure you want to delete this disorder?",
            }}
          >
            <DialogFooter className={confirmationsClassName}>
              <PrimaryButton
                className={confirmationDeleteButtonClassName}
                onClick={handleDelete}
                text="Delete"
              />
              <DefaultButton
                className={confirmationCancelButtonClassName}
                onClick={() => setConfirmDelete(false)}
                text="Cancel"
              />
            </DialogFooter>
          </Dialog>
        </div>
      )}
    </div>
  );
};
