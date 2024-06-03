import { DefaultButton, TextField } from "@fluentui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Disorder } from "../../models/disorder";
import { addDisorder } from "../../services/api-service";
import {
  addInputClassName,
  addDisorderClassName,
  addDisorderTitleClassName,
  addTitleInputStyle,
  buttonsClassName,
  cancelButtonClassName,
  saveButtonClassName,
} from "./add-disorder-page-style";

export const AddDisorderPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Disorder>({
    user_id: 1,
    age: 26,
    gender: 1,
    family_history: 1,
    personal_history: 1,
    current_stressors: 2,
    symptoms: 1,
    severity: 2,
    impact_on_life: 0,
    demographics: 1,
    medical_history: 0,
    psychiatric_history: 2,
    substance_use: 1,
    coping_mechanisms: 0,
    social_support: 2,
    lifestyle_factors: 0,
  });

  const [ageError, setAgeError] = useState<string>("");
  const token = localStorage.getItem("token");

  const handleSave = () => {
    console.log("FormData:", formData); // Add this line

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
        // Parse numeric values to integers
        val = parseInt(value);
      } else {
        // For other fields, parse as integers if necessary
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
    <div className={addDisorderClassName}>
      <h2 className={addDisorderClassName}>Add a Disorder Entry</h2>

      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </label>
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value={0}>Male</option>
          <option value={1}>Female</option>
        </select>
      </label>
      <label>
        Family History:
        <select
          name="family_history"
          value={formData.family_history}
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
          value={formData.personal_history}
          onChange={handleChange}
        >
          <option value={1}>No</option>
          <option value={0}>Yes</option>
        </select>
      </label>
      <label>
        Current Stressors:
        <select
          name="current_stressors"
          value={formData.current_stressors}
          onChange={handleChange}
        >
          <option value={0}>Moderate</option>
          <option value={1}>High</option>
          <option value={2}>Low</option>
        </select>
      </label>
      <label>
        Symptoms:
        <select
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
        >
          <option value={0}>Shortness of breath</option>
          <option value={1}>Panic attacks</option>
          <option value={2}>Chest pain</option>
          <option value={3}>Dizziness</option>
          <option value={4}>Fear of losing control</option>
        </select>
      </label>
      <label>
        Severity:
        <select
          name="severity"
          value={formData.severity}
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
          value={formData.impact_on_life}
          onChange={handleChange}
        >
          <option value={0}>Mild</option>
          <option value={1}>Significant</option>
          <option value={2}>Moderate</option>
        </select>
      </label>
      <label>
        Demographics:
        <select
          name="demographics"
          value={formData.demographics}
          onChange={handleChange}
        >
          <option value={1}>Urban</option>
          <option value={0}>Rural</option>
        </select>
      </label>
      <label>
        Medical History:
        <select
          name="medical_history"
          value={formData.medical_history}
          onChange={handleChange}
        >
          <option value={0}>Diabetes</option>
          <option value={1}>Asthma</option>
          <option value={2}>None</option>
          <option value={3}>Heart disease</option>
        </select>
      </label>
      <label>
        Psychiatric History:
        <select
          name="psychiatric_history"
          value={formData.psychiatric_history}
          onChange={handleChange}
        >
          <option value={0}>Bipolar disorder</option>
          <option value={1}>Anxiety disorder</option>
          <option value={2}>Depressive disorder</option>
          <option value={3}>None</option>
        </select>
      </label>
      <label>
        Substance Use:
        <select
          name="substance_use"
          value={formData.substance_use}
          onChange={handleChange}
        >
          <option value={0}>None</option>
          <option value={1}>Drugs</option>
          <option value={2}>Alcohol</option>
        </select>
      </label>
      <label>
        Coping Mechanisms:
        <select
          name="coping_mechanisms"
          value={formData.coping_mechanisms}
          onChange={handleChange}
        >
          <option value={0}>Socializing </option>
          <option value={1}>Exercise </option>
          <option value={2}>Seeking therapy</option>
          <option value={3}>Meditation </option>
        </select>
      </label>
      <label>
        Social Support:
        <select
          name="social_support"
          value={formData.social_support}
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
          value={formData.lifestyle_factors}
          onChange={handleChange}
        >
          <option value={0}>Sleep quality</option>
          <option value={1}>Exercise</option>
          <option value={2}>Diet</option>
        </select>
      </label>
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
  );
};
