const initialState = {
    openSideBarFlag: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return {
                openSideBarFlag: !state.openSideBarFlag
            }
    }
    return state;
}

export default reducer;