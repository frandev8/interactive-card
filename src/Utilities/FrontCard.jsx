import React from "react";
import styles from "./FrontCard.module.css";

function FrontCard(props) {
  const cardNum = props.cardNum.trim().match(/[a-z\W\d]{1,4}/gi);
  const enhanceCardNum = cardNum ? cardNum.join("  ") : "0000 0000 0000 0000";
  const enhanceCardName = props.cardName.trim()
    ? props.cardName.trim().toUpperCase()
    : "JANE APPLESEED";
  const enhanceMonth = props.cardDate.month ? props.cardDate.month : "00";
  const enhanceYear = props.cardDate.year
    ? filterYear(props.cardDate.year)
    : "00";

  function filterYear(year) {
    switch (true) {
      case year.length === 4:
        return year.slice(2);
      case year.length > 0:
        return year;
      default:
    }
  }

  return (
    <div className={`${styles["backCard"]}`}>
      <article className="h-full w-full flex flex-col justify-between p-4 ">
        <div className="flex items-center">
          <div className="w-[30px] h-[30px] rounded-[50%] bg-white mr-[10px]">
            {" "}
          </div>
          <div className="w-[15px] h-[15px] rounded-[50%] border border-2-white"></div>
        </div>

        <div className=" h-[35%]">
          <h3 className="relative bottom-[15px]">{enhanceCardNum}</h3>
          <ul className="flex w-full justify-between items-center">
            {" "}
            <li>{enhanceCardName}</li>{" "}
            <li>
              {enhanceMonth}/{enhanceYear}
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
}

export default FrontCard;
