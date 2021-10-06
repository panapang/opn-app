import moment from 'moment';

export default interface ITimelineGraph {
  id: string,
  title: string,
  group: string,
  start_time: moment.Moment,
  end_time: moment.Moment,
  style: React.CSSProperties
}