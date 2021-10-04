import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";

import UserService from "../services/user.service";
import AreaService from "../services/area.service";
import TimelineService from "../services/timeline.service";
import IUserData from '../types/user.type';
import Timepicker from "./timepicker.component";

import "react-datepicker/dist/react-datepicker.css";

const Timeline = () => {

  const withoutTime = (dateTime: Date) => {
    var date = new Date(dateTime.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
  }

  const [userList, setUserList] = useState(null);
  const [areaList, setAreaList] = useState(null);

  const [user, setUser] = useState(null);
  const [area, setArea] = useState(null);
  const [bookDate, setBookDate] = useState(withoutTime(new Date()));
  const [bookFrom, setBookFrom] = useState(withoutTime(new Date()));
  const [bookTo, setBookTo] = useState(withoutTime(new Date()));

  const handleBookDateChange = (date: Date) => {
    setBookDate(withoutTime(date));
    setBookFrom(withoutTime(date));
    setBookTo(withoutTime(date));
  };



  const handleBookFromChange = (date: Date) => {
    setBookFrom(date);
    //if (bookTo && date.getTime() > bookTo.getTime()) {
     // setBookTo(null);
    //}
  };

  const handleBookToChange = (date: Date) => {
    setBookTo(date);
  };

  const filterTimeBookFrom = (time: Date) => {
    console.log("bookDate = " , bookDate);
    console.log("bookDate.getTime() = " , bookDate.getTime());
    console.log("time = " , time);
    const currentDate = bookDate || new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() <= selectedDate.getTime();
  };

  const filterTimeBookTo = (time: Date) => {
    const currentDate = bookFrom || new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() <= selectedDate.getTime();
  };

  return (
    <div className="col-12">
      <h1 className="text-center">House Timeline</h1>

      <div className="col-12 panel">
        <h4>Date</h4>
      </div>

      <div className="bg-light p-3 rounded mt-3">

        <ReactDatePicker
          dateFormat="dd/MM/yyyy"
          selected={bookDate}
          onChange={handleBookDateChange}
          minDate={new Date()} />
      </div>

      <div className="col-12 panel">
        <h4>Timeline</h4>
      </div>

      <div className="bg-light p-3 rounded mt-3">
        <h4 className="blue">Timeline Entry</h4>

        <div className="row g-4 py-5 row-cols-1 row-cols-lg-5">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <select className="form-select">
              <option>test</option>
              <option>test2</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Area</label>
            <select className="form-select">
              <option>test</option>
              <option>test2</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">From</label>
            <ReactDatePicker
              selected={bookFrom}
              onChange={handleBookFromChange}
              filterTime={filterTimeBookFrom}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              className="form-select"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">To</label>
            <ReactDatePicker
              selected={bookTo}
              onChange={handleBookToChange}
              filterTime={filterTimeBookTo}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              className="form-select"
            />
          </div>
          <div>
            <button> + Add</button>
          </div>
        </div>


      </div>
    </div>

  );
};


export default Timeline;