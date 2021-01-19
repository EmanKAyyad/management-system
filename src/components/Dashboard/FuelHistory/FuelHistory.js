import React, { Component } from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import './fuelHistory.scss';
import Dropdown from '../../shared/Dropdown/Dropdown';
import egyFlag from '../../../assets/egyFlag.jpg';
import usFlag from '../../../assets/usFlag.jpg';
import restService from '../../../services/restService';
import VehiclesByDate from './VehiclesByDate/VehiclesByDate';
import VehiclesByStatus from './VehiclesByStatus/VehiclesByStatus';


class FuelHistory extends Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
      sortBy: { name: 'date', value: 'date' },
      sortFrom: [{ name: 'date', value: 'date' }, { name: 'status', value: 'status' }],
      timezone: undefined,
      vehicles: [],
      sortedVehicles: []
    };
  }

  componentDidMount() {
    restService.getVehicles().then(
      response => {
        if (response && response.status === 200) {
          this.setState({ vehicles: response.data }, () => {
            this.setState({ sortedVehicles: this.groupByDate() })
          });
        }
      }
    )

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

  groupByDate() {
    const vehiclesGroupedByDate = [];
    this.state.vehicles.map(vehicle => {
      let targetDateObject = vehiclesGroupedByDate.find(z => z.date === vehicle.date);
      if (targetDateObject) {
        if (!targetDateObject.vehicles.find(y => y.id === vehicle.id)) {
          targetDateObject.vehicles.push(vehicle);
        }
      } else {
        vehiclesGroupedByDate.push({ date: vehicle.date, vehicles: [vehicle] });
      }
    })
    return vehiclesGroupedByDate;
  }

  groupByStatus() {
    const vehiclesGroupedByStatus = [];
    this.state.vehicles.map(vehicle => {
      let targetDateObject = vehiclesGroupedByStatus.find(z => z.status === vehicle.status);
      if (targetDateObject) {
        if (!targetDateObject.vehicles.find(y => y.id === vehicle.id)) {
          targetDateObject.vehicles.push(vehicle);
          console.log(targetDateObject)
        }
      } else {
        vehiclesGroupedByStatus.push({ status: vehicle.status, vehicles: [vehicle] });
      }
    })
    return vehiclesGroupedByStatus;
  }

  onDropdownChangeHandler = (stateProp, value) => {
    console.log(value)
    switch (stateProp) {
      case 'sort':
        this.setState({ sortBy: value, sortedVehicles: value.value === 'date' ? this.groupByDate() : this.groupByStatus() });
        break;
      case 'timezone':
        this.setState({ timezone: value })
        break;
      default:
        break;
    }
  }

  deleteVehicleHandler = (id) => {
    const list = [...this.state.vehicles];
    const targetElemIndex = list.findIndex(z => z.id === id);
    list.splice(targetElemIndex, 1);

    this.setState({vehicles: list}, () => {
      if(this.state.sortBy.value === 'date') this.setState({sortedVehicles: this.groupByDate()})
      else this.setState({sortedVehicles: this.groupByStatus()})
    });
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const sortedListType = this.state.sortBy.value === "date" ? 
      <VehiclesByDate 
        deleteVehicle={this.deleteVehicleHandler}
        dates={this.state.sortedVehicles} /> : 
      <VehiclesByStatus 
        deleteVehicle={this.deleteVehicleHandler}
        statuses={this.state.sortedVehicles} />

    return (
      <div className="fuel-history-container main-panel">
        <h2 className="main-title">Fuel History</h2>
        <div className="filter-bar mb-4">
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
          <button className="ms-secondary-button">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.4375 0.5H1.125H14.875H15.5625V1.1875V1.875V2.13281L15.3906 2.30469L10.0625 9.00781V13.5625V13.9062L9.80469 14.1211L7.05469 16.1836L5.9375 17V15.625V9.00781L0.609375 2.30469L0.4375 2.13281V1.875V1.1875V0.5ZM1.98438 1.875L6.96875 8.0625H9.03125L14.0156 1.875H1.98438ZM7.3125 9.4375V14.25L8.6875 13.2188V9.4375H7.3125Z" fill="#4D7CFE" />
            </svg>
            Filters
          </button>
          <button className="ms-link-button mx-4">1 filter <span>Applied</span></button>
          <button className="ms-link-button mx-2">clear all</button>
        </div>
        <div className="divider mb-4"></div>
        <div className="row pt-2 mb-4">
          <div className="col status">
            <h1>Rp 1.575.000</h1>
            <p>Total Fuel Cost</p>
          </div>
          <div className="col status">
            <h1>293,65 L</h1>
            <p>Total Fuel Volume </p>
          </div>
          <div className="col status">
            <h1>38.046 km</h1>
            <p>Total km </p>
          </div>
          <div className="col status">
            <h1>MPG (US)</h1>
            <p>Avg. Fuel Economy </p>
          </div>
          <div className="col status">
            <h1>Rp 9,879</h1>
            <p>Cost/Liter</p>
          </div>

        </div>
        <div className="text-right">
          <span className="pagination-status mr-3">1-10 of 40</span>
          <button className="pagination-prev">
            <svg width="7" height="15" viewBox="0 0 7 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 14.4609V13.125L7 1.875V0.539062L6.01562 1.45312L0.390625 7.07813L0.0390625 7.5L0.390625 7.92188L6.01562 13.5469L7 14.4609ZM5.875 11.7539L1.62109 7.5L5.875 3.24609V11.7539Z" fill="#778CA2" />
            </svg>
          </button>
          <button className="pagination-next mr-3">
            <svg width="7" height="15" viewBox="0 0 7 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 14.4609V13.125L0 1.875V0.539062L0.984375 1.45312L6.60938 7.07813L6.96094 7.5L6.60938 7.92188L0.984375 13.5469L0 14.4609ZM1.125 11.7539L5.37891 7.5L1.125 3.24609V11.7539Z" fill="#778CA2" />
            </svg>
          </button>
          <Dropdown
            items={[{ src: egyFlag, value: 'egy' }, { src: usFlag, value: 'us' }]}
            propertyViewed="src"
            placeholder="Timezone"
            selectedValue={this.state.timezone}
            onChangeHandle={this.onDropdownChangeHandler.bind(this, 'timezone')}
          />

          <div className="d-inline-block ml-3">
            <Dropdown
              items={this.state.sortFrom}
              propertyViewed="name"
              placeholder="sort"
              selectedValue={this.state.sortBy}
              onChangeHandle={this.onDropdownChangeHandler.bind(this, 'sort')}
            />
          </div>
        </div>

        <div className="mt-4 ms-table">
          <div className="table-headers row no-gutters">
            <div className="col">Vehicle</div>
            <div className="col">Time</div>
            <div className="col">total km</div>
            <div className="col">Volume</div>
            <div className="col">Cost</div>
            <div className="col">Actions</div>
          </div>
          <div className="table-body">
            {sortedListType}
          </div>
        </div>
      </div>
    )
  }

}

export default FuelHistory;