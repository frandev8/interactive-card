import React from "react";
import styles from './CardIndicator.module.css'

import FrontCard from "../Utilities/FrontCard";
import BackCard from "../Utilities/BackCard";

function CardIndicator(props) {
  return (
    <div className={`${styles["grid_card"]}`}>
      <BackCard cardCVC={props.cardCVC} />
      <FrontCard cardName={props.cardName} cardNum={props.cardNum} cardDate={props.cardDate} />
    </div>
  );
}

export default CardIndicator;
