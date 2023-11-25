import React from 'react'
import styles from "./BackCard.module.css"

function BackCard(props) {
  
  const enhanceCVC = props.cardCVC? props.cardCVC : "123";

  return (

    <div className={`flex flex-col justify-center items-end px-[50px] sm:px-[65px] ${styles['frontCard']}`}>
        <span className=""> {enhanceCVC} </span>

      </div>
  )
}

export default BackCard