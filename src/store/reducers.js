const initialState = {
    openSideBarFlag: false,
    vehicles: null,
    vehicleIdToEdit: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return {
                ...state,
                openSideBarFlag: !state.openSideBarFlag
            }

        case 'UPDATE_VEHICLES':

            return {
                ...state,
                vehicles: action.vehicles
            }

        case 'UPDATE_VEHICLE_ID_TO_EDIT':
            return {
                ...state,
                vehicleIdToEdit: action.id
            }

        case 'UPDATE_SINGLE_VEHICLE':
            const newVehicles = [...state.vehicles]
            const elemIndex = state.vehicles.findIndex(z => z.id === action.updatedVehicle.id);
            newVehicles.splice(elemIndex, 1, action.updatedVehicle);
            return {
                ...state,
                vehicles: newVehicles
            }
        case 'DELETE_VEHICLE':
            const targetElemIndex = state.vehicles.findIndex(z => z.id === action.id);
            const updatedVehicles = [...state.vehicles];
            updatedVehicles.splice(targetElemIndex, 1);
            return {
                ...state,
                vehicles: updatedVehicles
            }
    }
    return state;
}

export default reducer;