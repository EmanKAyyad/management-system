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
          <div className="search-container">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.22266 1.34766C5.07943 0.490885 6.10938 0.0625 7.3125 0.0625C8.51562 0.0625 9.54557 0.490885 10.4023 1.34766C11.2591 2.20443 11.6875 3.23438 11.6875 4.4375C11.6875 5.64062 11.2591 6.67057 10.4023 7.52734C9.54557 8.38411 8.51562 8.8125 7.3125 8.8125C6.27344 8.8125 5.35286 8.48438 4.55078 7.82812L1.07812 11.3281L0.421875 10.6719L3.92188 7.19922C3.26562 6.39714 2.9375 5.47656 2.9375 4.4375C2.9375 3.23438 3.36589 2.20443 4.22266 1.34766ZM9.77344 1.97656C9.09896 1.28385 8.27865 0.9375 7.3125 0.9375C6.34635 0.9375 5.51693 1.28385 4.82422 1.97656C4.14974 2.65104 3.8125 3.47135 3.8125 4.4375C3.8125 5.40365 4.14974 6.23307 4.82422 6.92578C5.51693 7.60026 6.34635 7.9375 7.3125 7.9375C8.27865 7.9375 9.09896 7.60026 9.77344 6.92578C10.4661 6.23307 10.8125 5.40365 10.8125 4.4375C10.8125 3.47135 10.4661 2.65104 9.77344 1.97656Z" fill="#98A9BC" />
            </svg>

            <input className="ms-search" type="text" placeholder="search vehicles" />
          </div>
        </div>
      </div>
    )
  }

}

export default FuelHistory;