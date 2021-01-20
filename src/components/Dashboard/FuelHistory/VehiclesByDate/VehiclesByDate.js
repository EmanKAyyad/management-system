import React from 'react';
import moment from 'moment';
import statusEnum from '../../../../status.enum';
import { connect } from 'react-redux';

const VehiclesByDate = (props) => {

    const deleteVehicles = (id) => {
        props.deleteVehicle(id)
    }

    const List = props.dates.map(
        (dateGroup, index) => {
            let vehicles = dateGroup.vehicles.map(
                vehicle => {
                    return <div key={vehicle.id} className="single-vehicle row no-gutters">
                        <div className="col d-flex flex-row">
                            <div className="vehicle-img">
                                <img />
                            </div>
                            <div className="d-flex flex-column">
                                <span>[{vehicle.id}] {vehicle.name}</span>
                                <span className={vehicle.status === statusEnum.active ? "active status" :
                                vehicle.status === statusEnum.inshop ? "status inshop" : "status out-of-service" }>{vehicle.status === statusEnum.active ? "Active" :
                                vehicle.status === statusEnum.inshop ? "In Shop" : "Out of Service" }</span>
                            </div>
                        </div>
                        <div className="col">
                            <span>{vehicle.time}</span>
                        </div>
                        <div className="col">
                            <span>{vehicle.total_km}</span>
                        </div>
                        <div className="col">
                            <span>{vehicle.volume} L</span>
                        </div>
                        <div className="col">
                            <span>Rp {vehicle.cost}</span>
                        </div>
                        <div className="col action-buttons">
                            <button className="edit-btn mr-4" onClick={props.editVehicle.bind(this, vehicle.id)} data-toggle="modal" data-target="#edit-vehicle-modal">
                                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.7266 1.10156C14.1276 0.700521 14.6146 0.5 15.1875 0.5C15.7604 0.5 16.2331 0.700521 16.6055 1.10156C17.0065 1.5026 17.207 1.98958 17.207 2.5625C17.207 3.13542 17.0208 3.6224 16.6484 4.02344L9.85938 10.8125L9.6875 10.9844H9.47266L7.06641 11.5L6.07812 11.6719L6.25 10.6836L6.76562 8.27734V8.0625L6.9375 7.89062L13.7266 1.10156ZM15.6602 2.08984C15.5169 1.94661 15.3594 1.875 15.1875 1.875C15.0156 1.875 14.8581 1.94661 14.7148 2.08984L8.05469 8.75L7.79688 9.95312L9 9.69531L15.6602 3.03516C15.9753 2.72005 15.9753 2.40495 15.6602 2.08984ZM0.75 3.25H9.81641L8.44141 4.625H2.125V15.625H13.125V9.30859L14.5 7.93359V17H0.75V3.25Z" fill="#FFAB2B" />
                                </svg>
                            </button>
                            <button className="delete-btn" onClick={deleteVehicles.bind(this, vehicle.id)}>
                                <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.79688 0.5H8.54688C8.94792 0.5 9.27734 0.628906 9.53516 0.886719C9.79297 1.14453 9.92188 1.47396 9.92188 1.875V2.5625H14.0469V3.9375H13.3594V14.9375C13.3594 15.5104 13.1589 15.9974 12.7578 16.3984C12.3568 16.7995 11.8698 17 11.2969 17H3.04688C2.47396 17 1.98698 16.7995 1.58594 16.3984C1.1849 15.9974 0.984375 15.5104 0.984375 14.9375V3.9375H0.296875V2.5625H4.42188V1.875C4.42188 1.47396 4.55078 1.14453 4.80859 0.886719C5.06641 0.628906 5.39583 0.5 5.79688 0.5ZM5.79688 1.875V2.5625H8.54688V1.875H5.79688ZM2.35938 3.9375V14.9375C2.35938 15.138 2.41667 15.3099 2.53125 15.4531C2.67448 15.5677 2.84635 15.625 3.04688 15.625H11.2969C11.4974 15.625 11.6549 15.5677 11.7695 15.4531C11.9128 15.3099 11.9844 15.138 11.9844 14.9375V3.9375H2.35938ZM3.73438 6H5.10938V13.5625H3.73438V6ZM6.48438 6H7.85938V13.5625H6.48438V6ZM9.23438 6H10.6094V13.5625H9.23438V6Z" fill="#FE4D5C" />
                                </svg>
                            </button>
                        </div>
                    </div>
                }
            )

            return <div key={index} className="date-group">
                <p className="date row no-gutters mb-0">
                    {moment(dateGroup.date).format('ddd, MMM DD, YYYY')}
                </p>
                {vehicles}
            </div>
        }
    )

    return List;

}

const mapDispatchToProps = dispatch => {
    return {
        editVehicle: (id) => dispatch({ type: 'UPDATE_VEHICLE_ID_TO_EDIT', id: id })
    }
}

export default connect(null, mapDispatchToProps)(VehiclesByDate);