import React from 'react';

const Apiresponse = (props) => {
  return (
    <div className="textCenter">
        <img src="/images/alert_icon.png" alt="alert icon"/>
        <h1 className="title">{props.apires}</h1>
    </div> 
  );
}

export default Apiresponse;
