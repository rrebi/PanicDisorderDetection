import {
  DefaultButton,
  DocumentCard,
  DocumentCardActivity,
  DocumentCardDetails,
  DocumentCardTitle,
  IDocumentCardActivityPerson,
  Dropdown,
  IDropdownOption,
  Stack,
} from "@fluentui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Disorder } from "../../models/disorder";
import { getDisorders } from "../../services/api-service";
import {
  addDisorderButtonClassName,
  disorderCardClassName,
  disorderCardDetailsClassName,
  disorderCardDetailsTextClassName,
  disorderCardTitleClassName,
  disorderDivClassName,
  userDashboardMainDivClassName,
} from "./aimodel-page-style";

const aiModelOptions: IDropdownOption[] = [
  { key: "svm", text: "SVM" },
  { key: "xgboost", text: "XGBoost" },
  { key: "decision_tree", text: "Decision Tree" },
];

export const AiModel = () => {
  const navigate = useNavigate();
  const [disorders, setDisorders] = useState<Disorder[]>([]);
  const [selectedModel, setSelectedModel] = useState<number>();
  const [selectedDisorderId, setSelectedDisorderId] = useState<number>();

  const token = localStorage.getItem("token");

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

  const handleEditClick = (disorderId: number) => {
    navigate(`/user/disorder/${disorderId}`);
  };

  //diff
  const handleModelChange = (
    _event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ) => {
    setSelectedModel(option?.key as string);
  };

  //diff
  const handlePredict = () => {
    if (selectedDisorderId !== undefined && selectedModel !== undefined) {
      navigate(
        `/predict?disorderId=${selectedDisorderId}&model=${selectedModel}`
      );
    } else {
      alert("Please select a disorder and an AI model.");
    }
  };

  const people: IDocumentCardActivityPerson[] = [
    { name: localStorage.getItem("username")!, profileImageSrc: "" },
  ];

  const disorderCards = disorders.map((disorder) => (
    <DocumentCard className={disorderCardClassName} key={disorder.id}>
      <DocumentCardTitle
        className={disorderCardTitleClassName}
        title={disorder.age.toString()}
      />
      <DocumentCardDetails className={disorderCardDetailsClassName}>
        <DocumentCardActivity
          className={disorderCardDetailsTextClassName}
          activity={disorder.gender.toString()}
          people={people}
        />
      </DocumentCardDetails>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <DefaultButton
          text="Edit"
          onClick={() => handleEditClick(disorder.id)}
        />
        <DefaultButton
          text="Select"
          onClick={() => setSelectedDisorderId(disorder.id)}
          disabled={selectedDisorderId === disorder.id}
        />
      </Stack>
    </DocumentCard>
  ));

  return (
    <div className={userDashboardMainDivClassName}>
      <h1>Patient Dashboard</h1>
      <h2>Disorders</h2>
      <div className={disorderDivClassName}>{disorderCards}</div>
      <Dropdown
        placeholder="Select an AI Model"
        options={aiModelOptions}
        onChange={handleModelChange}
        selectedKey={selectedModel}
      />
      <DefaultButton
        className={addDisorderButtonClassName}
        iconProps={{ iconName: "Add" }}
        text="New Disorder"
        onClick={() => navigate("/user/add-disorder")}
      />
      <DefaultButton
        text="Predict"
        onClick={handlePredict}
        disabled={
          selectedDisorderId === undefined || selectedModel === undefined
        }
      />
    </div>
  );
};
