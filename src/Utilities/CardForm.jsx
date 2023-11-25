import React, { useState, useRef, useReducer } from "react";
import styles from "./CardForm.module.css";

// import { FaCalendarWeek } from "react-icons/fa";

function CardForm({
  getCardNum,
  getCardName,
  getCardDate,
  getCardCVC,
  checkFormValidity,
}) {
  // controlled forms for input elements
  const [cardName, setCardName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  // uncontrolled form for input element
  const monthValue = useRef();
  const yearValue = useRef();

  // initial state of input fields
  const initialInputsState = {
    isNumInValid: false,
    isNameInValid: false,
    isCVCInValid: false,
    isMonthInValid: false,
    isYearInValid: false,
    isFormSubmitted: false,
    cardNameErrorMsg: "",
    cardNumErrorMsg: "",
    cardCVCErrorMsg: "",
    cardMonthErrorMsg: "",
    cardYearErrorMsg: "",
  };

  // reducer function
  const inputStateReducer = (state, action) => {
    switch (action.type) {
      case "INSPECT_NAME_FIELD":
        const nameValue = action.value.trim();
        if (nameValue.length >= 1) {
          const matched = nameValue.match(/^[\d]+$/g);
          if (matched) {
            checkFormValidity({ ...state, isNameInValid: true });
            return {
              ...state,
              isNameInValid: true,
              cardNameErrorMsg: "Username can't be only numbers.",
            };
          }
          checkFormValidity({ ...state, isNameInValid: false });
          return { ...state, isNameInValid: false };
        } else {
          checkFormValidity({ ...state, isNameInValid: true });
          return {
            ...state,
            isNameInValid: true,
            cardNameErrorMsg: "Can't be blank.",
          };
        }
      case "INSPECT_NUM_FIELD":
        const numValue = action.value.trim();
        if (numValue.length >= 1) {
          const matched = numValue.match(/[\D]/gi);

          if (matched) {
            checkFormValidity({ ...state, isNumInValid: true });
            return {
              ...state,
              isNumInValid: true,
              cardNumErrorMsg: "Wrong format, numbers only.",
            };
          } else if (numValue.length !== 16) {
            checkFormValidity({ ...state, isNumInValid: true });
            return {
              ...state,
              isNumInValid: true,
              cardNumErrorMsg: "Must exactly be 16 digits",
            };
          } else {
            checkFormValidity({ ...state, isNumInValid: false });
            return { ...state, isNumInValid: false };
          }
        } else {
          checkFormValidity({ ...state, isNumInValid: true });
          return {
            ...state,
            isNumInValid: true,
            cardNumErrorMsg: "Can't be blank.",
          };
        }
      case "INSPECT_CVC_FIELD":
        const cvcValue = action.value.trim();
        const cvcValueLength = cvcValue.length;

        switch (true) {
          case parseInt(cvcValue) < 0:
            checkFormValidity({ ...state, isCVCInValid: true });
            return {
              ...state,
              isCVCInValid: true,
              cardCVCErrorMsg: "Can't be a negative number",
            };
          case cvcValueLength === 0:
            checkFormValidity({ ...state, isCVCInValid: true });
            return {
              ...state,
              isCVCInValid: true,
              cardCVCErrorMsg: "Can't be blank",
            };

          case cvcValueLength === 3:
            checkFormValidity({ ...state, isCVCInValid: false });
            return {
              ...state,
              isCVCInValid: false,
            };
            default:
              checkFormValidity({ ...state, isCVCInValid: true });
            return {
              ...state,
              isCVCInValid: true,
              cardCVCErrorMsg: "Must exactly be 3 digits",
            };
        }

      case "INSPECT_MONTH_FIELD":
        const monthVal = action.value.trim();

        if (!monthVal.length >= 1) {
          checkFormValidity({ ...state, isMonthInValid: true });
          
          return {
            ...state,
            isMonthInValid: true,
            cardMonthErrorMsg: "Can't be blank",
          };
        }

        if (!monthVal.includes(".")) {
          const transformMonthVal = parseInt(monthVal);

          switch (true) {
            case transformMonthVal >= 1 && transformMonthVal <= 12:
              checkFormValidity({ ...state, isMonthInValid: false });
              return { ...state, isMonthInValid: false };
            case transformMonthVal > 12:
              checkFormValidity({ ...state, isMonthInValid: true });
              return {
                ...state,
                isMonthInValid: true,
                cardMonthErrorMsg: "Month ranges from 1 to 12 ",
              };
            case transformMonthVal < 1:
              checkFormValidity({ ...state, isMonthInValid: true });
              return {
                ...state,
                isMonthInValid: true,
                cardMonthErrorMsg: "Month ranges from 1 to 12",
              };
            default:
              return { ...state };
            }
          } else {
          checkFormValidity({ ...state, isMonthInValid: true });
          return {
            ...state,
            isMonthInValid: true,
            cardMonthErrorMsg: "Month must be an integer, no decimals.",
          };
        }

      case "INSPECT_YEAR_FIELD":
        const yearVal = action.value.trim();
        if (!yearVal.length >= 1) {
          checkFormValidity({ ...state, isYearInValid: true });
          return {
            ...state,
            isYearInValid: true,
            cardYearErrorMsg: "Can't be blank",
          };
        }

        if (!yearVal.includes(".")) {
          const yearValLength = yearVal.length;

          switch (true) {
            case parseInt(yearVal) < 1:
              checkFormValidity({ ...state, isYearInValid: true });
              return {
                ...state,
                isYearInValid: true,
                cardYearErrorMsg: "Year can't be a negative number",
              };
            case yearValLength === 4 || yearValLength === 2:
              checkFormValidity({ ...state, isYearInValid: false });
              return { ...state, isYearInValid: false };
            default:
              checkFormValidity({ ...state, isYearInValid: true });
              return {
                ...state,
                isYearInValid: true,
                cardYearErrorMsg: "Year must exactly be two or four digits",
              };
          }
        } else {
          checkFormValidity({ ...state, isYearInValid: true });
          return {
            ...state,
            isYearInValid: true,
            cardYearErrorMsg: "Year must be an integer, no decimals.",
          };
        }
        case "IS_BUTTON_CLICKED":
          checkFormValidity({...state, isFormSubmitted: true });
        return {...state}
      default:
        return { ...state };
    }
  };

  // useReducer hook to handle input error states and error alerts
  const [formState, dispatchInput] = useReducer(
    inputStateReducer,
    initialInputsState
  );

  // Error Function to trigger once input fields loose focus.
  const cardNameErrorIndic = () => {
    dispatchInput({ type: "INSPECT_NAME_FIELD", value: cardName });
  };
  const cardNumErrorIndic = () => {
    dispatchInput({ type: "INSPECT_NUM_FIELD", value: cardNum });
  };

  const cardMonthErrorIndic = () => {
    dispatchInput({
      type: "INSPECT_MONTH_FIELD",
      value: monthValue.current.value,
    });
  };

  const cardYearErrorIndic = () => {
    dispatchInput({
      type: "INSPECT_YEAR_FIELD",
      value: yearValue.current.value,
    });
  };

  const cardCVCErrorIndic = () => {
    dispatchInput({ type: "INSPECT_CVC_FIELD", value: cardCVC });
  };

  // onChange input field handler functions
  const onChangeNameInputHandler = (e) => {
    setCardName(e.target.value);
    getCardName(e.target.value);
  };
  const onChangeNumInputHandler = (e) => {
    setCardNum(e.target.value);
    getCardNum(e.target.value);
  };
  const onChangeDateInputHandler = () => {
    getCardDate({
      month: monthValue.current.value,
      year: yearValue.current.value,
    });
  };
  const onChangeCVCInputHandler = (e) => {
    setCardCVC(e.target.value);
    getCardCVC(e.target.value);
  };
//  console.log(formState)
  const {
    isNumInValid,
    isNameInValid,
    isCVCInValid,
    isMonthInValid,
    isYearInValid,
  } = formState;
  const {
    cardNameErrorMsg,
    cardNumErrorMsg,
    cardCVCErrorMsg,
    cardMonthErrorMsg,
    cardYearErrorMsg,
  } = formState;


  function SubmitForm(e) {
    e.preventDefault();
    cardNameErrorIndic();
    cardNumErrorIndic();
    cardCVCErrorIndic();
    cardMonthErrorIndic();
    cardYearErrorIndic();
    dispatchInput({type:"IS_BUTTON_CLICKED"})

  }
  return (
    <section className={`${styles["form-drum"]} $`}>
      <form action="" className={`${styles["form"]}`}>
        <div className="pb-10">
          <label htmlFor="user_name"> CARDHOLDER NAME</label> <br />
          <input
            type="text"
            name="user_name"
            id="user_name"
            placeholder="e.g. Jane Appleseed"
            className={`py-[10px] w-full border-2 ${
              isNameInValid && styles["error-border"]
            }`}
            onChange={onChangeNameInputHandler}
            onBlur={cardNameErrorIndic}
            value={cardName}
          />
          {isNameInValid && (
            <p className="text-dang_red text-xs">{cardNameErrorMsg}</p>
          )}
        </div>
        <div className="pb-10">
          <label htmlFor="user_name">CARD NUMBER</label> <br />
          <input
            type="text"
            name="user_name"
            id="user_name"
            className={`py-[10px] w-full border-2 ${
              isNumInValid && styles["error-border"]
            }`}
            placeholder="e.g. 123456789123000"
            onChange={onChangeNumInputHandler}
            onBlur={cardNumErrorIndic}
            value={cardNum}
          />
          {isNumInValid && (
            <p className="text-dang_red text-xs">{cardNumErrorMsg}</p>
          )}
        </div>
        <div className="pb-10 flex justify-between w-full">
          <div className={`w-[48%] flex justify-between flex-wrap`}>
            <div className={`w-[50%]`}>
              <label htmlFor="month" className="flex items-center">
                EXP DATE{" "}
              </label>
              {/* <input type="month" name="month" id="month" className="py-[10px] w-full border-2" placeholder="MM" /> */}
              <input
                type="number"
                name="month"
                id="month"
                className={`py-[10px] w-full border-2 ${
                  isMonthInValid && styles["error-border"]
                }`}
                placeholder="MM"
                onChange={onChangeDateInputHandler}
                onBlur={cardMonthErrorIndic}
                min={1}
                max={12}
                ref={monthValue}
              />
            </div>
            <div className={`w-[48%]`}>
              <label htmlFor="year"> (MM/YY)</label>
              <input
                type="number"
                name="year"
                id="year"
                className={`py-[10px] w-full border-2 ${
                  isYearInValid && styles["error-border"]
                }`}
                placeholder="YY"
                onChange={onChangeDateInputHandler}
                onBlur={cardYearErrorIndic}
                min={1}
                ref={yearValue}
              />
            </div>
            {(isMonthInValid || isYearInValid) && (
              <p className="text-dang_red text-xs">
                {isMonthInValid ? cardMonthErrorMsg : cardYearErrorMsg}
              </p>
            )}
          </div>
          <div className={`w-[45%]`}>
            <label htmlFor="cvc"> CVC </label> <br />
            <input
              type="number"
              name="cvc"
              id="cvc"
              className={`py-[10px] w-full border-2 ${
                isCVCInValid && styles["error-border"]
              }`}
              min={1}
              max={999}
              placeholder="e.g. 123"
              onChange={onChangeCVCInputHandler}
              onBlur={cardCVCErrorIndic}
              value={cardCVC}
            />
            {isCVCInValid && (
              <p className="text-dang_red text-xs">{cardCVCErrorMsg}</p>
            )}
          </div>
        </div>
        <button
          className={`py-[10px] text-white text-md bg-very_dark_grayish_violet rounded-md w-full`}
          arial-role={"submit"}
          onClick={SubmitForm}
        >
          Confirm{" "}
        </button>
      </form>
    </section>
  );
}

export default CardForm;
