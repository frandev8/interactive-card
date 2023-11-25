import React from 'react';
import styles from "./Header.module.css"
import CardIndicator from './CardIndicator';

function Header(props) {
  return (
    <header className={`text-white ${styles['header']}`}>
        <CardIndicator cardName={props.cardName} cardNum={props.cardNum} cardDate={props.cardDate} cardCVC={props.cardCVC} />
    </header>
  )
}



export default Header