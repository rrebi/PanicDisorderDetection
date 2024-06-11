import {
  DefaultButton,
  DocumentCard,
  DocumentCardActivity,
  DocumentCardDetails,
  DocumentCardTitle,
  IDocumentCardActivityPerson,
} from "@fluentui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Disorder } from "../../models/disorder";
import { getDisorder, getDisorders } from "../../services/api-service";
import {
  addDisorderButtonClassName,
  disorderCardClassName,
  disorderCardDetailsClassName,
  disorderCardDetailsTextClassName,
  disorderCardTitleClassName,
  disorderDivClassName,
  ClassMoveButtons,
  userDashboardMainDivClassName,
} from "./user-dashboard-style";

export const UserDashboard = () => {
  const navigate = useNavigate();
  const [disorders, setDisorders] = useState<Disorder[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getAndSetDisorders();
    } else {
      navigate("/login");
    }
  }, [token]);

  const handleCardClick = (disorderId: number) => {
    navigate(`/user/disorder/${disorderId}`);
  };

  // get disorders from database
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

  const people: IDocumentCardActivityPerson[] = [
    { name: localStorage.getItem("username")!, profileImageSrc: "" },
  ];
  4;

  // map disorders to disorder cards
  const disorderCards = disorders.map((disorder) => (
    <DocumentCard
      className={disorderCardClassName}
      key={disorder.id}
      onClick={() => handleCardClick(disorder.id!)}
    >
      <DocumentCardTitle
        className={disorderCardTitleClassName}
        title={`ID: ${disorder.id?.toString()}`}
      />
      <DocumentCardDetails className={disorderCardDetailsClassName}>
        <DocumentCardActivity
          className={disorderCardDetailsTextClassName}
          activity={disorder.age.toString()}
          people={people}
        />
      </DocumentCardDetails>
    </DocumentCard>
  ));

  return (
    <div className={userDashboardMainDivClassName}>
      <div className={ClassMoveButtons}>
        <h2>Disorders</h2>
        <DefaultButton
          className={addDisorderButtonClassName}
          iconProps={{ iconName: "Add" }}
          text="New Disorder"
          onClick={() => navigate("/user/add-disorder")}
        />
      </div>
      <br />
      <div className={disorderDivClassName}>{disorderCards}</div>
    </div>
  );
};
