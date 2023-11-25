import { useState } from "react";
import styles from "./CardFormApp.module.css";
import Header from "./components/Header";
import Main from "./components/Main";

function CardFormApp() {
  const [cardName, getCardName] = useState("");
  const [cardNum, getCardNum] = useState("0000000000000000");
  const [cardDate, getCardDate] = useState({ month: "00", year: "00" });
  const [cardCVC, getCardCVC] = useState("");

  return (
    <div className={`${styles["app"]}`}>
      <Header
        cardName={cardName}
        cardNum={cardNum}
        cardDate={cardDate}
        cardCVC={cardCVC}
      />
      <Main
        getCardCVC={getCardCVC}
        getCardDate={getCardDate}
        getCardName={getCardName}
        getCardNum={getCardNum}
      />
    </div>
  );
}

export default CardFormApp;
