import React, { useEffect, useState } from "react";
import {
  DefaultButton,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { Disorder } from "../../models/disorder";
import { getDisorders, predict } from "../../services/api-service";
import {
  predictPageClassName,
  predictButtonClassName,
} from "./predict-page-style";

export const PredictPage: React.FC = () => {
  const [disorders, setDisorders] = useState<Disorder[]>([]);
  const [selectedDisorder, setSelectedDisorder] = useState<number | undefined>(
    undefined
  );
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<
    number | undefined
  >(undefined);
  const [prediction, setPrediction] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getAndSetDisorders();
    } else {
      navigate("/login");
    }
  }, [token]);

  const getAndSetDisorders = () => {
    const responseDisorders = getDisorders(token!);
    responseDisorders
      .then((response) => {
        setDisorders(response);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handlePredict = () => {
    if (selectedDisorder !== undefined && selectedAlgorithm !== undefined) {
      predict(token!, selectedDisorder, selectedAlgorithm)
        .then((response) => {
          setPrediction(response);
        })
        .catch((error) => {
          console.error("There was an error predicting the disorder!", error);
        });
    }
  };

  const algorithmOptions: IDropdownOption[] = [
    { key: 0, text: "SVM" },
    { key: 1, text: "Decision Tree" },
    { key: 2, text: "XGBoost" },
  ];

  const disorderOptions: IDropdownOption[] = disorders.map((disorder) => ({
    key: disorder.id!,
    text: `Disorder ${disorder.id!} - Age: ${disorder.age}`,
  }));

  const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

  return (
    <div className={predictPageClassName}>
      <h1>Predict Panic Disorder</h1>
      <Dropdown
        label="Select Algorithm"
        selectedKey={selectedAlgorithm}
        onChange={(event, option) =>
          setSelectedAlgorithm(option?.key as number)
        }
        placeholder="Select an algorithm"
        options={algorithmOptions}
        styles={dropdownStyles}
      />
      <Dropdown
        label="Select Disorder"
        selectedKey={selectedDisorder}
        onChange={(event, option) => setSelectedDisorder(option?.key as number)}
        placeholder="Select a disorder"
        options={disorderOptions}
        styles={dropdownStyles}
      />
      <DefaultButton
        className={predictButtonClassName}
        text="Predict"
        onClick={handlePredict}
      />
      {prediction && <div>Prediction: {prediction}</div>}
    </div>
  );
};

export default PredictPage;
