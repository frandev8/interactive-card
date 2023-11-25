import React from 'react'
import styles from './CardSuccessful.module.css';

import {FaCheck} from 'react-icons/fa'


function CardSuccessful() {
  return (
    <section  className={`${styles['card-success']} `}>

      <div className={`w-[80px] h-[80px] flex justify-center items-center bg-very_dark_grayish_violet rounded-full ${styles['success-logo']} mb-5`} >
          <FaCheck size={""} color={"white"}/>
      </div>
      <h1 className='font-bold text-xl tracking-widest py-[10px]' >
        THANK YOU!
      </h1>
      <p className='text-dark_grayish_violet mb-10'>We've added your card</p>
      <button className='p-[10px] text-white text-md bg-very_dark_grayish_violet rounded-md w-full'>Continue</button>

    </section>
  )
}

export default CardSuccessful