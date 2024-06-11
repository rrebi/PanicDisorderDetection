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
  inputStyle,
  parenteditDisorderClassName,
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

  const handleCancelEdit = () => {
    navigate("/user");
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

      console.log(`Updating formData.${name} to:`, val);
      setDisorder((prevDisorder) => ({
        ...prevDisorder!,
        [name]: val,
      }));
    }
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
        <div className={parenteditDisorderClassName}>
          <div className={editDisorderClassName}>
            <label>
              Age:
              <input
                type="number"
                name="age"
                className={inputStyle}
                value={disorder?.age}
                onChange={handleChange}
              />
            </label>
            <label>
              Gender:
              <select
                className={inputStyle}
                name="gender"
                value={disorder?.gender}
                onChange={handleChange}
              >
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </select>
            </label>
            <label>
              Family History:
              <select
                className={inputStyle}
                name="family_history"
                value={disorder?.family_history}
                onChange={handleChange}
              >
                <option value={"No"}>No</option>
                <option value={"Yes"}>Yes</option>
              </select>
            </label>
            <label>
              Personal History:
              <select
                className={inputStyle}
                name="personal_history"
                value={disorder?.personal_history}
                onChange={handleChange}
              >
                <option value={"No"}>No</option>
                <option value={"Yes"}>Yes</option>
              </select>
            </label>
            <label>
              Current Stressors:
              <select
                className={inputStyle}
                name="current_stressors"
                value={disorder?.current_stressors}
                onChange={handleChange}
              >
                <option value={"Moderate"}>Moderate</option>
                <option value={"High"}>High</option>
                <option value={"Low"}>Low</option>
              </select>
            </label>
            <label>
              Symptoms:
              <select
                className={inputStyle}
                name="symptoms"
                value={disorder?.symptoms}
                onChange={handleChange}
              >
                {" "}
                <option value={"Shortness of breath"}>
                  Shortness of breath
                </option>
                <option value={"Panic attacks"}>Panic attacks</option>
                <option value={"Chest pain"}>Chest pain</option>
                <option value={"Dizziness"}>Dizziness</option>
                <option value={"Fear of losing control"}>
                  Fear of losing control
                </option>
              </select>
            </label>
            <label>
              Severity:
              <select
                className={inputStyle}
                name="severity"
                value={disorder?.severity}
                onChange={handleChange}
              >
                <option value={"Mild"}>Mild</option>
                <option value={"Moderate"}>Moderate</option>
                <option value={"Severe"}>Severe</option>
              </select>
            </label>
            <label>
              Impact on Life:
              <select
                className={inputStyle}
                name="impact_on_life"
                value={disorder?.impact_on_life}
                onChange={handleChange}
              >
                <option value={"Mild"}>Mild</option>
                <option value={"Significant"}>Significant</option>
                <option value={"Moderate"}>Moderate</option>
              </select>
            </label>
            <label>
              Demographics:
              <select
                className={inputStyle}
                name="demographics"
                value={disorder?.demographics}
                onChange={handleChange}
              >
                <option value={"Urban"}>Urban</option>
                <option value={"Rural"}>Rural</option>
              </select>
            </label>
            <label>
              Medical History:
              <select
                className={inputStyle}
                name="medical_history"
                value={disorder?.medical_history}
                onChange={handleChange}
              >
                <option value={"Diabetes"}>Diabetes</option>
                <option value={"Asthma"}>Asthma</option>
                <option value={"Heart disease"}>Heart disease</option>
              </select>
            </label>
            <label>
              Psychiatric History:
              <select
                className={inputStyle}
                name="psychiatric_history"
                value={disorder?.psychiatric_history}
                onChange={handleChange}
              >
                <option value={"Bipolar disorder"}>Bipolar disorder</option>
                <option value={"Anxiety disorder"}>Anxiety disorder</option>
                <option value={"Depressive disorder"}>
                  Depressive disorder
                </option>
              </select>
            </label>
            <label>
              Substance Use:
              <select
                className={inputStyle}
                name="substance_use"
                value={disorder?.substance_use}
                onChange={handleChange}
              >
                <option value={"Drugs"}>Drugs</option>
                <option value={"Alcohol"}>Alcohol</option>
              </select>
            </label>
            <label>
              Coping Mechanisms:
              <select
                className={inputStyle}
                name="coping_mechanisms"
                value={disorder?.coping_mechanisms}
                onChange={handleChange}
              >
                <option value={"Socializing"}>Socializing </option>
                <option value={"Exercise"}>Exercise </option>
                <option value={"Seeking therapy"}>Seeking therapy</option>
                <option value={"Meditation"}>Meditation </option>
              </select>
            </label>
            <label>
              Social Support:
              <select
                className={inputStyle}
                name="social_support"
                value={disorder?.social_support}
                onChange={handleChange}
              >
                <option value={"High"}>High</option>
                <option value={"Moderate"}>Moderate</option>
                <option value={"Low"}>Low</option>
              </select>
            </label>
            <label>
              Lifestyle Factors:
              <select
                className={inputStyle}
                name="lifestyle_factors"
                value={disorder?.lifestyle_factors}
                onChange={handleChange}
              >
                <option value={"Sleep quality"}>Sleep quality</option>
                <option value={"Exercise"}>Exercise</option>
                <option value={"Diet"}>Diet</option>
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
        </div>
      ) : (
        <div className={parenteditDisorderClassName}>
          <div className={viewDisorderClassName}>
            <h2 style={{ fontSize: "40px" }}>Disorder Details</h2>
            <p>
              <strong>Age:</strong> {disorder?.age}
            </p>
            <p>
              <strong>Gender:</strong> {disorder?.gender}
            </p>
            <p>
              <strong>Family History:</strong> {disorder?.family_history}
            </p>
            <p>
              <strong>Personal History:</strong> {disorder?.personal_history}
            </p>
            <p>
              <strong>Current Stressors:</strong> {disorder?.current_stressors}
            </p>
            <p>
              <strong>Symptoms:</strong> {disorder?.symptoms}
            </p>
            <p>
              <strong>Severity:</strong> {disorder?.severity}
            </p>
            <p>
              <strong>Impact on Life:</strong> {disorder?.impact_on_life}
            </p>
            <p>
              <strong>Demographics:</strong> {disorder?.demographics}
            </p>
            <p>
              <strong>Medical History:</strong> {disorder?.medical_history}
            </p>
            <p>
              <strong>Psychiatric History:</strong>{" "}
              {disorder?.psychiatric_history}
            </p>
            <p>
              <strong>Substance Use:</strong> {disorder?.substance_use}
            </p>
            <p>
              <strong>Coping Mechanisms:</strong> {disorder?.coping_mechanisms}
            </p>
            <p>
              <strong>Social Support:</strong> {disorder?.social_support}
            </p>
            <p>
              <strong>Lifestyle Factors:</strong> {disorder?.lifestyle_factors}
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
              <DefaultButton
                className={cancelButtonClassName}
                text="Cancel"
                onClick={handleCancelEdit}
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
        </div>
      )}
    </div>
  );
};
