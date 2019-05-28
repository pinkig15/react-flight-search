
import React from 'react';
import Flight from './Flight';

function Flightlist({ allflights }) {
  let length = allflights.length;
  if(length > 0) {
    return (
      <ul>
        {allflights.map(flight =>
          <Flight flight={flight} key={flight.id}></Flight>
        )}
      </ul>
    );
  } else {
    return (
      <div className="noflight">
        <label>Sorry! No flights available</label>
      </div>
    );
  }

}

export default Flightlist;
