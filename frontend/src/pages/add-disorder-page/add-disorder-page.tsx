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
    gender: 1, // Female
    family_history: 1, // Yes
    personal_history: 1, // No
    current_stressors: 2, // Low
    symptoms: 1, // Panic attacks
    severity: 2, // Severe
    impact_on_life: 0, // Mild
    demographics: 1, // Urban
    medical_history: 0, // Diabetes
    psychiatric_history: 2, // Depressive disorder
    substance_use: 1, // Drugs
    coping_mechanisms: 0, // Socializing
    social_support: 2, // Low
    lifestyle_factors: 0, // Sleep quality
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
        navigate("/disorders");
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
    navigate("/disorders");
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
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </select>
      </label>
      <label>
        Current Stressors:
        <select
          name="current_stressors"
          value={formData.current_stressors}
          onChange={handleChange}
        >
          <option value={0}>None</option>
          <option value={1}>Mild</option>
          <option value={2}>Severe</option>
        </select>
      </label>
      <label>
        Symptoms:
        <select
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
        >
          <option value={0}>None</option>
          <option value={1}>Mild</option>
          <option value={2}>Moderate</option>
          <option value={3}>Severe</option>
          <option value={4}>Extreme</option>
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
          <option value={0}>Low</option>
          <option value={1}>Moderate</option>
          <option value={2}>High</option>
        </select>
      </label>
      <label>
        Demographics:
        <select
          name="demographics"
          value={formData.demographics}
          onChange={handleChange}
        >
          <option value={0}>Urban</option>
          <option value={1}>Rural</option>
        </select>
      </label>
      <label>
        Medical History:
        <select
          name="medical_history"
          value={formData.medical_history}
          onChange={handleChange}
        >
          <option value={0}>None</option>
          <option value={1}>Mild</option>
          <option value={2}>Moderate</option>
          <option value={3}>Severe</option>
        </select>
      </label>
      <label>
        Psychiatric History:
        <select
          name="psychiatric_history"
          value={formData.psychiatric_history}
          onChange={handleChange}
        >
          <option value={0}>None</option>
          <option value={1}>Mild</option>
          <option value={2}>Moderate</option>
          <option value={3}>Severe</option>
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
          <option value={1}>Occasional</option>
          <option value={2}>Frequent</option>
        </select>
      </label>
      <label>
        Coping Mechanisms:
        <select
          name="coping_mechanisms"
          value={formData.coping_mechanisms}
          onChange={handleChange}
        >
          <option value={0}>None</option>
          <option value={1}>Poor</option>
          <option value={2}>Moderate</option>
          <option value={3}>Good</option>
        </select>
      </label>
      <label>
        Social Support:
        <select
          name="social_support"
          value={formData.social_support}
          onChange={handleChange}
        >
          <option value={0}>None</option>
          <option value={1}>Moderate</option>
          <option value={2}>Strong</option>
        </select>
      </label>
      <label>
        Lifestyle Factors:
        <select
          name="lifestyle_factors"
          value={formData.lifestyle_factors}
          onChange={handleChange}
        >
          <option value={0}>Poor</option>
          <option value={1}>Moderate</option>
          <option value={2}>Good</option>
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
