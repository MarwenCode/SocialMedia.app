import React from 'react';
import "./spinner.scss"

const Spinner = () => {
  return (
    <div className='spinner'>
        <p>Please wait...still Loaging !</p>
        <img src="images/Loading.gif" className='spinnerImg' />

    </div>
  )
}

export default Spinner