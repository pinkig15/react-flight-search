
import React from 'react';

const Flight = ({ flight, children }) => (
  <li className="flight-item" key={flight.id}>
    <div className="flight-item-left">
        <h2>Rs. {flight.price}</h2>
        <div className="flight">{flight.name + ", " + flight.number + " | "} <span> {flight.seatsLeft + " seats left"} </span> </div>
        <div className="flight-city">{flight.originCityCode} > {flight.destCityCode} <span> { flight.duration } </span> </div> 
        <div className="flight-time">{flight.deptDateTime} - {flight.retDateTime}</div>
        <div className="flight-stop"><a href="#">{flight.stop}</a></div>
    </div>
    <div className="flight-item-right">
      <div className="flight-item-image" ></div>
      <button type="submit">Book</button>
      {children}
    </div>
  </li>
)

export default Flight;
