import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Timeline, { ReactCalendarItemRendererProps } from 'react-calendar-timeline';
import "react-calendar-timeline/lib/Timeline.css";

import TimelineService from "../services/timeline.service";
import IUser from '../types/user.type';
import ITimeline from "../types/timeline.type";
import ITimelineGraph from "../types/timelineGraph.type";
import IArea from "../types/area.type";

type TimelineForm = {
  user: string;
  area: string;
  bookFrom: Date;
  bookTo: Date;
};

const HouseTimeline = () => {
  const userList: IUser[] = [
    {
      name: "Bill",
      actived: true
    },
    {
      name: "Elon",
      actived: true
    },
    {
      name: "Mark",
      actived: true
    },
    {
      name: "Tim",
      actived: true
    }
  ]; 

  const areaList: IArea[] = [
    {
      _id: "1",
      key: "livingroom",
      name: "Living room",
      color: "#17a2b8"
    },
    {
      _id: "2",
      key: "kitchen",
      name: "Kitchen",
      color: "#ffc107"
    },
    {
      _id: "3",
      key: "backyard",
      name: "Backyard",
      color: "#28a745"
    }
  ];

  const groups = userList.map(u => ({id: u.name, title: u.name }));

  const schema = Yup.object().shape({
    user: Yup.string().label("Name").trim().required().default(""),
    area: Yup.string().label("Area").trim().required().default(""),
    bookFrom: Yup.date().min(new Date(), "Past date is not allowed").label("From").required(),
    bookTo: Yup.date()
      .when("bookFrom",
       (bookFrom, yup) => bookFrom && yup.min(moment(bookFrom).add(10, "minutes").toDate(), "To time cannot be before from time"))
      .test('sameTime', '',  function (value, context) {
        const compareDate = moment(this.parent.bookFrom);
        const user = this.parent.user;

        if ((isSameTime(this.parent.bookFrom, this.parent.user, timeline) &&
        isSameTime(this.parent.bookTo, this.parent.user, timeline))) {
          return this.createError({ message: 'Same Time !!' });
        }
        return true;
      })
      .nullable().min(new Date(), "Past date is not allowed").label("To").required().default(null)
  }).required();
  

  const isSameTime = (compareDate: Date, user: string, timeline: ITimeline[]) => {
    const compareDateMoment = moment(compareDate);
    return timeline
          .filter((t: ITimeline) => t.user === user)
          .some((t: ITimeline) => {
            let startDate = moment(t.bookFrom);
            let endDate = moment(t.bookTo); 
            return compareDateMoment.isBetween(startDate, endDate);
          })
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<TimelineForm>({
    resolver: yupResolver(schema)
  });

  const withoutTime = (dateTime: Date) => {
    var date = new Date(dateTime.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
  }

  const [timeline, setTimeline] = useState([]);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      if(items.length && !alert) {
        return;
      }
      setIsLoading(true);
      setHasError(false);
      try {
        await retrieveTimeline();
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    }
    fetchData();

  }, [alert]);

  useEffect(() => {
    if(alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000)
    }
  }, [alert])

  const retrieveTimeline = () => {
    TimelineService.getAll()
      .then(response => {
        setTimeline(response.data);
        setItems(mapColor(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const mapColor = (timeline: ITimeline[]) : ITimelineGraph[] => {
    var result =  timeline.map(t => {
      const colorCode = areaList.filter(a => a.key === t.area)[0]?.color;

      return {
        id: t.user + t.area + t.bookTo + t.bookFrom,
        title: "",
        group: userList.filter((u: IUser) => (u.name === t.user))[0]?.name,
        start_time: moment(new Date(t.bookFrom)),
        end_time: moment(new Date(t.bookTo)),
        style: { backgroundColor : colorCode }
      };
    });
    return result;
  }

  const onSubmit: SubmitHandler<TimelineForm> = (data: TimelineForm) => {
    let saveData: ITimeline = {
      user: data.user,
      area: data.area,
      bookFrom: data.bookFrom,
      bookTo: data.bookTo
    };

    TimelineService.create(saveData)
      .then(response => {
        console.log(response.data);
        setAlert(true);
        reset();
      })
      .catch(e => {
        console.log(e);
      });

  };

  const itemRenderer = ({ item, itemContext, getItemProps, getResizeProps }: ReactCalendarItemRendererProps ) => {
    return (
      <div
        {...getItemProps({
          style: {
            background: item.style?.backgroundColor,
            color: item.style?.backgroundColor,
            border: item.style?.backgroundColor,
          }
        })}
      >
      </div>
    );
  };

  const defaultTimeStart = moment(new Date().setHours(0, 0, 0, 0));
  const defaultTimeEnd = moment(new Date().setHours(0, 0, 0, 0)).add(1, "day");
  const defaultTimeRange = defaultTimeEnd.diff(defaultTimeStart);

  return (
    <div className="col-12">
      {hasError && <p>Something went wrong.</p>}
      <h1 className="text-center pb-3">House Timeline</h1>

      <div className="col-12 timeline-panel py-4">
        <h4>Timeline</h4>
        <div>
          {isLoading ? 
          
          <div>Loading</div>
          :

          items?
            <Timeline
              groups={groups}
              items={items}
              defaultTimeStart={defaultTimeStart}
              defaultTimeEnd={defaultTimeEnd}
              canMove={false}
              canResize={false}
              canChangeGroup={false}
              itemRenderer={itemRenderer}
              minZoom={defaultTimeRange}
              maxZoom={defaultTimeRange}
            />
          :
          <div>error</div>
            
          }
        </div>
        <div className="py-2">
          <div className="col-12 d-flex color-area-panel">
            <div className="card color-area">
              <div className="row g-0">
                <div className="col-4 living-room">
                </div>
                <div className="col-8">
                  <div className="card-body py-0">
                    <p className="card-title mb-0">Living Room</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card color-area">
              <div className="row g-0">
                <div className="col-4 kitchen">
                </div>
                <div className="col-8">
                  <div className="card-body py-0">
                    <p className="card-title mb-0">Kitchen</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card color-area">
              <div className="row g-0">
                <div className="col-4 backyard">
                </div>
                <div className="col-8">
                  <div className="card-body py-0">
                    <p className="card-title mb-0">Backyard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light p-3 rounded mt-3">
        <h4 className="blue">Timeline Entry</h4>
        {
          alert && 
          <div className="alert alert-success" role="alert">
            Submit Successful
          </div>
        }

        <div className="row g-3">
          <form onSubmit={handleSubmit(onSubmit)} className="row pt-4">
            <div className="col-xl-3 col-lg-6 col-xs-12">
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
            <div className="col-xl-3 col-lg-6 col-xs-12">
              <label className="form-label">Area</label>
              <select
                {...register('area')}
                className={`form-select ${errors.area ? 'is-invalid' : ''}`}>
                <option value="">Select Area</option>
                {areaList &&
                  areaList.map((a: IArea) => (
                    <option key={a.key} value={a.key}>{a.name}</option>
                  ))}
              </select>
              <div className="invalid-feedback">{errors.area?.message}</div>
            </div>
            <div className="col-xl-3 col-lg-6 col-xs-12">
              <label className="form-label">From</label>
              <Controller
                control={control}
                name="bookFrom"
                render={({ field }) => (
                  <ReactDatePicker
                    selected={field.value}
                    onChange={(e) => field.onChange(e)}
                    showTimeSelect
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy HH:mm"
                    timeFormat="HH:mm"
                    selectsStart
                    className={`form-select ${errors.bookFrom ? 'is-invalid' : ''}`}
                  />
                )}
              />
              <div className="invalid-feedback d-block">{errors.bookFrom?.message}</div>
            </div>
            <div className="col-xl-3 col-lg-6 col-xs-12">
              <label className="form-label">To</label>
              <Controller
                control={control}
                name="bookTo"
                render={({ field }) => (
                  <ReactDatePicker
                    selected={field.value}
                    onChange={(e) => field.onChange(e)}
                    showTimeSelect
                    timeIntervals={30}
                    timeCaption="Time"
                    selectsEnd
                    dateFormat="MMMM d, yyyy HH:mm"
                    timeFormat="HH:mm"
                    className={`form-select ${errors.bookTo ? 'is-invalid' : ''}`}
                  />
                )}
              />
              <div className="invalid-feedback d-block">{errors.bookTo?.message}</div>
            </div>
            <div className="pt-2">
              <button type="submit" className="btn btn-black"> + Add</button>
            </div>
          </form>
        </div>

      </div>
    </div>

  );
};


export default HouseTimeline;