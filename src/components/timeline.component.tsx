import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from "react";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import UserService from "../services/user.service";
import AreaService from "../services/area.service";
import TimelineService from "../services/timeline.service";
import IUser from '../types/user.type';


import ITimeline from "../types/timeline.type";
import IArea from "../types/area.type";


//import User from "../models/user";

type TimelineForm = {
  user: string;
  area: string;
  bookFrom: Date;
  bookTo: Date;
};

const Timeline = () => {

  const initialTimeline = {
    user: "",
    area: "",
    bookFrom: new Date(),
    bookTo: new Date()
  };

/*   const validationSchema = Yup.object().shape({
    user: Yup.string().required('Name is required'),
    area: Yup.string().required('Area is required'),
    bookFrom: Yup.date().required('From is required'),
    bookTo: Yup.date().required('To is required')
  }); */


  //const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TimelineForm>();

  const withoutTime = (dateTime: Date) => {
    var date = new Date(dateTime.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
  }

  const [userList, setUserList] = useState<IUser[]>([]);
  const [areaList, setAreaList] = useState([]);
  //const [timeline, setTimeline] = useState<ITimeline>(initialTimeline);


  //const [user, setUser] = useState<IUser | null>(null);
  //const [area, setArea] = useState(null);
  const [bookDate, setBookDate] = useState(withoutTime(new Date()));
  const [bookFrom, setBookFrom] = useState(withoutTime(new Date()));
  const [bookTo, setBookTo] = useState(withoutTime(new Date()));

  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = () => {
    UserService.getAll()
      .then(response => {
        setUserList(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleBookDateChange = (date: Date) => {
   // setTimeline({ ...timeline, bookDate: date});
    setBookDate(withoutTime(date));
    setBookFrom(withoutTime(date));
    setBookTo(withoutTime(date));
  };


  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //  setTimeline({...timeline, user: e.target.value});
  }

  const handleAreaChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //  setTimeline({...timeline, area: e.target.value});
  }

  const handleBookFromChange = (date: Date) => {
    setBookFrom(date);
    //if (bookTo && date.getTime() > bookTo.getTime()) {
     // setBookTo(null);
    //}
  };

  const handleBookToChange = (date: Date) => {
    setBookTo(date);
  };

  /* const isValid = (timeline: ITimeline) => {
    if (timeline.user) {
      setErrors({name: "Name is required."});
      return false;
    }

    if (timeline.area) {
      setErrors({area: "Area is required."})
      return false;
    }

    return true;
  } */

  const onSubmit: SubmitHandler<TimelineForm> = (data: TimelineForm) => {
    console.log("testsetsets");
    console.log(JSON.stringify(data, null, 4));
  };

 /*  const handleSubmit = async (e: FormEvent<TimelineFormElement>) => {
    e.preventDefault();
    if (isValid(timeline)) {
      TimelineService.create(timeline)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  } */

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
          minDate={new Date()}
          className="form-select"
        />
      </div>

      <div className="col-12 panel">
        <h4>Timeline</h4>
      </div>

      <div className="bg-light p-3 rounded mt-3">
        <h4 className="blue">Timeline Entry</h4>

        <div className="row g-4 py-5 row-cols-1 row-cols-lg-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <select
                {...register('user')}
                className={`form-select ${errors.user ? 'is-invalid' : ''}`}>
                <option value="">Select User</option>
                {userList &&
                userList.map((u: IUser) => (
                  <option key={u.name} value={u.name}>{u.name}</option>
                ))}
              </select>
              <div className="invalid-feedback">{errors.user?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Area</label>
              <select
                {...register('area')}
                className="form-select">
                <option value="">Select Area</option>
                <option value="livingroom">Living room</option>
                <option value="kitchen">Kitchen</option>
                <option value="backyard">Backyard</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">From</label>
              <Controller
                control={control}
                name="bookFrom"
                render={({ field }) => (
                <ReactDatePicker
                    selected={field.value}
                    onChange={(e) => field.onChange(e)}
                //    filterTime={filterTimeBookFrom}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    className="form-select"
                  />
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">To</label>
              <Controller
                control={control}
                name="bookTo"
                render={({ field }) => (
                  <ReactDatePicker
                    selected={field.value}
                    onChange={(e) => field.onChange(e)}
                  //  filterTime={filterTimeBookTo}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    className="form-select"
                  />
                )}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-success"> + Add</button>
            </div>
          </form>
        </div>


      </div>
    </div>

  );
};


export default Timeline;