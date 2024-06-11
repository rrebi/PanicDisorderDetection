import { DefaultButton } from "@fluentui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Disorder } from "../../models/disorder";
import { addDisorder } from "../../services/api-service";
import {
  addDisorderClassName,
  buttonsClassName,
  cancelButtonClassName,
  saveButtonClassName,
  parenteditDisorderClassName,
  inputcontainer,
  inputStyle,
} from "./add-disorder-page-style";

export const AddDisorderPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Disorder>({
    user_id: 1,
    age: 26,
    gender: "Female",
    family_history: "No",
    personal_history: "No",
    current_stressors: "Low",
    symptoms: "Dizziness",
    severity: "Mild",
    impact_on_life: "Mild",
    demographics: "Urban",
    medical_history: "Asthma",
    psychiatric_history: "Depressive disorder",
    substance_use: "Alcohol",
    coping_mechanisms: "Exercise",
    social_support: "High",
    lifestyle_factors: "Exercise",
  });

  const [ageError, setAgeError] = useState<string>("");
  const token = localStorage.getItem("token");

  const handleSave = () => {
    console.log("FormData:", formData);

    if (formData.age === null) {
      setAgeError("Age is null!");
      return;
    }
    addDisorder(token!, formData)
      .then((response) => {
        console.log("Response from API:", response);
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
        val = parseInt(value, 10); // Use radix 10 for base 10 numbers
      }

      console.log(`Updating formData.${name} to:`, val);
      setFormData((prev) => ({
        ...prev,
        [name]: val,
      }));
    },
    []
  );

  const handleCancel = () => {
    navigate("/user");
  };

  if (!token) {
    navigate("/login");
  }

  return (
    <div className={parenteditDisorderClassName}>
      <div className={addDisorderClassName}>
        <h2>Add New Disorder Entry</h2>
        <div className={inputcontainer}>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            className={inputStyle}
            onChange={handleChange}
          />
        </div>
        <div className={inputcontainer}>
          <label>
            Gender:
            <select
              className={inputStyle}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Family History:
            <select
              className={inputStyle}
              name="family_history"
              value={formData.family_history}
              onChange={handleChange}
            >
              <option value={"No"}>No</option>
              <option value={"Yes"}>Yes</option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Personal History:
            <select
              className={inputStyle}
              name="personal_history"
              value={formData.personal_history}
              onChange={handleChange}
            >
              <option value={"No"}>No</option>
              <option value={"Yes"}>Yes</option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Current Stressors:
            <select
              className={inputStyle}
              name="current_stressors"
              value={formData.current_stressors}
              onChange={handleChange}
            >
              <option value={"Moderate"}>Moderate</option>
              <option value={"High"}>High</option>
              <option value={"Low"}>Low</option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Symptoms:
            <select
              className={inputStyle}
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
            >
              <option value={"Shortness of breath"}>Shortness of breath</option>
              <option value={"Panic attacks"}>Panic attacks</option>
              <option value={"Chest pain"}>Chest pain</option>
              <option value={"Dizziness"}>Dizziness</option>
              <option value={"Fear of losing control"}>
                Fear of losing control
              </option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Severity:
            <select
              className={inputStyle}
              name="severity"
              value={formData.severity}
              onChange={handleChange}
            >
              <option value={"Mild"}>Mild</option>
              <option value={"Moderate"}>Moderate</option>
              <option value={"Severe"}>Severe</option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Impact on Life:
            <select
              className={inputStyle}
              name="impact_on_life"
              value={formData.impact_on_life}
              onChange={handleChange}
            >
              <option value={"Mild"}>Mild</option>
              <option value={"Significant"}>Significant</option>
              <option value={"Moderate"}>Moderate</option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Demographics:
            <select
              className={inputStyle}
              name="demographics"
              value={formData.demographics}
              onChange={handleChange}
            >
              <option value={"Urban"}>Urban</option>
              <option value={"Rural"}>Rural</option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Medical History:
            <select
              className={inputStyle}
              name="medical_history"
              value={formData.medical_history}
              onChange={handleChange}
            >
              <option value={"Diabetes"}>Diabetes</option>
              <option value={"Asthma"}>Asthma</option>
              <option value={"Heart disease"}>Heart disease</option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Psychiatric History:
            <select
              className={inputStyle}
              name="psychiatric_history"
              value={formData.psychiatric_history}
              onChange={handleChange}
            >
              <option value={"Bipolar disorder"}>Bipolar disorder</option>
              <option value={"Anxiety disorder"}>Anxiety disorder</option>
              <option value={"Depressive disorder"}>Depressive disorder</option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Substance Use:
            <select
              className={inputStyle}
              name="substance_use"
              value={formData.substance_use}
              onChange={handleChange}
            >
              <option value={"Drugs"}>Drugs</option>
              <option value={"Alcohol"}>Alcohol</option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Coping Mechanisms:
            <select
              className={inputStyle}
              name="coping_mechanisms"
              value={formData.coping_mechanisms}
              onChange={handleChange}
            >
              <option value={"Socializing"}>Socializing </option>
              <option value={"Exercise"}>Exercise </option>
              <option value={"Seeking therapy"}>Seeking therapy</option>
              <option value={"Meditation"}>Meditation </option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Social Support:
            <select
              className={inputStyle}
              name="social_support"
              value={formData.social_support}
              onChange={handleChange}
            >
              <option value={"High"}>High</option>
              <option value={"Moderate"}>Moderate</option>
              <option value={"Low"}>Low</option>
            </select>
          </label>
        </div>
        <div className={inputcontainer}>
          <label>
            Lifestyle Factors:
            <select
              className={inputStyle}
              name="lifestyle_factors"
              value={formData.lifestyle_factors}
              onChange={handleChange}
            >
              <option value={"Sleep quality"}>Sleep quality</option>
              <option value={"Exercise"}>Exercise</option>
              <option value={"Diet"}>Diet</option>
            </select>
          </label>
        </div>

        <div className={buttonsClassName}>
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
  );
};
