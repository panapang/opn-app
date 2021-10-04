import { Component, ChangeEvent } from "react";
import moment from 'moment';

type Props = {
  dateValue: Date | string,
  onChange?: () => void,
  name: string,
  beginTime?: string | null,
  step?: number | null
};

type State = {
  value: string
};

export default class Timepicker extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    
    this.state = {
      value: ''
    };
  }

  isLaterThanBeginTime(dateValue: Date | string, beginTime: string) {
    const date = moment(dateValue);
    console.log("start = " + moment(dateValue, 'h:mmA'));
    //console.log("end   = " + moment(endLimit, 'h:mmA'));
    //console.log("diff   = " + moment(timeValue, 'h:mmA').diff(moment(endLimit, 'h:mmA'))); 



		var timeValueIsEarlier = moment(dateValue, 'h:mm').diff(moment(beginTime, 'h:mm')) < 0
		return timeValueIsEarlier;
	}


  render () {
		var dateValue = this.props.dateValue;
		var beginTime: string = '';
		var step = this.props.step || 30;

		var options = [];
		options.push(<option key={beginTime} value={beginTime}>{beginTime}</option>);

    while ( this.isLaterThanBeginTime(dateValue, beginTime) ) {
      var timeValue = moment(beginTime, 'h:mm').add(step, 'minutes').format('h:mm');
      options.push(<option key={timeValue} value={timeValue}>{timeValue}</option>)
    }
    return(
      <select className="form-select" onChange={this.props.onChange} name={this.props.name}>
        {options}
      </select>
    )
	}
}