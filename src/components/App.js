import React, { Component } from 'react';
import {allflights} from '../asset/flightlistData';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CustSlider from './CustSlider';
import Flightlist from './Flightlist';
import Select from 'react-virtualized-select';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        originCity: '',
        destCity: '',
        startDate: '',
        endDate: '',
        adult: '',
        child: '',
        infant: '',
        selectedTab: 'one',
        flights: allflights
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeStartdate = this.handleChangeStartdate.bind(this);
      this.handleChangeEnddate = this.handleChangeEnddate.bind(this);
      this.handleChangeSlider = this.handleChangeSlider.bind(this);
      this.filterFlightList = this.filterFlightList.bind(this);
      this.filterByPrice = this.filterByPrice.bind(this);
      this.tabClickHandler = this.tabClickHandler.bind(this);

      moment.updateLocale('en', {
        calendar : {
            sameElse : 'DD MMM YYYY'
        }
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const matchingObj = {
      originCity: this.state.originCity,
      destCity: this.state.destCity
    }
    if(matchingObj.originCity === matchingObj.destCity) {
      alert("Origin and destination cities should not match!");
      return;
    }

    if(this.state.selectedTab === "two" && this.state.startDate > this.state.endDate) {
      alert("Start date should not be greater than End date!");
      return;
    }

    const filteredData = this.filterFlightList(allflights, matchingObj);
    console.log(filteredData.length);
    if( filteredData.length !== 0)
      this.setState({...this.state, flights: filteredData});
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({...this.state, [name]: value });
  }

  handleChangeStartdate(date) {
    this.setState({startDate: date});
  }

  handleChangeEnddate(date) {
    this.setState({endDate: date});
  }

  handleChangeSlider(obj) {
    this.setState({
      sliderRangeObj: obj
    });

    const objToMatch = {
      originCity: this.state.originCity,
      destCity: this.state.destCity
    };

    let filteredData = this.filterFlightList(allflights, objToMatch);
    filteredData = filteredData.filter(this.filterByPrice);

    this.setState({
        flights: filteredData
    });
  }

  filterByPrice (flight) {
      console.log(this.state.sliderRangeObj.lowerBound, this.state.sliderRangeObj.upperBound);
      return (flight.price >= this.state.sliderRangeObj.lowerBound && flight.price <= this.state.sliderRangeObj.upperBound);
  }

  filterFlightList(arrObj, matchingObj) {
      return arrObj.filter(function (entry) {
          return Object.keys(matchingObj).every(function (key) {
              return (entry[key].toUpperCase().indexOf(matchingObj[key].toUpperCase()) === 0);
          });
      });
  }

  tabClickHandler(e) {
    if(e.target.id === "one") {
      document.getElementById("one").className="active";
      document.getElementById("two").className="";
      document.getElementById("tab1").className="show";
      document.getElementById("tab2").className="";
    } else {
      document.getElementById("one").className="";
      document.getElementById("two").className="active";
      document.getElementById("tab1").className="";
      document.getElementById("tab2").className="show";
    }
    console.log(">>>>"+this.state.originCity, this.state.destCity);
    this.setState({...this.state, selectedTab: e.target.id});
  }

  render() {

    const cities = [
      {key: "PNQ", value: "Pune" },
      {key: "DEL", value: "Delhi" },
      {key: "HYD", value: "Hyderabad" },
      {key: "BLR", value: "Bengaluru" }
    ];

    return (
      <div className="app-container">
        <div className="app-header">
          <h2>Flight Search Engine</h2>
        </div>
        <div className="app-view">
        <div className="query-panel">
          <div className="tabs">
            <ul className="tab-links" onClick={this.tabClickHandler}>
              <li name="one" id="one" className="active">One way</li>
              <li name="two" id="two">Return</li>
            </ul>
            <div className="tab-content">
              <form id="tab1" className="show" onSubmit={this.handleSubmit}>
                <select name="originCity"
                    value={this.state.originCity}
                    onChange={this.handleChange} >
                    <option>Select origin city</option> 
                      {cities.map((city) =>
                        <option key={city.key} value={city.value} >{city.value} - {city.key}</option>
                      )}
                  </select>
                  <select name="destCity"
                    value={this.state.destCity}
                    onChange={this.handleChange} >
                    <option>Select destination city</option> 
                      {cities.map((city) =>
                        <option key={city.key} value={city.value} >{city.value} - {city.key}</option>
                      )}
                  </select>
                  <DatePicker
                      name="startDate"
                      selected={this.state.startDate} onChange={this.handleChangeStartdate}
                      minDate={moment()} maxDate={moment().add(90, "days")}
                      placeholderText="Enter depart date" />
                  <div className="countPassanger">
                    <input type="number" name="adult" min="0" value={this.state.adult} onChange={this.handleChange} placeholder="Adult"/>
                    <input type="number" name="child" min="0" value={this.state.child} onChange={this.handleChange} placeholder="Child"/>
                    <input type="number" name="infant" min="0" value={this.state.infant} onChange={this.handleChange} placeholder="Infant"/>
                  </div>  
                  <input type="submit" value="Search" />
                </form>
              <form id="tab2" onSubmit={this.handleSubmit}>
                <select name="originCity"
                    value={this.state.originCity}
                    onChange={this.handleChange} >
                    <option>Select origin city</option> 
                      {cities.map((city) =>
                        <option key={city.key} value={city.value} >{city.value} - {city.key}</option>
                      )}
                  </select>
                  <select name="destCity"
                    value={this.state.destCity}
                    onChange={this.handleChange} >
                    <option>Select destination city</option> 
                      {cities.map((city) =>
                        <option key={city.key} value={city.value} >{city.value} - {city.key}</option>
                      )}
                  </select>
                <div className="calendars">
                  <DatePicker
                      name="startDate"
                      selected={this.state.startDate} onChange={this.handleChangeStartdate}
                      minDate={moment()} maxDate={moment().add(90, "days")}
                      placeholderText="Enter depart date" />
                  <DatePicker
                      name="endDate"
                      selected={this.state.endDate} onChange={this.handleChangeEnddate}
                      minDate={moment()} maxDate={moment().add(90, "days")}
                      placeholderText="Enter arrival date" />
                </div>
                <div className="countPassanger">
                  <input type="number" name="adult" min="0" value={this.state.adult} onChange={this.handleChange} placeholder="Adult"/>
                  <input type="number" name="child" min="0" value={this.state.child} onChange={this.handleChange} placeholder="Child"/>
                  <input type="number" name="infant" min="0" value={this.state.infant} onChange={this.handleChange} placeholder="Infant"/>
                </div>
                <input type="submit" value="Search" />
              </form>
            </div>
          </div>
          <div className="price-slider">
            <label>Refine search</label>
            <CustSlider onChange={this.handleChangeSlider} />
          </div>
        </div>
          <div className="result-panel">
            <div className="result-header">
                <div className="left">{this.state.originCity} {this.state.destCity && " > " + this.state.destCity} {this.state.selectedTab === "two" && " > " + this.state.originCity}</div>
              <div className="right">
                { this.state.startDate && <span> { "Depart: " + this.state.startDate.toString().slice(4, 15) } </span> } <br />
                { this.state.endDate && <span> { "Arrival:" + this.state.endDate.toString().slice(4, 15)}</span> }
              </div>
            </div>
            <Flightlist allflights={this.state.flights}  />
          </div>
      </div>
    </div>
    );
  }
}

export default App;
