import React from "react";

import { Card, CardBody } from 'reactstrap';
import "./../Styles/colourCard.scss";

const ColourCard=()=>{
    return(
    <div className="color-options">
    <Card className="ColorCard">
      <CardBody className="ColorCardContainer">
        <div className="color-option" style={{ backgroundColor: 'white' }}></div>
        <div className="color-option" style={{ backgroundColor: '#EFB495' }} ></div>
        <div className="color-option" style={{ backgroundColor: '#E2BEBE' }} ></div>
        <div className="color-option" style={{ backgroundColor: '#B5C0D0' }}></div>
        <div className="color-option" style={{ backgroundColor: '#EADFB4' }} ></div>
        <div className="color-option" style={{ backgroundColor: '#92C7CF' }} ></div>
        <div className="color-option" style={{ backgroundColor: '#EC7700' }} ></div>
        <div className="color-option" style={{ backgroundColor: '#9CAFAA' }} ></div>
        <div className="color-option" style={{ backgroundColor: '#D37676' }} ></div>
        <div className="color-option" style={{ backgroundColor: '#A5DD9B' }} ></div>
        <div className="color-option" style={{ backgroundColor: '#F5DD61' }} ></div>
        <div className="color-option" style={{ backgroundColor: '#FC819E' }} ></div>
        <div className="color-option" style={{ backgroundColor: '#7469B6' }} ></div>
        <div className="color-option" style={{ backgroundColor: '#FFE6E6' }} ></div>

      </CardBody>
    </Card>
  </div>
  )
};
export default ColourCard;