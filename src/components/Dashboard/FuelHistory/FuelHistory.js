import React, { Component } from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import './fuelHistory.scss';


class FuelHistory extends Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
    };
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div className="fuel-history-container main-panel">
        <h2 className="main-title">Fuel History</h2>
        <div className="filter-bar">
          <div className="InputFromTo">
            <span className="calendar-icon">
              <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.9375 0.5H2.8125V0.9375H7.1875V0.5H8.0625V0.9375H9.375H9.8125V1.375V10.125V10.5625H9.375H0.625H0.1875V10.125V1.375V0.9375H0.625H1.9375V0.5ZM1.0625 1.8125V2.6875H8.9375V1.8125H8.0625V2.25H7.1875V1.8125H2.8125V2.25H1.9375V1.8125H1.0625ZM1.0625 3.5625V9.6875H8.9375V3.5625H1.0625ZM3.6875 4.4375H4.5625V5.3125H3.6875V4.4375ZM5.4375 4.4375H6.3125V5.3125H5.4375V4.4375ZM7.1875 4.4375H8.0625V5.3125H7.1875V4.4375ZM1.9375 6.1875H2.8125V7.0625H1.9375V6.1875ZM3.6875 6.1875H4.5625V7.0625H3.6875V6.1875ZM5.4375 6.1875H6.3125V7.0625H5.4375V6.1875ZM7.1875 6.1875H8.0625V7.0625H7.1875V6.1875ZM1.9375 7.9375H2.8125V8.8125H1.9375V7.9375ZM3.6875 7.9375H4.5625V8.8125H3.6875V7.9375ZM5.4375 7.9375H6.3125V8.8125H5.4375V7.9375Z" fill="#98A9BC" />
              </svg>
            </span>
            <DayPickerInput
              value={from}
              placeholder="From"
              format="DD MMM, YYYY"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { after: to },
                toMonth: to,
                modifiers,
                numberOfMonths: 2,
                onDayClick: () => this.to.getInput().focus(),
              }}
              onDayChange={this.handleFromChange}
            />{' '}
        —{' '}
            <span className="InputFromTo-to">
              <DayPickerInput
                ref={el => (this.to = el)}
                value={to}
                placeholder="To"
                format="DD MMM, YYYY"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { before: from },
                  modifiers,
                  month: from,
                  fromMonth: from,
                  numberOfMonths: 2,
                }}
                onDayChange={this.handleToChange}
              />
            </span>
          </div>
        </div>
      </div>
    )
  }

}

export default FuelHistory;