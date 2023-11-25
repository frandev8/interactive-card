import React, { useState } from "react";
import styles from "./Main.module.css";
import CardForm from "../Utilities/CardForm";
import CardSuccessful from "../Utilities/CardSuccessful";

function Main(props) {
  const [isFormValid, setFormValidity] = useState(false);

  function checkFormValidity(formStateObj) {
    // const { isNumInValid, isNameInValid, isMonthInValid, isYearInValid, isCVCInValid, isFormSubmitted} =
    // formStateObj;

    // if (
    //   isCVCInValid &&
    //   isNameInValid &&
    //   isMonthInValid &&
    //   isYearInValid &&
    //   isNumInValid && 
    //  isFormSubmitted
    // ) {
    //   setFormValidity(true);
    // } else {
    //   setFormValidity(false);
    // }
  }

  return (
    <main className={`${styles["main"]}`}>
      {!isFormValid && (
        <CardForm
          isFormValid={isFormValid}
          getCardName={props.getCardName}
          getCardNum={props.getCardNum}
          getCardDate={props.getCardDate}
          getCardCVC={props.getCardCVC}
          checkFormValidity={checkFormValidity}
        />
      )}
      {isFormValid && <CardSuccessful />}
    </main>
  );
}

export default Main;
