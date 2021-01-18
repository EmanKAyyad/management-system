import React from 'react';

const VehiclesByStatus = (props) => {
    const List = props.dates.map(
        (dateGroup, index) => {
            let vehicles = dateGroup.vehicles.map(
                vehicle => {
                    return <div key={vehicle.id} className="single-vehicle row no-gutters">
                        <div className="col">
                            <div className="vehicle-img">
                                <img />
                            </div>
                            <span>[{vehicle.id}] {vehicle.name}</span>
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

                        </div>
                    </div>
                }
            )

            return <div key={index} className="date-group">
                <p className="date col-12">
                    {dateGroup.date}
                </p>
                {vehicles}
            </div>
        }
    )

    return List;
}

export default VehiclesByStatus;